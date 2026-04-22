import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  try {
    await prisma.measurement.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Edit a measurement by ID
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const data = await request.json();

  // Validate at least one modifiable field is present
  const allowedKeys = [
    "date", "weight", "neck", "arm", "waist", "abdomen", "hip", "thigh", "calfMuscle"
  ];
  const updateData: Record<string, any> = {};
  for (const key of allowedKeys) {
    if (data[key] !== undefined) {
      updateData[key] = data[key];
    }
  }

  // If "date" is present as "YYYY-MM-DD", convert to ISO string with time for Prisma
  if (updateData.date && typeof updateData.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(updateData.date)) {
    updateData.date = new Date(updateData.date + "T00:00:00.000Z").toISOString();
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No fields provided" }, { status: 400 });
  }

  try {
    const updated = await prisma.measurement.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
