import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

function getTokenPayload(req: NextRequest) {
  // Next.js API route: get token from cookies
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  // Auth
  const tokenPayload = getTokenPayload(req);

  if (!tokenPayload || tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all athletes with their payments
  const users = await prisma.user.findMany({
    where: { role: "athlete" },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
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
        }
      }
    }
  });

  return NextResponse.json(users);
}
