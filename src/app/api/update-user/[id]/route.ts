import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reqBody = await req.json();

  // Prepare data object for update, only set non-undefined values
  const allowedFields = ["firstName", "lastName", "username", "email", "hidden", "hidingDate", "subscriptionAmount", "subscriptionFrequency", "sex", "isocode"];
  const data: Record<string, any> = {};
  for (const field of allowedFields) {
    if (typeof reqBody[field] !== "undefined") {
      if (field === "sex") {
        if (reqBody[field] === "MALE" || reqBody[field] === "FEMALE") {
          data[field] = reqBody[field];
        }
      } else {
        data[field] = reqBody[field];
      }
    }
  }

  // If email is being updated, check for existing user with this email
  if (typeof data.email === "string") {
    const existing = await prisma.user.findFirst({
      where: {
        email: data.email,
        id: { not: id }
      },
      select: { id: true }
    });
    if (existing) {
      return NextResponse.json({ error: "email_taken" }, { status: 409 });
    }
  }
  // If username is being updated, check for existing user with this username
  if (typeof data.username === "string") {
    const existing = await prisma.user.findFirst({
      where: {
        username: data.username,
        id: { not: id }
      },
      select: { id: true }
    });
    if (existing) {
      return NextResponse.json({ error: "username_taken" }, { status: 409 });
    }
  }

  try {
    await prisma.user.update({
      where: { id },
      data,
    });
    // 204 No Content
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
