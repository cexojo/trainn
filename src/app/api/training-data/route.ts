import { PrismaClient } from ".prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const weekId = searchParams.get("weekId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Fetch all training blocks for the user, include their weeks
  const blocks = await prisma.trainingBlock.findMany({
    where: { userId },
    orderBy: { blockNumber: "asc" },
    include: {
      weeks: {
        orderBy: { weekNumber: "asc" },
        select: { id: true, weekNumber: true, weekStart: true, weekEnd: true }
      }
    }
  });

  // Determine default/latest block and week if weekId is not given
  let selectedBlock = null, selectedWeek = null;
  if (blocks.length > 0) {
    selectedBlock = blocks[blocks.length - 1];
    if (weekId) {
      for (const block of blocks) {
        const wk = block.weeks.find(w => String(w.id) === String(weekId));
        if (wk) {
          selectedBlock = block;
          selectedWeek = wk;
          break;
        }
      }
    }
    if (!selectedWeek) selectedWeek = selectedBlock.weeks[selectedBlock.weeks.length - 1];
  }

  // Load exercise definitions for selectedWeek, and for previous week if exists
  let exerciseDefs = [];
  if (selectedWeek && selectedBlock) {
    exerciseDefs = await prisma.exerciseDefinition.findMany({
      where: { trainingWeekId: selectedWeek.id },
      include: { exercise: true }
    });

    // Find previous week in block (by weekNumber)
    const prevWeek = selectedBlock.weeks
      .filter(w => w.weekNumber < selectedWeek.weekNumber)
      .sort((a, b) => b.weekNumber - a.weekNumber)[0];

    let prevDefsByKey: Record<string, any> = {};
    if (prevWeek) {
      const prevWeekDefs = await prisma.exerciseDefinition.findMany({
        where: { trainingWeekId: prevWeek.id },
      });
      // Map by exerciseId+seriesNumber for fast lookup
      prevWeekDefs.forEach(def => {
        const k = def.exerciseId + "_" + def.seriesNumber;
        prevDefsByKey[k] = def;
      });
    }

    // Add lastWeekValues if possible 
    exerciseDefs = exerciseDefs.map(def => {
      let lastValues = null;
      if (prevDefsByKey) {
        const k = def.exerciseId + "_" + def.seriesNumber;
        if (prevDefsByKey[k]) {
          const pv = prevDefsByKey[k];
          lastValues = {
            effectiveReps: pv.effectiveReps,
            effectiveWeight: pv.effectiveWeight,
            effectiveRir: pv.effectiveRir
          };
        }
      }
      return { ...def, lastWeekValues: lastValues };
    });
  }

  return NextResponse.json({
    blocks: blocks.map(b => ({
      id: b.id,
      blockNumber: b.blockNumber,
      description: b.description,
      weeks: b.weeks,
    })),
    selectedBlock: selectedBlock || null,
    selectedWeek: selectedWeek ? {
      id: selectedWeek.id,
      weekNumber: selectedWeek.weekNumber,
      weekStart: selectedWeek.weekStart,
      weekEnd: selectedWeek.weekEnd
    } : null,
    exerciseDefs
  });
}
