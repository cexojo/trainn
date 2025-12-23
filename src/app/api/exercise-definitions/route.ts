import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  if (searchParams.get("distinct")) {
    // Return all unique exercises for selection
    const exercises = await prisma.exercise.findMany({
      select: { id: true, name: true, group: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(exercises);
  }

  let userId = searchParams.get("userId");

  if (!userId) {
    // fallback to demo user "John Doe"
    const demo = await prisma.user.findFirst({ where: { name: "John Doe" } });
    if (!demo) return NextResponse.json({}, { status: 404 });
    userId = demo.id;
  }

  // Find all day exercise series for the user, expanding links
  const seriesList = await prisma.dayExerciseSeries.findMany({
    
    include: {
      dayExercise: {
        include: {
          exercise: true,
          trainingDay: true,
        },
      },
    },
    orderBy: [
      { dayExercise: { day: "asc" } },
      { dayExercise: { exerciseId: "asc" } },
      { seriesNumber: "asc" },
    ],
  });

  // Only return series belonging to this user (filter in-memory)
  const filteredList = (seriesList as any[]).filter(series =>
    series?.dayExercise?.trainingDay?.trainingWeek?.trainingBlock?.userId === userId
  );

  // Group by day string for frontend compatibility
  const byDay: Record<string, any[]> = {};
  for (const series of filteredList) {
    const day = series.dayExercise?.day || "Day ?";
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push({
      ...series,
      notes: series.dayExercise?.notes ?? "",
      exercise: series.dayExercise?.exercise,
      trainingDay: series.dayExercise?.trainingDay,
      dayNumber: series.dayExercise?.dayNumber,
    });
  }

  return NextResponse.json(byDay);
}

// PATCH effective fields in DayExerciseSeries or notes in DayExercise
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  // expects: { id, field, value, dayExerciseId (optional for notes) }
  const { id, field, value, dayExerciseId } = data;

  if (field === "notes") {
    // Notes editing is not supported on DayExercise in this schema.
    return NextResponse.json({ error: "Notes editing not supported." }, { status: 400 });
  }

  // Only allow series fields to update on series
  if (
    !id ||
    !["effectiveReps", "effectiveWeight", "effectiveRir"].includes(field)
  ) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Convert value to number (if possible) or null
  let parsed: number | null = null;
  if (value === "" || value === null || value === undefined) {
    parsed = null;
  } else {
    parsed = Number(value);
    if (isNaN(parsed)) parsed = null;
    if (field === "effectiveReps" || field === "effectiveRir") {
      parsed = parsed !== null ? Math.max(0, Math.floor(parsed)) : null;
    }
    if (field === "effectiveWeight" && parsed !== null) {
      parsed = Math.round(parsed * 10) / 10;
    }
  }

  const update = await prisma.dayExerciseSeries.update({
    where: { id },
    data: { [field]: parsed },
  });
  return NextResponse.json(update);
}
