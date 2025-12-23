import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const list = searchParams.get("list");

  if (list) {
    // Return all users as array of { id, name, lastVisitedWeek }
    const users = await prisma.user.findMany({
      select: { id: true, name: true, lastVisitedWeek: true }
    });
    return NextResponse.json(users);
  }

  const name = searchParams.get("name");
  if (!name)
    return NextResponse.json({ error: "No name" }, { status: 400 });

  const user = await prisma.user.findFirst({
    where: { name }
  });

  if (!user)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    lastVisitedWeek: user.lastVisitedWeek ?? null,
    isocode: (user as any).isocode ?? null, // Defensive for possible extra fields
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, lastVisitedWeek, isocode } = body;

    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    // Build update data dynamically
    const data: any = {};
    if (lastVisitedWeek !== undefined)
      data.lastVisitedWeek = lastVisitedWeek;
    if (isocode !== undefined)
      data.isocode = isocode;

    if (Object.keys(data).length === 0)
      return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });

    await prisma.user.update({
      where: { id: userId },
      data,
    });

    // Return updated user
    const updated = await prisma.user.findFirst({ where: { id: userId } });
    if (!updated) {
      return NextResponse.json({ error: "User not found after update" }, { status: 500 });
    }
    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      lastVisitedWeek: updated.lastVisitedWeek ?? null,
      isocode: (updated as any).isocode ?? null,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to PATCH user", detail: String(err) }, { status: 500 });
  }
}
