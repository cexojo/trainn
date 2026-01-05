import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { getTokenPayload } from "@/app/api/utils/auth";
import { generateToken } from "@/app/utils/generateToken";
import { APIError } from "@/utils/errors";

export async function POST(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    new APIError("Unauthorized create_user POST");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();

    const { name, username, email, paymentFrequency, paymentAmount, role } = body;

    // Basic validation
    if (
      !name ||
      !username ||
      !email ||
      !paymentFrequency ||
      !paymentAmount ||
      !role
    ) {
      new APIError("Missing required fields in create_user POST");
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Generate password refresh token
    const passwordRefreshToken = generateToken();

    // Insert new user in the database with Prisma
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        subscriptionFrequency: paymentFrequency,
        subscriptionAmount: parseFloat(paymentAmount),
        role,
        passwordRefreshToken,
        // Optionally: add password after hashing
      }
    });

    // Strip sensitive fields if present (e.g., password)
    if ("password" in user) delete user.password;

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    throw new APIError("Failed to create a user.", { err });    
  }
}
