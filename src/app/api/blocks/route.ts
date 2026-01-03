import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Prisma } from 'generated-prisma-client';
import { getTokenPayload } from "../utils/auth";

// GET /api/blocks?userId=...
export async function GET(req: NextRequest) {
  try {
    const payload = getTokenPayload(req);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "No userId provided" }, { status: 400 });
    }
    const blocks = await prisma.trainingBlock.findMany({
      where: { userId },
      select: {
        id: true,
        blockNumber: true,
        description: true,
        isVisible: true,
        createdAt: true,
      },
      orderBy: { blockNumber: "desc" }
    });
    return NextResponse.json({ blocks });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal Server Error", detail: err?.message ?? String(err) }, { status: 500 });
  }
}

//// PATCH visibility (existing)
export async function PATCH(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { blockId, visible } = await req.json();
  if (!blockId || typeof visible !== "boolean") {
    return NextResponse.json({ error: "Missing blockId or visible" }, { status: 400 });
  }
  const block = await prisma.trainingBlock.update({
    where: { id: blockId },
    data: { isVisible: visible }
  });
  return NextResponse.json({ success: true, block });
}

//// DELETE block & reorder
export async function DELETE(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { blockId, userId } = await req.json();
  if (!blockId || !userId) {
    return NextResponse.json({ error: "Missing blockId or userId" }, { status: 400 });
  }

  // Lookup block to get blockNumber
  const block = await prisma.trainingBlock.findUnique({ where: { id: blockId } });
  if (!block) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 });
  }

  // Transaction: manual cascade delete, then reorder
   await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // Get all weeks for this block
    const weeks = await tx.trainingWeek.findMany({ where: { blockId } });
    const weekIds = weeks.map((w: { id: string }) => w.id);

    // Get all days for weeks
    const days = await tx.trainingDay.findMany({ where: { weekId: { in: weekIds } } });
    const dayIds = days.map((d: { id: string }) => d.id);

    // Get all dayExercises for days
    const dayExercises = await tx.dayExercise.findMany({ where: { trainingDayId: { in: dayIds } } });
    const dayExerciseIds = dayExercises.map((de: { id: string }) => de.id);

    // Delete DayExerciseSeries
    await tx.dayExerciseSeries.deleteMany({
      where: {
        OR: [
          { dayExerciseId: { in: dayExerciseIds } },
          { trainingWeekId: { in: weekIds } }
        ]
      }
    });

    // Delete DayExercises
    await tx.dayExercise.deleteMany({ where: { trainingDayId: { in: dayIds } } });

    // Delete TrainingDays
    await tx.trainingDay.deleteMany({ where: { weekId: { in: weekIds } } });

    // Delete weeks
    await tx.trainingWeek.deleteMany({ where: { blockId } });

    // Delete block
    await tx.trainingBlock.delete({ where: { id: blockId } });

    // Reorder following blocks (decrement blockNumber)
    await tx.trainingBlock.updateMany({
      where: {
        userId,
        blockNumber: { gt: block.blockNumber }
      },
      data: {
        blockNumber: { decrement: 1 }
      }
    });
  });

  return NextResponse.json({ success: true });
}
