import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

export async function GET(req: NextRequest) {
  // Auth: only allow admins
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find all non-hidden athletes, returning only id and name
  const athletes = await prisma.user.findMany({
    where: {
      role: "athlete",
      hidden: { not: true }
    },
    select: {
      id: true,
      name: true
    },
    orderBy: { name: "asc" }
  });

  return NextResponse.json(athletes);
}
