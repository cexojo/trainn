import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// POST /api/day-exercise/number-reorder
export async function POST(req: NextRequest) {
  try {
    const { updates } = await req.json();
    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ error: "No updates array provided." }, { status: 400 });
    }
    // Validate each update
    for (const u of updates) {
      if (!u.id || typeof u.exerciseNumber !== "number") {
        return NextResponse.json({ error: "Each update must have id and exerciseNumber." }, { status: 400 });
      }
    }
    // Run all updates in a single transaction
    await prisma.$transaction(
      updates.map(({ id, exerciseNumber }) =>
        prisma.dayExercise.update({ where: { id }, data: { exerciseNumber } })
      )
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to re-order exercises: " + (e?.message || e) }, { status: 500 });
  }
}
