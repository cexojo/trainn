import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest, context: any) {
  try {
    const { id: userId } = await context.params;
    const { dueDate, amount } = await req.json();

    if (
      !userId ||
      typeof dueDate !== "string" ||
      !dueDate ||
      typeof amount !== "number" ||
      isNaN(amount) ||
      amount <= 0
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        dueDate: new Date(dueDate),
        amount,
        isPayed: false
      }
    });

    return NextResponse.json({ success: true, payment });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: any) {
  try {
    const { id: paymentId } = await context.params;
    const { isPayed } = await req.json();

    if (typeof isPayed !== "boolean") {
      return NextResponse.json({ error: "Invalid isPayed value" }, { status: 400 });
    }

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { isPayed }
    });

    return NextResponse.json({ success: true, payment });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: any) {
  try {
    const { id: paymentId } = await context.params;
    await prisma.payment.delete({ where: { id: paymentId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
