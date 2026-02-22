import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getTokenPayload } from "@/app/api/utils/auth";
import * as Sentry from "@sentry/nextjs";

type MeasurementWindow = {
  measurement: "d" | "w" | "m";
  units: number;
};

function subtractUnitsFromDate(date: Date, measurement: "d" | "w" | "m", units: number): Date {
  const d = new Date(date);
  if (measurement === "d") d.setDate(d.getDate() - units);
  else if (measurement === "w") d.setDate(d.getDate() - (units * 7));
  else if (measurement === "m") d.setMonth(d.getMonth() - units);
  return d;
}

export async function POST(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: MeasurementWindow;
  try {
    body = await req.json();
    if (
      !body ||
      typeof body.measurement !== "string" ||
      typeof body.units !== "number" ||
      !["d", "w", "m"].includes(body.measurement) ||
      body.units < 0
    ) {
      throw new Error("Invalid input");
    }
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const now = new Date();
  const earliestAllowedDate = subtractUnitsFromDate(now, body.measurement, body.units);

  // 1. Query max activity date for each athlete, join User info, and apply time window in SQL.
  // Prisma cannot groupBy across nested relations easily, so use a raw query for this use case.

  // This query:
  // - For each user with role 'athlete' and hidden = false, finds the maximum TrainingDay.date of all their blocks/weeks/days.
  // - Includes only those whose max activity is >= earliestAllowedDate.
  // - Orders: most inactive (longest since last activity) first.
  // - Returns id, firstName, lastName, email, lastActivityDate, daysSinceLastActivity.

  try {
    // This query introduces a HAVING to apply the time window after GROUP BY
    const results = await prisma.$queryRawUnsafe<
      Array<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        lastActivityDate: string | null;
        daysSinceLastActivity: number | null;
      }>
    >(
      `
      SELECT
        u.id,
        u.firstName,
        u.lastName,
        u.email,
        MAX(des.modifiedAt) as lastActivityDate,
        IFNULL(
          CASE
            WHEN CAST((JULIANDAY('now') - JULIANDAY(MAX(des.modifiedAt))) AS INTEGER) < 0 THEN 0
            ELSE CAST((JULIANDAY('now') - JULIANDAY(MAX(des.modifiedAt))) AS INTEGER)
          END,
          NULL
        ) AS daysSinceLastActivity
      FROM User u
      LEFT JOIN TrainingBlock b ON b.userId = u.id
      LEFT JOIN TrainingWeek tw ON tw.blockId = b.id
      LEFT JOIN TrainingDay td ON td.weekId = tw.id
      LEFT JOIN DayExercise de ON de.trainingDayId = td.id
      LEFT JOIN DayExerciseSeries des ON des.dayExerciseId = de.id
      WHERE 
        u.role = 'athlete' 
        AND u.hidden = 0
      GROUP BY u.id
      HAVING MAX(des.modifiedAt) IS NULL OR MAX(des.modifiedAt) <= ?
      ORDER BY (MAX(des.modifiedAt) IS NOT NULL) ASC
      `,
      earliestAllowedDate.toISOString()
    );

    // Map/format results if needed
    return NextResponse.json(results);
  } catch (err: any) {
    Sentry.logger.error("Follow-up active athletes endpoint failed", {
      error: String(err),
      cause: err?.cause ? String(err.cause) : undefined,
      stack: err?.stack,
    });
    return NextResponse.json({ error: "Internal server error", detail: String(err) }, { status: 500 });
  }
}
