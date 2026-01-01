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
    const exercises = await prisma.exercise.findMany({
      include: { exerciseGroup: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ exercises });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to fetch exercises." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { name, exerciseGroupId, recommendedMinReps, recommendedMaxReps } = await req.json();
    if (!name || !exerciseGroupId) {
      return NextResponse.json({ error: "Name and group are required." }, { status: 400 });
    }
    const created = await prisma.exercise.create({
      data: {
        name,
        exerciseGroup: { connect: { id: exerciseGroupId } },
        recommendedMinReps: recommendedMinReps ?? null,
        recommendedMaxReps: recommendedMaxReps ?? null
      },
      include: { exerciseGroup: true }
    });
    return NextResponse.json(created);
  } catch (e: any) {
    if (e.code === "P2002") { // Unique constraint failed
      return NextResponse.json({ error: "Exercise name must be unique." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to add exercise." }, { status: 500 });
  }
}
