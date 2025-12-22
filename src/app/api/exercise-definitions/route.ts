import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  let userWhere = {};
  if (userId && !isNaN(Number(userId))) {
    userWhere = { userId: Number(userId) };
  } else {
    // fallback to demo user "John Doe"
    const demo = await prisma.user.findFirst({ where: { name: "John Doe" } });
    if (!demo) return NextResponse.json({}, { status: 404 });
    userWhere = { userId: demo.id };
  }
  
  // Group by day and exercise for the user, sorted for easy rendering
  const definitions = await prisma.exerciseDefinition.findMany({
    where: userWhere,
    include: { exercise: true, user: true },
    orderBy: [{ day: "asc" }, { exerciseId: "asc" }, { seriesNumber: "asc" }],
  });

  // Create a grouped structure { day: [{def...}, ...] }
  const byDay: Record<string, any[]> = {};
  for (const def of definitions) {
    if (!byDay[def.day]) byDay[def.day] = [];
    byDay[def.day].push(def);
  }

  return NextResponse.json(byDay);
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  // expects: { id, field, value }
  const { id, field, value } = data;
  if (
    !id ||
    !["effectiveReps", "effectiveWeight", "effectiveRir"].includes(field)
  ) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Convert value to number (if possible) or null
  let parsed: number | null = null;
  if (value !== "" && value !== null && value !== undefined) {
    parsed = Number(value);
    if (isNaN(parsed)) parsed = null;
    // Optional: further clamp by field type
    if (field === "effectiveReps" || field === "effectiveRir") {
      parsed = parsed !== null ? Math.max(0, Math.floor(parsed)) : null;
    }
    if (field === "effectiveWeight" && parsed !== null) {
      parsed = Math.round(parsed * 10) / 10;
    }
  }

  const update = await prisma.exerciseDefinition.update({
    where: { id },
    data: { [field]: parsed },
  });
  return NextResponse.json(update);
}
