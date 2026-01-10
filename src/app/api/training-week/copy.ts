import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "../utils/auth";

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

    // Shift weekNumbers >= newWeekNumber up by 1
    await prisma.trainingWeek.updateMany({
      where: {
        blockId,
        weekNumber: {
          gte: newWeekNumber,
        },
      },
      data: {
        weekNumber: { increment: 1 },
      },
    });

    // Create new training week (copied)
    const copiedWeek = await prisma.trainingWeek.create({
      data: {
        weekNumber: newWeekNumber,
        blockId,
        weekStart: sourceWeek.weekStart,
        weekEnd: sourceWeek.weekEnd,
        trainingDays: {
          create: (sourceWeek.trainingDays as any[]).map((day: any) => ({
            dayNumber: day.dayNumber,
            dayLabel: day.dayLabel,
            date: day.date,
            dayExercises: {
              create: (day.dayExercises as any[]).map((ex: any) => ({
                exerciseId: ex.exerciseId,
                day: day.dayLabel,
                exerciseNumber: ex.exerciseNumber,
                seriesNumber: ex.seriesNumber,
                isDropset: ex.isDropset,
                minReps: ex.minReps,
                maxReps: ex.maxReps,
                minRir: ex.minRir,
                maxRir: ex.maxRir,
                // athlete fields set to null/empty
                effectiveWeight: null,
                effectiveReps: null,
                effectiveRir: null,
                progress: "",
              })),
            },
          })),
        },
      },
      include: {
        trainingDays: {
          include: {
            dayExercises: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, week: copiedWeek });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to copy week", detail: String(err) }, { status: 500 });
  }
}
