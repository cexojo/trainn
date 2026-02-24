import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getTokenPayload } from "@/app/api/utils/auth";
import * as Sentry from "@sentry/nextjs";

/**
 * Request body:
 * { threshold: number (0-100, inclusive, required) }
 *
 * Returns:
 * [
 *   { id, firstName, lastName, email, blockNumber, completionPercent: number }
 * ]
 */
export async function POST(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let threshold: number;
  try {
    const body = await req.json();
    threshold = Number(body.threshold);
    if (isNaN(threshold) || threshold < 0 || threshold > 100) {
      throw new Error("Invalid threshold value");
    }
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body/threshold" }, { status: 400 });
  }

  try {
    // 1. For each athlete, find the last block (by largest blockNumber)
    // 2. For that block, count DayExerciseSeries with both weight+reps filled and total count
    // 3. Compute completion percentage

    // Single query to avoid N+1: get all athletes' latest block and compute total/completed counts
    const rows = await prisma.$queryRawUnsafe<
      Array<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        blockNumber: number;
        blockCreatedAt: string;
        completionPercent: number;
      }>
    >(
      `
      SELECT
        u.id,
        u.firstName,
        u.lastName,
        u.email,
        b.blockNumber,
        b.createdAt AS blockCreatedAt,
        ROUND(
          CASE
            WHEN COUNT(des.id) = 0 THEN 0
            ELSE (SUM(CASE WHEN des.effectiveWeight IS NOT NULL AND des.effectiveReps IS NOT NULL THEN 1 ELSE 0 END) * 100.0) / COUNT(des.id)
          END
        , 0) AS completionPercent
      FROM User u
      INNER JOIN TrainingBlock b ON b.userId = u.id AND b.blockNumber = (
        SELECT MAX(b2.blockNumber)
        FROM TrainingBlock b2
        WHERE b2.userId = u.id
      )
      LEFT JOIN TrainingWeek tw ON tw.blockId = b.id
      LEFT JOIN TrainingDay td ON td.weekId = tw.id
      LEFT JOIN DayExercise de ON de.trainingDayId = td.id
      LEFT JOIN DayExerciseSeries des ON des.dayExerciseId = de.id
      WHERE u.role = 'athlete' AND u.hidden = 0 AND u.ownerId = ?
      GROUP BY u.id, u.firstName, u.lastName, u.email, b.blockNumber
      HAVING COUNT(des.id) > 0 AND
        ROUND(
          CASE
            WHEN COUNT(des.id) = 0 THEN 0
            ELSE (SUM(CASE WHEN des.effectiveWeight IS NOT NULL AND des.effectiveReps IS NOT NULL THEN 1 ELSE 0 END) * 100.0) / COUNT(des.id)
          END
        , 0) >= ?
      `,
      tokenPayload.id,
      threshold
    );

    const result = rows
      .sort((a, b) => a.completionPercent - b.completionPercent || b.blockNumber - a.blockNumber);

    return NextResponse.json(result);
  } catch (err: any) {
    Sentry.logger.error("Follow-up block completion endpoint failed", {
      error: String(err),
      cause: err?.cause ? String(err.cause) : undefined,
      stack: err?.stack,
    });
    return NextResponse.json({ error: "Internal server error", detail: String(err) }, { status: 500 });
  }
}
