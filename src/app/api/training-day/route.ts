import { PrismaClient } from ".prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * PATCH /api/training-day
 * Expects: { trainingDayId } OR { weekId, dayLabel }, plus { date }
 * - If trainingDayId: update date for that day
 * - If not, fallback to lookup by (weekId, dayLabel)
 */
export async function PATCH(req: NextRequest) {
  try {
    const { trainingDayId, weekId, date, dayLabel, dayNumber } = await req.json();
    if (trainingDayId) {
      // Direct update by ID
      const trainingDay = await prisma.trainingDay.update({
        where: { id: trainingDayId },
        data: { date: new Date(date) }
      });
      return NextResponse.json({ trainingDay });
    }
    if (!weekId || !dayLabel || !date || typeof dayNumber !== "number") {
      return NextResponse.json({ error: "Missing parameters (need weekId, date, dayLabel, dayNumber)" }, { status: 400 });
    }
    // Try to find existing training day (fallback for legacy clients)
    let trainingDay = await prisma.trainingDay.findFirst({
      where: { weekId, dayLabel }
    });
    if (!trainingDay) {
      trainingDay = await prisma.trainingDay.create({
        data: {
          date: new Date(date),
          weekId,
          dayLabel,
          dayNumber
        }
      });
    } else {
      trainingDay = await prisma.trainingDay.update({
        where: { id: trainingDay.id },
        data: { date: new Date(date) }
      });
    }
    return NextResponse.json({ trainingDay });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update training day", detail: err instanceof Error ? err.message : undefined }, { status: 500 });
  }
}
