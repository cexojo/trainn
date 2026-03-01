import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/prisma/client";

// POST /api/day-exercise
// Body: { trainingDayId, exerciseId, exerciseNumber, seriesCount }
export async function POST(req: NextRequest) {
  try {
    const { trainingDayId, exerciseId, exerciseNumber, seriesCount } = await req.json();

    if (!trainingDayId || !exerciseId || !exerciseNumber || !seriesCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (typeof seriesCount !== "number" || seriesCount < 1 || seriesCount > 20) {
      return NextResponse.json({ error: "El número máximo permitido de series es 20." }, { status: 400 });
    }

    // Get existing exercises for the day to shift down
    const existing = await prisma.dayExercise.findMany({
      where: { trainingDayId },
      orderBy: { exerciseNumber: "asc" }
    });

    // Load the trainingDay to get its trainingWeekId (for series)
    const trainingDay = await prisma.trainingDay.findUnique({
      where: { id: trainingDayId }
    });
    if (!trainingDay) {
      return NextResponse.json({ error: "Invalid trainingDayId" }, { status: 400 });
    }
    const trainingWeekId = trainingDay.weekId;

    // Shift all at or after the desired index up by 1 (handle null/undefined safely)
    await Promise.all(
      existing
        .filter(ex => (typeof ex.exerciseNumber === "number" && ex.exerciseNumber >= exerciseNumber))
        .map(ex =>
          prisma.dayExercise.update({
            where: { id: ex.id },
            data: { exerciseNumber: (ex.exerciseNumber || 0) + 1 }
          })
        )
    );

    // Create new DayExercise at specified position
    const dayExerciseId = uuidv4();
    await prisma.dayExercise.create({
      data: {
        id: dayExerciseId,
        trainingDayId,
        exerciseId,
        day: existing[0]?.day || "",
        exerciseNumber,
        trainerNotes: "",
      },
    });

    // Create N DayExerciseSeries for the new exercise
    const createSeries = [];
    for (let i = 1; i <= seriesCount; ++i) {
      createSeries.push(
        prisma.dayExerciseSeries.create({
          data: {
            id: uuidv4(),
            dayExerciseId,
            seriesNumber: i,
            trainingWeekId,
          },
        })
      );
    }
    await Promise.all(createSeries);

    return NextResponse.json({ success: true, dayExerciseId });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to create exercise", detail: err?.message || String(err) }, { status: 500 });
  }
}
