import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getTokenPayload } from '@/app/api/utils/auth';

// GET: Get measurements belonging to userId, only if requester is self or admin
export async function GET(
  request: NextRequest,
  context: { params: { userId: string } } | { params: Promise<{ userId: string }> }
) {
  try {
    // Make robust to params possibly being a Promise
    let userId: string | undefined;
    if ("params" in context && typeof context.params === "object" && typeof (context.params as any).then === "function") {
      const awaited = await context.params as { userId: string };
      userId = awaited.userId;
    } else if ("params" in context) {
      userId = (context.params as any).userId;
    }
    const tokenPayload = getTokenPayload(request);
    const requestedUserId = userId;

    if (!tokenPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Allow if admin, or the user is requesting their own measurements
    if (!(tokenPayload.role === "admin" || tokenPayload.id === requestedUserId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const measurements = await prisma.measurement.findMany({
      where: { userId: requestedUserId },
      orderBy: { date: "desc" }
    });

    return NextResponse.json(measurements, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
