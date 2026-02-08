import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { getTokenPayload } from "../utils/auth";

// Util to create muscle group badges (array of unique muscle group names)
function getMuscleGroupBadges(exercises: any[]): string[] {
  const groups = new Set<string>();
  exercises.forEach(ex => {
    if (ex.exercise?.exerciseGroup?.name) groups.add(ex.exercise.exerciseGroup.name);
  });
  return Array.from(groups);
}

export async function GET(req: NextRequest) {
  // Authenticate
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Personal Information
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true, firstName: true, lastName: true, username: true, email: true, sex: true,
      hidden: true, subscriptionAmount: true, subscriptionFrequency: true
    }
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Blocks info with exercises (summary per block)
  const blocks = await prisma.trainingBlock.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" }
  });

  // Build summary per block (minimal: no weeks aggregation)
  const blocksSummary = blocks.map(block => ({
    id: block.id,
    createdAt: block.createdAt,
    weeksCount: 0,
    muscleGroups: []
  }));

  // Payments
  const payments = await prisma.payment.findMany({
    where: { userId },
    orderBy: [{ dueDate: "desc" }]
  });

  // Measurements
  const measurements = await prisma.measurement.findMany({
    where: { userId },
    orderBy: [{ date: "desc" }]
  });

  return NextResponse.json({
    user,
    blocks: blocksSummary,
    payments,
    measurements
  });
}
