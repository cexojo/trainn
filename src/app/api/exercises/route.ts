import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";
import { APIError } from "@/utils/errors";
import { Redis } from "@upstash/redis";
import { getEnvName } from "@/utils/getEnvName";

const redis = Redis.fromEnv();
const ENV_NAME = getEnvName();
const EXERCISES_CACHE_KEY = `${ENV_NAME}:exercises_list_cache_v1`;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export async function GET(req: NextRequest) {
  const tokenPayload = getTokenPayload(req);
  if (!tokenPayload || tokenPayload.role !== "admin") {
    new APIError("Unauthorized GET /api/exercises", { reason: "Missing or non-admin tokenPayload" });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = tokenPayload;
  if (!payload || payload.role !== "admin") {
    new APIError("Forbidden GET /api/exercises", { reason: "Missing or non-admin payload" });
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Try Redis cache first
  try {
    const cache = await redis.get(EXERCISES_CACHE_KEY);
    if (cache && typeof cache === "object" && "timestamp" in cache && "exercises" in cache) {
      const ts = Number(cache.timestamp);
      if (!Number.isNaN(ts) && Date.now() - ts < CACHE_TTL_MS && Array.isArray(cache.exercises)) {
        // Fresh cache (<24h)
        return NextResponse.json({ exercises: cache.exercises, cached: true });
      }
    }
  } catch (redisErr) {
    // If redis fails, fall back to DB (but log)
    new APIError("Redis error on GET /api/exercises", { original: redisErr });
  }

  // Cache miss/expired/error: fetch from DB & refresh cache
  try {
    const exercises = await prisma.exercise.findMany({
      select: {
        id: true,
        name: true,
        exerciseGroup: true,
        exerciseGroupId: true,
        recommendedMinReps: true,
        recommendedMaxReps: true,
        measurementType: true,
        // muscle factor fields
        factorQuadriceps: true,
        factorHamstring: true,
        factorGlute: true,
        factorAdductor: true,
        factorCalf: true,
        factorForearm: true,
        factorBiceps: true,
        factorTriceps: true,
        factorLateralDelt: true,
        factorPosteriorDelt: true,
        factorAnteriorDelt: true,
        factorPectoral: true,
        factorClavicularPec: true,
        factorUpperBack: true,
        factorLat: true,
        factorLowerBack: true,
        factorAbdomen: true,
      },
      orderBy: { name: "asc" },
    });
    try {
      await redis.set(EXERCISES_CACHE_KEY, {
        exercises,
        timestamp: Date.now(),
      });
    } catch (redisSetErr) {
      new APIError("Redis set error on GET /api/exercises", { original: redisSetErr });
    }
    return NextResponse.json({ exercises, cached: false });
  } catch (e: any) {
    new APIError("Failed to fetch exercises", { original: e });
    return NextResponse.json({ error: "Failed to fetch exercises." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    new APIError("Forbidden POST /api/exercises", { reason: "Missing or non-admin payload" });
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { name, exerciseGroupId, recommendedMinReps, recommendedMaxReps, measurementType } = await req.json();
    if (!name || !exerciseGroupId) {
      new APIError("Name and group are required for exercise creation", { body: { name, exerciseGroupId } });
      return NextResponse.json({ error: "Name and group are required." }, { status: 400 });
    }
    const created = await prisma.exercise.create({
      data: {
        name,
        exerciseGroup: { connect: { id: exerciseGroupId } },
        recommendedMinReps: recommendedMinReps ?? null,
        recommendedMaxReps: recommendedMaxReps ?? null,
        measurementType: measurementType === "TIME" ? "TIME" : "REPS"
      },
      include: { exerciseGroup: true }
    });
    // After adding, refresh cache
    try {
      const refreshed = await prisma.exercise.findMany({
        include: { exerciseGroup: true },
        orderBy: { name: "asc" },
      });
      await redis.set(EXERCISES_CACHE_KEY, {
        exercises: refreshed,
        timestamp: Date.now(),
      });
    } catch (cacheErr) {
      new APIError("Redis refresh set error after POST /api/exercises", { original: cacheErr });
    }
    return NextResponse.json(created);
  } catch (e: any) {
    if (e.code === "P2002") { // Unique constraint failed
      new APIError("Exercise name must be unique", { original: e, name });
      return NextResponse.json({ error: "Exercise name must be unique." }, { status: 400 });
    }
    new APIError("Failed to add exercise.", { original: e });
    return NextResponse.json({ error: "Failed to add exercise." }, { status: 500 });
  }
}
