"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AthleteAutocomplete from "../components/AthleteAutocomplete";

type User = { id: string; name: string; role: string; };
type Exercise = { id: string; name: string; group: string; };

export default function BlockWizard() {
  const [step, setStep] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [numWeeks, setNumWeeks] = useState(4);
  const [blockName, setBlockName] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem('daysPerWeek')) {
      return Number(window.sessionStorage.getItem('daysPerWeek'));
    }
    return 3;
  });
  const [lang, setLang] = useState<"en"|"es">("en");
  // entries is now array of arrays: days x exercises
  const [exerciseEntriesByDay, setExerciseEntriesByDay] = useState<any[][]>(() =>
    Array.from({ length: 3 }, () => [])
  );
  const [status, setStatus] = useState<string | null>(null);
  const [creationLogs, setCreationLogs] = useState<any[] | null>(null);
  const router = useRouter();

  // Adapt on daysPerWeek change (add/remove days)
  useEffect(() => {
    setExerciseEntriesByDay((prev) => {
      const arr = prev.slice(0, daysPerWeek);
      while (arr.length < daysPerWeek) arr.push([]);
      return arr;
    });
  }, [daysPerWeek]);

  useEffect(() => {
    fetch("/api/get-user-id?list=1")
      .then(r => r.json())
      .then(arr => setUsers(Array.isArray(arr) ? arr : []));
    fetch("/api/exercise-definitions?distinct=1")
      .then(r => r.json())
      .then(arr => setAllExercises(Array.isArray(arr) ? arr : []));
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    fetch(`/api/training-data?userId=${selectedUser.id}`)
      .then(r => r.json())
      .then(data => {
        const blockCount = Array.isArray(data?.blocks) ? data.blocks.length : 0;
        const nextNum = blockCount + 1;
        if (!blockName || /^Block \d+$|^Bloque \d+$/.test(blockName)) {
          setBlockName(lang === "es" ? `Bloque ${nextNum}` : `Block ${nextNum}`);
        }
      });
  }, [selectedUser, lang]);

  function addExercise(dayIdx: number) {
    setExerciseEntriesByDay(entries =>
      entries.map((arr, idx) =>
        idx === dayIdx
          ? [
              ...arr,
              {
                exerciseId: "",
                exerciseInfo: null,
                numSeries: 1,
                series: [
                  { minReps: 8, maxReps: 12, notes: "", isDropset: false }
                ],
                // Optionally more day-specific props
              }
            ]
          : arr
      )
    );
  }

  function updateExercise(dayIdx: number, exIdx: number, newData: Partial<any>) {
    setExerciseEntriesByDay(entries =>
      entries.map((arr, idx) =>
        idx === dayIdx
          ? arr.map((ex, i) => (i === exIdx ? { ...ex, ...newData } : ex))
          : arr
      )
    );
  }

  function updateSeries(dayIdx: number, exIdx: number, sIdx: number, newData: Partial<any>) {
    setExerciseEntriesByDay(entries =>
      entries.map((arr, idx) =>
        idx === dayIdx
          ? arr.map((ex, i) =>
              i === exIdx
                ? {
                    ...ex,
                    series: ex.series.map((ser: any, j: number) => (j === sIdx ? { ...ser, ...newData } : ser)),
                  }
                : ex
            )
          : arr
      )
    );
  }

  async function handleSubmit() {
    setStatus("Creating block...");
    setCreationLogs(null);
    const res = await fetch("/api/wizard-create-block", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser?.id,
        name: blockName,
        numWeeks,
        daysPerWeek,
        exercisesByDay: exerciseEntriesByDay,
      })
    });
    if (res.ok) {
      const result = await res.json();
      setStatus("Created block!");
      setCreationLogs(Array.isArray(result.logs) ? result.logs : null);
      setTimeout(() => router.push("/menu"), 3500);
    } else {
      setStatus("Failed to create block. " + (await res.text()));
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white dark:bg-zinc-900 border rounded shadow flex flex-col">
      <h1 className="text-xl font-semibold mb-6">Block Creation Wizard</h1>
      {step === 0 && (
        <>
          <h2 className="font-semibold mb-4">Step 1: Select Athlete</h2>
          {users.length === 0 && <div>Loading athletes...</div>}
          {/* Autocomplete Athlete Selector */}
          <AthleteAutocomplete
            users={users.filter(u => u.role === "athlete").sort((a, b) => a.name.localeCompare(b.name))}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <button
            disabled={!selectedUser}
            className="px-4 py-1 rounded bg-blue-500 text-white font-semibold disabled:opacity-60"
            onClick={() => setStep(1)}
          >
            Next
          </button>
        </>
      )}


      {step === 1 && (
        <>
          <h2 className="font-semibold mb-4">Step 2: Block Configuration</h2>
          <label className="block font-semibold">Block Name:</label>
          <input
            type="text"
            className="p-2 rounded border w-full mb-3"
            value={blockName}
            onChange={e => setBlockName(e.target.value)}
          />
          <label className="block font-semibold">Number of Weeks:</label>
          <input
            type="number"
            className="p-2 rounded border w-full mb-3"
            value={numWeeks}
            min={1}
            max={12}
            onChange={e => setNumWeeks(Number(e.target.value))}
          />
          <label className="block font-semibold">Days Per Week:</label>
          <input
            type="number"
            className="p-2 rounded border w-full mb-6"
            value={daysPerWeek}
            min={1}
            max={7}
            onChange={e => {
              const val = Number(e.target.value);
              setDaysPerWeek(val);
              if (typeof window !== "undefined") window.sessionStorage.setItem('daysPerWeek', String(val));
            }}
          />
          <button
            className="mr-2 px-4 py-1 rounded bg-zinc-200 dark:bg-zinc-700"
            onClick={() => setStep(0)}
          >Back</button>
          <button
            className="px-4 py-1 rounded bg-blue-500 text-white font-semibold"
            onClick={() => setStep(2)}
            disabled={!blockName || numWeeks < 1}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="font-semibold mb-4">Step 3: Configure Exercises</h2>
          {exerciseEntriesByDay.map((dayArr, dayIdx) => (
            <div key={dayIdx} className="mb-6 border border-zinc-100 rounded bg-zinc-50 dark:bg-zinc-800 p-3">
              <h3 className="font-bold mb-2">Day {dayIdx + 1}</h3>
              {dayArr.map((ex, exIdx) => (
                <div key={exIdx} className="border rounded bg-zinc-100 dark:bg-zinc-900 p-2 mb-2">
                  <label className="block font-semibold">Exercise:</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="p-2 rounded border w-full mb-2"
                      type="text"
                      placeholder="Search exercises..."
                      autoComplete="off"
                      value={
                        typeof ex.exerciseSearch === "string"
                          ? ex.exerciseSearch
                          : (ex.exerciseInfo && ex.exerciseInfo.name) ||
                            (ex.exerciseId && allExercises.find(e => e.id === ex.exerciseId)?.name) ||
                            ""
                      }
                      onChange={e => {
                        const val = e.target.value;
                        updateExercise(dayIdx, exIdx, {
                          exerciseSearch: val,
                          exerciseId: "",
                          exerciseInfo: null,
                          showAuto: true,
                          autoIndex: 0,
                        });
                      }}
                      onFocus={() => updateExercise(dayIdx, exIdx, { showAuto: true })}
                      onBlur={e => setTimeout(() => updateExercise(dayIdx, exIdx, { showAuto: false }), 200)}
                      onKeyDown={e => {
                        let filtered = allExercises
                          .filter(
                            ae =>
                              !ex.exerciseSearch ||
                              ae.name.toLowerCase().includes(ex.exerciseSearch.toLowerCase()) ||
                              ae.group.toLowerCase().includes(ex.exerciseSearch.toLowerCase())
                          )
                          .slice(0, 20);
                        const maxIdx = filtered.length - 1;
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          updateExercise(dayIdx, exIdx, { autoIndex: ex.autoIndex == null ? 0 : Math.min(maxIdx, (ex.autoIndex ?? 0) + 1) });
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          updateExercise(dayIdx, exIdx, { autoIndex: ex.autoIndex == null ? 0 : Math.max(0, (ex.autoIndex ?? 0) - 1) });
                        } else if (e.key === "Enter") {
                          if (ex.showAuto && filtered.length > 0 && typeof ex.autoIndex === "number") {
                            const eOpt = filtered[ex.autoIndex];
                            if (eOpt) {
                              updateExercise(dayIdx, exIdx, {
                                exerciseId: eOpt.id,
                                exerciseInfo: eOpt,
                                exerciseSearch: eOpt.name,
                                showAuto: false,
                              });
                            }
                          }
                        } else if (e.key === "Escape") {
                          updateExercise(dayIdx, exIdx, { showAuto: false });
                          (e.target as HTMLInputElement).blur();
                        }
                      }}
                    />
                    {ex.showAuto && (
                      <div
                        style={{
                          position: "absolute",
                          background: "white",
                          border: "1px solid #ddd",
                          zIndex: 50,
                          width: "100%",
                          maxHeight: 180,
                          overflowY: "auto",
                        }}
                      >
                        {(allExercises
                          .filter(
                            ae =>
                              !ex.exerciseSearch ||
                              ae.name.toLowerCase().includes(ex.exerciseSearch.toLowerCase()) ||
                              ae.group.toLowerCase().includes(ex.exerciseSearch.toLowerCase())
                          )
                          .slice(0, 20)
                        ).map((eOpt, optionIdx) => (
                          <div
                            key={eOpt.id}
                            style={{
                              padding: "6px 12px",
                              cursor: "pointer",
                              background:
                                ex.autoIndex === optionIdx
                                  ? "#dbeafe"
                                  : ex.exerciseId === eOpt.id
                                  ? "#e7f0fc"
                                  : "white",
                            }}
                            onMouseDown={() => {
                              updateExercise(dayIdx, exIdx, {
                                exerciseId: eOpt.id,
                                exerciseInfo: eOpt,
                                exerciseSearch: eOpt.name,
                                showAuto: false,
                              });
                            }}
                          >
                            {eOpt.name}
                            <span className="text-zinc-400 ml-2 text-xs">({eOpt.group})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <label className="block font-semibold mb-1">Number of Series:</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={ex.numSeries}
                    onChange={e => {
                      const num = Number(e.target.value);
                      updateExercise(dayIdx, exIdx, {
                        numSeries: num,
                        series: Array.from({ length: num }, (_, i) =>
                          ex.series[i] || { minReps: 8, maxReps: 12, notes: "", isDropset: false }
                        )
                      });
                    }}
                    className="p-2 rounded border w-[80px] mb-2"
                  />
                  {ex.series.map((ser: any, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="flex flex-row gap-3 items-center text-xs border border-zinc-200 dark:border-zinc-700 rounded p-2 mb-2 bg-zinc-100 dark:bg-zinc-900"
                    >
                      <div>Series #{sIdx + 1}</div>
                      <input
                        type="number"
                        value={ser.minReps}
                        min={1} max={50}
                        onChange={e => updateSeries(dayIdx, exIdx, sIdx, { minReps: Number(e.target.value) })}
                        className="w-[50px] px-2 rounded border"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={ser.maxReps}
                        min={ser.minReps || 1}
                        max={50}
                        onChange={e => updateSeries(dayIdx, exIdx, sIdx, { maxReps: Number(e.target.value) })}
                        className="w-[50px] px-2 rounded border"
                      />
                      <span className="ml-2">Reps</span>
                      <input
                        type="text"
                        placeholder="Notes or cues"
                        className="ml-4 px-2 py-1 rounded border"
                        value={ser.trainerNotes ?? ""}
                        onChange={e => updateSeries(dayIdx, exIdx, sIdx, { trainerNotes: e.target.value })}
                      />
                      <label className="ml-2">
                        <input
                          type="checkbox"
                          checked={!!ser.isDropset}
                          onChange={e => updateSeries(dayIdx, exIdx, sIdx, { isDropset: e.target.checked })}
                        /> Dropset
                      </label>
                    </div>
                  ))}
                  <button
                    className="px-2 py-1 bg-red-200 rounded text-xs font-semibold mt-2"
                    onClick={() => setExerciseEntriesByDay(entries =>
                      entries.map((arr, idx) =>
                        idx === dayIdx ? arr.filter((_, i) => i !== exIdx) : arr
                      )
                    )}
                  >
                    Remove Exercise
                  </button>
                </div>
              ))}
              <button
                className="px-3 py-1 bg-green-600 text-white rounded font-semibold mb-2"
                onClick={() => addExercise(dayIdx)}
              >
                + Add Exercise
              </button>
            </div>
          ))}
          <div>
            <button
              className="mr-2 px-4 py-1 rounded bg-zinc-200 dark:bg-zinc-700"
              onClick={() => setStep(1)}
            >Back</button>
            <button
              className="px-4 py-1 rounded bg-blue-600 text-white font-semibold"
              onClick={() => setStep(3)}
              disabled={exerciseEntriesByDay.flat().length === 0 || exerciseEntriesByDay.some(arr => arr.some(e => !e.exerciseId || e.numSeries < 1))}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="font-semibold mb-4">Step 4: Review and Create</h2>
          <div className="mb-4">
            <strong>Athlete:</strong> {selectedUser?.name} <br />
            <strong>Block Name:</strong> {blockName} <br />
            <strong>Weeks:</strong> {numWeeks} <br />
            <strong>Days/Week:</strong> {daysPerWeek} <br />
            <strong>Exercises per day:</strong>
            <ul className="ml-4">
              {exerciseEntriesByDay.map((arr, dayIdx) =>
                arr.length > 0 ? (
                  <li key={dayIdx}>
                    <b>Day {dayIdx + 1}:</b>
                    <ul>
                      {arr.map((ex, idx) => (
                        <li key={idx}>
                          {allExercises.find(e => e.id === ex.exerciseId)?.name || "??"} <span className="text-zinc-400">({ex.numSeries} series)</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <button
            className="mr-2 px-4 py-1 rounded bg-zinc-200 dark:bg-zinc-700"
            onClick={() => setStep(2)}
          >Back</button>
          <button
            className="px-4 py-1 rounded bg-green-600 text-white font-semibold"
            onClick={handleSubmit}
          >Create Block</button>
          {status && <div className="mt-3">{status}</div>}
          {creationLogs && (
            <div className="mt-6">
              <div className="font-semibold mb-2">Creation Log</div>
              <div className="overflow-x-auto">
                <table className="text-xs border border-zinc-300 bg-white">
                  <thead>
                    <tr>
                      <th className="border px-2">Day #</th>
                      <th className="border px-2">Day ID</th>
                      <th className="border px-2">Exercise #</th>
                      <th className="border px-2">Exercise ID</th>
                      <th className="border px-2">Exercise Name</th>
                      <th className="border px-2">Series #</th>
                      <th className="border px-2">Series ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creationLogs.map((log, idx) => (
                      <tr key={idx}>
                        <td className="border px-2">{log.dayNumber}</td>
                        <td className="border px-2">{log.dayId}</td>
                        <td className="border px-2">{log.exerciseNumber}</td>
                        <td className="border px-2">{log.exerciseId}</td>
                        <td className="border px-2">{log.exerciseName}</td>
                        <td className="border px-2">{log.seriesNumber}</td>
                        <td className="border px-2">{log.seriesId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
