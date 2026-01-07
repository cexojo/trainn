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
      exerciseNumber: series.dayExercise?.exerciseNumber,
    });
  }

  return NextResponse.json(byDay);
}
