import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

export async function GET(req: NextRequest) {
  // Auth
  const tokenPayload = getTokenPayload(req);

  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all athletes with their payments
  const users = await prisma.user.findMany({
    where: { role: "athlete" },
    orderBy: [
      { firstName: "asc" },
      { lastName: "asc" }
    ],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      lastVisitedWeek: true,
      lastOKLogin: true,
      role: true,
      payments: {
        orderBy: { dueDate: "desc" },
        select: {
          id: true,
          dueDate: true,
          amount: true,
          isPayed: true,
        }
      },
      hidden: true,
      hidingDate: true,
      password: true,
      subscriptionFrequency: true,
      subscriptionAmount: true,
      sex: true
    }
  });

  // Optimize: Fetch all latest blocks with weeks/dayExerciseSeries in one go
  const userIds = users.map(u => u.id);

  const blocks = await prisma.trainingBlock.findMany({
    where: { userId: { in: userIds } },
    select: {
      id: true,
      userId: true,
      blockNumber: true,
      weeks: {
        orderBy: { weekNumber: 'desc' },
        take: 1,
        select: {
          id: true,
          weekNumber: true,
          dayExerciseSeries: {
            where: {
              OR: [
                { effectiveRir: { not: null } },
                { effectiveWeight: { not: null } },
                { effectiveReps: { not: null } },
              ],
            },
            select: {
              id: true,
              effectiveRir: true,
              effectiveWeight: true,
              effectiveReps: true,
            },
          },
        },
      },
    },
    orderBy: [{ userId: "asc" }, { blockNumber: "desc" }],
  });

  // Group blocks by userId and pick highest blockNumber per user
  const latestBlockByUser: Record<string, any> = {};
  for (const b of blocks) {
    // Only keep the block with highest blockNumber for each user
    if (
      !latestBlockByUser[b.userId] ||
      b.blockNumber > latestBlockByUser[b.userId].blockNumber
    ) {
      latestBlockByUser[b.userId] = b;
    }
  }

  // Compute noPlan per user from the block data; avoid extra queries
  const usersWithNoPlan = users.map(u => {
    const lastBlock = latestBlockByUser[u.id];
    let noPlan = false;
    if (!lastBlock) {
      noPlan = true;
    } else if (!lastBlock.weeks || lastBlock.weeks.length === 0) {
      noPlan = true;
    } else {
      const lastWeek = lastBlock.weeks[0];
      if (!lastWeek || !lastWeek.dayExerciseSeries || lastWeek.dayExerciseSeries.length === 0) {
        noPlan = true;
      } else {
        noPlan = false;
      }
    }
    // Determine if user has a password without returning the hash
    const { password, ...userNoPassword } = u;
    const hasPassword = Boolean(password && password.length > 0);
    return { ...userNoPassword, noPlan, hasPassword };
  });

  return NextResponse.json(usersWithNoPlan);
}
