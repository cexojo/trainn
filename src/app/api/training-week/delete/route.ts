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

    await prisma.$transaction(async (tx: typeof prisma) => {
      // Step 1: Get all TrainingDays for the week
      const trainingDays = await tx.trainingDay.findMany({
        where: { weekId },
        select: { id: true },
      });
      const trainingDayIds = trainingDays.map((d: { id: string }) => d.id);

      // Step 2: Get all DayExercises for those days
      const dayExercises = await tx.dayExercise.findMany({
        where: { trainingDayId: { in: trainingDayIds } },
        select: { id: true },
      });
      const dayExerciseIds = dayExercises.map((e: { id: string }) => e.id);

      // Step 3: Delete all DayExerciseSeries for those DayExercises
      if (dayExerciseIds.length > 0) {
        await tx.dayExerciseSeries.deleteMany({
          where: { dayExerciseId: { in: dayExerciseIds } },
        });
      }

      // Step 4: Delete all DayExercises for those days
      if (trainingDayIds.length > 0) {
        await tx.dayExercise.deleteMany({
          where: { trainingDayId: { in: trainingDayIds } },
        });
      }

      // Step 5: Delete all TrainingDays for the week
      await tx.trainingDay.deleteMany({
        where: { weekId },
      });

      // Step 6: Delete the training week
      await tx.trainingWeek.delete({ where: { id: weekId } });

      // Step 7: Shift weekNumbers down by 1 for all later weeks in the same block
      await tx.trainingWeek.updateMany({
        where: {
          blockId: oldWeek!.blockId,
          weekNumber: { gt: oldWeek!.weekNumber },
        },
        data: { weekNumber: { decrement: 1 } },
      });
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Admin-only audit log on error; do not attempt to reparse req.json!
    console.log(
      `[ADMIN][ERROR] ${payload?.email || payload?.id || 'unknown-admin'} failed to delete training week id=${weekId || 'n/a'}${oldWeek ? `, blockId=${oldWeek.blockId}, weekNumber=${oldWeek.weekNumber}` : ''}: ${String(err)}`
    );
    return NextResponse.json({ error: "Failed to delete week", detail: String(err), weekId }, { status: 500 });
  }
}
