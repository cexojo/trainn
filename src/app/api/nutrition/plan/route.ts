import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

import { getTokenPayload } from "@/app/api/utils/auth";

export async function GET(req: NextRequest) {
  // /api/nutrition/plan?athleteId=xxx&active=true
  const { searchParams } = new URL(req.url ?? "", "http://localhost");
  const athleteId = searchParams.get("athleteId");
  const active = searchParams.get("active");

  if (!athleteId) {
    return NextResponse.json({ error: "athleteId is required" }, { status: 400 });
  }

  const user = getTokenPayload(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "admin" && user.id !== athleteId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const plans = await prisma.nutritionPlan.findMany({
    where: {
      userId: athleteId,
      ...(active ? { active: true } : {}),
    },
    include: {
      days: {
        include: {
          meals: {
            include: {
              mealOptions: {
                include: {
                  foods: true
                }
              }
            }
          }
        }
      }
    }
  });

  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  try {
    const plan = await req.json();

    // Expecting payload: athleteId, title/name, description, nutrientRestrictions, templateMeals, weeklyMeals
    const {
      athleteId,
      title,
      description,
      weeklyMeals // Array of [days][meals][options][foods]
    } = plan;

    if (!athleteId || !title || !Array.isArray(weeklyMeals) || weeklyMeals.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Transaction: archive old plans, create new active plan
    const [archived, createdPlan] = await prisma.$transaction([
      prisma.nutritionPlan.updateMany({
        where: { userId: athleteId, active: true },
        data: { active: false }
      }),
      prisma.nutritionPlan.create({
        data: {
          userId: athleteId,
          name: title,
          description: description,
          active: true,
          // Store days via create
          days: {
            create: weeklyMeals.map((mealsForDay: any[], dayIdx: number) => ({
              dayNumber: dayIdx,
              meals: {
                create: mealsForDay.map((meal: any, mealIdx: number) => ({
                  mealIndex: mealIdx,
                  name: meal.name,
                  description: meal.description,
                  mealOptions: {
                    create: meal.options.map((option: any, optIdx: number) => ({
                      optionIndex: optIdx,
                      name: option.optionName,
                      description: option.description,
                      foods: {
                        create: option.foods.map((food: any) => ({
                          foodId: food.foodId,
                          quantity: food.quantity
                        })),
                      },
                    })),
                  },
                })),
              },
            })),
          },
        },
        include: {
          days: {
            include: {
              meals: {
                include: {
                  mealOptions: {
                    include: {
                      foods: true
                    }
                  }
                }
              }
            }
          }
        }
      })
    ]);

    return NextResponse.json({ success: true, id: createdPlan.id });
  } catch (error) {
    console.error("NutritionPlan create error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error) || "Failed to save nutrition plan",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
