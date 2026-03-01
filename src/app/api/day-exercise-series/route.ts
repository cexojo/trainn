import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { dayExerciseId, seriesNumber = 1 } = await req.json();
    if (!dayExerciseId || typeof seriesNumber !== "number") {
      return NextResponse.json({ error: "dayExerciseId and seriesNumber (number) are required." }, { status: 400 });
    }

    // Look up the weekId via the parent dayExercise
    const dayExercise = await prisma.dayExercise.findUnique({
      where: { id: dayExerciseId },
      select: {
        trainingDay: { select: { weekId: true } }
      }
    });
    if (!dayExercise) {
      return NextResponse.json({ error: "Invalid dayExerciseId" }, { status: 400 });
    }
    const trainingWeekId = dayExercise.trainingDay.weekId;

    // Transaction: shift all >= requested series numbers + insert the new one
    const result = await prisma.$transaction(async (tx) => {
      // Shift up all later series
      const shifted = await tx.dayExerciseSeries.updateMany({
        where: {
          dayExerciseId,
          seriesNumber: { gte: seriesNumber }
        },
        data: { seriesNumber: { increment: 1 } }
      });
      // Create the new series
      const created = await tx.dayExerciseSeries.create({
        data: {
          dayExerciseId,
          seriesNumber,
          trainingWeekId
        }
      });
      return { shifted, created };
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to create series: " + (e?.message || e) }, { status: 500 });
  }
}
