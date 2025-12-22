import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const list = searchParams.get("list");
  if (list) {
    // Return all users as array of { id, name }
    const users = await prisma.user.findMany({
      select: { id: true, name: true, lastVisitedWeek: true }
    });
    return NextResponse.json(users);
  }

  const name = searchParams.get("name");
  if (!name) return NextResponse.json({ error: "No name" }, { status: 400 });

  const user = await prisma.user.findFirst({ where: { name } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    lastVisitedWeek: user.lastVisitedWeek ?? null,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, lastVisitedWeek, isocode } = body;
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(lastVisitedWeek !== undefined ? { lastVisitedWeek } : {}),
        ...(isocode !== undefined ? { isocode } : {})
      }
    });
    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      lastVisitedWeek: updated.lastVisitedWeek ?? null,
      isocode: updated.isocode ?? null,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to PATCH user", detail: String(err) }, { status: 500 });
  }
}
