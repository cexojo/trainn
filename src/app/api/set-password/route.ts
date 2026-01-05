import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

/**
 * Sets or updates the user's password using a passwordRefreshToken.
 * Expects: { passwordRefreshToken, password }
 */
export async function POST(req: NextRequest) {
  try {
    const { passwordRefreshToken, password } = await req.json();

    if (!passwordRefreshToken || !password) {
      return NextResponse.json({ error: "Missing passwordRefreshToken or password" }, { status: 400 });
    }

    // Find the user with this token
    const user = await prisma.user.findUnique({
      where: { passwordRefreshToken },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired password reset link" }, { status: 404 });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a new refresh token so this link can't be reused
    const newRefreshToken =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) +
          Math.random().toString(36).slice(2);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordRefreshToken: newRefreshToken,
      }
    });

    return NextResponse.json({ ok: true, userId: user.id });
  } catch (err) {
    console.error("Failed to set password:", err);
    return NextResponse.json(
      { error: "Failed to set password" },
      { status: 500 }
    );
  }
}
