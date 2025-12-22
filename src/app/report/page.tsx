"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { translations, Lang } from "../i18n";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import type { ExerciseDef } from "../types/ExerciseDef";

function formatDateEu(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("T")[0].split("-");
  return [d, m, y].join("/");
}

export default function ReportPage() {
  const [defs, setDefs] = useState<ExerciseDef[]>([]);
  const [userInfo, setUserInfo] = useState<{ id: string, name: string, isocode: string } | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const router = useRouter();
  const searchParams = useSearchParams();
  const blockId = searchParams?.get("blockId");

  useEffect(() => {
    fetch("/api/get-user-id?name=John%20Doe")
      .then(r => r.json())
      .then((d) => {
        setUserInfo({
          id: d.id,
          name: translations[d.isocode as Lang]?.nameDefault || d.name || "John Doe",
          isocode: d.isocode || "en"
        });
        setLang((d.isocode || "en") as Lang);
      });
  }, []);

  useEffect(() => {
    if (!userInfo?.id) return;
    const url = `/api/training-data?userId=${userInfo.id}${blockId ? `&blockId=${blockId}` : ""}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setDefs(data.exerciseDefs || []);
        // DEBUG: log retrieved data to console
        if (typeof window !== "undefined") {
          // eslint-disable-next-line no-console
          console.log("Report fetched defs:", data.exerciseDefs);
        }
      });
  }, [userInfo?.id, blockId]);

  // Group by master exercise (name|group), then by date
  const groupedByExercise: Record<string, {
    name: string,
    group: string,
    byDate: Record<string, { date: string, reps: number[], weights: number[] }>
  }> = {};

  for (const def of defs) {
    if (
      typeof def.effectiveWeight === "number" ||
      typeof def.effectiveReps === "number"
    ) {
      const exKey = def.exercise.name + "|" + def.exercise.group;
      if (!groupedByExercise[exKey]) {
        groupedByExercise[exKey] = {
          name: def.exercise.name,
          group: def.exercise.group,
          byDate: {}
        };
      }
      // Group by workout date or fallback 'day'
      const date = def.trainingDay?.date
        ? formatDateEu(def.trainingDay.date)
        : def.day;
      if (!groupedByExercise[exKey].byDate[date]) {
        groupedByExercise[exKey].byDate[date] = { date, reps: [], weights: [] };
      }
      if (typeof def.effectiveWeight === "number") {
        groupedByExercise[exKey].byDate[date].weights.push(def.effectiveWeight);
      }
      if (typeof def.effectiveReps === "number") {
        groupedByExercise[exKey].byDate[date].reps.push(def.effectiveReps);
      }
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded shadow border border-zinc-200 dark:border-zinc-700 py-6 px-6">
        <button
          onClick={() => router.back()}
          className="mb-3 px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-xs"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold mb-4 text-center">{userInfo?.name ? `${userInfo.name} — ${translations[lang].dashboardTitle}` : "Report"}</h1>

        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 justify-center">
          📈 Athlete Progress Report
        </h2>

        {Object.keys(groupedByExercise).length === 0 && (
          <p className="text-center text-zinc-500">
            No completed exercises with weight or reps to show.
          </p>
        )}

        {Object.values(groupedByExercise).map((exercise) => {
          // Sorted dates
          const sortedDates = Object.values(exercise.byDate)
            .map(day => day.date)
            .filter(Boolean)
            .sort();

          const minWeights = sortedDates.map(date => {
            const entry = exercise.byDate[date];
            return entry && entry.weights.length ? Math.min(...entry.weights) : null;
          });
          const maxWeights = sortedDates.map(date => {
            const entry = exercise.byDate[date];
            return entry && entry.weights.length ? Math.max(...entry.weights) : null;
          });
          const minReps = sortedDates.map(date => {
            const entry = exercise.byDate[date];
            return entry && entry.reps.length ? Math.min(...entry.reps) : null;
          });
          const maxReps = sortedDates.map(date => {
            const entry = exercise.byDate[date];
            return entry && entry.reps.length ? Math.max(...entry.reps) : null;
          });

          return (
            <div key={exercise.name + exercise.group} className="mb-10">
              <div className="mb-2">
                <span className="font-semibold">{exercise.name} ({exercise.group})</span>
              </div>
              <Line
                data={{
                  labels: sortedDates,
                  datasets: [
                    {
                      label: "Max Weight",
                      data: maxWeights,
                      borderColor: "rgba(59,130,246,1)",
                      backgroundColor: "rgba(59,130,246,0.15)",
                      fill: "+1",
                      yAxisID: "y",
                      tension: 0.12,
                      pointRadius: 3,
                      borderWidth: 2,
                      spanGaps: true,
                    },
                    {
                      label: "Min Weight",
                      data: minWeights,
                      borderColor: "rgba(59,130,246,0.7)",
                      backgroundColor: "rgba(59,130,246,0.07)",
                      fill: false,
                      yAxisID: "y",
                      tension: 0.13,
                      pointRadius: 3,
                      borderDash: [5, 5],
                      borderWidth: 2,
                      spanGaps: true,
                    },
                    {
                      label: "Max Reps",
                      data: maxReps,
                      borderColor: "rgba(34,197,94,1)",
                      backgroundColor: "rgba(34,197,94,0.14)",
                      fill: "+1",
                      yAxisID: "y1",
                      tension: 0.09,
                      borderWidth: 2,
                      pointRadius: 3,
                      spanGaps: true,
                    },
                    {
                      label: "Min Reps",
                      data: minReps,
                      borderColor: "rgba(34,197,94,0.75)",
                      backgroundColor: "rgba(34,197,94,0.07)",
                      fill: false,
                      yAxisID: "y1",
                      tension: 0.10,
                      borderWidth: 2,
                      pointRadius: 3,
                      borderDash: [5, 5],
                      spanGaps: true,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  interaction: { mode: "index", intersect: false },
                  plugins: {
                    legend: { display: true },
                    title: { display: false },
                  },
                  scales: {
                    y: {
                      type: "linear",
                      display: true,
                      position: "left",
                      title: { display: true, text: "Weight" },
                      grid: { color: "rgba(148,163,184,0.15)" },
                    },
                    y1: {
                      type: "linear",
                      display: true,
                      position: "right",
                      title: { display: true, text: "Repetitions" },
                      grid: { drawOnChartArea: false },
                    },
                  },
                }}
                height={250}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
