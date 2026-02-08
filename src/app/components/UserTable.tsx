"use client";
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, Typography, Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, Tabs, Tab, CircularProgress, TextField, Select, MenuItem, Menu, Switch, FormControl, InputLabel, Popover } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationSnackbar from "./NotificationSnackbar";
import MeasurementsTable from "./MeasurementsTable";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EuroIcon from "@mui/icons-material/Euro";
import MuscleGroupBadges from "./MuscleGroupBadges";

import { useRef } from "react";

function EditableDropdownField({
  label, value, options, userId, onUpdated, forceRefresh, lang, setNotification, field
}: {
  label: string,
  value: string,
  options: Array<{ value: string, label: string }>,
  userId: string,
  onUpdated: (val: string) => void,
  forceRefresh: () => void,
  lang: Lang,
  setNotification: (obj: { type: "success" | "error"; message: string }) => void,
  field: string
}) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTemp(value || "");
  }, [value]);

  const doPatch = async (incoming: string) => {
    if (incoming === value) {
      setEditing(false);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/update-user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: incoming }),
    });
      setLoading(false);
      if (res.ok) {
        onUpdated(incoming);
        setEditing(false);
        forceRefresh();
        setNotification({ type: "success", message: lang === "es" ? "Campo actualizado correctamente" : "Field updated successfully" });
      } else {
        setNotification({ type: "error", message: lang === "es" ? "Error al actualizar el campo" : "Failed to update field" });
      }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <strong>{label}:</strong>
      {editing ? (
        <Select
          size="small"
          value={temp}
          onChange={e => {
            setTemp(e.target.value);
            doPatch(e.target.value);
          }}
          onBlur={() => setEditing(false)}
          sx={{ ml: 1, minWidth: 120 }}
          autoFocus
        >
          {options.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      ) : (
        <Typography
          sx={{
            ml: 1,
            minWidth: 120,
            display: "inline-block",
            textDecoration: "underline dotted",
            cursor: "pointer",
            color: "#1976d2"
          }}
          onClick={() => setEditing(true)}
          tabIndex={0}
          role="button"
          title={translations[lang].editFrequencyTooltip}
        >
          {(options.find(o => o.value === value)?.label ?? translations[lang].emptyValue)}
        </Typography>
      )}
      {loading && <CircularProgress size={18} />}
    </Box>
  );
}

function EditableNumberField({
  label, value, userId, onUpdated, forceRefresh, lang, setNotification, field
}: {
  label: string,
  value: number,
  userId: string,
  onUpdated: (val: number) => void,
  forceRefresh: () => void,
  lang: Lang,
  setNotification: (obj: { type: "success" | "error"; message: string }) => void,
  field: string
}) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value === null || value === undefined ? "" : value.toString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTemp(value === null || value === undefined ? "" : value.toString());
  }, [value]);

  const doPatch = async () => {
    const parsed = parseFloat(temp);
    if (!isFinite(parsed)) {
      setEditing(false);
      return;
    }
    if (parsed === value) {
      setEditing(false);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/update-user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: parsed }),
    });
    setLoading(false);
    if (res.ok) {
      onUpdated(parsed);
      setEditing(false);
      forceRefresh();
      setNotification({ type: "success", message: lang === "es" ? "Campo actualizado correctamente" : "Field updated successfully" });
    } else {
      setNotification({ type: "error", message: lang === "es" ? "Error al actualizar el campo" : "Failed to update field" });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <strong>{label}:</strong>
      {editing ? (
        <TextField
          type="number"
          size="small"
          value={temp}
          onChange={e => setTemp(e.target.value)}
          onBlur={doPatch}
          onKeyDown={e => {
            if (e.key === "Enter") {
              doPatch();
            } else if (e.key === "Escape") {
              setEditing(false);
              setTemp(value?.toString() ?? "");
            }
          }}
          autoFocus
          sx={{ width: 90 }}
          inputProps={{ min: 0, step: "0.01" }}
        />
      ) : (
        <Typography
          sx={{
            ml: 1,
            minWidth: 90,
            display: "inline-block",
            textDecoration: "underline dotted",
            cursor: "pointer",
            color: "#1976d2"
          }}
          onClick={() => setEditing(true)}
          tabIndex={0}
          role="button"
          title={translations[lang].editAmountTooltip}
        >
          {value !== null && value !== undefined
            ? Number(value).toFixed(2)
            : translations[lang].emptyValue}
        </Typography>
      )}
      {loading && <CircularProgress size={18} />}
    </Box>
  );
}

function EditableUserField({ label, value, field, userId, onUpdated, forceRefresh, lang, setNotification }: {
  label: string,
  value: string,
  field: "username" | "email" | "firstName" | "lastName",
  userId: string,
  onUpdated: (val: string) => void,
  forceRefresh: () => void,
  lang: Lang,
  setNotification: (val: { type: "success" | "error"; message: string }) => void
}) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTemp(value || "");
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const doPatch = async () => {
    if (temp === value) {
      setEditing(false);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/update-user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: temp }),
    });
    setLoading(false);
    if (res.ok) {
      onUpdated(temp);
      setEditing(false);
      forceRefresh();
    } else {
      let msg = "";
      try {
        const out = await res.json();
        if (out && out.error === "email_taken") {
          msg = translations[lang].emailTakenError;
        } else if (out && out.error === "username_taken") {
          msg = translations[lang].usernameTakenError;
        }
      } catch {}
      if (!msg) {
        msg = lang === "es" ? "Error al actualizar el usuario. Inténtalo de nuevo o recarga la página." : "Error updating user. Please try again or reload the page.";
      }
      setNotification({ type: "error", message: msg });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <strong>{label}:</strong>
      {editing ? (
        <TextField
          size="small"
          variant="standard"
          value={temp}
          disabled={loading}
          inputRef={inputRef}
          onChange={e => setTemp(e.target.value)}
          onBlur={doPatch}
          onKeyDown={e => {
            if (e.key === "Enter") {
              doPatch();
            } else if (e.key === "Escape") {
              setEditing(false);
              setTemp(value);
            }
          }}
          sx={{ ml: 1, minWidth: 140 }}
        />
      ) : (
        <Typography
          sx={{
            ml: 1,
            minWidth: 140,
            display: "inline-block",
            textDecoration: "underline dotted",
            cursor: "pointer",
            color: "#1976d2"
          }}
          onClick={() => setEditing(true)}
          tabIndex={0}
          role="button"
          title={translations[lang].editFieldTooltip}
        >
          {value}
        </Typography>
      )}
      {loading && <CircularProgress size={18} />}
    </Box>
  );
}

