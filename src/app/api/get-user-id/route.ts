import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");
  if (!name) return NextResponse.json({ error: "No name" }, { status: 400 });

  const user = await prisma.user.findFirst({ where: { name } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ id: user.id, name: user.name });
}
