"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Container, Paper, Typography, FormControl, Select, MenuItem, InputLabel, Button, IconButton, AppBar, Toolbar, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { translations, Lang } from "../i18n";
import { Progress } from "../components/Progress";
import type { ExerciseDef } from "../../types/ExerciseDef";
import StatusModal from "../components/StatusModal";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type DefByDay = Record<string, ExerciseDef[]>;

// Helper for consistent date formatting DD/MM/YYYY
function formatDateEu(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("T")[0].split("-");
  return [d, m, y].join("/");
}

// Editable day date calendar input
function EditableDayDate({ dayIdx, dayDate, setDayDate, lang }: { dayIdx: number, dayDate: string, setDayDate: (val: string) => void, lang: Lang }) {
  return (
    <TextField
      type="date"
      size="small"
      value={typeof dayDate === "string" ? dayDate : ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDayDate(e.target.value)}
      label={translations[lang].calendarAria(dayIdx)}
      sx={{ width: 140 }}
      InputLabelProps={{ shrink: true }}
    />
  );
}

import AppTheme from "../theme/AppTheme";

export default function TrainingSchedule() {
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
  const [creatingBlock, setCreatingBlock] = useState(false);
  const [blockCreated, setBlockCreated] = useState(false);
  const [lang, setLang] = useState<Lang>("es");

  // Load user info (including isocode) once on mount
  useEffect(() => {
    fetch("/api/get-user-id")
      .then(r => r.json())
      .then((d) => {
        setUserInfo({
          id: d.id,
          name: translations[d.isocode as Lang]?.nameDefault || d.name,
          isocode: d.isocode || "en",
          lastVisitedWeek: d.lastVisitedWeek || null,
        });
        setLang((d.isocode || "es") as Lang);

        // If user has lastVisitedWeek, use it
        if (d.lastVisitedWeek) {
          setWeekId(d.lastVisitedWeek);
        }
      });
  }, []);

  // Handler for language change
  const handleLangChange = (e: SelectChangeEvent) => {
    const newIso = e.target.value as Lang;
    setLang(newIso);
    setUserInfo(info => info ? { ...info, isocode: newIso } : info);
    if (userInfo?.id) {
      fetch("/api/get-user-id", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userInfo.id, isocode: newIso })
      });
    }
  };

  // Dummy modal example for now (normally should reflect loading/creating states)
  const statusModalOpen = loading || creatingBlock;
  const statusModalMsg = creatingBlock 
    ? translations[lang].creatingBlock || "Creando bloque..." 
    : translations[lang].loadingScheduledTraining || "Cargando entrenamiento...";
  const statusModalIcon = <span role="img" aria-label="info">ℹ️</span>;

  // Debug: track when we expect to fetch training data
  useEffect(() => {
    console.log("[DEBUG] useEffect for training-data fired", { userId: userInfo?.id, weekId });
    if (!userInfo?.id) {
      console.log("[DEBUG] No user id, not fetching training-data");
      return;
    }
    const endpoint = `/api/training-data?userId=${userInfo.id}${weekId ? "&weekId=" + weekId : ""}`;
    console.log("[DEBUG] Attempting fetch to", endpoint);
    setLoading(true);
    fetch(endpoint)
      .then(async r => {
        try {
          return await r.json();
        } catch {
          return {};
        }
      })
      .then((data) => {
        console.log("[DEBUG] training-data response", data);
        // ... handle the rest as before
        // Restore state-setting logic for visual debug
        setBlockOpts(data.blocks || []);
        setSelectedBlock(data.selectedBlock || null);
        setSelectedWeek(data.selectedWeek || null);
        setExerciseDefs(data.exerciseDefs || []);
        // Optionally: set dayDates and trainingDayIds if data.trainingDays exists
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
      .catch((err) => {
        console.error("[DEBUG] ERROR fetching training-data", err);
      })
      .finally(() => setLoading(false));
      // eslint-disable-next-line
  }, [userInfo?.id, weekId]);

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

  return (
    <AppTheme>
      <StatusModal
        open={statusModalOpen}
        icon={statusModalIcon}
        message={statusModalMsg}
        color="blue"
      />
      <Box sx={{ minHeight: "100vh" }}>
        {/* Banner/Header with Logo & Language selector */}
        <AppBar position="static" color="default" elevation={2} sx={{ mb: 4 }}>
          <Toolbar sx={{ justifyContent: "center", position: "relative" }}>
            <Image src="/globe.svg" alt="Logo" width={48} height={48} />
            <Typography variant="h5" fontWeight="bold" sx={{ ml: 2, flexGrow: 1, color: "text.primary" }}>
              {translations[lang].dashboardTitle}
            </Typography>
            <Box position="absolute" right={16} display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                {translations[lang].language}:
              </Typography>
              <FormControl variant="outlined" size="small">
                <InputLabel id="lang-sel-label">{translations[lang].language}</InputLabel>
                <Select
                  labelId="lang-sel-label"
                  id="lang-sel"
                  value={lang}
                  onChange={handleLangChange}
                  label={translations[lang].language}
                  sx={{ minWidth: 90 }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Next steps: migrate sticky athlete info, block/week selectors, tables to MUI */}
        {/* Block & Week Selectors */}
        <Box sx={{ position: 'sticky', top: 72, zIndex: 10, bgcolor: 'background.default', pt: 2, pb: 2, mb: 3, borderBottom: '1px solid', borderColor: 'divider', boxShadow: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            {/* Block selector */}
            {selectedBlock && (
              <FormControl size="small" sx={{ minWidth: 210 }}>
                <InputLabel id="block-sel-label">{translations[lang].block}</InputLabel>
                <Select
                  labelId="block-sel-label"
                  id="block-sel"
                  value={selectedBlock.id}
                  label={translations[lang].block}
                  onChange={e => handleBlockChange(e.target.value)}
                >
                  {blockOpts.map(b => (
                    <MenuItem key={b.id} value={b.id}>
                      {`${translations[lang].block} ${b.blockNumber}: ${b.description}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {/* Week navigation */}
            {selectedBlock && selectedWeek && (
              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleWeekNav(-1)}
                  disabled={
                    !selectedBlock ||
                    !selectedWeek ||
                    !selectedBlock.weeks?.length ||
                    String(selectedBlock.weeks[0].id) === String(selectedWeek.id)
                  }
                  aria-label={translations[lang].previousWeek}
                >&larr;</Button>
                <Typography variant="body1" fontWeight="bold" sx={{ minWidth: 80, textAlign: "center" }}>
                  {`${translations[lang].week} ${selectedWeek.weekNumber}`}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleWeekNav(1)}
                  disabled={
                    !selectedBlock ||
                    !selectedWeek ||
                    !selectedBlock.weeks?.length ||
                    String(selectedBlock.weeks[selectedBlock.weeks.length - 1].id) === String(selectedWeek.id)
                  }
                  aria-label={translations[lang].nextWeek}
                >&rarr;</Button>
              </Box>
            )}
          </Box>
        </Box>
        {/* --- Training days and exercises per series with editable inputs (MUI translation) --- */}
        <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 3 }}>
          {(() => {
            // Group exerciseDefs by day
            const byDay: DefByDay = {};
            exerciseDefs.forEach((def: any) => {
              if (!byDay[def.day]) byDay[def.day] = [];
              byDay[def.day].push(def);
            });
            return Object.entries(byDay).map(([dayName, defs], dayIdx) => (
              <Box key={dayName} sx={{ mb: 4, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    position: "sticky",
                    top: { xs: 130, md: 112 },
                    zIndex: 20,
                    bgcolor: "background.default",
                    boxShadow: 1,
                    pb: 1,
                  }}
                >
                  {`${translations[lang].day} ${dayIdx + 1}`}
                  <EditableDayDate
                    dayIdx={dayIdx}
                    dayDate={dayDates[dayIdx]}
                    setDayDate={async (val: string) => {
                      setDayDates(dates => {
                        const copy = [...dates];
                        copy[dayIdx] = val;
                        return copy;
                      });
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
                </Typography>
                <Box>
                  {(() => {
                    const grouped: Record<string, any[]> = {};
                    defs.forEach((def: any) => {
                      const key = def.exercise.name + "|" + def.exercise.group;
                      if (!grouped[key]) grouped[key] = [];
                      grouped[key].push(def);
                    });
                    return Object.entries(grouped).map(([exKey, exDefs]) => (
                      <React.Fragment key={exKey}>
                        <Box sx={{ mb: 0, p: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                          <Typography variant="subtitle1" fontWeight="bold">{exDefs[0].exercise.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{exDefs[0].exercise.group}</Typography>
                          {exDefs[0].athleteNotes && exDefs[0].athleteNotes.trim() !== "" && (
                            <Box sx={{ mt: 1, px: 2, py: 1, borderRadius: 1, bgcolor: 'primary.light', color: 'primary.main', }}>
                              <span role="img" aria-label="info">ℹ️</span> {exDefs[0].athleteNotes}
                            </Box>
                          )}
                        </Box>
                        <TableContainer component={Box} sx={{ boxShadow: 'none', mb: 2, mt: 1, maxWidth: '100%' }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center" sx={{ width: 28 }}>{translations[lang].ds}</TableCell>
                                <TableCell align="center">{translations[lang].weight}</TableCell>
                                <TableCell align="center">{translations[lang].reps}</TableCell>
                                <TableCell align="center">{translations[lang].rir}</TableCell>
                                <TableCell align="center">{translations[lang].progress}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {exDefs.map((def: any, i: number) => (
                                <TableRow key={def.id}>
                                  <TableCell align="center">
                                    {def.isDropset ? <span title="Dropset">🔥</span> : null}
                                  </TableCell>
                                  <TableCell align="center">
                                    <TextField
                                      // Use text to avoid up/down browser arrows, accept empty string as valid value
                                      type="text"
                                      inputProps={{ inputMode: "decimal", pattern: "[0-9]*" }}
                                      value={def.effectiveWeight ?? ""}
                                      onChange={e => handleLocalChange(dayName, defs.indexOf(def), "effectiveWeight", e.target.value)}
                                      onBlur={e => handleBlur(def.id, "effectiveWeight", e.target.value)}
                                      placeholder={
                                        def.lastWeekValues && def.lastWeekValues.effectiveWeight != null
                                          ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveWeight}`
                                          : translations[lang].weight
                                      }
                                      variant="standard"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <TextField
                                      // Use text to avoid up/down browser arrows, accept empty string as valid value
                                      type="text"
                                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                      value={def.effectiveReps ?? ""}
                                      onChange={e => handleLocalChange(dayName, defs.indexOf(def), "effectiveReps", e.target.value)}
                                      onBlur={e => handleBlur(def.id, "effectiveReps", e.target.value)}
                                      placeholder={
                                        def.lastWeekValues && def.lastWeekValues.effectiveReps != null
                                          ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveReps}`
                                          : translations[lang].reps
                                      }
                                      variant="standard"
                                      size="small"
                                    />
                                    {(def.minReps != null && def.maxReps != null) && (
                                      <span style={{ marginLeft: 4, fontSize: "0.85em", color: "#888" }}>
                                        {def.minReps}&ndash;{def.maxReps}
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell align="center">
                                    <TextField
                                      // Use text to avoid up/down browser arrows, accept empty string as valid value
                                      type="text"
                                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                      value={def.effectiveRir ?? ""}
                                      onChange={e => handleLocalChange(dayName, defs.indexOf(def), "effectiveRir", e.target.value)}
                                      onBlur={e => handleBlur(def.id, "effectiveRir", e.target.value)}
                                      placeholder={
                                        def.lastWeekValues && def.lastWeekValues.effectiveRir != null
                                          ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveRir}`
                                          : translations[lang].rir
                                      }
                                      variant="standard"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <Progress
                                      currentWeight={def.effectiveWeight}
                                      currentReps={def.effectiveReps}
                                      prevWeight={def.lastWeekValues?.effectiveWeight}
                                      prevReps={def.lastWeekValues?.effectiveReps}
                                      lang={lang}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </React.Fragment>
                    ));
                  })()}
                </Box>
              </Box>
            ));
          })()}
        </Box>
      </Box>
    </AppTheme>
  );
}
