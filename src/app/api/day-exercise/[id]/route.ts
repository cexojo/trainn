import { NextRequest } from "next/server";
import prisma from "@/prisma/client";

// PATCH /api/day-exercise/[id]
// Body: { exerciseNumber?: number }
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  // Next.js 14: context.params may be a Promise - safely handle
  const params = await context.params;
  const id = params.id;
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing dayExercise id in path" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let data: any;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Only allow updating exerciseNumber
  if (typeof data.exerciseNumber !== "number") {
    return new Response(
      JSON.stringify({ error: "exerciseNumber (number) is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const updated = await prisma.dayExercise.update({
      where: { id },
      data: { exerciseNumber: data.exerciseNumber }
    });
    return new Response(JSON.stringify({ success: true, updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Failed to update dayExercise: " + (e?.message || e) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// DELETE /api/day-exercise/[id]
// Removes the exercise (DayExercise) and all series
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing dayExercise id in path" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    await prisma.dayExerciseSeries.deleteMany({
      where: { dayExerciseId: id } 
    });
    await prisma.dayExercise.delete({
      where: { id }
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Failed to delete dayExercise: " + (e?.message || e) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
