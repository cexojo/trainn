import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // 1. Get all visible blocks for user, ordered by blockNumber desc (last block is first)
  const block = await prisma.trainingBlock.findFirst({
    where: { userId },
    orderBy: { blockNumber: "desc" },
    include: { weeks: true }
  });

  if (!block) {
    return NextResponse.json({ error: "No blocks for user" }, { status: 404 });
  }
  // 2. All week IDs in this block
  const weekIds = block.weeks.map((w: any) => w.id);
  if (weekIds.length === 0) {
    return NextResponse.json({ blockId: block.id, weekId: null }, { status: 200 });
  }

  // 3. Find all week<->series with any entered value
  const allSeries = await prisma.dayExerciseSeries.findMany({
    where: {
      trainingWeekId: { in: weekIds },
      OR: [
        { effectiveReps: { not: null } },
        { effectiveWeight: { not: null } }
      ]
    },
    select: { trainingWeekId: true }
  });

  // 4. Find the week in block.weeks with max weekNumber and at least one series in allSeries
  let chosenWeek = null;
  let maxWeekNumber = -1;
  for (const wk of block.weeks) {
    if (allSeries.some(s => s.trainingWeekId === wk.id) && wk.weekNumber > maxWeekNumber) {
      chosenWeek = wk;
      maxWeekNumber = wk.weekNumber;
    }
  }
  if (!chosenWeek) {
    // None found, just select first week
    chosenWeek = block.weeks.sort((a, b) => a.weekNumber - b.weekNumber)[0];
  }

  return NextResponse.json({
    blockId: block.id,
    weekId: chosenWeek?.id || null,
    weekNumber: chosenWeek?.weekNumber || null
  }, { status: 200 });
}
