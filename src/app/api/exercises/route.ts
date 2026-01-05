import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";
import { APIError } from "@/utils/errors";

export async function GET(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    // Unauthorized
    new APIError("Unauthorized GET /api/exercises", { reason: "Missing or non-admin tokenPayload" });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    // Forbidden
    new APIError("Forbidden GET /api/exercises", { reason: "Missing or non-admin payload" });
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const exercises = await prisma.exercise.findMany({
      include: { exerciseGroup: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ exercises });
  } catch (e: any) {
    new APIError("Failed to fetch exercises", { original: e });
    return NextResponse.json({ error: "Failed to fetch exercises." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    new APIError("Forbidden POST /api/exercises", { reason: "Missing or non-admin payload" });
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { name, exerciseGroupId, recommendedMinReps, recommendedMaxReps, measurementType } = await req.json();
    if (!name || !exerciseGroupId) {
      new APIError("Name and group are required for exercise creation", { body: { name, exerciseGroupId } });
      return NextResponse.json({ error: "Name and group are required." }, { status: 400 });
    }
    const created = await prisma.exercise.create({
      data: {
        name,
        exerciseGroup: { connect: { id: exerciseGroupId } },
        recommendedMinReps: recommendedMinReps ?? null,
        recommendedMaxReps: recommendedMaxReps ?? null,
        measurementType: measurementType === "TIME" ? "TIME" : "REPS"
      },
      include: { exerciseGroup: true }
    });
    return NextResponse.json(created);
  } catch (e: any) {
    if (e.code === "P2002") { // Unique constraint failed
      new APIError("Exercise name must be unique", { original: e, name });
      return NextResponse.json({ error: "Exercise name must be unique." }, { status: 400 });
    }
    new APIError("Failed to add exercise.", { original: e });
    return NextResponse.json({ error: "Failed to add exercise." }, { status: 500 });
  }
}
