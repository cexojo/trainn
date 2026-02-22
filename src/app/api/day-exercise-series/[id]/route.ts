import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";
import * as Sentry from "@sentry/nextjs";

function buildSentryDayExerciseSeriesMsg({
  data,
  payload,
  params,
  outcome,
  error,
}: {
  data?: any;
  payload?: any;
  params?: any;
  outcome?: string;
  error?: any;
}) {
  const user =
    (data?.username ??
      payload?.username ??
      payload?.user ??
      payload?.email ??
      payload?.sub ??
      "(unknown)");
  const block = data?.blockNumber ?? "";
  const week = data?.weekNumber ?? "";
  const day = data?.dayNumber ?? "";
  const exercise = data?.exerciseName ?? "";
  const series = data?.seriesNumber ?? "";

  let changedFields: string[] = [];
  let changedValues: string[] = [];

  for (const k of [
    "effectiveWeight",
    "effectiveReps",
    "effectiveRir",
    "athleteNotes",
    "trainerNotes",
  ]) {
    if (data && data[k] !== undefined) {
      changedFields.push(k);
      changedValues.push(String(data[k]));
    }
  }
  let settingString = "";
  if (changedFields.length) {
    settingString = changedFields
      .map((k, i) => `${k} to ${changedValues[i]}`)
      .join(", ");
  } else {
    settingString = "no tracked fields";
  }

  let msg =
    `Set training values. User: ${user}, block: ${block}, week: ${week}, day: ${day}, exercise: ${exercise}, series: ${series}, setting ${settingString}`;

  if (outcome) {
    msg += ` ${outcome}`;
  }
  if (error) {
    msg += `: ${error}`;
  }
  if (params && outcome && (outcome.includes("unauthorized") || outcome.includes("missing series ID"))) {
    msg += `, params=${JSON.stringify(params)}`;
  }
  return msg;
}

// PATCH /api/day-exercise-series/[id]
// Body: any subset of DayExerciseSeries fields
export async function PATCH(req: NextRequest, ctx: any) {
  // AUTH CHECK (admin or athlete allowed)
  const payload = getTokenPayload(req);
  if (!payload || (payload.role !== "admin" && payload.role !== "athlete")) {
    Sentry.logger.info(
      buildSentryDayExerciseSeriesMsg({
        payload,
        outcome: "unauthorized",
      })
    );
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = await ctx.params;
  const id = params.id;
  if (!id) {
    Sentry.logger.info(
      buildSentryDayExerciseSeriesMsg({
        payload,
        params,
        outcome: "missing series ID",
      })
    );
    return NextResponse.json({ error: "Missing series ID" }, { status: 400 });
  }

  let data: any = {};
  try {
    data = await req.json();
  } catch {
    Sentry.logger.info(
      buildSentryDayExerciseSeriesMsg({
        payload,
        params: { ...params, id },
        outcome: "invalid JSON body",
      })
    );
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Role-based allowed fields
  let allowedFields: string[] = [];
  if (payload.role === "admin") {
    allowedFields = [
      "seriesNumber",
      "minReps",
      "maxReps",
      "minRir",
      "maxRir",
      "effectiveReps",
      "effectiveWeight",
      "effectiveRir",
      "isDropset",
      "athleteNotes",
      "trainerNotes",
    ];
  } else {
    // athlete: can only update results and athlete notes
    allowedFields = [
      "effectiveReps",
      "effectiveWeight",
      "effectiveRir",
      "athleteNotes",
    ];
  }

  // Keys in the model that should be coerced to number
  const numberFields = [
    "seriesNumber",
    "minReps",
    "maxReps",
    "minRir",
    "maxRir",
    "effectiveReps",
    "effectiveWeight",
    "effectiveRir",
  ];

  const updateData: any = {};
  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      if (numberFields.includes(key)) {
        // Validation for effective fields: must be ""/null, or 0 to 999
        const isEffectiveField = (
          key === "effectiveReps" ||
          key === "effectiveWeight" ||
          key === "effectiveRir"
        );
        if (data[key] === "" || data[key] === null) {
          updateData[key] = null;
        } else {
          const num = Number(data[key]);
          if (isEffectiveField) {
            if (
              typeof data[key] === "string" && data[key].trim() === ""
            ) {
              updateData[key] = null;
            } else if (
              !isFinite(num) ||
              num < 0 ||
              num > 999 ||
              isNaN(num)
            ) {
              Sentry.logger.error(
                buildSentryDayExerciseSeriesMsg({
                  data,
                  payload,
                  params,
                  outcome: `failed: out_of_range_value for ${key} to ${data[key]}`,
                })
              );
              return NextResponse.json(
                { error: "out_of_range_value" },
                { status: 400 }
              );
            } else {
              updateData[key] = num;
            }
          } else {
            updateData[key] = isNaN(num) ? null : num;
          }
        }
      } else {
        updateData[key] = data[key];
      }
    }
  }

  if (Object.keys(updateData).length === 0) {
    Sentry.logger.info(
      buildSentryDayExerciseSeriesMsg({
        data,
        payload,
        params,
        outcome: `attempted PATCH day-exercise-series, but no valid fields provided. updateData=${JSON.stringify(
          updateData
        )}, data=${JSON.stringify(data)}`,
      })
    );
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  // Always update modifiedAt
  updateData.modifiedAt = new Date();

  const updated = await prisma.dayExerciseSeries.update({
    where: { id },
    data: updateData,
  });

  Sentry.logger.info(
    buildSentryDayExerciseSeriesMsg({
      data,
      payload,
      params,
      outcome: "successfully",
    })
  );

  return new Response(null, { status: 200 });
}
