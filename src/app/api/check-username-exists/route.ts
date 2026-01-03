import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";

export async function GET(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);

  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json({ error: "Missing username param" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true },
  });

  return NextResponse.json({ exists: !!exists });
}
