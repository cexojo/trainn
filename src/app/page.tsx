"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

// Types for backend definitions (read-only for all except reps/weight/rir/columns)
type ExerciseDef = {
  id: number;
  day: string;
  exercise: {
    name: string;
    group: string;
  };
  seriesNumber: number;
  minReps: number;
  maxReps: number;
  minRir: number;
  maxRir: number;
  effectiveReps: number | null;
  effectiveWeight: number | null;
  effectiveRir: number | null;
  lastWeekValues?: {
    effectiveReps: number | null;
    effectiveWeight: number | null;
    effectiveRir: number | null;
  } | null;
};

type DefByDay = Record<string, ExerciseDef[]>;

export default function Home() {
  const athleteName = "John Doe";
  const [userId, setUserId] = useState<string | null>(null);
  const [blockOpts, setBlockOpts] = useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<any | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<any | null>(null);
  const [weekId, setWeekId] = useState<string | null>(null);
  const [exerciseDefs, setExerciseDefs] = useState<any[]>([]);
  const [changed, setChanged] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Load userId for "John Doe" once on mount
  useEffect(() => {
    fetch("/api/get-user-id?name=John%20Doe")
      .then(r => r.json())
      .then((d) => setUserId(d.id));
  }, []);

  // Data loader - fires when userId or weekId changes
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`/api/training-data?userId=${userId}${weekId ? "&weekId=" + weekId : ""}`)
      .then(async r => {
        try {
          return await r.json();
        } catch {
          return {};
        }
      })
      .then((data) => {
        setBlockOpts(data.blocks || []);
        setSelectedBlock(data.selectedBlock || null);
        setSelectedWeek(data.selectedWeek || null);
        setExerciseDefs(data.exerciseDefs || []);
        // If no weekId is set, or the weeks on block changed and weekId is now missing, default to the current selectedWeek's id
        if ((!weekId || (data.selectedWeek && data.selectedWeek.id !== weekId))) {
          if (data.selectedWeek && data.selectedWeek.id) {
            setWeekId(String(data.selectedWeek.id));
          }
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [userId, weekId]);

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
  const handleWeekNav = (dir: -1 | 1) => {
    if (!selectedBlock || !selectedWeek) return;
    const idx = selectedBlock.weeks.findIndex((wk: any) => String(wk.id) === String(selectedWeek.id));
    const toIdx = idx + dir;
    if (toIdx >= 0 && toIdx < selectedBlock.weeks.length) {
      const newWeek = selectedBlock.weeks[toIdx];
      setSelectedWeek(newWeek);
      setWeekId(String(newWeek.id));
    }
  };

  // Group exerciseDefs by day for display structure
  const byDay: DefByDay = {};
  for (const def of exerciseDefs) {
    if (!byDay[def.day]) byDay[def.day] = [];
    byDay[def.day].push(def);
  }

  // Update value when blurred
  const handleBlur = async (defId: number, field: "effectiveReps" | "effectiveWeight" | "effectiveRir", value: string | number) => {
    if (value === "" || value === null) return;
    setChanged(c => ({ ...c, [defId + field]: true }));
    await fetch("/api/exercise-definitions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: defId, field, value }),
    });
    setChanged(c => ({ ...c, [defId + field]: false }));
  };

  // Update frontend value as user types (without persisting to backend until blur)
  const handleLocalChange = (
    day: string,
    idx: number,
    field: "effectiveReps" | "effectiveWeight" | "effectiveRir",
    value: string
  ) => {
    // Remove setByDay, update exerciseDefs directly
    setExerciseDefs(prevDefs => {
      const updated = prevDefs.map(def => {
        if (def.day === day && prevDefs.filter(d => d.day === day).indexOf(def) === idx) {
          // only update the right item within the same day, by index of match
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
      {/* Banner with Logo */}
      <div className="w-full bg-white dark:bg-zinc-900 flex items-center justify-center py-4 shadow-lg mb-4">
        <Image src="/globe.svg" alt="Logo" width={48} height={48} />
        <span className="ml-4 text-xl font-bold tracking-wide text-black dark:text-white">
          Trainer Dashboard
        </span>
      </div>

      {/* Sticky athlete info header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 shadow-md py-2 px-4 flex items-center gap-2">
        <span className="font-semibold text-lg text-black dark:text-white">{athleteName}</span>
        <span className="text-zinc-500 text-sm">|</span>
        {selectedBlock && (
          <span className="flex items-center gap-2">
            <select
              value={selectedBlock.id}
              onChange={e => handleBlockChange(e.target.value)}
              className="rounded border border-zinc-200 px-1 py-0.5 text-xs font-semibold text-black dark:bg-zinc-900 dark:text-white"
            >
              {blockOpts.map(b => (
                <option key={b.id} value={b.id}>
                  Block {b.blockNumber}: {b.description}
                </option>
              ))}
            </select>
            {selectedWeek && (
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
                  aria-label="Previous week"
                >
                  &#8592;
                </button>
                <span className="text-zinc-700 dark:text-zinc-300 text-xs font-bold min-w-[60px] text-center">{`Week ${selectedWeek.weekNumber}`}</span>
                <button
                  onClick={() => handleWeekNav(1)}
                  disabled={
                    !selectedBlock ||
                    !selectedWeek ||
                    !selectedBlock.weeks?.length ||
                    String(selectedBlock.weeks[selectedBlock.weeks.length - 1].id) === String(selectedWeek.id)
                  }
                  className="px-2 py-1 text-lg rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50"
                  aria-label="Next week"
                >
                  &#8594;
                </button>
              </>
            )}
          </span>
        )}
      </div>

      {/* Daily exercises grouped by day */}
      <main className="max-w-2xl mx-auto mt-4">
        {Object.entries(byDay).map(([dayName, defs]) => (
          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-8 pb-2" key={dayName}>
            <h2 className="text-md font-bold text-zinc-600 dark:text-zinc-300 mt-6 mb-2">
              {dayName}
              <span className="ml-2 text-xs text-zinc-400">
                {
                  (() => {
                    // Find next date for this weekday starting from today
                    const weekDays = [
                      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                    ];
                    const todayD = new Date();
                    const todayIdx = todayD.getDay();
                    const targetIdx = weekDays.indexOf(dayName);

                    // Days ahead (if already passed, jump to next week)
                    let addDays = targetIdx - todayIdx;
                    if (addDays < 0) addDays += 7;

                    const theDate = new Date(todayD);
                    theDate.setDate(todayD.getDate() + addDays);
                    return theDate.toLocaleDateString();
                  })()
                }
              </span>
            </h2>
            <div className="relative">
              {/* Sticky aligned column headers */}
              <div className="sticky top-[78px] z-10 grid grid-cols-6 gap-2 text-xs md:text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
                <div>Exercise</div>
                <div>Muscle Group</div>
                <div>Reps</div>
                <div>Weight (kg)</div>
                <div>RIR</div>
                <div>Progress</div>
              </div>
              <div>
                {(() => {
                  // Group by exercise name for block display
                  const grouped: { [exKey: string]: ExerciseDef[] } = {};
                  defs.forEach(def => {
                    const key = def.exercise.name + "|" + def.exercise.group;
                    if (!grouped[key]) grouped[key] = [];
                    grouped[key].push(def);
                  });
                  const blocks: React.ReactNode[] = [];
                  Object.entries(grouped).forEach(([exKey, exDefs]) => {
                    blocks.push(
                      <div
                        key={exKey}
                        className="mb-2 px-2 py-2 rounded-md border border-zinc-100 bg-white/60 dark:bg-zinc-900/40 dark:border-zinc-800"
                      >
                        {exDefs.map((def, i) => (
                          <form
                            key={def.id}
                            className={`grid grid-cols-6 gap-2 py-1 items-center ${
                              i !== exDefs.length - 1 ? "border-b border-zinc-50 dark:border-zinc-800" : ""
                            }`}
                            autoComplete="off"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            {/* Only show exercise and group for the first series of each group */}
                            {i === 0 ? (
                              <>
                                <span className="truncate">{def.exercise.name}</span>
                                <span className="truncate">{def.exercise.group}</span>
                              </>
                            ) : (
                              <>
                                <span></span>
                                <span></span>
                              </>
                            )}
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={def.effectiveReps ?? ""}
                              onChange={(e) => handleLocalChange(dayName, defs.indexOf(def), "effectiveReps", e.target.value)}
                              onBlur={(e) => handleBlur(def.id, "effectiveReps", e.target.value)}
                              placeholder={
                                def.lastWeekValues && def.lastWeekValues.effectiveReps != null
                                  ? `Last week: ${def.lastWeekValues.effectiveReps}`
                                  : "Reps"
                              }
                              className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-1 w-full bg-white dark:bg-zinc-800 text-black dark:text-white text-center placeholder-italic placeholder:text-xs"
                              readOnly={false}
                            />
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
                                  ? `Last week: ${def.lastWeekValues.effectiveWeight}`
                                  : "Weight"
                              }
                              className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-1 w-full bg-white dark:bg-zinc-800 text-black dark:text-white text-center placeholder-italic placeholder:text-xs"
                              readOnly={false}
                            />
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={def.effectiveRir ?? ""}
                              onChange={(e) => handleLocalChange(dayName, defs.indexOf(def), "effectiveRir", e.target.value)}
                              onBlur={(e) => handleBlur(def.id, "effectiveRir", e.target.value)}
                              placeholder={
                                def.lastWeekValues && def.lastWeekValues.effectiveRir != null
                                  ? `Last week: ${def.lastWeekValues.effectiveRir}`
                                  : "RIR"
                              }
                              className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-1 w-full bg-white dark:bg-zinc-800 text-black dark:text-white text-center placeholder-italic placeholder:text-xs"
                              readOnly={false}
                            />
                            {/* Progress column */}
                            <Progress 
                              currentReps={def.effectiveReps}
                              currentWeight={def.effectiveWeight}
                              prevReps={def.lastWeekValues?.effectiveReps}
                              prevWeight={def.lastWeekValues?.effectiveWeight}
                            />
                          </form>
                        ))}
                      </div>
                    );
                  });
                  // Progress helper, inlined for now
                  function Progress({
                    currentReps,
                    currentWeight,
                    prevReps,
                    prevWeight,
                  }: {
                    currentReps: number | null,
                    currentWeight: number | null,
                    prevReps: number | null | undefined,
                    prevWeight: number | null | undefined,
                  }) {
                    // Compute evolution for each metric
                    let dReps, dWeight;
                    if (typeof currentReps === "number" && typeof prevReps === "number") {
                      dReps = currentReps - prevReps;
                    }
                    if (typeof currentWeight === "number" && typeof prevWeight === "number") {
                      dWeight = currentWeight - prevWeight;
                    }

                    // Letter color classes
                    let colorR = "text-zinc-700 dark:text-zinc-300";
                    if (dReps !== undefined) {
                      colorR = dReps > 0
                        ? "text-green-700 dark:text-green-400 font-bold"
                        : dReps < 0
                        ? "text-red-700 dark:text-red-400 font-bold"
                        : "text-zinc-700 dark:text-zinc-300";
                    }
                    let colorW = "text-zinc-700 dark:text-zinc-300";
                    if (dWeight !== undefined) {
                      colorW = dWeight > 0
                        ? "text-green-700 dark:text-green-400 font-bold"
                        : dWeight < 0
                        ? "text-red-700 dark:text-red-400 font-bold"
                        : "text-zinc-700 dark:text-zinc-300";
                    }

                    // Arrow/label logic for the joint evolution
                    let arrow = "";
                    let arrowColor = "";

                    // Full logic (both metrics available)
                    if (dReps !== undefined && dWeight !== undefined) {
                      if (dReps > 0 && dWeight > 0) {
                        arrow = "▲";
                        arrowColor = "text-green-800 dark:text-green-400";
                      } else if (
                        (dReps > 0 && dWeight === 0) ||
                        (dReps === 0 && dWeight > 0)
                      ) {
                        arrow = "▲";
                        arrowColor = "text-green-400 dark:text-green-300";
                      } else if (
                        (dReps > 0 && dWeight < 0) ||
                        (dReps < 0 && dWeight > 0)
                      ) {
                        arrow = "↔";
                        arrowColor = "text-orange-500 dark:text-orange-400";
                      } else if (dReps < 0 && dWeight < 0) {
                        arrow = "▼";
                        arrowColor = "text-red-700 dark:text-red-500";
                      } else {
                        arrow = "→";
                        arrowColor = "text-zinc-400";
                      }
                    } else if (dReps !== undefined) {
                      // Only reps available
                      if (dReps > 0) { arrow = "▲"; arrowColor = "text-green-400 dark:text-green-300"; }
                      else if (dReps < 0) { arrow = "▼"; arrowColor = "text-red-700 dark:text-red-500"; }
                      else { arrow = "→"; arrowColor = "text-zinc-400"; }
                    } else if (dWeight !== undefined) {
                      // Only weight available
                      if (dWeight > 0) { arrow = "▲"; arrowColor = "text-green-400 dark:text-green-300"; }
                      else if (dWeight < 0) { arrow = "▼"; arrowColor = "text-red-700 dark:text-red-500"; }
                      else { arrow = "→"; arrowColor = "text-zinc-400"; }
                    } else {
                      return <div></div>;
                    }

                    return (
                      <div className="flex flex-row items-center justify-center gap-1 h-full text-xs md:text-sm">
                        <span className={arrowColor}>{arrow}</span>
                        <span className={colorR}>R</span>
                        <span className="mx-0.5"></span>
                        <span className={colorW}>W</span>
                      </div>
                    );
                  }
                  return blocks;
                })()}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
