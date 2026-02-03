import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getTokenPayload } from '@/app/api/utils/auth';

// POST: Create a new Measurement
export async function POST(request: NextRequest) {
  try {
    const {
      date,
      weight,
      neck,
      arm,
      waist,
      abdomen,
      hip,
      thigh,
      calfMuscle,
    } = await request.json();

    if (!date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get userId from JWT, not from client body!
    const tokenPayload = getTokenPayload(request);
    if (!tokenPayload?.id) {
      return NextResponse.json({ error: 'No user id (not logged in)' }, { status: 401 });
    }
    const data = {
      userId: tokenPayload.id,
      date: new Date(date),
      ...(weight !== undefined && { weight }),
      ...(neck !== undefined && { neck }),
      ...(arm !== undefined && { arm }),
      ...(waist !== undefined && { waist }),
      ...(abdomen !== undefined && { abdomen }),
      ...(hip !== undefined && { hip }),
      ...(thigh !== undefined && { thigh }),
      ...(calfMuscle !== undefined && { calfMuscle }),
    };

    const measurement = await prisma.measurement.create({
      data: data as Parameters<typeof prisma.measurement.create>[0]['data'],
    });

    return NextResponse.json(measurement, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// PATCH: Update any attribute(s) of a Measurement (by id, expects id+fields in JSON body)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing measurement id' }, { status: 400 });
    }

    // Only allow updating valid fields
    const allowedFields = [
      'date',
      'weight',
      'neck',
      'arm',
      'waist',
      'abdomen',
      'hip',
      'thigh',
      'calfMuscle',
    ];
    const updateData: any = {};

    for (const key of allowedFields) {
      if (key in rest) {
        updateData[key] = key === 'date' ? new Date(rest[key]) : rest[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const measurement = await prisma.measurement.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(measurement, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

 
 // GET: Return current user's measurements (athlete) or all (admin)
export async function GET(request: NextRequest) {
  try {
    const tokenPayload = getTokenPayload(request);
    if (!tokenPayload?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const isAdmin = tokenPayload.role === "admin";
    const where = isAdmin ? {} : { userId: tokenPayload.id };
    const measurements = await prisma.measurement.findMany({
      where,
      orderBy: { date: "desc" },
    });
    return NextResponse.json(measurements, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE: Remove a Measurement by id (expects id in JSON body)
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing measurement id' }, { status: 400 });
    }

    await prisma.measurement.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
