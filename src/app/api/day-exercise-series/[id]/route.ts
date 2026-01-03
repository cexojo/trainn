import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

// PATCH /api/day-exercise-series/[id]
// Body: any subset of DayExerciseSeries fields
export async function PATCH(req: NextRequest, ctx: any) {
  // ADMIN AUTH CHECK
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
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

  // Only allow patching fields defined in the model
  const allowedFields = [
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
      if (numberFields.includes(key) && data[key] !== null && data[key] !== "") {
        // Convert to number if not already
        const num = Number(data[key]);
        updateData[key] = isNaN(num) ? null : num;
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
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update series", detail: String(err), id, requestBody: data, updateData }, { status: 500 });
  }
}
