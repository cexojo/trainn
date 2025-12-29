import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { hidden } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { hidden },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
