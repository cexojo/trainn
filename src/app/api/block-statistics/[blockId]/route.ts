import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "../../utils/auth";

const blockStatsSQL = `
WITH block_series AS (
  SELECT
    b.id AS block_id,
    ex.id AS exercise_id,
    ex.name AS exercise_name,
    w."weekNumber" AS week_number,
    d."dayNumber" AS day_number,
    ds.id AS series_id,
    ds.effectiveWeight,
    ds.effectiveReps
  FROM "TrainingBlock" b
  JOIN "TrainingWeek" w ON w."blockId" = b.id
  JOIN "TrainingDay" d ON d."weekId" = w.id
  JOIN "DayExercise" de ON de."trainingDayId" = d.id
  JOIN "Exercise" ex ON ex.id = de."exerciseId"
  JOIN "DayExerciseSeries" ds ON ds."dayExerciseId" = de.id
  WHERE ds.effectiveWeight IS NOT NULL AND ds.effectiveReps IS NOT NULL
  AND ds.effectiveWeight = (
    SELECT MAX(ds2.effectiveWeight)
    FROM "DayExerciseSeries" ds2
    WHERE ds2."dayExerciseId" = de.id
      AND ds2.effectiveWeight IS NOT NULL
  )
),
first_last_series AS (
  SELECT
    *,
    ROW_NUMBER() OVER(PARTITION BY block_id, exercise_id ORDER BY week_number ASC, day_number ASC, series_id ASC) AS rn_first,
    ROW_NUMBER() OVER(PARTITION BY block_id, exercise_id ORDER BY week_number DESC, day_number DESC, series_id DESC) AS rn_last
  FROM block_series
),
exercise_progress AS (
  SELECT
    bf.block_id,
    bf.exercise_id,
    bf.exercise_name,
    bf.effectiveWeight AS starting_weight,
    bl.effectiveWeight AS last_weight,
    bf.effectiveReps AS starting_reps,
    bl.effectiveReps AS last_reps,
    CASE
      WHEN bf.effectiveWeight = 0 AND bl.effectiveWeight > 0 THEN 'inf'
      WHEN bf.effectiveWeight = 0 AND bl.effectiveWeight <= 0 THEN '0'
      WHEN bf.effectiveWeight IS NOT NULL AND bl.effectiveWeight IS NOT NULL AND bf.effectiveWeight != 0
        THEN CAST(ROUND(100.0 * (bl.effectiveWeight - bf.effectiveWeight) / bf.effectiveWeight, 2) AS TEXT)
      ELSE NULL
    END AS weight_improvement_pct,
    CASE
      WHEN bf.effectiveReps = 0 AND bl.effectiveReps > 0 THEN 'inf'
      WHEN bf.effectiveReps = 0 AND bl.effectiveReps <= 0 THEN '0'
      WHEN bf.effectiveReps IS NOT NULL AND bl.effectiveReps IS NOT NULL AND bf.effectiveReps != 0
        THEN CAST(ROUND(100.0 * (bl.effectiveReps - bf.effectiveReps) / bf.effectiveReps, 2) AS TEXT)
      ELSE NULL
    END AS reps_improvement_pct
  FROM
    (SELECT * FROM first_last_series WHERE rn_first = 1) bf
    JOIN (SELECT * FROM first_last_series WHERE rn_last = 1) bl
      ON bf.block_id = bl.block_id AND bf.exercise_id = bl.exercise_id
),
best_progress_ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY block_id ORDER BY
      CASE weight_improvement_pct WHEN 'inf' THEN 1 ELSE 0 END DESC,
      CAST(weight_improvement_pct AS REAL) DESC,
      CASE reps_improvement_pct WHEN 'inf' THEN 1 ELSE 0 END DESC,
      CAST(reps_improvement_pct AS REAL) DESC,
      exercise_name ASC
    ) AS best_rank
  FROM exercise_progress
),
worst_progress_ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY block_id ORDER BY
      CASE weight_improvement_pct WHEN 'inf' THEN 1 ELSE 0 END ASC,
      CAST(weight_improvement_pct AS REAL) ASC,
      CASE reps_improvement_pct WHEN 'inf' THEN 1 ELSE 0 END ASC,
      CAST(reps_improvement_pct AS REAL) ASC,
      exercise_name ASC
    ) AS worst_rank
  FROM exercise_progress
)
SELECT
  stats.block_id,
  stats."blockNumber",
  stats.total_series,
  stats.completed_series,
  stats.series_on_target,
  stats.completion_days,

  -- Best 1
  best1.exercise_name AS best1_exercise_name,
  best1.starting_weight AS best1_starting_weight,
  best1.last_weight AS best1_last_weight,
  best1.weight_improvement_pct AS best1_weight_improvement_pct,
  best1.starting_reps AS best1_starting_reps,
  best1.last_reps AS best1_last_reps,
  best1.reps_improvement_pct AS best1_reps_improvement_pct,

  -- Best 2
  best2.exercise_name AS best2_exercise_name,
  best2.starting_weight AS best2_starting_weight,
  best2.last_weight AS best2_last_weight,
  best2.weight_improvement_pct AS best2_weight_improvement_pct,
  best2.starting_reps AS best2_starting_reps,
  best2.last_reps AS best2_last_reps,
  best2.reps_improvement_pct AS best2_reps_improvement_pct,

  -- Best 3
  best3.exercise_name AS best3_exercise_name,
  best3.starting_weight AS best3_starting_weight,
  best3.last_weight AS best3_last_weight,
  best3.weight_improvement_pct AS best3_weight_improvement_pct,
  best3.starting_reps AS best3_starting_reps,
  best3.last_reps AS best3_last_reps,
  best3.reps_improvement_pct AS best3_reps_improvement_pct,

  -- Worst 1
  worst1.exercise_name AS worst1_exercise_name,
  worst1.starting_weight AS worst1_starting_weight,
  worst1.last_weight AS worst1_last_weight,
  worst1.weight_improvement_pct AS worst1_weight_improvement_pct,
  worst1.starting_reps AS worst1_starting_reps,
  worst1.last_reps AS worst1_last_reps,
  worst1.reps_improvement_pct AS worst1_reps_improvement_pct,

  -- Worst 2
  worst2.exercise_name AS worst2_exercise_name,
  worst2.starting_weight AS worst2_starting_weight,
  worst2.last_weight AS worst2_last_weight,
  worst2.weight_improvement_pct AS worst2_weight_improvement_pct,
  worst2.starting_reps AS worst2_starting_reps,
  worst2.last_reps AS worst2_last_reps,
  worst2.reps_improvement_pct AS worst2_reps_improvement_pct,

  -- Worst 3
  worst3.exercise_name AS worst3_exercise_name,
  worst3.starting_weight AS worst3_starting_weight,
  worst3.last_weight AS worst3_last_weight,
  worst3.weight_improvement_pct AS worst3_weight_improvement_pct,
  worst3.starting_reps AS worst3_starting_reps,
  worst3.last_reps AS worst3_last_reps,
  worst3.reps_improvement_pct AS worst3_reps_improvement_pct

FROM (
  SELECT
    b.id AS block_id,
    b."blockNumber",
    COUNT(ds.id) AS total_series,
    SUM(CASE WHEN ds.effectiveWeight IS NOT NULL AND ds.effectiveReps IS NOT NULL THEN 1 ELSE 0 END) AS completed_series,
    SUM(
      CASE
        WHEN
          (ds."minReps" IS NULL OR ds.effectiveReps IS NULL OR (ds.effectiveReps >= ds."minReps" AND ds.effectiveReps <= ds."maxReps"))
          AND
          (ds."minRir" IS NULL OR ds.effectiveRir IS NULL OR (ds.effectiveRir >= ds."minRir" AND ds.effectiveRir <= ds."maxRir"))
          AND
          ds.effectiveWeight IS NOT NULL AND ds.effectiveReps IS NOT NULL
        THEN 1
        ELSE 0
      END
    ) AS series_on_target,
    CAST(
      ROUND(
        (JULIANDAY(MAX(ds."modifiedAt")) - JULIANDAY(MIN(ds."modifiedAt")))
      ) AS INTEGER
    ) AS completion_days
  FROM "TrainingBlock" b
  JOIN "TrainingWeek" w ON w."blockId" = b.id
  JOIN "TrainingDay" d ON d."weekId" = w.id
  JOIN "DayExercise" de ON de."trainingDayId" = d.id
  JOIN "DayExerciseSeries" ds ON ds."dayExerciseId" = de.id
  GROUP BY b.id, b."blockNumber"
) stats
LEFT JOIN best_progress_ranked best1 ON best1.block_id = stats.block_id AND best1.best_rank = 1
LEFT JOIN best_progress_ranked best2 ON best2.block_id = stats.block_id AND best2.best_rank = 2
LEFT JOIN best_progress_ranked best3 ON best3.block_id = stats.block_id AND best3.best_rank = 3
LEFT JOIN worst_progress_ranked worst1 ON worst1.block_id = stats.block_id AND worst1.worst_rank = 1
LEFT JOIN worst_progress_ranked worst2 ON worst2.block_id = stats.block_id AND worst2.worst_rank = 2
LEFT JOIN worst_progress_ranked worst3 ON worst3.block_id = stats.block_id AND worst3.worst_rank = 3
WHERE stats.block_id = ?
ORDER BY stats."blockNumber";
`;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ blockId: string }> }
) {
  const payload = getTokenPayload(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { blockId } = await context.params;
  if (!blockId) {
    return NextResponse.json({ error: "Missing blockId param" }, { status: 400 });
  }

  const data = await prisma.$queryRawUnsafe<any[]>(blockStatsSQL, blockId);

  return NextResponse.json(data[0] || {});
}
