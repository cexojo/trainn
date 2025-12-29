import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  if ((!username && !email) || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      ...(username ? { username } : {}),
      ...(email ? { email } : {}),
    },
  });

  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return NextResponse.json({ ok: true, userId: user.id, role: user.role, token }, { status: 200 });
}
