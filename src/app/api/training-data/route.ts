import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const weekId = searchParams.get("weekId");
  const blockId = searchParams.get("blockId");
  const debugEnabled = searchParams.get("debug") === "1";

  try {
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Fetch all training blocks for the user, include their weeks
    const blocks = await prisma.trainingBlock.findMany({
      where: { userId, isVisible: true },
      orderBy: { blockNumber: "asc" },
      include: {
        weeks: {
          orderBy: { weekNumber: "asc" },
          select: { id: true, weekNumber: true, weekStart: true, weekEnd: true, blockId: true }
        }
      }
    });

    // Determine default/latest block and week if weekId is not given
    let selectedBlock = null, selectedWeek = null;
    let blockForFilter = null;
    if (blocks.length > 0) {
      if (blockId) {
        blockForFilter = blocks.find(b => String(b.id) === String(blockId));
        selectedBlock = blockForFilter ?? blocks[blocks.length - 1];
      } else {
        selectedBlock = blocks[blocks.length - 1];
      }
      if (weekId) {
        for (const block of blocks) {
          const wk = block.weeks.find((w: { id: any; weekNumber: number; weekStart: Date; weekEnd: Date }) => String(w.id) === String(weekId));
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
    let exerciseDefs: any[] = [];
    let trainingDays: any[] = [];
    let debugObj: any = {};
    // If filtering by block, gather all related week IDs
    if ((blockId && blockForFilter) || (selectedWeek && selectedBlock)) {
      let weekIds: any[] = [];
      if (blockId && blockForFilter) {
        weekIds = blockForFilter.weeks.map((w: any) => w.id);
      } else if (selectedWeek && selectedBlock) {
        weekIds = [selectedWeek.id];
      }

      // Fetch training days for all included weeks
      trainingDays = await prisma.trainingDay.findMany({
        where: { weekId: { in: weekIds } },
        orderBy: { dayLabel: "asc" },
        select: {
          id: true,
          date: true,
          dayLabel: true
        }
      });

      exerciseDefs = await prisma.dayExerciseSeries.findMany({
        where: { trainingWeekId: { in: weekIds } },
        include: {
          dayExercise: {
            include: {
              exercise: true,
              trainingDay: { select: { id: true, dayNumber: true, dayLabel: true, date: true } }
            }
          }
        }
      });

      // --- Find placeholders from previous week (same day number in block) ---
      // Find previous week in block (by weekNumber)

      // Gather debug info in debugObj for API response (not console)
      debugObj.selectedBlock = selectedBlock
        ? { id: selectedBlock.id, blockNumber: selectedBlock.blockNumber, weeks: selectedBlock.weeks.map((w: any) => ({ id: w.id, weekNumber: w.weekNumber })) }
        : null;
      debugObj.selectedWeek = selectedWeek
        ? { id: selectedWeek.id, weekNumber: selectedWeek.weekNumber }
        : null;

      const prevWeek = selectedBlock.weeks
        .filter((w: { id: any; weekNumber: number; weekStart: Date; weekEnd: Date }) => w.weekNumber < selectedWeek.weekNumber)
        .sort((a: { weekNumber: number }, b: { weekNumber: number }) => b.weekNumber - a.weekNumber)[0];

      debugObj.prevWeek = prevWeek
        ? { id: prevWeek.id, weekNumber: prevWeek.weekNumber }
        : null;

      let prevDefsByKey: Record<string, any> = {};
      let prevWeekDefs: any[] = [];
      if (prevWeek) {
        prevWeekDefs = await prisma.dayExerciseSeries.findMany({
          where: { trainingWeekId: prevWeek.id },
          include: {
            dayExercise: {
              include: {
                trainingDay: { select: { id: true, dayNumber: true } },
                exercise: true,
              }
            }
          }
        });

        debugObj.prevWeekDefs = prevWeekDefs.map(d => ({
          id: d.id,
          exerciseId: d.dayExercise?.exercise?.id ?? d.dayExerciseId,
          trainingDay: d.dayExercise?.trainingDay
            ? { id: d.dayExercise.trainingDay.id, dayNumber: d.dayExercise.trainingDay.dayNumber }
            : { id: null, dayNumber: null },
          seriesNumber: d.seriesNumber,
          effectiveReps: d.effectiveReps,
          effectiveWeight: d.effectiveWeight,
          effectiveRir: d.effectiveRir
        }));

        prevWeekDefs.forEach((def: any) => {
          const dayNum = def.dayExercise?.trainingDay?.dayNumber ?? "NA";
          const exId = def.dayExercise?.exercise?.id ?? def.dayExerciseId ?? "NA";
          const k = `${dayNum}|${exId}|${def.seriesNumber}`;
          prevDefsByKey[k] = def;
        });
        debugObj.prevDefsByKey = Object.entries(prevDefsByKey).reduce((acc: Record<string, any>, [k, v]) => {
          acc[k] = {
            id: v.id,
            exerciseId: v.dayExercise?.exercise?.id ?? v.dayExerciseId,
            seriesNumber: v.seriesNumber,
            effectiveReps: v.effectiveReps,
            effectiveWeight: v.effectiveWeight,
            effectiveRir: v.effectiveRir
          };
          return acc;
        }, {});
      } else {
        debugObj.prevWeekDefs = [];
        debugObj.prevDefsByKey = {};
      }

      // Assign lastWeekValues using same day number, exercise, and series in previous week of block
      debugObj.debugPlaceholders = [];
      exerciseDefs = exerciseDefs.map((def: any) => {
        let lastValues = null;
        const dayNum =
          def.dayExercise?.trainingDay && typeof def.dayExercise.trainingDay.dayNumber === "number"
            ? def.dayExercise.trainingDay.dayNumber
            : "NA";
        const exId = def.dayExercise?.exercise?.id ?? def.dayExerciseId ?? "NA";
        const k = dayNum + "|" + exId + "|" + def.seriesNumber;
        if (prevDefsByKey[k]) {
          const pv = prevDefsByKey[k];
          lastValues = {
            effectiveReps: pv.effectiveReps,
            effectiveWeight: pv.effectiveWeight,
            effectiveRir: pv.effectiveRir
          };
          debugObj.debugPlaceholders.push({
            match: 'HIT',
            forKey: k,
            currentDefId: def.id,
            prevDefId: pv.id,
            effectiveReps: pv.effectiveReps,
            effectiveWeight: pv.effectiveWeight,
            effectiveRir: pv.effectiveRir,
          });
        } else {
          debugObj.debugPlaceholders.push({
            match: 'MISS',
            forKey: k,
            currentDefId: def.id,
          });
        }
        // Remap so the frontend gets root-level fields as before
        return {
          id: def.id,
          day: def.dayExercise?.day ?? "",
          dayNumber: def.dayExercise?.dayNumber ?? null,
          athleteNotes: def.dayExercise?.athleteNotes ?? "",
          trainerNotes: def.dayExercise?.trainerNotes ?? "",
          dayExerciseId: def.dayExercise?.id ?? "",
          exercise: def.dayExercise?.exercise ?? {},
          trainingDay: def.dayExercise?.trainingDay ?? {},
          seriesNumber: def.seriesNumber,
          minReps: def.minReps,
          maxReps: def.maxReps,
          minRir: def.minRir,
          maxRir: def.maxRir,
          effectiveReps: def.effectiveReps,
          effectiveWeight: def.effectiveWeight,
          effectiveRir: def.effectiveRir,
          lastWeekValues: lastValues,
          isDropset: def.isDropset
        };
      });
    }

    const responseObj: any = {
      blocks: blocks.map((b: { id: any; blockNumber: number; description: string; weeks: any[] }) => ({
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
      exerciseDefs,
      trainingDays
    };

    if (debugEnabled) responseObj._debugInfo = debugObj;

    return NextResponse.json(responseObj);
  } catch (e: any) {
    // Send error info to frontend if debug=1
    if (debugEnabled) {
      return NextResponse.json({
        error: true,
        errorMessage: e && e.message,
        errorStack: e && e.stack
      }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}
