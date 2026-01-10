import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { getTokenPayload } from "@/app/api/utils/auth";

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

    // Fetch user role to check authorization
    const tokenPayload = getTokenPayload(req);

    // Defensive: fetch user on the requested userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    // Authorization logic for both admin and athlete 
    if (!tokenPayload || !tokenPayload.id || !tokenPayload.role) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }
    if (
      tokenPayload.role === "athlete" &&
      tokenPayload.id !== userId
    ) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    // Fetch all training blocks for the user, include their weeks (athlete can only see isVisible: true)
    const blocks = await prisma.trainingBlock.findMany({
      where: {
        userId,
        ...(user?.role === "athlete" ? { isVisible: true } : {})
      },
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
        blockForFilter = blocks.find((b: { id: any; }) => String(b.id) === String(blockId));
        selectedBlock = blockForFilter ?? blocks[blocks.length - 1];
      } else {
        selectedBlock = blocks[blocks.length - 1];
      }
      if (weekId) {
        for (const block of blocks) {
          const wk = (block as any).weeks.find((w: { id: any; weekNumber: number; weekStart: Date; weekEnd: Date }) => String(w.id) === String(weekId));
          if (wk) {
            selectedBlock = block;
            selectedWeek = wk;
            break;
          }
        }
      }
      if (!selectedWeek && selectedBlock && selectedBlock.weeks && selectedBlock.weeks.length > 0) {
        selectedWeek = (selectedBlock as any).weeks[(selectedBlock as any).weeks.length - 1];
      }
    }

    // Abort if no selectedBlock or selectedWeek (invalid IDs)
    if (!selectedBlock || !selectedWeek) {
      return NextResponse.json({ error: "Block or week not found" }, { status: 404 });
    }

    // Load exercise definitions for selectedWeek, and for previous week if exists
    let exerciseDefs: any[] = [];
    let trainingDays: any[] = [];
    let debugObj: any = {};
    // If filtering by block, gather all related week IDs
    if ((blockId && blockForFilter) || (selectedWeek && selectedBlock)) {
      let weekIds: any[] = [];
      if (blockId && blockForFilter) {
        weekIds = (blockForFilter as any).weeks.map((w: any) => w.id);
      } else if (selectedWeek && selectedBlock) {
        weekIds = [selectedWeek.id];
      }

      // Fetch training days for all included weeks
      trainingDays = await prisma.trainingDay.findMany({
        where: { weekId: { in: weekIds } },
        orderBy: { dayNumber: "asc" },
        select: {
          id: true,
          weekId: true,
          date: true,
          dayLabel: true,
          dayNumber: true
        }
      });

      try {
        exerciseDefs = await prisma.dayExerciseSeries.findMany({
          where: { trainingWeekId: { in: weekIds } },
          include: {
            dayExercise: {
              include: {
                exercise: { include: { exerciseGroup: true } },
                trainingDay: { select: { id: true, dayNumber: true, dayLabel: true, date: true } }
              }
            }
          }
        });

        // DUPLICATE CHECK: group by (trainingDayId, exerciseNumber, exerciseId, seriesNumber)
        const rawDuplicates: Record<string, number[]> = {};
        exerciseDefs.forEach((def: any, idx: number) => {
          const dId = def.dayExercise?.trainingDay?.id ?? "NA";
          const n = def.dayExercise?.exerciseNumber ?? "NA";
          const eId = def.dayExercise?.exercise?.id ?? def.dayExerciseId ?? "NA";
          const sN = def.seriesNumber ?? "NA";
          const key = `${dId}|${n}|${eId}|${sN}`;
          if (!rawDuplicates[key]) rawDuplicates[key] = [];
          rawDuplicates[key].push(idx);
        });
        const duplicateKeys = Object.entries(rawDuplicates).filter(([_, idxs]) => idxs.length > 1);
        debugObj.rawDuplicateSeries = duplicateKeys.map(([k, idxs]) => ({
          key: k,
          count: idxs.length,
          recordIds: idxs.map(i => exerciseDefs[i].id),
        }));

        // NEW: Check (trainingDayId, exerciseNumber) uniqueness among dayExercise (ignoring exerciseId)
        const dayExerciseSeen: Record<string, string[]> = {};
        exerciseDefs.forEach((def: any) => {
          const dId = def.dayExercise?.trainingDay?.id ?? "NA";
          const n = def.dayExercise?.exerciseNumber ?? "NA";
          const key = `${dId}|${n}`;
          const dayExerciseId = def.dayExercise?.id ?? "?";
          if (!dayExerciseSeen[key]) dayExerciseSeen[key] = [];
          if (!dayExerciseSeen[key].includes(dayExerciseId)) {
            dayExerciseSeen[key].push(dayExerciseId);
          }
        });
        debugObj.nonUniqueDayExerciseNumber = Object.entries(dayExerciseSeen)
          .filter(([_, array]) => array.length > 1)
          .map(([key, ids]) => ({ key, dayExerciseIds: ids }));
      } catch (err) {
        throw err;
      }

      // --- Find placeholders from previous week (same day number in block) ---
      // Find previous week in block (by weekNumber)

      // Gather debug info in debugObj for API response (not console)
      debugObj.selectedBlock = selectedBlock
        ? { id: (selectedBlock as any).id, blockNumber: (selectedBlock as any).blockNumber, weeks: (selectedBlock as any).weeks.map((w: any) => ({ id: w.id, weekNumber: w.weekNumber })) }
        : null;
      debugObj.selectedWeek = selectedWeek
        ? { id: selectedWeek.id, weekNumber: selectedWeek.weekNumber }
        : null;

      let prevWeek = null;
      if (selectedBlock && selectedBlock.weeks && selectedWeek) {
        prevWeek = (selectedBlock as any).weeks
          .filter((w: { id: any; weekNumber: number; weekStart: Date; weekEnd: Date }) => w.weekNumber < selectedWeek.weekNumber)
          .sort((a: { weekNumber: number }, b: { weekNumber: number }): number => b.weekNumber - a.weekNumber)[0];
      }

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
          // Use the exerciseNumber for DayExercise (not dayNumber)
          const exerciseNum = def.dayExercise?.exerciseNumber ?? "NA";
          const exId = def.dayExercise?.exercise?.id ?? def.dayExerciseId ?? "NA";
          const k = `${exerciseNum}|${exId}|${def.seriesNumber}`;
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
        const exerciseNum =
          def.dayExercise?.exerciseNumber ?? "NA";
        const exId = def.dayExercise?.exercise?.id ?? def.dayExerciseId ?? "NA";
        const k = exerciseNum + "|" + exId + "|" + def.seriesNumber;
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
        // Compute trainingWeek based on matching trainingDay.weekId with selectedBlock.weeks (if possible)
        let trainingWeek = null;
        if (
          def.dayExercise?.trainingDay?.id &&
          selectedBlock &&
          selectedBlock.weeks &&
          Array.isArray(selectedBlock.weeks)
        ) {
          const trainingDayId = def.dayExercise.trainingDay.id;
          // Try to pull weekId from trainingDays array (if present)
          const td = trainingDays.find((td: any) => td.id === trainingDayId);
          const weekId = td ? td.weekId : def.trainingWeekId;
          if (weekId) {
            const weekMatch = selectedBlock.weeks.find((w: any) => w.id === weekId);
            if (weekMatch) trainingWeek = weekMatch;
          }
        }
        // Remap so the frontend gets root-level fields as before
        return {
          id: def.id,
          day: def.dayExercise?.day ?? "",
          exerciseNumber: def.dayExercise?.exerciseNumber ?? null,
          athleteNotes: def.athleteNotes ?? "",
          trainerNotes: def.trainerNotes ?? "",
          dayExerciseId: def.dayExercise?.id ?? "",
          exercise: def.dayExercise?.exercise ?? {},
          trainingDay: def.dayExercise?.trainingDay ?? {},
          trainingWeek,
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
      // ---- Ensure order: by dayNumber, exerciseNumber, seriesNumber ----
      exerciseDefs = exerciseDefs.sort((a, b) => {
        // Use dayNumber from trainingDay
        const dayA = Number(a.trainingDay?.dayNumber ?? 0);
        const dayB = Number(b.trainingDay?.dayNumber ?? 0);
        if (dayA !== dayB) return dayA - dayB;
        const exA = Number(a.exerciseNumber ?? 0);
        const exB = Number(b.exerciseNumber ?? 0);
        if (exA !== exB) return exA - exB;
        const serA = Number(a.seriesNumber ?? 0);
        const serB = Number(b.seriesNumber ?? 0);
        return serA - serB;
      });
    }

    const responseObj: any = {
      blocks: blocks.map((b: any) => ({
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
