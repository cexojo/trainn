import { NextRequest, NextResponse } from "next/server";

import prisma from '@/prisma/client';

export async function POST(req: NextRequest) {
  // Expects: { userId, name, numWeeks, exercises }
  const data = await req.json();
  const { userId, name, numWeeks, daysPerWeek, exercisesByDay, visible } = data;

  if (!userId || !name || !numWeeks || !daysPerWeek || !Array.isArray(exercisesByDay) || exercisesByDay.length !== daysPerWeek) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Determine next blockNumber for user
    const lastBlock = await prisma.trainingBlock.findFirst({
      where: { userId },
      orderBy: { blockNumber: "desc" }
    });
    const nextBlockNumber = lastBlock ? lastBlock.blockNumber + 1 : 1;

    // Create the training block
    const block = await prisma.trainingBlock.create({
      data: {
        userId,
        isVisible: typeof visible === "boolean" ? visible : true,
        blockNumber: nextBlockNumber,
        description: name
      }
    });

    // Create weeks for the block
    const weeks: any[] = [];
    for (let i = 1; i <= Number(numWeeks); ++i) {
      // Set weekStart and weekEnd to today + (i-1) weeks, as example placeholders
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() + (i - 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      const week = await prisma.trainingWeek.create({
        data: {
          blockId: block.id,
          weekNumber: i,
          weekStart,
          weekEnd
        }
      });
      weeks.push(week);
    }

    // For each week, create each day, then each exercise for that day
    const creationLogs = [];
    for (const week of weeks) {
      for (let dayIdx = 0; dayIdx < daysPerWeek; ++dayIdx) {
        const trainingDayLabel = `Day ${dayIdx + 1}`;
        let day = await prisma.trainingDay.create({
          data: {
            weekId: week.id,
            dayLabel: trainingDayLabel,
            dayNumber: dayIdx + 1,
            date: new Date(week.weekStart.getTime() + dayIdx * 24 * 60 * 60 * 1000)
          }
        });

        const exercises = exercisesByDay[dayIdx];
        for (const [exIdx, ex] of exercises.entries()) {
          const dayExercise = await prisma.dayExercise.create({
            data: {
              trainingDayId: day.id,
              exerciseId: ex.exerciseId,
              trainerNotes: ex.trainerNotes ?? "",
              day: trainingDayLabel,
              exerciseNumber: ex.exerciseNumber ?? exIdx + 1
            }
          });

          for (let sIdx = 0; sIdx < (ex.series?.length || 0); ++sIdx) {
            const ser = ex.series[sIdx] || {};
            const series = await prisma.dayExerciseSeries.create({
              data: {
                dayExercise: { connect: { id: dayExercise.id } },
                trainingWeek: { connect: { id: week.id } },
                seriesNumber: sIdx + 1,
                minReps: ser.minReps !== undefined && ser.minReps !== "" ? ser.minReps : null,
                maxReps: ser.maxReps !== undefined && ser.maxReps !== "" ? ser.maxReps : null,
                minRir: ser.minRIR !== undefined && ser.minRIR !== "" ? ser.minRIR : null,
                maxRir: ser.maxRIR !== undefined && ser.maxRIR !== "" ? ser.maxRIR : null,
                isDropset: !!ser.isDropset,
              }
            });
            let exerciseName = '';
            if (ex.exerciseName) {
              exerciseName = ex.exerciseName;
            } else {
              try {
                const exerciseObj = await prisma.exercise.findUnique({
                  where: { id: ex.exerciseId },
                  select: { name: true }
                });
                exerciseName = exerciseObj?.name || '';
              } catch { exerciseName = ''; }
            }
            creationLogs.push({
              dayNumber: day.dayNumber,
              dayId: day.id,
              exerciseNumber: dayExercise.exerciseNumber,
              exerciseId: ex.exerciseId,
              exerciseName,
              seriesNumber: series.seriesNumber,
              seriesId: series.id
            });
          }
        }
      }
    }

    return NextResponse.json({ success: true, blockId: block.id, logs: creationLogs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create block", detail: "" + err }, { status: 500 });
  }
}
