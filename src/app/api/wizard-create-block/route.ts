import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from '@/prisma/client';

// Helper to add days to a date
function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export async function POST(req: NextRequest) {
    // Expects: { userId, name, numWeeks, daysPerWeek, exercisesByDay, visible }
    const data = await req.json();
    const { userId, name, numWeeks, daysPerWeek, exercisesByDay, visible } = data;

    // Input validation
    if (!userId || !name || !numWeeks || !daysPerWeek || !Array.isArray(exercisesByDay) || exercisesByDay.length !== daysPerWeek) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            // Get next block number for user
            const lastBlock = await tx.trainingBlock.findFirst({
                where: { userId },
                orderBy: { blockNumber: "desc" },
            });
            const nextBlockNumber = lastBlock ? lastBlock.blockNumber + 1 : 1;
            const blockId = uuidv4();

            // 1. Create block
            await tx.trainingBlock.create({
                data: {
                    id: blockId,
                    userId,
                    isVisible: typeof visible === "boolean" ? visible : true,
                    blockNumber: nextBlockNumber,
                    description: name,
                },
            });

            // Precompute IDs for all weeks/days/exercises/series
            const weeksArr = [];
            const weekIdMap = [];
            const today = new Date();

            // 2. Weeks
            for (let i = 1; i <= Number(numWeeks); ++i) {
                const weekId = uuidv4();
                weekIdMap.push(weekId);

                const weekStart = addDays(today, (i - 1) * 7);
                const weekEnd = addDays(weekStart, 6);

                weeksArr.push({
                    id: weekId,
                    blockId: blockId,
                    weekNumber: i,
                    weekStart,
                    weekEnd,
                });
            }
            await tx.trainingWeek.createMany({ data: weeksArr });

            // 3. Days
            const daysArr = [];
            // Map: weekNumber -> dayNumber -> dayId
            const dayIdMatrix = Array(numWeeks)
                .fill(null)
                .map(() => Array(daysPerWeek).fill(null));
            for (let w = 0; w < numWeeks; ++w) {
                const weekId = weekIdMap[w];
                const weekStart = weeksArr[w].weekStart;
                for (let d = 0; d < daysPerWeek; ++d) {
                    const dayId = uuidv4();
                    dayIdMatrix[w][d] = dayId;
                    daysArr.push({
                        id: dayId,
                        weekId,
                        dayLabel: `Day ${d + 1}`,
                        dayNumber: d + 1,
                        date: addDays(weekStart, d),
                    });
                }
            }
            await tx.trainingDay.createMany({ data: daysArr });

            // 4. DayExercises
            // Map: weekIdx -> dayIdx -> exIdx -> dayExerciseId
            const exercisesArr = [];
            // Matrix: [week][day][exerciseIndex] = string
            const dayExerciseIdMatrix: string[][][] = Array(numWeeks)
                .fill(null)
                .map(() =>
                    Array(daysPerWeek)
                        .fill(null)
                        .map(() => [])
                );
            // Since exercisesByDay is daysPerWeek long (applies to each week)
            for (let w = 0; w < numWeeks; ++w) {
                for (let d = 0; d < daysPerWeek; ++d) {
                    const exercisesForDay = exercisesByDay[d];
                    for (let exIdx = 0; exIdx < exercisesForDay.length; ++exIdx) {
                        const ex = exercisesForDay[exIdx];
                        const dayExerciseId = uuidv4();
                        dayExerciseIdMatrix[w][d].push(dayExerciseId);
                        exercisesArr.push({
                            id: dayExerciseId,
                            trainingDayId: dayIdMatrix[w][d],
                            exerciseId: ex.exerciseId,
                            trainerNotes: ex.trainerNotes ?? "",
                            day: `Day ${d + 1}`,
                            exerciseNumber: ex.exerciseNumber ?? exIdx + 1,
                        });
                    }
                }
            }
            await tx.dayExercise.createMany({ data: exercisesArr });

            // 5. DayExerciseSeries
            const seriesArr = [];
            for (let w = 0; w < numWeeks; ++w) {
                const weekId = weekIdMap[w];
                for (let d = 0; d < daysPerWeek; ++d) {
                    const exercisesForDay = exercisesByDay[d];
                    for (let exIdx = 0; exIdx < exercisesForDay.length; ++exIdx) {
                        const ex = exercisesForDay[exIdx];
                        const dayExerciseId = dayExerciseIdMatrix[w][d][exIdx];
                        if (Array.isArray(ex.series)) {
                            for (let sIdx = 0; sIdx < ex.series.length; ++sIdx) {
                                const ser = ex.series[sIdx] || {};
                                seriesArr.push({
                                    id: uuidv4(),
                                    dayExerciseId,
                                    seriesNumber: sIdx + 1,
                                    minReps: ser.minReps !== undefined && ser.minReps !== "" ? ser.minReps : null,
                                    maxReps: ser.maxReps !== undefined && ser.maxReps !== "" ? ser.maxReps : null,
                                    minRir: ser.minRIR !== undefined && ser.minRIR !== "" ? ser.minRIR : null,
                                    maxRir: ser.maxRIR !== undefined && ser.maxRIR !== "" ? ser.maxRIR : null,
                                    trainingWeekId: weekId,
                                    isDropset: !!ser.isDropset,
                                    trainerNotes: ser.trainerNotes || "",
                                    athleteUserRead: false,
                                });
                            }
                        }
                    }
                }
            }
            if (seriesArr.length > 0) {
                await tx.dayExerciseSeries.createMany({ data: seriesArr });
            }

            return { success: true, blockId: blockId };
        });

        return NextResponse.json(result);
    } catch (err) {
        return NextResponse.json({ error: "Failed to create block", detail: "" + err }, { status: 500 });
    }
}
