import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "../../utils/auth";

/**
 * DELETE /api/training-week/delete
 * Body: { weekId }
 * Deletes a training week and shifts down weekNumbers for all subsequent weeks in the same block.
 */
export async function POST(req: NextRequest) {
  const payload = getTokenPayload(req);
  let weekId: string | undefined = undefined;
  let oldWeek: { id: string; blockId: string; weekNumber: number } | null = null;
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await req.json();
    weekId = body.weekId;
    if (!weekId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Fetch week to get blockId and weekNumber
    oldWeek = await prisma.trainingWeek.findUnique({
      where: { id: weekId },
      select: { id: true, blockId: true, weekNumber: true },
    });
    if (!oldWeek) {
      return NextResponse.json({ error: "Week not found" }, { status: 404 });
    }

    // Admin-only audit log before deleting
    console.log(
      `[ADMIN] ${payload?.email || payload?.id || 'unknown-admin'} is deleting training week id=${weekId}, blockId=${oldWeek.blockId}, weekNumber=${oldWeek.weekNumber}`
    );

    // Pre-fetch IDs required for deletes
    const trainingDays = await prisma.trainingDay.findMany({
      where: { weekId },
      select: { id: true },
    });
    const trainingDayIds = trainingDays.map((d: { id: string }) => d.id);

    const dayExercises = await prisma.dayExercise.findMany({
      where: { trainingDayId: { in: trainingDayIds } },
      select: { id: true },
    });
    const dayExerciseIds = dayExercises.map((e: { id: string }) => e.id);

    // Prepare queries:
    const queries = [];
    if (dayExerciseIds.length > 0) {
      queries.push(
        prisma.dayExerciseSeries.deleteMany({
          where: { dayExerciseId: { in: dayExerciseIds } }
        })
      );
    }
    if (trainingDayIds.length > 0) {
      queries.push(
        prisma.dayExercise.deleteMany({
          where: { trainingDayId: { in: trainingDayIds }}
        })
      );
    }
    queries.push(
      prisma.trainingDay.deleteMany({ where: { weekId } }),
      prisma.trainingWeek.delete({ where: { id: weekId } }),
      prisma.trainingWeek.updateMany({
        where: {
          blockId: oldWeek!.blockId,
          weekNumber: { gt: oldWeek!.weekNumber }
        },
        data: { weekNumber: { decrement: 1 } }
      })
    );
    // Execute all deletions in a single transaction
    await prisma.$transaction(queries);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Admin-only audit log on error; do not attempt to reparse req.json!
    console.log(
      `[ADMIN][ERROR] ${payload?.email || payload?.id || 'unknown-admin'} failed to delete training week id=${weekId || 'n/a'}${oldWeek ? `, blockId=${oldWeek.blockId}, weekNumber=${oldWeek.weekNumber}` : ''}: ${String(err)}`
    );
    return NextResponse.json({ error: "Failed to delete week", detail: String(err), weekId }, { status: 500 });
  }
}
