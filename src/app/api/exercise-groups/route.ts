import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

export async function GET(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const groups = await prisma.exerciseGroup.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ groups });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to fetch groups." }, { status: 500 });
  }
}
