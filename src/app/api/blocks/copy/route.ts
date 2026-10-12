import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "../../utils/auth";

export async function GET(req: NextRequest) {
  if (getTokenPayload(req)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const blockId = searchParams.get("blockId");
  if (!userId || !blockId) {
    return NextResponse.json({ error: "Missing userId or blockId" }, { status: 400 });
  }

  try {
    const block = await prisma.trainingBlock.findFirst({
      where: { id: blockId, userId },
      select: {
        weeks: {
          where: { weekNumber: 1 },
          select: {
            trainingDays: {
              orderBy: { dayNumber: "asc" },
              select: {
                dayExercises: {
                  orderBy: { exerciseNumber: "asc" },
                  select: {
                    exercise: { include: { exerciseGroup: true } },
                    trainerNotes: true,
                    series: {
                      orderBy: { seriesNumber: "asc" },
                      select: { minReps: true, maxReps: true, minRir: true, maxRir: true, isDropset: true, trainerNotes: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return block?.weeks[0]
      ? NextResponse.json({ days: block.weeks[0].trainingDays })
      : NextResponse.json({ error: "Block not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Failed to load block" }, { status: 500 });
  }
}