function TrainingTab({ userId, lang }: { userId: string, lang: Lang }) {
  const [blocks, setBlocks] = React.useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = React.useState<any | null>(null);
  const [trainingDays, setTrainingDays] = React.useState<any[]>([]);
  const [exerciseSeries, setExerciseSeries] = React.useState<any[]>([]);
  const [weekDialog, setWeekDialog] = React.useState<{open: boolean, week: any | null}>({ open: false, week: null });
  const [notesPopover, setNotesPopover] = React.useState<{ anchorEl: HTMLElement | null, notes: string }>({ anchorEl: null, notes: "" });

  // Always fetch all blocks for this athlete on mount, but per-block data when block changes
  React.useEffect(() => {
    fetch(`/api/training-data?userId=${userId}`)
      .then(r => r.json())
      .then((data) => {
        if (Array.isArray(data.blocks)) {
          setBlocks(data.blocks);
          setSelectedBlock(data.blocks.length > 0 ? data.blocks[data.blocks.length - 1] : null);
        }
      });
  }, [userId]);

  React.useEffect(() => {
    // Fetch block-specific details (weeks, trainingDays, exerciseDefs) each time the selected block changes
    if (!selectedBlock) {
      setTrainingDays([]);
      setExerciseSeries([]);
      return;
    }
    fetch(`/api/training-data?userId=${userId}&blockId=${selectedBlock.id}`)
      .then(r => r.json())
      .then((data) => {
        // Update block weeks structure directly from response, for consistency
        if (Array.isArray(data.selectedBlock?.weeks)) {
          // we could update block in place, but only setTrainingDays/series since block list always loaded above
        }
        if (Array.isArray(data.trainingDays)) {
          setTrainingDays(data.trainingDays);
        }
        if (Array.isArray(data.exerciseDefs)) {
          setExerciseSeries(data.exerciseDefs);
        }
      });
  }, [selectedBlock, userId]);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ maxWidth: 320 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="block-selector-label">{translations[lang].block}</InputLabel>
          <Select
            labelId="block-selector-label"
            label={translations[lang].block}
            value={selectedBlock ? selectedBlock.id : ""}
            onChange={e => {
              const blk = blocks.find(b => String(b.id) === String(e.target.value));
              setSelectedBlock(blk || null);
            }}
            MenuProps={{
              PaperProps: {
                style: { minWidth: 250 }
              }
            }}
          >
            {blocks
              .slice()
              .sort((a, b) => b.blockNumber - a.blockNumber)
              .map(b => {
                // Calculate block progress (sum completed and total series for all weeks in block)
                const weeks = Array.isArray(b.weeks) ? b.weeks : [];
                let totalCompleted = 0;
                let totalSeries = 0;
                weeks.forEach((w: { numExerciseSeriesCompleted?: number, numExerciseSeriesTotal?: number }) => {
                  totalCompleted += Number(w.numExerciseSeriesCompleted || 0);
                  totalSeries += Number(w.numExerciseSeriesTotal || 0);
                });
                const percent = totalSeries > 0 ? Math.round((totalCompleted / totalSeries) * 100) : 0;
                return (
                  <MenuItem key={b.id} value={b.id} divider>
                    <Box sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.3,
                    }}>
                      <Box sx={{
                        fontWeight: 500,
                        minWidth: 70,
                        flex: "none",
                        whiteSpace: "nowrap",
                      }}>
                        {translations[lang].block} {b.blockNumber}
                      </Box>
                      <Box sx={{
                        position: "relative",
                        height: 13,
                        width: 88,
                        minWidth: 66,
                        maxWidth: 125,
                        bgcolor: "#eee",
                        borderRadius: 1,
                        overflow: "hidden",
                        mx: 0.5,
                        flex: "0 0 88px"
                      }}>
                        <Box sx={{
                          width: `${percent}%`,
                          height: "100%",
                          background: "#4caf50",
                          borderRadius: 1,
                          transition: "width 0.35s"
                        }} />
                        <Box sx={{
                          position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: percent > 45 ? "#fff" : "#333",
                          fontSize: "0.89em",
                          fontWeight: 600,
                          pointerEvents: "none",
                          zIndex: 1,
                          textShadow: percent > 40 ? "0 1px 2px rgba(0,0,0,0.27)" : "none"
                        }}>
                          {percent}{translations[lang].percentLabel}
                        </Box>
                      </Box>
                      <Box sx={{
                        fontSize: "0.87em",
                        minWidth: 36,
                        color: percent > 60 ? "#168C1f" : "#444",
                        fontWeight: 500,
                        textAlign: "right",
                        flex: "none",
                        whiteSpace: "nowrap"
                      }}>
                        {totalCompleted}/{totalSeries}
                      </Box>
                    </Box>
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
      {/* Block details: weeks progress table */}
      {selectedBlock?.weeks && selectedBlock.weeks.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, fontWeight: 500 }}>
            {translations[lang].muscleGroupsLabel}
          </Typography>
          <MuscleGroupBadges exerciseSeries={exerciseSeries} lang={lang} />
          {(() => {
            // Build trainingDaysByWeekId mapping for current block
            const trainingDaysByWeekId: Record<string, any[]> = {};
            trainingDays.forEach((td) => {
              if (!td.weekId) return;
              if (!trainingDaysByWeekId[td.weekId]) trainingDaysByWeekId[td.weekId] = [];
              trainingDaysByWeekId[td.weekId].push(td);
            });

            // For the weeks in the selected block, find dayNumbers across all weeks
            const uniqueDayNumbers: Set<number> = new Set();
            selectedBlock.weeks.forEach((week: any) => {
              const tds = trainingDaysByWeekId[week.id] || [];
              tds.forEach(td => {
                if (typeof td.dayNumber === "number") uniqueDayNumbers.add(td.dayNumber);
              });
            });

            // Sort dayNumbers as columns
            const dayNumbersSorted = Array.from(uniqueDayNumbers).sort((a, b) => a - b);
            const hasDayCols = dayNumbersSorted.length > 0;

            // Build a mapping of (trainingDayId -> exerciseSeries in that day)
            const seriesByTrainingDayId: Record<string, any[]> = {};
            exerciseSeries.forEach(series => {
              const tdid = series.trainingDay?.id || series.trainingDayId;
              if (tdid) {
                if (!seriesByTrainingDayId[tdid]) seriesByTrainingDayId[tdid] = [];
                seriesByTrainingDayId[tdid].push(series);
              }
            });

            // Build table headers: one col per day number
            if (!hasDayCols) {
              return (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 56, mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {translations[lang].noDaysForWeek}
                  </Typography>
                </Box>
              );
            }

            return (
              <React.Fragment>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0 }}>
                  {translations[lang].weeklyProgressTitle}
                </Typography>
                <Box component="table" sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #e0e0e0"
                }}>
                  <Box component="thead">
                    <Box component="tr">
                      <Box component="th" sx={{ textAlign: "left", p: 1, border: "1px solid #e0e0e0" }}>{translations[lang].weekLabel}</Box>
                      <Box component="th" sx={{ textAlign: "center", p: 1, minWidth: 120, border: "1px solid #e0e0e0" }}>{translations[lang].weekProgressLabel}</Box>
                      {dayNumbersSorted.map(dayNum => (
                        <Box
                          component="th"
                          key={`head-${String(dayNum)}`}
                          sx={{ textAlign: "center", p: 1, minWidth: 70, border: "1px solid #e0e0e0" }}
                        >
                          {translations[lang].day} {dayNum}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {selectedBlock.weeks
                      .slice()
                      .sort((a: any, b: any) => b.weekNumber - a.weekNumber)
                      .map((week: any) => {
                        const weekDays = trainingDaysByWeekId[week.id] || [];
                        const weekDaysByNumber: Record<number, any> = {};
                        weekDays.forEach(td => {
                          if (typeof td.dayNumber === "number") weekDaysByNumber[td.dayNumber] = td;
                        });
                        // Calculate week progress
                        const weekCompleted = week.numExerciseSeriesCompleted || 0;
                        const weekTotal = week.numExerciseSeriesTotal || 0;
                        const weekPercent = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0;

                        return (
                          <Box component="tr" key={String(week.id)}>
                            <Box component="td" sx={{ p: 1, border: "1px solid #e0e0e0" }}>
                              <Typography
                                sx={{
                                  textDecoration: "underline dotted",
                                  cursor: "pointer",
                                  color: "#1976d2",
                                  display: "inline-block"
                                }}
                                onClick={() => setWeekDialog({ open: true, week })}
                                role="button"
                                tabIndex={0}
                              >
                                {translations[lang].weekLabel} {week.weekNumber}
                              </Typography>
                            </Box>
                            <Box component="td" sx={{ p: 1, width: 140, border: "1px solid #e0e0e0" }}>
                              <Box sx={{ position: "relative", width: "100%", minWidth: 70, maxWidth: 140, height: 18, display: "flex", alignItems: "center" }}>
                                <Box
                                  sx={{
                                    position: "absolute",
                                    left: 0, top: 0, height: "100%", width: "100%",
                                    bgcolor: "#eee", borderRadius: 1, overflow: "hidden"
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "#4caf50",
                                      width: `${weekPercent}%`,
                                      height: "100%",
                                      transition: "width 0.4s",
                                    }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    position: "absolute",
                                    left: 0, top: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: weekPercent > 45 ? "#fff" : "#333",
                                    fontWeight: 600,
                                    pointerEvents: "none",
                                    zIndex: 1,
                                    fontSize: "0.93em"
                                  }}
                                >
                                  {weekPercent}{translations[lang].percentLabel}
                                </Box>
                                <Box sx={{ position: "absolute", right: 6, color: weekPercent > 60 ? "#fff" : "#555", fontVariantNumeric: "tabular-nums", fontSize: "0.85em", zIndex: 2 }}>
                                  {weekCompleted}/{weekTotal}
                                </Box>
                              </Box>
                            </Box>
                            {dayNumbersSorted.map(dayNum => {
                              const td = weekDaysByNumber[dayNum];
                              if (!td)
                                return (
                                  <Box component="td" key={`empty-${String(dayNum)}`} sx={{ p: 1, background: "#fafafa", border: "1px solid #e0e0e0" }} />
                                );
                              // compute daily series
                              const series = seriesByTrainingDayId[td.id] || [];
                              const completed = series.filter(
                                (s) => s.effectiveWeight != null && s.effectiveReps != null
                              ).length;
                              const total = series.length;
                              const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                              return (
                                <Box
                                  component="td"
                                  key={`dcell-${String(dayNum)}`}
                                  sx={{ p: 1, minWidth: 80, maxWidth: 120, border: "1px solid #e0e0e0" }}
                                >
                                  <Box sx={{ position: "relative", width: "100%", height: 16, minWidth: 60 }}>
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        left: 0, top: 0,
                                        width: "100%",
                                        height: "100%",
                                        bgcolor: "#eee",
                                        borderRadius: 1,
                                        overflow: "hidden"
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          bgcolor: "#4caf50",
                                          width: `${percent}%`,
                                          height: "100%",
                                          transition: "width 0.4s"
                                        }}
                                      />
                                    </Box>
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        left: 0, top: 0,
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: percent > 45 ? "#fff" : "#333",
                                        fontWeight: 600,
                                        fontSize: "0.9em",
                                        pointerEvents: "none",
                                        zIndex: 1
                                      }}
                                    >
                                      {percent}{translations[lang].percentLabel}
                                    </Box>
                                    <Box sx={{
                                      position: "absolute",
                                      right: 4,
                                      color: percent > 60 ? "#fff" : "#555",
                                      fontVariantNumeric: "tabular-nums",
                                      fontSize: "0.80em",
                                      zIndex: 2
                                    }}>
                                      {completed}/{total}
                                    </Box>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              </React.Fragment>
            );
          })()}
        </Box>
      )}
      {/* Week Details Dialog */}
      <Dialog
        open={weekDialog.open}
        onClose={() => setWeekDialog({ open: false, week: null })}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {weekDialog.week ? `${translations[lang].weekLabel} ${weekDialog.week.weekNumber} - Details` : ""}
        </DialogTitle>
        <DialogContent>
          {weekDialog.week && (
            <Box>
              {/* Days list */}
              {(() => {
                // Get training days for this week
                const days = trainingDays.filter(td => td.weekId === weekDialog.week.id);
                // If data might still be loading (trainingDays or exerciseSeries not yet loaded
                // for this week), show spinner. Only show empty after load.
                const loadingWeek = !trainingDays.length && !exerciseSeries.length;
                if (loadingWeek) {
                  return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 3 }}>
                      <CircularProgress size={24} />
                      <Typography variant="body2">{translations[lang].measurementsLoading || "Loading..."}</Typography>
                    </Box>
                  );
                }
                if (days.length === 0) {
                  return <Typography variant="body2" color="text.secondary">{translations[lang].noDaysForWeek}</Typography>;
                }
                // Sort days by dayNumber ascending
                const sortedDays = days.slice().sort((a, b) => (a.dayNumber ?? 0) - (b.dayNumber ?? 0));
                return sortedDays.map((day) => (
                  <Box key={day.id} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {translations[lang].day} {day.dayNumber}
                    </Typography>
                    <Box>
                      {/* Exercises grouped by name for this day */}
                      {(() => {
                        // Find all series for this day from exerciseSeries
                        const seriesList = exerciseSeries.filter(
                          s =>
                            (s.trainingDay?.id || s.trainingDayId) === day.id
                        );
                        if (seriesList.length === 0) {
                          return (
                            <Typography variant="body2" color="text.secondary">
                              No exercises for this day.
                            </Typography>
                          );
                        }
                        // Group by exercise name (s.exercise?.name)
                        const byExercise: Record<string, any[]> = {};
                        seriesList.forEach(s => {
                          const key = s.exercise?.name || s.exerciseName || "Exercise";
                          if (!byExercise[key]) byExercise[key] = [];
                          byExercise[key].push(s);
                        });

                        return (
                          <Box sx={{ overflowX: "auto" }}>
                            <Box component="table" sx={{
                              borderCollapse: "collapse",
                              width: "100%",
                              border: "1px solid #e0e0e0"
                            }}>
                              <Box component="thead">
                                <Box component="tr">
                                  <Box component="th" sx={{ textAlign: "left", p: 1, minWidth: 130, border: "1px solid #e0e0e0" }}>
                                    {translations[lang].exercise}
                                  </Box>
                                  <Box component="th" sx={{ textAlign: "center", p: 1, minWidth: 80, border: "1px solid #e0e0e0" }}>
                                    {translations[lang].series}
                                  </Box>
                                  <Box component="th" sx={{ textAlign: "center", p: 1, minWidth: 70, border: "1px solid #e0e0e0" }}>
                                    {translations[lang].weight}
                                  </Box>
                                  <Box component="th" sx={{ textAlign: "center", p: 1, minWidth: 70, border: "1px solid #e0e0e0" }}>
                                    {translations[lang].reps}
                                  </Box>
                                  <Box component="th" sx={{ textAlign: "center", p: 1, minWidth: 70, border: "1px solid #e0e0e0" }}>
                                    {translations[lang].rir}
                                  </Box>
                                  <Box component="th" sx={{ textAlign: "center", p: 1, minWidth: 48, border: "1px solid #e0e0e0" }}>
                                    {translations[lang].notes}
                                  </Box>
                                </Box>
                              </Box>
                              <Box component="tbody">
                                {Object.entries(byExercise).map(([exName, series]) =>
                                  series.map((s, idx) => (
                                    <Box component="tr" key={s.id || exName + idx}>
                                      {idx === 0 ? (
                                        <Box component="td" rowSpan={series.length} sx={{ p: 1, fontWeight: 500, verticalAlign: "middle", border: "1px solid #e0e0e0" }}>
                                          {exName}
                                        </Box>
                                      ) : null}
                                      <Box component="td" sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0" }}>
                                        {s.isDropSet ? "DS" : s.seriesNumber != null ? s.seriesNumber + 1 : idx + 1}
                                      </Box>
                                      <Box component="td" sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0" }}>
                                        <span style={{ fontWeight: 500 }}>{s.effectiveWeight ?? ""}</span>
                                      </Box>
                                      <Box component="td" sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0" }}>
                                        <span style={{ fontWeight: 500 }}>{s.effectiveReps ?? ""}</span>
                                        <br />
                                        <span style={{
                                          display: "block",
                                          fontSize: "0.73em",
                                          color: "#9e9e9e",
                                          fontStyle: "italic",
                                          lineHeight: 1.1,
                                          marginTop: 2
                                        }}>
                                          {typeof s.minReps === "number" && typeof s.maxReps === "number"
                                            ? (s.minReps === s.maxReps
                                              ? s.minReps
                                              : `[${s.minReps} - ${s.maxReps}]`)
                                            : ""}
                                        </span>
                                      </Box>
                                      <Box component="td" sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0" }}>
                                        <span style={{ fontWeight: 500 }}>{s.effectiveRir ?? ""}</span>
                                        <br />
                                        <span style={{
                                          display: "block",
                                          fontSize: "0.73em",
                                          color: "#9e9e9e",
                                          fontStyle: "italic",
                                          lineHeight: 1.1,
                                          marginTop: 2
                                        }}>
                                          {typeof s.minRir === "number" && typeof s.maxRir === "number"
                                            ? (s.minRir === s.maxRir
                                              ? s.minRir
                                              : `[${s.minRir} - ${s.maxRir}]`)
                                            : ""}
                                        </span>
                                      </Box>
                                      <Box component="td" sx={{ textAlign: "center", p: 1, border: "1px solid #e0e0e0", whiteSpace: "pre-line" }}>
                                        {s.trainerNotes && (
                                          <Typography variant="body2" sx={{ color: "#1976d2" }}>
                                            {translations[lang].trainerNoteLabel}: {s.trainerNotes}
                                          </Typography>
                                        )}
                                        {s.athleteNotes && (
                                          <Typography variant="body2" sx={{ color: "#388e3c" }}>
                                            {translations[lang].athleteNoteLabel}: {s.athleteNotes}
                                          </Typography>
                                        )}
                                      </Box>
                                    </Box>
                                  ))
                                )}
                              </Box>
                            </Box>
                          </Box>
                        );
                      })()}
                    </Box>
                  </Box>
                ));
              })()}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function MeasurementsTab({ userId, lang } : { userId: string, lang: Lang }) {
  const [measurements, setMeasurements] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const t = translations[lang];

  const columns = [
    { id: "date", label: t.measurementsColumnDate },
    { id: "weight", label: t.measurementsColumnWeight },
    { id: "neck", label: t.measurementsColumnNeck },
    { id: "arm", label: t.measurementsColumnArm },
    { id: "waist", label: t.measurementsColumnWaist },
    { id: "abdomen", label: t.measurementsColumnAbdomen },
    { id: "hip", label: t.measurementsColumnHip },
    { id: "thigh", label: t.measurementsColumnThigh },
    { id: "calfMuscle", label: t.measurementsColumnCalfMuscle }
  ];

  React.useEffect(() => {
    let active = true;
    async function fetchUserMeasurements() {
      setLoading(true);
      try {
        const res = await fetch(`/api/measurements/${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (active) setMeasurements(Array.isArray(data) ? data : []);
        } else if (active) {
          setMeasurements([]);
        }
      } catch {
        if (active) setMeasurements([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchUserMeasurements();
    return () => { active = false };
  }, [userId]);

  return (
    <Box sx={{ pt: 2 }}>
      <MeasurementsTable
        measurements={measurements}
        loading={loading}
        columns={columns}
        t={t}
        enableChart={true}
      />
    </Box>
  );
}

function AddPaymentDialog({ open, onClose, userId, onCreated, lang }: { open: boolean, onClose: () => void, userId: string, onCreated: (payment: any) => void, lang: Lang }) {
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0,10));
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setErrMsg(null);
    const res = await fetch(`/api/payment/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        dueDate,
        amount: parseFloat(amount),
      }),
    });
    setLoading(false);
    if (res.ok) {
      const body = await res.json();
      onCreated(body.payment);
      setAmount("");
    } else {
      let msg = lang === "es" ? "Fallo al añadir el pago" : "Failed to add payment";
      try {
        const b = await res.json();
        if (b && b.error) msg = msg + ": " + b.error;
      } catch {}
      setErrMsg(msg);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{translations[lang].addPaymentDialogTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            type="date"
            label={translations[lang].addPaymentDialogDate}
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            label={translations[lang].addPaymentDialogAmount}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            size="small"
            inputProps={{ min: 0, step: "0.01" }}
          />
          {errMsg && <Typography color="error">{errMsg}</Typography>}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="text" onClick={onClose}>
            {translations[lang].addPaymentDialogCancel}
          </Button>
          <Button variant="contained" onClick={handleCreate} sx={{ ml: 1 }} disabled={loading || !amount || !dueDate}>
            {translations[lang].addPaymentDialogAdd}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function UserTable({
  lang,
  crearAtletaButton,
  refreshKey
}: {
  lang: Lang,
  crearAtletaButton?: React.ReactNode,
  refreshKey?: number
}) {
  // Payments tab dialog state must be at top level for hooks rules
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showOnlyPendingPayments, setShowOnlyPendingPayments] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"info" | "payments" | "measurements" | "blocks">("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState<"active" | "all" | "hidden" | "due" | "nofuture" | "noplan" | "nopassword">("active");
  const [internalRefreshKey, setInternalRefreshKey] = useState(0);

  // Context menu state
  const [contextMenuAnchor, setContextMenuAnchor] = useState<{mouseX: number, mouseY: number} | null>(null);
  const [contextMenuRow, setContextMenuRow] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [pendingWelcomeUser, setPendingWelcomeUser] = useState<any | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  // Confirmation dialog state for hiding/unhiding users
  const [confirmationDialog, setConfirmationDialog] = useState<{ open: boolean; message: string; user: any | null }>({
    open: false,
    message: "",
    user: null,
  });
  // Import logAdminError
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logAdminError = require("@/app/utils/logAdminError").logAdminError;

  useEffect(() => {
    setLoading(true);
    fetch("/api/get-user-management-info")
      .then(r => r.json())
      .then(d => {
        setUsers(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refreshKey, internalRefreshKey]);

  // Column definitions
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: translations[lang].manageUsersTableName,
      flex: 1,
      minWidth: 160,
      sortable: false,
      valueGetter: (params: any) => {
        const row = params?.row;
        if (!row) return "";
        const hasFirst = !!row.firstName;
        const hasLast = !!row.lastName;
        if (!hasFirst && !hasLast) return translations[lang].emptyValue;
        return [row.firstName, row.lastName].filter(Boolean).join(" ");
      },
      renderCell: (params: any) => {
        const row = params?.row;
        if (!row) return translations[lang].emptyValue;
        const hasFirst = !!row.firstName;
        const hasLast = !!row.lastName;
        if (!hasFirst && !hasLast) return translations[lang].emptyValue;
        return [row.firstName, row.lastName].filter(Boolean).join(" ");
      },
    },
    { field: "username", headerName: translations[lang].manageUsersModalUsername, flex: 1, minWidth: 130, sortable: false },
    { field: "email", headerName: translations[lang].manageUsersTableEmail, flex: 1.5, minWidth: 210, sortable: false },
    {
      field: "status",
      headerName: translations[lang].manageUsersTableStatus,
      type: "string",
      minWidth: 150,
      sortable: false,
      valueGetter: (params: any) => {
        const row = params?.row;
        if (!row) return "";
        const now = new Date();
        const hasOverdueUnpaid = Array.isArray(row.payments)
          ? row.payments.some(
              (p: any) => !p.isPayed && new Date(p.dueDate) <= now
            )
          : false;
        if (hasOverdueUnpaid) return translations[lang].paymentsTableUnpaid;
        if (row.hidden) return translations[lang].hideUser;
        return translations[lang].paymentsTablePaid;
      },
      renderCell: (params: any) => {
        const row = params?.row;
        if (!row) return "";
        const now = new Date();
        const hasOverdueUnpaid = Array.isArray(row.payments)
          ? row.payments.some(
              (p: any) => !p.isPayed && new Date(p.dueDate) <= now
            )
          : false;
        if (hasOverdueUnpaid)
          return (
            <Tooltip title={translations[lang].paymentsTableUnpaid}>
              <EuroIcon sx={{ color: "#E53935" }} />
            </Tooltip>
          );
        if (row.hidden)
          return (
            <Tooltip title={translations[lang].hiddenUserStatus}>
              <VisibilityOffIcon />
            </Tooltip>
          );
        return (
          <Tooltip title={translations[lang].paymentsTablePaid}>
            <EuroIcon sx={{ color: "#23b802" }} />
          </Tooltip>
        );
      }
    }
  ];

  const athletes = useMemo(() => users.filter((u: any) => u.role === "athlete"), [users]);
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const now = new Date();
    return athletes.filter((u: any) => {
      // At least one overdue/unpaid
      const hasOverdueUnpaid = Array.isArray(u.payments)
        ? u.payments.some((p: any) => !p.isPayed && new Date(p.dueDate) <= now)
        : false;
      // Has at least one future payment
      const hasFuturePayment = Array.isArray(u.payments)
        ? u.payments.some((p: any) => new Date(p.dueDate) > now)
        : false;
      const matchesSearch =
        u.name?.toLowerCase().includes(term) ||
        (u.username ?? "").toLowerCase().includes(term) ||
        (u.email ?? "").toLowerCase().includes(term);

      // Hidden: show only hidden users
      if (quickFilter === "hidden") {
        return u.hidden === true && matchesSearch;
      }

      // Noplan: SIN planificación, only active users
      if (quickFilter === "noplan") {
        return u.noPlan === true && u.hidden !== true && matchesSearch;
      }

      // Due: Pagos pendientes, only active users
      if (quickFilter === "due") {
        return hasOverdueUnpaid && u.hidden !== true && matchesSearch;
      }

      // Nofuture: Sin pagos futuros, only active users
      if (quickFilter === "nofuture") {
        return !hasFuturePayment && u.hidden !== true && matchesSearch;
      }

      // Usuarios sin contraseña: users who have not set a password (hasPassword === false)
      if (quickFilter === "nopassword") {
        return (u.hasPassword === false) && matchesSearch;
      }

      // Active: show only not hidden
      if (quickFilter === "active") {
        return u.hidden !== true && matchesSearch;
      }

      // All
      return matchesSearch;
    });
  }, [athletes, searchTerm, quickFilter]);

  const handleHideUser = async (user: any) => {
    setActionLoading(true);
    const updatedUser = { ...user, hidden: !user.hidden };
    const nowISO = new Date().toISOString();
    const isHiding = updatedUser.hidden;
    const res = await fetch(`/api/update-user/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hidden: updatedUser.hidden,
        hidingDate: isHiding ? nowISO : null
      }),
    });
    if (res.ok) {
      setUsers((prevUsers: any[]) =>
        prevUsers.map((u: any) =>
          u.id === user.id
            ? { ...updatedUser, hidingDate: isHiding ? nowISO : null }
            : u
        )
      );
    }
    setActionLoading(false);
  };

  // Payment/user info modal dialog
  const handleRowClick = (params: GridRowParams) => setSelected(params.row);

  const placeholder = translations[lang].searchUserTablePlaceholder;

  return (
    <Box sx={{ width: "100%", background: "background.paper" }}>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { sm: "center" }
          }}
        >
          <TextField
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", sm: 300 }
            }}
            inputProps={{
              'aria-label': placeholder
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
              gap: 2,
              alignItems: { sm: "center" },
              mt: { xs: 2, sm: 0 }
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Select
                value={quickFilter}
                onChange={e => setQuickFilter(e.target.value as any)}
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 160 }
                }}
                fullWidth={true}
              >
                <MenuItem value="active">{translations[lang].manageUsersQuickFilterAllActive}</MenuItem>
                <MenuItem value="all">{translations[lang].manageUsersQuickFilterAll}</MenuItem>
                <MenuItem value="hidden">{translations[lang].manageUsersQuickFilterHidden}</MenuItem>
                <MenuItem value="due">{translations[lang].manageUsersQuickFilterDue}</MenuItem>
                <MenuItem value="nofuture">{translations[lang].manageUsersQuickFilterNoFuture}</MenuItem>
                <MenuItem value="noplan">{translations[lang].manageUsersQuickFilterNoPlan}</MenuItem>
                <MenuItem value="nopassword">{translations[lang].manageUsersQuickFilterNoPassword}</MenuItem>
              </Select>
            </Box>
            <Box sx={{
              width: { xs: "100%", sm: "auto" },
              mt: { xs: 2, sm: 0 }
            }}>
              {crearAtletaButton}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ height: 600, width: "100%" }}
        onContextMenu={e => {
          // Only trigger for rows, not headers etc.
          const target = e.target as HTMLElement;
          const rowNode = target.closest('[data-id]');
          if (rowNode) {
            e.preventDefault();
            const rowId = rowNode.getAttribute('data-id');
            const rowData = filteredUsers.find(u => u.id === rowId);
            setContextMenuAnchor({ mouseX: e.clientX + 2, mouseY: e.clientY - 6 });
            setContextMenuRow(rowData || null);
          }
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={row => row.id}
          loading={loading}
          disableColumnMenu={true}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          onRowClick={handleRowClick}
          sx={{
            background: "background.paper",
            cursor: "pointer",
          }}
        />
        {/* Context Menu for right-clicking a row */}
        <Menu
          open={!!contextMenuAnchor}
          onClose={() => setContextMenuAnchor(null)}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenuAnchor
              ? { top: contextMenuAnchor.mouseY, left: contextMenuAnchor.mouseX }
              : undefined
          }
          onClick={() => setContextMenuAnchor(null)}
        >
          <MenuItem
            onClick={e => {
              e.stopPropagation();
              setContextMenuAnchor(null);
              // Show confirmation dialog instead of immediate action
              if (contextMenuRow) {
                setConfirmationDialog({
                  open: true,
                  user: contextMenuRow,
                  message: contextMenuRow.hidden
                    ? translations[lang].hideUserDialogUnhideMsg
                    : translations[lang].hideUserDialogHideMsg
                });
              }
            }}
          >
            {contextMenuRow?.hidden
              ? translations[lang].unhideUser
              : translations[lang].hideUser}
          </MenuItem>
          <MenuItem
            onClick={e => {
              e.stopPropagation();
              setContextMenuAnchor(null);
              if (contextMenuRow) setPendingWelcomeUser(contextMenuRow);
            }}
          >
            {translations[lang].sendWelcomeEmail}
          </MenuItem>
        </Menu>
        <Dialog
          open={!!selected}
          maxWidth={false}
          fullWidth
          onClose={() => setSelected(null)}
          PaperProps={{
            sx: {
              width: '50vw',
              height: '50vh',
              maxWidth: 'none',
              maxHeight: 'none',
            }
          }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            👤 {(selected?.firstName || "") + " " + (selected?.lastName || "")}
          </DialogTitle>
          <DialogContent sx={{ height: 'calc(50vh - 64px)', overflowY: 'auto' }}>
            <Tabs value={modalTab} onChange={(_, v) => setModalTab(v)}>
              <Tab value="info" label={translations[lang].infoTab} />
              <Tab value="payments" label={translations[lang].paymentsTab} />
              <Tab value="measurements" label={translations[lang].measurementsTab} />
              <Tab value="blocks" label={translations[lang].blocksTab} />
            </Tabs>
            {modalTab === "info" && selected && (
              <Box sx={{ mt: 2 }}>
                {/* Editable Username */}
                <EditableUserField
                  label={translations[lang].manageUsersModalUsername}
                  value={selected.username}
                  field="username"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, username: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                {/* Editable Email */}
                <EditableUserField
                  label={translations[lang].manageUsersModalEmail}
                  value={selected.email}
                  field="email"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, email: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                {/* Editable First Name */}
                <EditableUserField
                  label={translations[lang].manageUsersModalFirstName}
                  value={selected.firstName}
                  field="firstName"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, firstName: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                {/* Editable Last Name */}
                <EditableUserField
                  label={translations[lang].manageUsersModalLastName}
                  value={selected.lastName}
                  field="lastName"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, lastName: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                <EditableDropdownField
                  label={translations[lang].sexLabel}
                  value={selected.sex || ""}
                  options={[
                    { value: "MALE", label: translations[lang].sexMale },
                    { value: "FEMALE", label: translations[lang].sexFemale }
                  ]}
                  userId={selected.id}
                  onUpdated={val => setSelected({ ...selected, sex: val })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                  field="sex"
                />
                <EditableNumberField
                  label={translations[lang].subscriptionAmountLabel}
                  value={selected.subscriptionAmount}
                  userId={selected.id}
                  onUpdated={val => setSelected({ ...selected, subscriptionAmount: val })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                  field="subscriptionAmount"
                />
                <EditableDropdownField
                  label={translations[lang].subscriptionFrequencyLabel}
                  value={selected.subscriptionFrequency || ""}
                  options={[
                    { value: "monthly", label: translations[lang].subscriptionFrequencyMonthly },
                    { value: "quarterly", label: translations[lang].subscriptionFrequencyQuarterly },
                    { value: "yearly", label: translations[lang].subscriptionFrequencyYearly }
                  ]}
                  userId={selected.id}
                  onUpdated={val => setSelected({ ...selected, subscriptionFrequency: val })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                  field="subscriptionFrequency"
                />                
                <Typography>
                  <strong>{translations[lang].manageUsersModalLastLogin}:</strong>{" "}
                  {selected.lastOKLogin
                    ? new Date(selected.lastOKLogin).toLocaleString(lang === "es" ? "es-ES" : "en-GB")
                    : translations[lang].emptyValue}
                </Typography>
                <Typography>
                  <strong>{translations[lang].manageUsersTableStatus}:</strong> {selected.hidden ? translations[lang].hideUser : translations[lang].paymentsTablePaid}
                </Typography>
              </Box>
            )}
            {modalTab === "payments" && selected && (
              <Box sx={{ mt: 2 }}>
                <Box sx={{
                  display: "flex", alignItems: "center", gap: 1, mb: 1
                }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setShowAddPayment(true)}
                  >
                    {translations[lang].addPaymentButton}
                  </Button>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 10, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={showOnlyPendingPayments}
                      onChange={e => setShowOnlyPendingPayments(e.target.checked)}
                      style={{ marginRight: 4 }}
                    />
                    {translations[lang].addPaymentDialogShowOnlyPending}
                  </label>
                </Box>
                <AddPaymentDialog
                  open={showAddPayment}
                  onClose={() => setShowAddPayment(false)}
                  userId={selected.id}
                  onCreated={(payment) => {
                    setShowAddPayment(false);
                    setSelected((sel: any) => ({
                      ...sel,
                      payments: [payment, ...(sel.payments || [])]
                    }));
                    setNotification({ type: "success", message: translations[lang].paymentAdded });
                  }}
                  lang={lang}
                />
              {!selected.payments || selected.payments.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  {translations[lang].manageUsersAddPaymentNone}
                </Typography>
              ) : (
                <Box sx={{ width: '100%', minWidth: 360 }}>
                  <DataGrid
                    rows={
                      showOnlyPendingPayments
                        ? selected.payments.filter((p: any) => !p.isPayed)
                        : selected.payments
                    }
                    columns={[
                      {
                        field: 'dueDate',
                        headerName: translations[lang].paymentsTableDate,
                        width: 100,
                        minWidth: 80,
                        maxWidth: 120,
                        flex: 0,
                        renderCell: (params: any) =>
                          params.row && params.row.dueDate
                            ? new Date(params.row.dueDate).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB')
                            : translations[lang].emptyValue,
                        sortable: false,
                      },
                      {
                        field: 'amount',
                        headerName: translations[lang].paymentsTableAmount,
                        renderCell: (params: any) =>
                          typeof params.value === 'number'
                            ? params.value.toLocaleString(lang === "es" ? "es-ES" : "en-GB", {
                                style: "currency",
                                currency: "EUR",
                                minimumFractionDigits: 2
                              })
                            : params.value,
                        flex: 1,
                        minWidth: 80,
                        sortable: false,
                      },
                      {
                        field: 'isPayed',
                        headerName: translations[lang].paymentsTablePaid,
                        width: 120,
                        minWidth: 120,
                        maxWidth: 120,
                        flex: 0,
                        sortable: false,
                        renderCell: (params: any) => (
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <Tooltip
                              title={
                                Boolean(params.value)
                                  ? translations[lang].paymentsTablePaid
                                  : translations[lang].paymentsTableUnpaid
                              }
                            >
                              <Switch
                                checked={Boolean(params.value)}
                                size="small"
                                color={Boolean(params.value) ? "success" : "error"}
                                inputProps={{
                                  "aria-label": Boolean(params.value)
                                    ? translations[lang].paymentsTablePaid
                                    : translations[lang].paymentsTableUnpaid
                                }}
                                sx={{
                                  mx: 'auto',
                                  display: 'inline-flex',
                                  '& .MuiSwitch-track': {
                                    minWidth: 28, // ensure the track is visible even in small size
                                    borderRadius: 13,
                                  },
                                  ...(Boolean(params.value)
                                    ? {}
                                    : {
                                        '& .MuiSwitch-thumb': {
                                          backgroundColor: '#E53935'
                                        },
                                        '& .Mui-checked': {},
                                        '& .MuiSwitch-switchBase:not(.Mui-checked) .MuiSwitch-track':
                                          { backgroundColor: '#F4C7C3' }
                                      })
                                }}
                                onChange={async (e) => {
                                  const newValue = e.target.checked;
                                  await fetch(`/api/payment/${params.row.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ isPayed: newValue }),
                                  });
                                  setSelected((sel: any) => ({
                                    ...sel,
                                    payments: sel.payments.map((p: any) =>
                                      p.id === params.row.id ? { ...p, isPayed: newValue } : p
                                    )
                                  }));
                                }}
                              />
                            </Tooltip>
                          </Box>
                        ),
                      },
                    ]}
                    pageSizeOptions={[6]}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 6, page: 0 } }
                    }}
                    getRowId={row => row.id}
                    hideFooterSelectedRowCount
                    autoHeight
                    disableColumnMenu
                    sx={{
                      '& .MuiDataGrid-root, .MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
                        fontSize: '0.9em',
                        padding: '4px 8px'
                      }
                    }}
                  />
                </Box>
              )}
            </Box>
            )}
            {modalTab === "measurements" && selected && (
              <MeasurementsTab userId={selected.id} lang={lang} />
            )}
            {modalTab === "blocks" && selected && (
              <TrainingTab userId={selected.id} lang={lang} />
            )}
          </DialogContent>
        </Dialog>
        {(loading || actionLoading) && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: "100%", height: "100%", top: 0, left: 0, background: "rgba(255,255,255,0.5)", zIndex: 1999 }}>
            <CircularProgress />
          </Box>
        )}
        <Dialog
          open={!!pendingWelcomeUser}
          onClose={() => setPendingWelcomeUser(null)}
        >
          <DialogTitle>{translations[lang].sendWelcomeEmail}</DialogTitle>
          <DialogContent>
            <Typography>
              {pendingWelcomeUser &&
                translations[lang].sendWelcomeEmailConfirm(
                  pendingWelcomeUser.name || pendingWelcomeUser.username || "",
                  pendingWelcomeUser.email || ""
                )}
            </Typography>
          </DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, m: 2 }}>
            <Button onClick={() => setPendingWelcomeUser(null)} color="inherit">
              {translations[lang].actionsConfirmNo}
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={actionLoading}
              onClick={async () => {
                if (!pendingWelcomeUser) return;
                setActionLoading(true);
                try {
                  const res = await fetch("/api/send-welcome-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: pendingWelcomeUser.id })
                  });
                  if (res.ok) {
                    setNotification({ type: "success", message: translations[lang].sendWelcomeEmailSuccess });
                  } else {
                    logAdminError(res, "Send welcome email API error");
                    setNotification({ type: "error", message: translations[lang].sendWelcomeEmailError });
                  }
                } catch (err) {
                  logAdminError(err, "Send welcome email exception");
                  setNotification({ type: "error", message: translations[lang].sendWelcomeEmailError });
                }
                setActionLoading(false);
                setPendingWelcomeUser(null);
              }}
              autoFocus
            >
              {translations[lang].actionsConfirmYes}
            </Button>
          </Box>
        </Dialog>
        {/* Confirmation Dialog for Hide/Unhide */}
        <Dialog
          open={confirmationDialog.open}
          onClose={() => setConfirmationDialog({ ...confirmationDialog, open: false })}
        >
          <DialogTitle>{translations[lang].hideUserDialogTitle}</DialogTitle>
          <DialogContent>
            <Typography>{confirmationDialog.message}</Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                onClick={() => setConfirmationDialog({ ...confirmationDialog, open: false })}
                color="inherit"
              >
                {translations[lang].hideUserDialogCancel}
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                  setConfirmationDialog({ ...confirmationDialog, open: false });
                  if (confirmationDialog.user) await handleHideUser(confirmationDialog.user);
                }}
              >
                {translations[lang].hideUserDialogConfirm}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Notification Snackbar */}
        <NotificationSnackbar
          notification={notification}
          onClose={() => setNotification(null)}
        />
      </Box>
    </Box>
  );
}
