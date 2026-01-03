import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  try {
    const body = await req.json();
    const update: any = {};
    if ("recommendedMinReps" in body) {
      update.recommendedMinReps = body.recommendedMinReps ?? null;
    }
    if ("recommendedMaxReps" in body) {
      update.recommendedMaxReps = body.recommendedMaxReps ?? null;
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No updatable fields provided" }, { status: 400 });
    }
    const updated = await prisma.exercise.update({
      where: { id },
      data: update,
      include: { exerciseGroup: true },
    });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to update exercise" }, { status: 500 });
  }
}
