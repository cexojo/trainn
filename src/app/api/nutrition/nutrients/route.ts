import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Redis } from "@upstash/redis";
import { getEnvName } from "@/utils/getEnvName";

const redis = Redis.fromEnv();
const ENV_NAME = getEnvName();
const NUTRIENTS_CACHE_KEY = `${ENV_NAME}:nutrition_nutrients_cache_v1`;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function groupBy<T, K extends string | number>(
  arr: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((groups, item) => {
    const key = getKey(item);
    (groups[key] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

type Food = {
  id: string;
  name: string;
  state: string;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  water: number | null;
  nitrogen: number | null;
  vitaminA_ui: number | null;
  vitaminB1_mcg: number | null;
  vitaminB2_mcg: number | null;
  vitaminC_mcg: number | null;
  niacin_mcg: number | null;
  sodium_mg: number | null;
  potassium_mg: number | null;
  calcium_mg: number | null;
  magnesium_mg: number | null;
  iron_mg: number | null;
  copper_mg: number | null;
  phosphorus_mg: number | null;
  sulfur_mg: number | null;
  chloride_mg: number | null;
  phenylalanine_mg: number | null;
  isoleucine_mg: number | null;
  leucine_mg: number | null;
  lysine_mg: number | null;
  methionine_mg: number | null;
  threonine_mg: number | null;
  tryptophan_mg: number | null;
  valine_mg: number | null;
  acid: number | null;
  alcal: number | null;
};

type FoodGroup = {
  id: string;
  name: string;
  foods: Food[];
};

export async function GET(_req: NextRequest) {
  // Try Redis cache first
  try {
    const cache = await redis.get(NUTRIENTS_CACHE_KEY);
    if (
      cache &&
      typeof cache === "object" &&
      "timestamp" in cache &&
      "groups" in cache &&
      Array.isArray((cache as any).groups)
    ) {
      const ts = Number((cache as any).timestamp);
      if (!Number.isNaN(ts) && Date.now() - ts < CACHE_TTL_MS) {
        return NextResponse.json({ groups: (cache as any).groups, cached: true });
      }
    }
  } catch (redisErr) {
    // Ignore redis err, fallback to DB
  }

  // Cache miss/expired: fetch all FoodGroups and Foods
  try {
    const groups: FoodGroup[] = await prisma.foodGroup.findMany({
      select: {
        id: true,
        name: true,
        foods: {
          select: {
            id: true,
            name: true,
            state: true,
            calories: true,
            protein: true,
            fat: true,
            carbohydrates: true,
            water: true,
            nitrogen: true,
            vitaminA_ui: true,
            vitaminB1_mcg: true,
            vitaminB2_mcg: true,
            vitaminC_mcg: true,
            niacin_mcg: true,
            sodium_mg: true,
            potassium_mg: true,
            calcium_mg: true,
            magnesium_mg: true,
            iron_mg: true,
            copper_mg: true,
            phosphorus_mg: true,
            sulfur_mg: true,
            chloride_mg: true,
            phenylalanine_mg: true,
            isoleucine_mg: true,
            leucine_mg: true,
            lysine_mg: true,
            methionine_mg: true,
            threonine_mg: true,
            tryptophan_mg: true,
            valine_mg: true,
            acid: true,
            alcal: true,
          },
        },
      },
      orderBy: { name: "asc" }
    });

    // Format: group components by name, under each a states[] array
    const result = groups.map((group: FoodGroup) => {
      const foods: Food[] = group.foods || [];
      const componentMap: Record<string, Food[]> = groupBy(foods, (f: Food) => f.name);
      const components = Object.entries(componentMap).map(([name, foodsArr]) => ({
        name,
        states: foodsArr.map((food: Food) => ({
          id: food.id,
          state: food.state,
          calories: food.calories,
          protein: food.protein,
          fat: food.fat,
          carbohydrates: food.carbohydrates,
          water: food.water,
          nitrogen: food.nitrogen,
          vitaminA_ui: food.vitaminA_ui,
          vitaminB1_mcg: food.vitaminB1_mcg,
          vitaminB2_mcg: food.vitaminB2_mcg,
          vitaminC_mcg: food.vitaminC_mcg,
          niacin_mcg: food.niacin_mcg,
          sodium_mg: food.sodium_mg,
          potassium_mg: food.potassium_mg,
          calcium_mg: food.calcium_mg,
          magnesium_mg: food.magnesium_mg,
          iron_mg: food.iron_mg,
          copper_mg: food.copper_mg,
          phosphorus_mg: food.phosphorus_mg,
          sulfur_mg: food.sulfur_mg,
          chloride_mg: food.chloride_mg,
          phenylalanine_mg: food.phenylalanine_mg,
          isoleucine_mg: food.isoleucine_mg,
          leucine_mg: food.leucine_mg,
          lysine_mg: food.lysine_mg,
          methionine_mg: food.methionine_mg,
          threonine_mg: food.threonine_mg,
          tryptophan_mg: food.tryptophan_mg,
          valine_mg: food.valine_mg,
          acid: food.acid,
          alcal: food.alcal
        }))
      }));
      return {
        id: group.id,
        name: group.name,
        components
      };
    });

    try {
      await redis.set(NUTRIENTS_CACHE_KEY, {
        timestamp: Date.now(),
        groups: result,
      });
    } catch (redisSetErr) {
      // Ignore redis set err, just continue
    }
    return NextResponse.json({ groups: result, cached: false });
  } catch (dbErr) {
    return NextResponse.json({ error: "Failed to fetch nutrients." }, { status: 500 });
  }
}
