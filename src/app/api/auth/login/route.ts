import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import { translations } from "@/app/i18n";
import * as Sentry from "@sentry/nextjs";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

function expiredAuthCookie(resp: NextResponse) {
  resp.cookies.set({
    name: "elena_auth_token",
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
    sameSite: "lax"
  });
  return resp;
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const lang = "es";
  const t = translations[lang];

  // Always expire existing auth token as first step

  if (!username) {
    Sentry.logger.error("Login failed", { cause: "Username not provided", username: username });
    return expiredAuthCookie(
      NextResponse.json({ error: t.loginFailed }, { status: 401 })
    );
  }
  if (!password) {
    Sentry.logger.error("Login failed", { cause: "Password not provided", username: username });
    return expiredAuthCookie(
      NextResponse.json({ error: t.loginFailed }, { status: 401 })
    );
  }

  const user = await prisma.user.findFirst({
    where: { username },
    select: {
      id: true, username: true, password: true, role: true, hidden: true
    }
  });

  if (!user) {
    Sentry.logger.error("Login failed", { cause: "Username does not exist", username: username });
    return expiredAuthCookie(
      NextResponse.json({ error: t.loginFailed }, { status: 401 })
    );
  }
  if (user.hidden) {
    Sentry.logger.error("Login failed", { cause: "User is hidden", username: username });
    return expiredAuthCookie(
      NextResponse.json({ error: t.loginFailed }, { status: 401 })
    );
  }
  if (!user.password) {
    Sentry.logger.error("Login failed", { cause: "Username has empty password", username: username });
    return expiredAuthCookie(
      NextResponse.json({ error: t.loginFailed }, { status: 401 })
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // Incorrect password for known user: log KO
    Sentry.logger.error("Login failed", { cause: "Invalid credentials", username: username });
    await prisma.user.update({
      where: { id: user.id },
      data: { lastKOLogin: new Date() },
    });
    return expiredAuthCookie(
      NextResponse.json({ error: t.loginFailed }, { status: 401 })
    );
  }

  // Mark success login
  Sentry.logger.info("Login successful", { username: username });
  await prisma.user.update({
    where: { id: user.id },
    data: { lastOKLogin: new Date() },
  });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  
  const successResponse = NextResponse.json({ ok: true, userId: user.id, role: user.role }, { status: 200 });
  successResponse.cookies.set({
    name: "elena_auth_token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/"
  });

  return successResponse;
}
