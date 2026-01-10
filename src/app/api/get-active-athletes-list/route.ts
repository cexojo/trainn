import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

// GET /api/get-active-athletes-list
// Returns all non-hidden athletes (id, firstName, lastName, email)
export async function GET(req: NextRequest) {
  // Auth: only allow admins
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find all non-hidden athletes, returning required fields
  const athletes = await prisma.user.findMany({
    where: {
      role: "athlete",
      hidden: { not: true }
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true
    },
    orderBy: [{ firstName: "asc" }, { lastName: "asc" }]
  });

  return NextResponse.json(athletes);
}
