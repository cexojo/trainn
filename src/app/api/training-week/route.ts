import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "../utils/auth";

export async function PATCH(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id, weekNumber } = await req.json();
  if (!id || typeof weekNumber !== "number") {
    return NextResponse.json({ error: "Missing or invalid id or weekNumber" }, { status: 400 });
  }

  try {
    const week = await prisma.trainingWeek.update({
      where: { id },
      data: { weekNumber }
    });
    return NextResponse.json({ success: true, week });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update week", detail: String(err) }, { status: 500 });
  }
}
