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

    // Transactional, efficient, all-uuids-pre-generated approach
    const { v4: uuidv4 } = require('uuid');
    const createdPlan = await prisma.$transaction(async (tx) => {
      // 1. Archive active plans
      await tx.nutritionPlan.updateMany({
        where: { userId: athleteId, active: true },
        data: { active: false }
      });

      // 2. Create nutrition plan
      const planId = uuidv4();
      await tx.nutritionPlan.create({
        data: {
          id: planId,
          userId: athleteId,
          name: title,
          description: description,
          active: true
        }
      });

      // 3. Prepare days
      const daysData = weeklyMeals.map((mealsForDay: any, dayIdx: number) => ({
        id: uuidv4(),
        nutritionPlanId: planId,
        dayNumber: dayIdx
      }));
      await tx.nutritionPlanDay.createMany({ data: daysData });

      // Index for day mapping
      const dayIdByIdx = daysData.map(d => d.id);

      // 4. Prepare meals
      const mealsData: any[] = [];
      weeklyMeals.forEach((mealsForDay: any[], dayIdx: number) => {
        const dayId = dayIdByIdx[dayIdx];
        mealsForDay.forEach((meal: any, mealIdx: number) => {
          mealsData.push({
            id: uuidv4(),
            nutritionPlanDayId: dayId,
            mealIndex: mealIdx,
            name: meal.name,
            description: meal.description || ""
          });
        });
      });
      await tx.nutritionPlanMeal.createMany({ data: mealsData });

      // Index for meal mapping
      let mealGlobalIdx = 0;
      const mealIdList = mealsData.map(m => m.id);

      // 5. Prepare options
      const optionsData: any[] = [];
      weeklyMeals.forEach((mealsForDay: any[], dayIdx: number) => {
        mealsForDay.forEach((meal: any, mealIdx: number) => {
          const mealId = mealIdList[mealGlobalIdx];
          meal.options.forEach((option: any, optIdx: number) => {
            optionsData.push({
              id: uuidv4(),
              nutritionPlanMealId: mealId,
              optionIndex: optIdx,
              name: option.optionName,
              description: option.description || ""
            });
          });
          mealGlobalIdx++;
        });
      });
      await tx.nutritionPlanMealOption.createMany({ data: optionsData });

      // Prepare mapping to produce option->id
      let optGlobalIdx = 0;
      const optionIdList = optionsData.map(o => o.id);

      // 6. Prepare foods
      const foodsData: any[] = [];
      weeklyMeals.forEach((mealsForDay: any[]) => {
        mealsForDay.forEach((meal: any) => {
          meal.options.forEach((option: any) => {
            const optionId = optionIdList[optGlobalIdx];
            (option.foods || []).forEach((food: any) => {
              foodsData.push({
                id: uuidv4(),
                nutritionPlanMealOptionId: optionId,
                foodId: food.foodId,
                quantity: food.quantity
              });
            });
            optGlobalIdx++;
          });
        });
      });
      if (foodsData.length > 0) {
        await tx.nutritionPlanMealOptionFood.createMany({ data: foodsData });
      }

      // Return created plan id
      return { id: planId };
    });

    return NextResponse.json({ success: true, id: createdPlan.id });
  } catch (error) {
    console.error("NutritionPlan create error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error) || "Failed to save nutrition plan",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
