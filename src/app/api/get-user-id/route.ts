import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

function getTokenPayload(req: NextRequest) {
  // Next.js API route: get token from dedicated cookie
  const token = req.cookies.get("elena_auth_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const list = searchParams.get("list");
  const userIdQuery = searchParams.get("userId");

  // Require authentication for all operations
  const tokenPayload = getTokenPayload(req);

  if (!tokenPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If admin and wants all users
  if (list && tokenPayload.role === "admin") {
    // Return all users as array of { id, name, username, lastVisitedWeek, role }
    const users = await prisma.user.findMany({
      select: { id: true, name: true, username: true, email: true, lastVisitedWeek: true, role: true }
    });
    return NextResponse.json(users);
  }

  // All other cases: return info for the authenticated user (by username from token)
  // Or if "username" param matches your own username, allow it, otherwise 403
  let qUserId = tokenPayload.id;
  // If an explicit userId param is given (for admin view)
  if (userIdQuery && userIdQuery !== String(tokenPayload.id) && tokenPayload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (userIdQuery && tokenPayload.role === "admin") {
    qUserId = userIdQuery;
  }
  if (!qUserId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findFirst({
    where: { id: qUserId }
  });

  if (!user)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    username: user.username,
    lastVisitedWeek: user.lastVisitedWeek ?? null,
    isocode: (user as any).isocode ?? null,
    role: user.role
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
