import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const tokenPayload = getTokenPayload(req);

  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Get a single athlete with their payments
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      lastVisitedWeek: true,
      role: true,
      payments: {
        orderBy: { dueDate: "desc" },
        select: {
          id: true,
          dueDate: true,
          amount: true,
          isPayed: true,
        },
      },
    },
  });

  if (!user || user.role !== "athlete") {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
