import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Prisma } from "generated-prisma-client";
import { getTokenPayload } from "../../utils/auth";

/**
 * POST /api/training-week/copy
 * Body: { sourceWeekId }
 * Copies a training week after itself, moves all affected weekNumbers, and clears athlete fields.
 */
export async function POST(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { sourceWeekId } = await req.json();
    if (!sourceWeekId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Fetch source week to get blockId and weekNumber
    const sourceWeek = await prisma.trainingWeek.findUnique({
      where: { id: sourceWeekId },
      include: {
        trainingDays: {
          include: {
            dayExercises: {
              include: {
                exercise: true,
                series: true,
              },
            },
          },
        },
      },
    });
    if (!sourceWeek) {
      return NextResponse.json({ error: "Source week not found" }, { status: 404 });
    }
    const blockId = sourceWeek.blockId;
    const newWeekNumber = sourceWeek.weekNumber + 1;

    // ---- TRANSACTIONAL LOGIC ----
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Shift weekNumbers >= newWeekNumber up by 1
      await tx.trainingWeek.updateMany({
        where: {
          blockId,
          weekNumber: { gte: newWeekNumber },
        },
        data: { weekNumber: { increment: 1 } },
      });

      // 2. Create new training week flat-first (no nested creates)
      const copiedWeek = await tx.trainingWeek.create({
        data: {
          weekNumber: newWeekNumber,
          blockId,
          weekStart: sourceWeek.weekStart,
          weekEnd: sourceWeek.weekEnd,
        }
      });

      // 2.1. Create trainingDays, map old-to-new day IDs
      const trainingDayIdMap: Record<string, string> = {};
      for (const day of sourceWeek.trainingDays as any[]) {
        const newDay = await tx.trainingDay.create({
          data: {
            dayNumber: day.dayNumber,
            dayLabel: day.dayLabel,
            date: day.date,
            weekId: copiedWeek.id,
          },
        });
        trainingDayIdMap[day.id] = newDay.id;
      }

      // 2.2. Create dayExercises, map old-to-new exercise IDs
      const dayExerciseIdMap: Record<string, string> = {};
      for (const day of sourceWeek.trainingDays as any[]) {
        const newDayId = trainingDayIdMap[day.id];
        for (const ex of day.dayExercises as any[]) {
          const newDE = await tx.dayExercise.create({
            data: {
              exerciseNumber: ex.exerciseNumber,
              athleteNotes: ex.athleteNotes,
              trainerNotes: ex.trainerNotes,
              day: ex.day,
              trainingDayId: newDayId,
              exerciseId: ex.exerciseId,
            },
          });
          dayExerciseIdMap[ex.id] = newDE.id;
        }
      }

      // 2.3. Create series with correct relations
      for (const day of sourceWeek.trainingDays as any[]) {
        for (const ex of day.dayExercises as any[]) {
          const newDEId = dayExerciseIdMap[ex.id];
          for (const ser of ex.series as any[]) {
            await tx.dayExerciseSeries.create({
              data: {
                seriesNumber: ser.seriesNumber,
                minReps: ser.minReps,
                maxReps: ser.maxReps,
                minRir: ser.minRir,
                maxRir: ser.maxRir,
                effectiveWeight: ser.effectiveWeight,
                effectiveReps: ser.effectiveReps,
                effectiveRir: ser.effectiveRir,
                isDropset: ser.isDropset,
                athleteNotes: ser.athleteNotes,
                trainerNotes: ser.trainerNotes,
                dayExerciseId: newDEId,
                trainingWeekId: copiedWeek.id,
              }
            });
          }
        }
      }

      // 3. Refetch week to return updated structure
      const refetchedWeek = await tx.trainingWeek.findUnique({
        where: { id: copiedWeek.id },
        include: {
          trainingDays: {
            include: {
              dayExercises: {
                include: {
                  series: true,
                },
              },
            },
          },
        },
      });

      return refetchedWeek;
    });
    // ---- END TRANSACTIONAL LOGIC ----

    return NextResponse.json({ success: true, week: result });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to copy week", detail: String(err) }, { status: 500 });
  }
}
