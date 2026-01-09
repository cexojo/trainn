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

  // Compute noPlan flag for each athlete: minimal block/week/exercise fetch (hybrid approach)
  const usersWithNoPlan = await Promise.all(users.map(async (u: typeof users[number]) => {
    // 1. Find the last block (highest blockNumber)
    const lastBlock = await prisma.trainingBlock.findFirst({
      where: { userId: u.id },
      orderBy: { blockNumber: "desc" },
      select: {
        id: true,
        blockNumber: true,
        weeks: {
          orderBy: { weekNumber: "desc" },
          take: 1,
          select: {
            id: true,
            weekNumber: true,
            dayExerciseSeries: {
              where: {
                OR: [
                  { effectiveRir: { not: null } },
                  { effectiveWeight: { not: null } },
                  { effectiveReps: { not: null } }
                ]
              },
              select: {
                id: true,
                effectiveRir: true,
                effectiveWeight: true,
                effectiveReps: true,
              }
            }
          }
        }
      }
    });

    let noPlan = false;
    if (!lastBlock) {
      // No block at all
      noPlan = true;
    } else if (!lastBlock.weeks || lastBlock.weeks.length === 0) {
      // Last block has no weeks
      noPlan = true;
    } else {
      // Get last week (highest weekNumber)
      const lastWeek = lastBlock.weeks[0];
      if (!lastWeek || !lastWeek.dayExerciseSeries || lastWeek.dayExerciseSeries.length === 0) {
        // No series (inputs) in last week
        noPlan = true;
      } else {
        // There is at least one relevant input in dayExerciseSeries (filtered in query)
        noPlan = false;
      }
    }
    // Determine if user has a password without returning the hash
    const { password, ...userNoPassword } = u;
    const hasPassword = Boolean(password && password.length > 0);
    return { ...userNoPassword, noPlan, hasPassword };
  }));

  return NextResponse.json(usersWithNoPlan);
}
