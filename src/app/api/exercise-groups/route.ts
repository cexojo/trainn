import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

function getTokenPayload(req: NextRequest) {
  const token = req.cookies.get("elena_auth_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string, username: string, role: string };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const groups = await prisma.exerciseGroup.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ groups });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to fetch groups." }, { status: 500 });
  }
}
