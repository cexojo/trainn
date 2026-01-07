import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

// PATCH /api/day-exercise-series/[id]
// Body: any subset of DayExerciseSeries fields
export async function PATCH(req: NextRequest, ctx: any) {
  // AUTH CHECK (admin or athlete allowed)
  const payload = getTokenPayload(req);
  if (!payload || (payload.role !== "admin" && payload.role !== "athlete")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = await ctx.params;
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Missing series ID" }, { status: 400 });
  }

  let data: any = {};
  try {
    data = await req.json();
  } catch {
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
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  try {
    const updated = await prisma.dayExerciseSeries.update({
      where: { id },
      data: updateData,
    });
    return new Response(null, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update series", detail: String(err), id, requestBody: data, updateData }, { status: 500 });
  }
}
