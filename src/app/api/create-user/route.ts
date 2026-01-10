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

    const { firstName, lastName, username, email, paymentFrequency, paymentAmount, role, sex, isocode } = body;

    // Basic validation
    if (
      !firstName ||
      !lastName ||
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
        firstName,
        lastName,
        username,
        email,
        subscriptionFrequency: paymentFrequency,
        subscriptionAmount: parseFloat(paymentAmount),
        role,
        passwordRefreshToken,
        sex: sex === "MALE" || sex === "FEMALE" ? sex : undefined,
        isocode: typeof isocode === "string" ? isocode : "es",
        // Optionally: add password after hashing
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    throw new APIError("Failed to create a user.", { err });    
  }
}
