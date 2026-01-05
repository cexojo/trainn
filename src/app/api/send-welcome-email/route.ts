import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";
import { generateToken } from "@/app/utils/generateToken";

/**
 * POST /api/send-welcome-email
 * Body: { userId }
 * Rotates the passwordRefreshToken and "sends" a welcome email (logs a message).
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    // Enforce admin authentication
    const tokenPayload = getTokenPayload(req);
    if (!tokenPayload || tokenPayload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a new refresh token via util
    const newToken = generateToken();

    // Update in database and get user info (email)
    const user = await prisma.user.update({
      where: { id: userId },
      data: { passwordRefreshToken: newToken },
      select: {
        id: true,
        email: true,
        name: true,
        passwordRefreshToken: true,
      }
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // TODO: Replace with actual email sending
    // For now, just log the email interaction:
    console.log(
      `[WELCOME-EMAIL] Would send to ${user.email}: Bienvenido/a! Haz clic en el enlace para crear tu contraseña: ` +
      `${process.env.BASE_URL || "http://localhost:3000"}/create_password?token=${user.passwordRefreshToken}`
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 });
  }
}
