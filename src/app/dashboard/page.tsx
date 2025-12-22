"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { translations, Lang } from "../i18n";
import { Progress } from "./Progress";

import type { ExerciseDef } from "../../types/ExerciseDef";

type DefByDay = Record<string, ExerciseDef[]>;

// Helper for consistent date formatting DD/MM/YYYY
function formatDateEu(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("T")[0].split("-");
  return [d, m, y].join("/");
}

// Editable day date calendar input, value in yyyy-mm-dd, display always browser-native
function EditableDayDate({
  dayIdx,
  dayDate,
  setDayDate,
  lang
}: {
  dayIdx: number,
  dayDate: string,
  setDayDate: (val: string) => void,
  lang: Lang
}) {
  return (
    <input
      type="date"
      className="text-xs px-1 py-0 border border-zinc-200 dark:border-zinc-600 rounded bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-200"
      value={typeof dayDate === "string" ? dayDate : ""}
      onChange={e => setDayDate(e.target.value)}
      style={{ width: 120 }}
      aria-label={translations[lang].calendarAria(dayIdx)}
    />
  );
}

/**
 * Report section/modal. For each exercise series with values,
 * renders a dual-axis line chart (weight left Y, reps right Y).
 */
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ReportSection({ defs, onClose }: { defs: ExerciseDef[], onClose: () => void }) {
  // Map: { exercise name | group | seriesNumber } => [{ date, weight, reps }]
  const seriesMap: Record<string, { label: string, name: string, group: string, seriesNumber: number, data: { x: string, date: string, weight: number | null, reps: number | null }[] }> = {};
  for (const def of defs) {
    if (
      typeof def.effectiveWeight === "number" ||
      typeof def.effectiveReps === "number"
    ) {
      // Compose unique key per exercise/series
      const label =
        `${def.exercise.name} (${def.exercise.group}) · #${def.seriesNumber}`;
      const key =
        def.exercise.name +
        "|" +
        def.exercise.group +
        "|" +
        def.seriesNumber;
      if (!seriesMap[key]) {
        seriesMap[key] = {
          label,
          name: def.exercise.name,
          group: def.exercise.group,
          seriesNumber: def.seriesNumber,
          data: []
        };
      }
      const x =
        (def.trainingDay?.date
          ? formatDateEu(def.trainingDay.date)
          : def.day) +
        ` · #${def.seriesNumber}`;
      seriesMap[key].data.push({
        x,
        date: def.trainingDay?.date || "",
        weight: def.effectiveWeight,
        reps: def.effectiveReps
      });
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-zinc-900 rounded shadow-lg max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 p-6 relative">
        <button
          className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-center text-zinc-700 dark:text-zinc-200 flex items-center gap-1 justify-center">
          📈 Athlete Progress Report
        </h2>
        {Object.keys(seriesMap).length === 0 && (
          <p className="text-center text-zinc-500">
            No completed series with weight or reps to show.
          </p>
        )}
        {Object.values(seriesMap).map((series, idx) => (
          <div key={series.label} className="mb-8">
            <div className="mb-2">
              <span className="font-semibold">{series.label}</span>
            </div>
            <Line
              data={{
                labels: series.data.map((d) => d.x),
                datasets: [
                  {
                    label: "Weight",
                    data: series.data.map((d) => d.weight ?? null),
                    borderColor: "rgba(59,130,246,1)", // blue-500
                    backgroundColor: "rgba(59,130,246,0.12)",
                    yAxisID: "y",
                    spanGaps: true,
                  },
                  {
                    label: "Reps",
                    data: series.data.map((d) => d.reps ?? null),
                    borderColor: "rgba(34,197,94,1)", // green-500
                    backgroundColor: "rgba(34,197,94,0.13)",
                    yAxisID: "y1",
                    spanGaps: true,
                  },
                ],
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
                    grid: { color: "rgba(148,163,184,0.2)" }, // zinc-400/20
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
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [showProgressInfo, setShowProgressInfo] = useState(false);

  const [dayDates, setDayDates] = useState<string[]>([]);
  const [trainingDayIds, setTrainingDayIds] = useState<string[]>([]);

  const [userInfo, setUserInfo] = useState<{ id: string, name: string, isocode: string, lastVisitedWeek?: string | null } | null>(null);
  const [blockOpts, setBlockOpts] = useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<any | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<any | null>(null);
  const [weekId, setWeekId] = useState<string | null>(null);
  const [exerciseDefs, setExerciseDefs] = useState<any[]>([]);
  const [changed, setChanged] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>("en");

  // Load user info (including isocode) once on mount
  useEffect(() => {
    fetch("/api/get-user-id?name=John%20Doe")
      .then(r => r.json())
      .then((d) => {
        setUserInfo({
          id: d.id,
          name: translations[d.isocode as Lang]?.nameDefault || d.name || "John Doe",
          isocode: d.isocode || "en",
          lastVisitedWeek: d.lastVisitedWeek || null,
        });
        setLang((d.isocode || "en") as Lang);

        // If user has lastVisitedWeek, use it
        if (d.lastVisitedWeek) {
          setWeekId(d.lastVisitedWeek);
        }
      });
  }, []);

  // Data loader - fires when userId or weekId changes
  useEffect(() => {
    if (!userInfo?.id) return;
    setLoading(true);
    fetch(`/api/training-data?userId=${userInfo.id}${weekId ? "&weekId=" + weekId : ""}`)
      .then(async r => {
        try {
          return await r.json();
        } catch {
          return {};
        }
      })
      .then((data) => {
        if (typeof window !== "undefined" && data && data._debugInfo) {
          // eslint-disable-next-line no-console
          console.log("training-data _debugInfo:", data._debugInfo);
        }
        setBlockOpts(data.blocks || []);
        setSelectedBlock(data.selectedBlock || null);

        // When weekId is set, always ensure selectedWeek is synced.
        if (weekId && data.selectedBlock && data.selectedBlock.weeks && data.selectedBlock.weeks.length > 0) {
          const match = data.selectedBlock.weeks.find((w: any) => String(w.id) === String(weekId));
          setSelectedWeek(match || null);
        }
        // Auto-select week (only if no weekId is set, i.e., for first initial mount)
        else if (!weekId) {
          let autoSelectedWeek = null;
          const candidateBlock = data.selectedBlock || (data.blocks && data.blocks.length > 0 ? data.blocks[data.blocks.length - 1] : null);

          if (candidateBlock && Array.isArray(candidateBlock.weeks) && candidateBlock.weeks.length > 0) {
            // Collect all weeks with any inputted WEIGHT or REPS (ignore RiR)
            // Robustly find *highest* week with any user-inputted reps or weight (0 counts as valid)
            let autoSelectedWeek = null;
            if (data.exerciseDefs && Array.isArray(data.exerciseDefs)) {
              let candidateWeeks: { week: any; weekNumber: number }[] = [];
              for (const wk of candidateBlock.weeks) {
                const weekExercises = data.exerciseDefs.filter(
                  (def: any) => String(def.weekId) === String(wk.id)
                );
                const hasInput = weekExercises.some(
                  (def: any) =>
                    def.effectiveReps !== null && def.effectiveReps !== undefined ||
                    def.effectiveWeight !== null && def.effectiveWeight !== undefined
                );
                if (hasInput) {
                  candidateWeeks.push({ week: wk, weekNumber: parseInt(wk.weekNumber, 10) });
                }
              }
              if (candidateWeeks.length > 0) {
                // Pick the candidate with the highest weekNumber
                candidateWeeks.sort((a, b) => b.weekNumber - a.weekNumber);
                autoSelectedWeek = candidateWeeks[0].week;
              }
            }
            if (!autoSelectedWeek) {
              // Default: first week of last visible block
              autoSelectedWeek = candidateBlock.weeks.find((w: any) => w.weekNumber === 1) || candidateBlock.weeks[0];
            }
            setSelectedWeek(autoSelectedWeek);
            setWeekId(autoSelectedWeek?.id || null);
          } else {
            setSelectedWeek(data.selectedWeek || null);
            if (data.selectedWeek && data.selectedWeek.id) {
              setWeekId(String(data.selectedWeek.id));
            }
          }
        }

        setExerciseDefs(data.exerciseDefs || []);
        if (data.trainingDays && Array.isArray(data.trainingDays)) {
          const sorted = [...data.trainingDays]
            .sort((a, b) => {
              const numA = parseInt((a.dayLabel||"").replace(/^\D+/g, "")) || 0;
              const numB = parseInt((b.dayLabel||"").replace(/^\D+/g, "")) || 0;
              return numA - numB;
            });
          setDayDates(sorted.map(d => d.date ? d.date.split("T")[0] : ""));
          setTrainingDayIds(sorted.map(d => d.id));
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [userInfo?.id, weekId]);

  // Block select handler
  const handleBlockChange = (blockId: string) => {
    const block = blockOpts.find(b => String(b.id) === String(blockId));
    if (block && block.weeks && block.weeks.length > 0) {
      setSelectedBlock(block);
      const lastWeek = block.weeks[block.weeks.length - 1];
      setSelectedWeek(lastWeek);
      setWeekId(String(lastWeek.id));
    }
  };

  // Week change
  const handleWeekNav = async (dir: -1 | 1) => {
    if (!selectedBlock || !selectedWeek) return;
    const idx = selectedBlock.weeks.findIndex((wk: any) => String(wk.id) === String(selectedWeek.id));
    const toIdx = idx + dir;
    if (toIdx >= 0 && toIdx < selectedBlock.weeks.length) {
      const newWeek = selectedBlock.weeks[toIdx];
      setSelectedWeek(newWeek);
      setWeekId(String(newWeek.id));
      // Patch user's lastVisitedWeek
      if (userInfo?.id) {
        await fetch("/api/get-user-id", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userInfo.id, lastVisitedWeek: newWeek.id })
        });
      }
    }
  };

  // Language selector: update lang and userInfo's isocode, optionally POST to backend
  const handleLangChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIso = e.target.value;
    setLang(newIso as Lang);
    setUserInfo(info => info ? { ...info, isocode: newIso } : info);
    // Optionally update user profile (send isocode)
    if (userInfo?.id) {
      await fetch("/api/get-user-id", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userInfo.id, isocode: newIso })
      });
    }
  };

  // Group exerciseDefs by day for display structure
  const byDay: DefByDay = {};
  for (const def of exerciseDefs) {
    if (!byDay[def.day]) byDay[def.day] = [];
    byDay[def.day].push(def);
  }

  // Only set dayDates to a sequential fallback if not covered by backend response
  useEffect(() => {
    if (dayDates.length === Object.keys(byDay).length) return;
    const today = new Date();
    const days = Object.keys(byDay);
    const defaultDates = days.map((d, idx) => {
      const theDate = new Date(today);
      theDate.setDate(today.getDate() + idx);
      return theDate.toISOString().split("T")[0];
    });
    setDayDates(prev => {
      if (prev.length === days.length) return prev;
      return defaultDates;
    });
    // eslint-disable-next-line
  }, [Object.keys(byDay).length]);

  // Update value when blurred
  const handleBlur = async (defId: string, field: "effectiveReps" | "effectiveWeight" | "effectiveRir", value: string | number) => {
    setChanged(c => ({ ...c, [defId + field]: true }));
    await fetch("/api/exercise-definitions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: defId, field, value }),
    });
    setChanged(c => ({ ...c, [defId + field]: false }));
  };

  // Update frontend value as user types
  const handleLocalChange = (
    day: string,
    idx: number,
    field: "effectiveReps" | "effectiveWeight" | "effectiveRir",
    value: string
  ) => {
    setExerciseDefs(prevDefs => {
      const updated = prevDefs.map((def, i) => {
        if (def.day === day && i === idx) {
          let newVal: number | null = null;
          if (field === "effectiveReps" || field === "effectiveRir") {
            newVal = value === "" ? null : Math.max(0, Math.floor(Number(value)));
          } else if (field === "effectiveWeight") {
            newVal = value === "" ? null : Math.round(Math.max(0, parseFloat(value)) * 10) / 10;
          }
          return { ...def, [field]: newVal };
        }
        return def;
      });
      return updated;
    });
  };

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
      {/* Banner with Logo & Language selector */}
      <div className="w-full bg-white dark:bg-zinc-900 flex items-center justify-center py-4 shadow-lg mb-4 relative">
        <Image src="/globe.svg" alt="Logo" width={48} height={48} />
        <span className="ml-4 text-xl font-bold tracking-wide text-black dark:text-white">
          {translations[lang].dashboardTitle}
        </span>
        {/* Language selection dropdown */}
        <div className="absolute right-4 flex items-center gap-1">
          <label htmlFor="lang-sel" className="text-xs text-zinc-500 dark:text-zinc-300 mr-1">
            {translations[lang].language}:
          </label>
          <select
            id="lang-sel"
            value={lang}
            onChange={handleLangChange}
            className="rounded border border-zinc-200 dark:border-zinc-600 px-2 py-1 text-xs bg-white dark:bg-zinc-900 text-black dark:text-white"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      {/* Sticky athlete info header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 shadow-md py-4 px-4 flex flex-col items-center justify-center gap-2">
        {/* Name and date */}
        <div className="flex items-center justify-center gap-2 w-full mb-1">
          <span className="font-semibold text-lg text-black dark:text-white">{userInfo?.name ?? translations[lang].nameDefault}</span>
          <span className="text-zinc-500 text-sm">{translations[lang].athleteSeparator}</span>
          <span className="text-zinc-600 dark:text-zinc-300 text-xs">
            {formatDateEu(new Date().toISOString())}
          </span>
        </div>
        {/* Block selector row */}
        <div className="flex items-center justify-center w-full mb-1 gap-2">
          {selectedBlock && (
            <>
              <select
                value={selectedBlock.id}
                onChange={e => handleBlockChange(e.target.value)}
                className="rounded border border-zinc-200 px-2 py-1 text-xs font-semibold text-black dark:bg-zinc-900 dark:text-white"
              >
                {blockOpts.map(b => (
                  <option key={b.id} value={b.id}>
                    {translations[lang].block} {b.blockNumber}: {b.description}
                  </option>
                ))}
              </select>
              <Link
                href={`/report?blockId=${selectedBlock.id}`}
                className="px-2 py-1 rounded bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 ml-2"
              >
                📈 Generate Report
              </Link>
            </>
          )}
        </div>
        {/* Week selector row */}
        <div className="flex items-center justify-center w-full gap-2">
          {selectedBlock && selectedWeek && (
            <>
              <button
                onClick={() => handleWeekNav(-1)}
                disabled={
                  !selectedBlock ||
                  !selectedWeek ||
                  !selectedBlock.weeks?.length ||
                  String(selectedBlock.weeks[0].id) === String(selectedWeek.id)
                }
                className="px-2 py-1 text-lg rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50"
                aria-label={translations[lang].previousWeek}
              >
                &#8592;
              </button>
              <span className="text-zinc-700 dark:text-zinc-300 text-xs font-bold min-w-[60px] text-center">{`${translations[lang].week} ${selectedWeek.weekNumber}`}</span>
              <button
                onClick={() => handleWeekNav(1)}
                disabled={
                  !selectedBlock ||
                  !selectedWeek ||
                  !selectedBlock.weeks?.length ||
                  String(selectedBlock.weeks[selectedBlock.weeks.length - 1].id) === String(selectedWeek.id)
                }
                className="px-2 py-1 text-lg rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50"
                aria-label={translations[lang].nextWeek}
              >
                &#8594;
              </button>
            </>
          )}
        </div>
      </div>

      {/* Daily exercises grouped by day */}
      <main className="max-w-2xl mx-auto mt-4">
        {Object.entries(byDay).map(([dayName, defs], dayIdx) => (
          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-8 pb-2" key={dayName}>
            <h2 className="text-md font-bold text-zinc-600 dark:text-zinc-300 mt-6 mb-2 flex items-center gap-2">
              <span>{`${translations[lang].day} ${dayIdx + 1}`}</span>
              <EditableDayDate
                dayIdx={dayIdx}
                dayDate={dayDates[dayIdx]}
                setDayDate={async (val: string) => {
                  setDayDates(dates => {
                    const copy = [...dates];
                    copy[dayIdx] = val;
                    return copy;
                  });
                  // Persist to DB
                  if (selectedWeek) {
                    const trainingDayId = trainingDayIds[dayIdx];
                    await fetch("/api/training-day", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(
                        trainingDayId
                          ? { trainingDayId, date: val }
                          : {
                              weekId: selectedWeek.id,
                              dayIdx,
                              date: val,
                              dayLabel: `${translations[lang].day} ${dayIdx + 1}`
                            }
                      )
                    });
                  }
                }}
                lang={lang}
              />
            </h2>
            <div className="relative">
              {/* Exercises render below: handled by fragment group */}
              {
                // Group by exercise name for block display
                (() => {
                  const grouped: Record<string, ExerciseDef[]> = {};
                  defs.forEach((def: ExerciseDef) => {
                    const key = def.exercise.name + "|" + def.exercise.group;
                    if (!grouped[key]) grouped[key] = [];
                    grouped[key].push(def);
                  });
                  return (
                    <>
                      {Object.entries(grouped).map(([exKey, exDefs]) => (
                        <React.Fragment key={exKey}>
                          <div className="w-full flex flex-col p-2 mb-0 bg-zinc-100 dark:bg-zinc-800 rounded-t border border-b-0 border-zinc-200 dark:border-zinc-700">
                            <span className="text-base md:text-lg font-bold text-zinc-800 dark:text-zinc-100">
                              {exDefs[0].exercise.name}
                            </span>
                            <span className="text-xs md:text-sm text-zinc-500 dark:text-zinc-300 font-normal">
                              {exDefs[0].exercise.group}
                            </span>
                            {exDefs[0].athleteNotes && exDefs[0].athleteNotes.trim() !== "" && (
                              <div className="mt-1 px-2 py-1 rounded bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-100 text-xs flex items-center gap-1 w-full">
                                <span role="img" aria-label="info">ℹ️</span>
                                <span className="break-words">{exDefs[0].athleteNotes}</span>
                              </div>
                            )}
                          </div>
                          <table className="w-full mb-2 border-separate border-spacing-y-2">
                            <thead>
                              <tr className="sticky top-[78px] z-10 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 text-xs md:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                                <th className="text-center" style={{ width: '28px' }}>{translations[lang].ds}</th>
                                <th className="text-center">{translations[lang].weight}</th>
                                <th className="text-center">{translations[lang].reps}</th>
                                <th className="text-center">{translations[lang].rir}</th>
                                <th className="text-center">
                                  <div className="flex items-center gap-1">
                                    {translations[lang].progress}
                                    <button
                                      type="button"
                                      aria-label={translations[lang].showLegend}
                                      className="ml-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer focus:outline-none focus:ring"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowProgressInfo(true);
                                      }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="10" cy="14.3" r="1.1" fill="currentColor"/><rect x="9.1" y="6" width="1.8" height="5" rx="0.9" fill="currentColor"/></svg>
                                    </button>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {exDefs.map((def: ExerciseDef, i: number) => (
                                <tr
                                  key={def.id}
                                  className="rounded-md border border-zinc-100 bg-white/60 dark:bg-zinc-900/40 dark:border-zinc-800"
                                >
                                  <td
                                    className="align-middle px-1 py-2 text-center"
                                    style={{ verticalAlign: "middle", width: '28px' }}
                                  >
                                    {def.isDropset ? (
                                      <span title="Dropset" className="inline-block align-middle" style={{ fontSize: "1.2em" }}>
                                        🔥
                                      </span>
                                    ) : null}
                                  </td>
                                  <td className="px-3 py-0" style={{ verticalAlign: "top" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      max="300"
                                      step="0.1"
                                      value={def.effectiveWeight ?? ""}
                                      onChange={(e) => handleLocalChange(dayName, defs.indexOf(def), "effectiveWeight", e.target.value)}
                                      onBlur={(e) => handleBlur(def.id, "effectiveWeight", e.target.value)}
                                      placeholder={
                                        def.lastWeekValues && def.lastWeekValues.effectiveWeight != null
                                          ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveWeight}`
                                          : translations[lang].weight
                                      }
                                      className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-0 w-full bg-white dark:bg-zinc-800 text-black dark:text-white text-center placeholder-italic placeholder:text-xs"
                                      readOnly={false}
                                    />
                                  </td>
                                  <td className="px-3 py-0" style={{ verticalAlign: "top" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={def.effectiveReps ?? ""}
                                      onChange={(e) => handleLocalChange(dayName, defs.indexOf(def), "effectiveReps", e.target.value)}
                                      onBlur={(e) => handleBlur(def.id, "effectiveReps", e.target.value)}
                                      placeholder={
                                        def.lastWeekValues && def.lastWeekValues.effectiveReps != null
                                          ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveReps}`
                                          : translations[lang].reps
                                      }
                                      className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-0 w-full bg-white dark:bg-zinc-800 text-black dark:text-white text-center placeholder-italic placeholder:text-xs"
                                      readOnly={false}
                                    />
                                    {(def.minReps != null && def.maxReps != null) && (
                                      <span className="ml-1 text-[0.65em] text-zinc-400 font-normal align-middle">{def.minReps}&ndash;{def.maxReps}</span>
                                    )}
                                  </td>
                                  <td className="px-3 py-0" style={{ verticalAlign: "top" }}>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={def.effectiveRir ?? ""}
                                      onChange={(e) => handleLocalChange(dayName, defs.indexOf(def), "effectiveRir", e.target.value)}
                                      onBlur={(e) => handleBlur(def.id, "effectiveRir", e.target.value)}
                                      placeholder={
                                        def.lastWeekValues && def.lastWeekValues.effectiveRir != null
                                          ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveRir}`
                                          : translations[lang].rir
                                      }
                                      className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-0 w-full bg-white dark:bg-zinc-800 text-black dark:text-white text-center placeholder-italic placeholder:text-xs"
                                      readOnly={false}
                                    />
                                  </td>
                                  <td className="px-3 py-0">
                                    <Progress
                                      currentWeight={def.effectiveWeight}
                                      currentReps={def.effectiveReps}
                                      prevWeight={def.lastWeekValues?.effectiveWeight}
                                      prevReps={def.lastWeekValues?.effectiveReps}
                                      lang={lang}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </React.Fragment>
                      ))}
                    </>
                  );
                })()
              }
            </div>
          </div>
        ))}
      </main>
      {/* Global Progress Info Popup */}
      {showProgressInfo && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/10"
          onClick={() => setShowProgressInfo(false)}
        >
          <div
            className="mt-32 min-w-max max-w-[350px] p-3 bg-white dark:bg-zinc-800 shadow-lg border border-zinc-300 dark:border-zinc-700 rounded text-xs text-zinc-800 dark:text-zinc-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="font-semibold mb-1">{translations[lang].progressLegend}</div>
            <ul className="mb-2 list-disc pl-5">
              <li>
                <span className="text-green-800 dark:text-green-400">▲</span> {translations[lang].legend1}<br />
                <span className="text-green-400 dark:text-green-300">▲</span> {translations[lang].legend2}<br />
                <span className="text-orange-500 dark:text-orange-400">↔</span> {translations[lang].legend3}<br />
                <span className="text-red-400 dark:text-red-400">▼</span> {translations[lang].legend4}<br />
                <span className="text-red-700 dark:text-red-500">▼</span> {translations[lang].legend5}<br />
                <span className="text-zinc-400">→</span> {translations[lang].legend6}
              </li>
            </ul>
            <div className="mb-1">
              <span className="text-green-700 dark:text-green-400 font-bold">{translations[lang].legend7}</span><br/>
              <span className="text-zinc-700 dark:text-zinc-300 font-bold">{translations[lang].legend8}</span><br/>
              <span className="text-red-700 dark:text-red-400 font-bold">{translations[lang].legend9}</span>
            </div>
            <button
              type="button"
              className="mt-2 px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 font-semibold text-xs text-zinc-700 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600"
              onClick={() => setShowProgressInfo(false)}
            >
              {translations[lang].close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
