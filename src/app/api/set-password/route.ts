import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { translations } from "@/app/i18n";

/**
 * Gets user info by passwordRefreshToken (for password reset page).
 * Query param: ?passwordRefreshToken=...
 * Returns: { firstName, email }
 */
export async function GET(req: NextRequest) {
  try {
    const passwordRefreshToken = req.nextUrl.searchParams.get("passwordRefreshToken");
    if (!passwordRefreshToken) {
      return NextResponse.json({ error: translations["es"].passwordInvalidOrExpired }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { passwordRefreshToken },
      select: { firstName: true, email: true }
    });
    if (!user) {
      return NextResponse.json({ error: translations["es"].passwordInvalidOrExpired }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: translations["es"].passwordSnackbarError, detail: String(err) },
      { status: 500 }
    );
  }
}

/**
 * Sets or updates the user's password using a passwordRefreshToken.
 * Expects: { passwordRefreshToken, password }
 */
export async function POST(req: NextRequest) {
  try {
    const { passwordRefreshToken, password } = await req.json();

    if (!passwordRefreshToken || !password) {
      return NextResponse.json({ error: translations["es"].passwordSnackbarError }, { status: 400 });
    }

    // Find the user with this token
    const user = await prisma.user.findUnique({
      where: { passwordRefreshToken },
    });
    if (!user) {
      return NextResponse.json({ error: translations["es"].passwordInvalidOrExpired }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

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
      { error: translations["es"].passwordSnackbarError },
      { status: 500 }
    );
  }
}
