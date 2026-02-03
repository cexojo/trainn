import React, { useEffect, useState } from "react";
import {
  Box, Typography, Autocomplete, TextField, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert, Tooltip, IconButton
} from "@mui/material";
import { logAdminError } from "../utils/logAdminError";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { translations, type Lang } from "../i18n";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Block = {
  id: string;
  blockNumber: number;
  description: string;
  isVisible: boolean;
  createdAt: string;
};

type Athlete = {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  hidden?: boolean;
};

const lang: Lang = "es";

type TrainingDay = {
  id: string;
  dayNumber: number;
  dayLabel: string;
  date?: string;
};

type ExerciseDef = {
  id: string;
  exercise?: { id: string; name: string };
  trainingDay?: { id: string; dayNumber: number };
  dayNumber?: number | string;
  seriesNumber?: number;
  exerciseNumber?: number;
  isDropset?: boolean;
  effectiveWeight?: number;
  effectiveReps?: number;
  minReps?: number;
  maxReps?: number;
  effectiveRir?: number;
  minRir?: number;
  maxRir?: number;
  progress?: string;
  trainerNotes?: string;
  athleteNotes?: string;
};

type TrainingDataResponse = {
  exerciseDefs: ExerciseDef[];
  trainingDays: TrainingDay[];
};

type BlockContentTableProps = {
  athleteId: string;
  blockId: string;
  lang: Lang;
  block: Block & { weeks?: any[] };
  onRequestBlockVisibility?: (visible: boolean) => void;
  onWeeksReordered?: (newWeeks: any[]) => void;
};

import { Tabs, Tab } from "@mui/material";

function BlockContentTable({ athleteId, blockId, lang, block, onRequestBlockVisibility, onRequestBlockDelete, onWeeksReordered }: BlockContentTableProps & { onRequestBlockDelete?: () => void }) {
  // Spinner state for week deletion (must be first hook!)
  const [deletingWeek, setDeletingWeek] = useState(false);
  // Spinner state for copying week (blocks UI)
  const [copyingWeek, setCopyingWeek] = useState(false);

  const [content, setContent] = React.useState<TrainingDataResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  // Use weekId as selectedWeek
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null);
  // Hold onto next selected after reorder to avoid effect reset
  const nextSelectedRef = React.useRef<string | null>(null);
  const [pendingDeleteWeekId, setPendingDeleteWeekId] = useState<string | null>(null);
  const [pendingCopyWeekId, setPendingCopyWeekId] = useState<string | null>(null);

  // Generic error banner state for week copy
  const [errorBanner, setErrorBanner] = useState(false);
  const [seriesErrorBanner, setSeriesErrorBanner] = useState<string | null>(null);

  React.useEffect(() => {
    if (!athleteId || !blockId) return;
    setLoading(true);
    fetch(`/api/training-data?userId=${athleteId}&blockId=${blockId}`)
      .then(r => r.json())
      .then((res: TrainingDataResponse) => {
        setContent(res);
        // set initial week id if possible after response is loaded, but only if not already set or week is missing
        if (
          block &&
          block.weeks &&
          Array.isArray(block.weeks) &&
          block.weeks.length > 0
        ) {
          // If we have a nextSelectedRef queued, use it
          if (
            nextSelectedRef.current &&
            block.weeks.some(w => w.id === nextSelectedRef.current)
          ) {
            setSelectedWeekId(nextSelectedRef.current);
            nextSelectedRef.current = null;
          } else if (
            !selectedWeekId ||
            !block.weeks.some(w => w.id === selectedWeekId)
          ) {
            setSelectedWeekId(block.weeks[0].id);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [athleteId, blockId, block]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!content || !content.exerciseDefs || !content.trainingDays) {
    return (
      <Typography color="text.secondary" sx={{ my: 4 }}>
        {translations[lang].blockNoContent}
      </Typography>
    );
  }

  if (!block || !Array.isArray(block.weeks) || block.weeks.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ my: 4 }}>
        {translations[lang].blockNoWeeks}
      </Typography>
    );
  }

  // Sort weeks by weekNumber ascending
  const sortedWeeks = [...block.weeks].sort((a, b) => a.weekNumber - b.weekNumber);

  // Filter days and exercises for selectedWeekId
  const weekId = selectedWeekId || sortedWeeks[0].id;

  const daysForWeek = content.trainingDays.filter(
    (d: any) => d.weekId === weekId
  );
  // Sort days by dayNumber
  daysForWeek.sort((a, b) => a.dayNumber - b.dayNumber);

  // Get all exerciseDefs for this week
  const exercisesForWeek = content.exerciseDefs.filter(
    (ex: any) => ex.trainingWeek && ex.trainingWeek.id === weekId
  );

/**
 * Inline-editable cell for exercise series parameters.
 */
function EditableSeriesField({ label, value, field, seriesId, onUpdated, lang, multiline = false, onError }: {
  label: string,
  value: string | number | null | undefined,
  field: string,
  seriesId: string,
  onUpdated: (val: string) => void,
  lang: Lang,
  multiline?: boolean,
  onError?: (msg: string) => void,
}) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value === undefined || value === null ? "" : value + "");
  const [loading, setLoading] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTemp(value === undefined || value === null ? "" : value + "");
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const doPatch = async () => {
    if (temp === (value === undefined || value === null ? "" : value + "")) {
      setEditing(false);
      return;
    }
    setLoading(true);
    let errMsg: string | null = null;
    try {
      const res = await fetch(`/api/day-exercise-series/${seriesId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: temp }),
      });
      if (res.ok) {
        onUpdated(temp);
        setEditing(false);
      } else {
        const error = await res.json();
        errMsg = error?.error ? String(error.error) : "Failed to update. Try again.";
      }
    } catch (e: any) {
      errMsg = typeof e === "string" ? e : (e?.message || "Failed to update. Try again.");
    }
    setLoading(false);
    if (errMsg && onError) onError(errMsg);
  };

  return (
    <span>
      {editing ? (
        <TextField
          size="small"
          variant="standard"
          value={temp}
          disabled={loading}
          inputRef={inputRef}
          multiline={multiline}
          onChange={e => setTemp(e.target.value)}
          onBlur={doPatch}
          onKeyDown={e => {
            if (e.key === "Enter" && !multiline) {
              doPatch();
            } else if (e.key === "Escape") {
              setEditing(false);
              setTemp(value === undefined || value === null ? "" : value + "");
            }
          }}
          sx={{ minWidth: 68 }}
        />
      ) : (
        <Typography
          sx={{
            minWidth: 68,
            display: "inline-block",
            textDecoration: "underline dotted",
            cursor: "pointer",
            color: "#1976d2"
          }}
          onClick={() => setEditing(true)}
          tabIndex={0}
          role="button"
          title={label}
        >
          {value !== undefined && value !== null && value !== "" ? value : "-"}
        </Typography>
      )}
      {loading && <CircularProgress size={16} />}
    </span>
  );
}

// Group exercises by dayId for table rendering
const exercisesByDayId: Record<string, typeof exercisesForWeek> = {};
exercisesForWeek.forEach((ex: any) => {
  const dayId = ex.trainingDay?.id;
  if (!dayId) return;
  if (!exercisesByDayId[dayId]) exercisesByDayId[dayId] = [];
  exercisesByDayId[dayId].push(ex);
});

  // Helper: get week by id
  const getWeekById = (id: string | null) => sortedWeeks.find(w => w.id === id);

  // Helper: delete week
  async function handleDeleteWeek() {
    if (!pendingDeleteWeekId) return;
    setDeletingWeek(true);
    let hadError = false;
    try {
      const res = await fetch("/api/training-week/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekId: pendingDeleteWeekId }),
      });
      if (!res.ok) {
        const err = await res.json?.();
        console.error("Error al eliminar la semana:", err?.error || "");
        setErrorBanner(true);
        hadError = true;
      }
    } catch (e: any) {
      console.error("Error al eliminar la semana:", e?.message || e);
      setErrorBanner(true);
      hadError = true;
    }
    setPendingDeleteWeekId(null);
    // Refresh UI after delete
    await fetch(`/api/training-data?userId=${athleteId}&blockId=${blockId}`)
      .then(r => r.json())
      .then(res => {
        if (res && res.selectedBlock && onWeeksReordered && res.selectedBlock.weeks) {
          onWeeksReordered(res.selectedBlock.weeks);
        }
      });
    setDeletingWeek(false);
  }

  // Handler for copying week
  async function handleCopyWeek() {
    if (!pendingCopyWeekId) return;
    // Find the old/copy source week number before copying
    const oldWeek =
      block &&
      block.weeks &&
      Array.isArray(block.weeks)
        ? block.weeks.find(w => w.id === pendingCopyWeekId)
        : null;
    const newWeekNumber = oldWeek ? oldWeek.weekNumber + 1 : null;

    setCopyingWeek(true);
    let hadError = false;
    try {
      const res = await fetch("/api/training-week/copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceWeekId: pendingCopyWeekId }),
      });
      if (!res.ok) {
        const err = await res.json();
        setErrorBanner(true);
        hadError = true;
        await logAdminError(err, "Copy week error:");
      }
    } catch (e) {
      setErrorBanner(true);
      hadError = true;
      await logAdminError(e, "Copy week error (exception):");
    }
    setPendingCopyWeekId(null);

    // Even on error, still refetch UI state for consistency
    try {
      await fetch(`/api/training-data?userId=${athleteId}&blockId=${blockId}`)
        .then(r => r.json())
        .then(res => {
          if (res && res.selectedBlock && onWeeksReordered && res.selectedBlock.weeks) {
            onWeeksReordered(res.selectedBlock.weeks);
            // Auto-select the new week (old week number + 1)
            if (newWeekNumber) {
              const newWeek = res.selectedBlock.weeks.find((w: any) => w.weekNumber === newWeekNumber);
              if (newWeek) {
                setSelectedWeekId(newWeek.id);
              }
            }
          }
        });
    } finally {
      setCopyingWeek(false);
    }
  }

  // Handler to move week order
  async function handleMoveWeek(idx: number, direction: "forward" | "back") {
    // Copy weeks
    if (typeof idx !== "number" || !block.weeks) return;
    const arr = [...block.weeks];
    if ((direction === "back" && idx === 0) || (direction === "forward" && idx === arr.length - 1)) return;

    const swapIdx = direction === "back" ? idx - 1 : idx + 1;
    const weekA = arr[idx];
    const weekB = arr[swapIdx];

    // Swap their numbers
    const updatedWeekA = { ...weekA, weekNumber: weekB.weekNumber };
    const updatedWeekB = { ...weekB, weekNumber: weekA.weekNumber };

    // Optimistically adjust local copy (not for real update, but can show loading spinner if needed)
    // Send PATCH API for both weeks
    try {
      await Promise.all([
        fetch(`/api/training-day`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weekId: updatedWeekA.id, weekNumber: updatedWeekA.weekNumber }),
        }),
        fetch(`/api/training-day`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weekId: updatedWeekB.id, weekNumber: updatedWeekB.weekNumber }),
        })
      ]);
      // Optimistically update UI without reload using parent handler
      if (block && block.weeks && typeof onWeeksReordered === "function") {
        const updatedWeeks = [...block.weeks];
        updatedWeeks[idx] = updatedWeekB;
        updatedWeeks[swapIdx] = updatedWeekA;
        updatedWeeks.sort((a, b) => a.weekNumber - b.weekNumber);
        // Track the id of the moved week (the one originally at idx)
        const movedWeekId = weekA.id;
        nextSelectedRef.current = movedWeekId;
        onWeeksReordered(updatedWeeks);
      }
    } catch (e) {
      // TODO: show user-visible error
      alert("Error al reordenar semanas");
    }
  }


  return (
    <Box sx={{ mt: 4, position: 'relative' }}>
      {/* Fullscreen overlay spinner during week delete or copy */}
      {(deletingWeek || copyingWeek) && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(255,255,255,0.75)"
        }}>
          <CircularProgress size={64} />
        </Box>
      )}
      {errorBanner && (
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorBanner(false)}
          sx={{
            position: "fixed",
            bottom: 44,
            left: 0,
            right: 0,
            borderRadius: 0,
            width: "100%",
            zIndex: 13000,
            px: 0,
            textAlign: "center"
          }}
        >
          {translations[lang].copyWeekError}
        </Alert>
      )}
      {seriesErrorBanner && (
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setSeriesErrorBanner(null)}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            width: "100%",
            zIndex: 13001,
            px: 0,
            textAlign: "center"
          }}
        >
          {seriesErrorBanner}
        </Alert>
      )}
      {/* Actions Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 2, px: 1, gap: 1 }}>
        {/* Block delete icon */}
        <Tooltip title={translations[lang].deleteBlockTooltip}>
          <IconButton
            size="small"
            color="error"
            onClick={() => onRequestBlockDelete && onRequestBlockDelete()}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {typeof block.isVisible === 'boolean' && onRequestBlockVisibility && (
          <Tooltip title={block.isVisible ? translations[lang].hideBlock : translations[lang].publishBlock}>
            <IconButton
              color={block.isVisible ? "warning" : "success"}
              size="small"
              onClick={() => onRequestBlockVisibility(!block.isVisible)}
            >
              {block.isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Tabs
        value={weekId}
        onChange={(_, newValue) => setSelectedWeekId(newValue)}
        sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
        variant="fullWidth"
      >
        {sortedWeeks.map((week, idx) => (
          <Tab
            key={week.id}
            label={`${translations[lang].weekLabel} ${week.weekNumber}`}
            value={week.id}
          />
        ))}
      </Tabs>
      {/* Week actions bar: Move week left/right and delete, for selected week only */}
      {weekId && (() => {
        const currentIdx = sortedWeeks.findIndex(w => w.id === weekId);
        const isFirst = currentIdx === 0;
        const isLast = currentIdx === sortedWeeks.length - 1;
        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "flex-start", mb: 1 }}>
          {/* Move week left */}
          {!isFirst && (
        <Tooltip title={translations[lang].moveWeekBack}>
          <IconButton
            size="small"
            sx={{ color: '#007bff' }}
            onClick={async () => {
              await handleMoveWeek(currentIdx, "back");
            }}
          >
            <span style={{ fontSize: 18, display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span>
          </IconButton>
        </Tooltip>
          )}
          {/* Copy week */}
          <Tooltip title={translations[lang].copyWeekTooltip}>
            <IconButton
              size="small"
              sx={{ color: '#007bff' }}
              onClick={() => setPendingCopyWeekId(weekId)}
            >
              <span style={{ fontSize: 18, fontWeight: 700 }}>⧉</span>
            </IconButton>
          </Tooltip>
          {/* Delete week */}
          <Tooltip title={translations[lang].deleteWeekTooltip}>
            <IconButton
              size="small"
              sx={{ color: '#007bff' }}
              onClick={() => setPendingDeleteWeekId(weekId)}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {/* Move week right */}
          {!isLast && (
        <Tooltip title={translations[lang].moveWeekForward}>
          <IconButton
            size="small"
            sx={{ color: '#007bff' }}
            onClick={async () => {
              await handleMoveWeek(currentIdx, "forward");
            }}
          >
            <span style={{ fontSize: 18 }}>➔</span>
          </IconButton>
        </Tooltip>
          )}
        </Box>
        );
      })()}      {/* Muscle Volume Badges for this week */}
      {(() => {
        // Define the muscle group factors (should match Wizard, hardcode for robustness)
        const muscleGroupFactorMap = [
          { factor: "factorQuadriceps", label: "muscleGroupQuadriceps" },
          { factor: "factorHamstring", label: "muscleGroupHamstring" },
          { factor: "factorGlute", label: "muscleGroupGlute" },
          { factor: "factorAdductor", label: "muscleGroupAdductor" },
          { factor: "factorCalf", label: "muscleGroupCalf" },
          { factor: "factorForearm", label: "muscleGroupForearm" },
          { factor: "factorBiceps", label: "muscleGroupBiceps" },
          { factor: "factorTriceps", label: "muscleGroupTriceps" },
          { factor: "factorLateralDelt", label: "muscleGroupLateralDelt" },
          { factor: "factorPosteriorDelt", label: "muscleGroupPosteriorDelt" },
          { factor: "factorAnteriorDelt", label: "muscleGroupAnteriorDelt" },
          { factor: "factorPectoral", label: "muscleGroupPectoral" },
          { factor: "factorClavicularPec", label: "muscleGroupClavicularPec" },
          { factor: "factorUpperBack", label: "muscleGroupUpperBack" },
          { factor: "factorLat", label: "muscleGroupLat" },
          { factor: "factorLowerBack", label: "muscleGroupLowerBack" },
          { factor: "factorAbdomen", label: "muscleGroupAbdomen" },
        ];
        // Calculate volume per muscle group (sum across all exerciseDefs in exercisesForWeek)
        const muscleVolume = Object.fromEntries(muscleGroupFactorMap.map(({ factor }) => [factor, 0]));
        exercisesForWeek.forEach((exDef: any) => {
          // Accept dynamic muscle group keys from exDef.exercise
          const exData = exDef.exercise || {};
          muscleGroupFactorMap.forEach(({ factor }) => {
            const nSeries = 1; // Could update if series count is available
            const fVal = typeof (exData as any)[factor] === "number" ? (exData as any)[factor]
                          : parseFloat(((exData as any)[factor] || 0).toString());
            if (!isNaN(fVal) && fVal !== 0) muscleVolume[factor] += nSeries * fVal;
          });
        });
        const anyVolume = Object.values(muscleVolume).some(v => v > 0);
        if (!anyVolume) return null;
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              borderRadius: 2,
              p: 2,
              mb: 2,
              bgcolor: "background.paper",
              border: "1px solid #e0e0e0",
              alignItems: "center"
            }}
          >
            {muscleGroupFactorMap
              .filter(({ factor }) => muscleVolume[factor] > 0)
              .sort((a, b) => muscleVolume[b.factor] - muscleVolume[a.factor])
              .map(({ factor, label }) => (
                <Tooltip
                  key={factor}
                  title={
                    <div>
                      {(() => {
                        // Per-exercise (by name) breakdown, group by exercise
                        const exerciseGroupRows: string[] = [];
                        const exerciseGroups: Record<string, { name: string, factor: number, count: number }> = {};
                        exercisesForWeek.forEach((exDef: any) => {
                          const exData = exDef.exercise || {};
                          const exId = exData.id || "";
                          const exName = exData.name || "";
                          const fVal = (exData as any)[factor] ?? 0;
                          if (!isNaN(parseFloat(fVal || 0)) && fVal !== 0) {
                            if (!exerciseGroups[exId]) {
                              exerciseGroups[exId] = { name: exName, factor: fVal, count: 1 };
                            } else {
                              exerciseGroups[exId].count++;
                            }
                          }
                        });
                        Object.values(exerciseGroups).forEach(({ name, factor, count }) => {
                          exerciseGroupRows.push(`${name}: ${count} × ${factor} = ${count * factor}`);
                        });
                        return (
                          <>
                            {exerciseGroupRows.length > 0 ? (
                              <>
                                {exerciseGroupRows.map((row, i) => (
                                  <div key={i} style={{ whiteSpace: "nowrap" }}>{row}</div>
                                ))}
                                <div style={{ borderBottom: "1px solid #bbb", margin: "4px 0" }} />
                                <div style={{ fontWeight: 600 }}>Total {muscleVolume[factor]}</div>
                              </>
                            ) : (
                              <div>N/A</div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  }
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        fontSize: "0.68em",
                        maxWidth: 290,
                        bgcolor: "#fff",
                        color: "#1a1a1a",
                        border: "1px solid #bbb",
                        boxShadow: 3,
                        p: 1.2
                      }
                    }
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      px: 0.7,
                      py: 0.1,
                      borderRadius: "9999px",
                      bgcolor: "#eeeeee",
                      color: "#222",
                      fontWeight: 500,
                      fontSize: "0.69em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 1,
                      border: "1px solid #cfcfcf",
                      minHeight: 18,
                      cursor: "help"
                    }}
                  >
                    {(translations[lang] as any)[label] || factor.replace(/^factor/, "")}:&nbsp;
                    <span style={{ fontWeight: 700 }}>{muscleVolume[factor]}</span>
                  </Box>
                </Tooltip>
              ))}
          </Box>
        );
      })()}

      {daysForWeek.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {translations[lang].blockNoDaysInWeek}
        </Typography>
      )}
      {daysForWeek.map((dayObj) => {
        const dayExercises = exercisesByDayId[dayObj.id] || [];
        return (
          <Box key={dayObj.id} sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5, mt: 2, pl: 1, fontWeight: 600, color: "#555", fontSize: 13 }}>
              {`Día ${dayObj.dayNumber}`}
            </Typography>
            {dayExercises.length === 0 ? (
              <Box sx={{ color: "#a33" }}>{translations[lang].blockNoExerciseForDay}</Box>
            ) : (
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <thead>
                    <tr>
                      <th rowSpan={2} style={{ borderBottom: "1px solid #ccc", padding: "4px 8px", verticalAlign: "middle" }}>{translations[lang].exercise}</th>
                      <th rowSpan={2} style={{ borderBottom: "1px solid #ccc", padding: "4px 8px", verticalAlign: "middle" }}>{translations[lang].series}</th>
                      <th rowSpan={2} style={{ borderBottom: "1px solid #ccc", padding: "4px 8px", verticalAlign: "middle" }}>{translations[lang].dropsetAbbr}</th>
                      <th colSpan={3} style={{ borderBottom: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>{translations[lang].athleteDataGroup}</th>
                      <th colSpan={2} style={{ borderBottom: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>{translations[lang].reps}</th>
                      <th colSpan={2} style={{ borderBottom: "1px solid #ccc", padding: "4px 8px", textAlign: "center" }}>{translations[lang].rir}</th>
                      <th rowSpan={2} style={{ borderBottom: "1px solid #ccc", padding: "4px 8px", verticalAlign: "middle" }}>{translations[lang].notes}</th>
                    </tr>
                    <tr>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].weight}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].reps}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].rir}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].min}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].max}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].min}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].max}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const rows = [];
                      let i = 0;
                      while (i < dayExercises.length) {
                        const ex = dayExercises[i];
                        const exerciseId = ex.exercise?.id;
                        // Find out how many consecutive rows have this exercise
                        let rowspan = 1;
                        for (let j = i + 1; j < dayExercises.length; ++j) {
                          if (dayExercises[j].exercise?.id !== exerciseId) break;
                          rowspan++;
                        }
                        for (let k = 0; k < rowspan; ++k) {
                          const rowEx = dayExercises[i + k];
                          rows.push(
                            <tr key={rowEx.id} style={{ borderBottom: "1px solid #eee" }}>
                              {/* Exercise name with rowspan only for the first row in group */}
                              {k === 0 ? (
                                <td rowSpan={rowspan} style={{ padding: "4px 8px", verticalAlign: "middle", fontWeight: 500 }}>
                                  {rowEx.exercise?.name ?? ""}
                                </td>
                              ) : null}
                              {/* Series number */}
                              <td style={{ padding: "4px 8px" }}>{rowEx.seriesNumber ?? ""}</td>
                              {/* DS */}
                              <td style={{ padding: "4px 8px" }}>
                                {rowEx.isDropset ? (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style={{ cursor: "pointer", display: "inline-block" }}
                                    onClick={async () => {
                                      // Explicitly set to false when clicking check
                                      const res = await fetch(`/api/day-exercise-series/${rowEx.id}`, {
                                        method: "PATCH",
                                        headers: { "Content-Type": "application/json" },
                                        credentials: "include",
                                        body: JSON.stringify({ isDropset: false }),
                                      });
                                      if (res.ok) {
                                        rowEx.isDropset = false;
                                        setContent({ ...content });
                                      } else {
                                        setSeriesErrorBanner(translations[lang].updateDsError ?? "Failed to update DS field");
                                      }
                                    }}
                                  >
                                    <title>{translations[lang].setDsOffTitle ?? "Set Dropset OFF"}</title>
                                    <circle cx="12" cy="12" r="10" fill="#fff"/>
                                    <path d="M7 13l3 3 6-6" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style={{ cursor: "pointer", display: "inline-block" }}
                                    onClick={async () => {
                                      // Explicitly set to true when clicking cross
                                      const res = await fetch(`/api/day-exercise-series/${rowEx.id}`, {
                                        method: "PATCH",
                                        headers: { "Content-Type": "application/json" },
                                        credentials: "include",
                                        body: JSON.stringify({ isDropset: true }),
                                      });
                                      if (res.ok) {
                                        rowEx.isDropset = true;
                                        setContent({ ...content });
                                      } else {
                                        setSeriesErrorBanner("Failed to update DS field");
                                      }
                                    }}
                                  >
                                    <title>{translations[lang].setDsOnTitle ?? "Set Dropset ON"}</title>
                                    <circle cx="12" cy="12" r="10" fill="#fff"/>
                                    <path d="M9 9l6 6" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M15 9l-6 6" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                )}
                              </td>
                              {/* Weight */}
                              <td style={{ padding: "4px 8px" }}>
                                <EditableSeriesField label={translations[lang].weight} value={rowEx.effectiveWeight} field="effectiveWeight" seriesId={rowEx.id} onUpdated={(val) => { rowEx.effectiveWeight = val === "" ? undefined : Number(val); setContent({...content}); }} lang={lang} onError={setSeriesErrorBanner} />
                              </td>
                              {/* Reps */}
                              <td style={{ padding: "4px 8px" }}>
                                <EditableSeriesField label={translations[lang].reps} value={rowEx.effectiveReps} field="effectiveReps" seriesId={rowEx.id} onUpdated={(val) => { rowEx.effectiveReps = val === "" ? undefined : Number(val); setContent({...content}); }} lang={lang} onError={setSeriesErrorBanner} />
                              </td>
                              {/* RIR */}
                              <td style={{ padding: "4px 8px" }}>
                                <EditableSeriesField label={translations[lang].rir} value={rowEx.effectiveRir} field="effectiveRir" seriesId={rowEx.id} onUpdated={(val) => { rowEx.effectiveRir = val === "" ? undefined : Number(val); setContent({...content}); }} lang={lang} onError={setSeriesErrorBanner} />
                              </td>
                              {/* Reps Min */}
                              <td style={{ padding: "4px 8px" }}>
                                <EditableSeriesField label={translations[lang].min} value={rowEx.minReps} field="minReps" seriesId={rowEx.id} onUpdated={(val) => { rowEx.minReps = val === "" ? undefined : Number(val); setContent({...content}); }} lang={lang} onError={setSeriesErrorBanner} />
                              </td>
                              {/* Reps Max */}
                              <td style={{ padding: "4px 8px" }}>
                                <EditableSeriesField label={translations[lang].max} value={rowEx.maxReps} field="maxReps" seriesId={rowEx.id} onUpdated={(val) => { rowEx.maxReps = val === "" ? undefined : Number(val); setContent({...content}); }} lang={lang} onError={setSeriesErrorBanner} />
                              </td>
                              {/* RIR Min */}
                              <td style={{ padding: "4px 8px" }}>
                                <EditableSeriesField label={translations[lang].min} value={rowEx.minRir} field="minRir" seriesId={rowEx.id} onUpdated={(val) => { rowEx.minRir = val === "" ? undefined : Number(val); setContent({...content}); }} lang={lang} onError={setSeriesErrorBanner} />
                              </td>
                              {/* RIR Max */}
                              <td style={{ padding: "4px 8px" }}>
                                <EditableSeriesField label={translations[lang].max} value={rowEx.maxRir} field="maxRir" seriesId={rowEx.id} onUpdated={(val) => { rowEx.maxRir = val === "" ? undefined : Number(val); setContent({...content}); }} lang={lang} onError={setSeriesErrorBanner} />
                              </td>
                              {/* Notes */}
                              <td style={{ padding: "4px 8px; white-space: pre-line" }}>
                                <div>
                                  <span>
                                    <span style={{ fontWeight: 500 }}>{translations[lang].trainerNoteLabel}</span>{" "}
                                    <EditableSeriesField
                                      label={translations[lang].trainerNoteLabel ?? "Trainer Note"}
                                      value={rowEx.trainerNotes}
                                      field="trainerNotes"
                                      seriesId={rowEx.id}
                                      onUpdated={(val) => {
                                        setContent(content => {
                                          if (!content) return content;
                                          const updated = { ...content };
                                          updated.exerciseDefs = updated.exerciseDefs.map(ed =>
                                            ed.id === rowEx.id ? { ...ed, trainerNotes: val } : ed
                                          );
                                          return updated;
                                        });
                                      }}
                                      lang={lang}
                                      multiline
                                      onError={setSeriesErrorBanner}
                                    />
                                  </span>
                                  <br />
                                  <span>
                                    <span style={{ fontWeight: 500 }}>{translations[lang].athleteNoteLabel}</span>{" "}
                                    <EditableSeriesField
                                      label={translations[lang].athleteNoteLabel ?? "Athlete Note"}
                                      value={rowEx.athleteNotes}
                                      field="athleteNotes"
                                      seriesId={rowEx.id}
                                      onUpdated={(val) => {
                                        setContent(content => {
                                          if (!content) return content;
                                          const updated = { ...content };
                                          updated.exerciseDefs = updated.exerciseDefs.map(ed =>
                                            ed.id === rowEx.id ? { ...ed, athleteNotes: val } : ed
                                          );
                                          return updated;
                                        });
                                      }}
                                      lang={lang}
                                      multiline
                                      onError={setSeriesErrorBanner}
                                    />
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                        i += rowspan;
                      }
                      return rows;
                    })()}
                  </tbody>
                </table>
              </Box>
            )}
          </Box>
        );
      })}
    {/* Block delete confirmation modal removed from here */}
    {/* Week copy confirmation modal */}
    <Dialog
      open={!!pendingCopyWeekId}
      onClose={() => setPendingCopyWeekId(null)}
    >
      <DialogTitle>{translations[lang].copyWeekTitle}</DialogTitle>
      <DialogContent>
        <Typography>
          {translations[lang].copyWeekConfirm(
            getWeekById(pendingCopyWeekId)?.weekNumber || "",
            getWeekById(pendingCopyWeekId) ? getWeekById(pendingCopyWeekId).weekNumber + 1 : ''
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPendingCopyWeekId(null)} color="inherit">
          {translations[lang].cancel}
        </Button>
        <Button color="primary" onClick={handleCopyWeek} autoFocus>
          {translations[lang].copy}
        </Button>
      </DialogActions>
    </Dialog>
    {/* Week delete confirmation modal */}
    <Dialog
      open={!!pendingDeleteWeekId}
      onClose={() => setPendingDeleteWeekId(null)}
    >
      <DialogTitle>
        {translations[lang].deleteWeekTitle}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {translations[lang].deleteWeekConfirm(getWeekById(pendingDeleteWeekId)?.weekNumber || "")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPendingDeleteWeekId(null)} color="inherit">
          {translations[lang].cancel}
        </Button>
        <Button color="error" onClick={handleDeleteWeek} autoFocus>
          {translations[lang].delete}
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
}

export default function ManageBlocks() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [athleteLoading, setAthleteLoading] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blocksLoading, setBlocksLoading] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  // Store selected block with weeks from training-data API
  const [blockWithWeeks, setBlockWithWeeks] = useState<any>(null);

  // Block delete modal state
  const [pendingDeleteBlock, setPendingDeleteBlock] = useState<null | { blockId: string; blockLabel: string }>(null);

  // Blocking page-wide spinner for block delete operation
  const [deletingBlock, setDeletingBlock] = useState(false);

  // When selectedBlock changes, reset blockWithWeeks
  useEffect(() => { setBlockWithWeeks(null); }, [selectedBlock]);

  // Custom: fetch training-data when athlete/block changes, store blockWithWeeks
  useEffect(() => {
    if (selectedAthlete && selectedBlock) {
      fetch(`/api/training-data?userId=${selectedAthlete.id}&blockId=${selectedBlock.id}`)
        .then(r => r.json())
        .then(res => {
          if (res && res.selectedBlock) setBlockWithWeeks(res.selectedBlock);
        });
    }
  }, [selectedAthlete, selectedBlock]);

  const [openDialog, setOpenDialog] = useState(false);
  const [nextVisible, setNextVisible] = useState<boolean | null>(null);
  const [dialogMode, setDialogMode] = useState<"show" | "hide" | null>(null);

  useEffect(() => {
    setAthleteLoading(true);
    fetch("/api/get-active-athletes-list")
      .then(r => r.json())
      .then(arr => {
        if (Array.isArray(arr)) {
          setAthletes(arr.filter(a => !a.hidden));
        }
      })
      .finally(() => setAthleteLoading(false));
  }, []);

  useEffect(() => {
    if (selectedAthlete) {
      setBlocksLoading(true);
      setBlocks([]);
      fetch(`/api/blocks?userId=${selectedAthlete.id}`)
        .then(r => r.json())
        .then(resp => {
          if (Array.isArray(resp.blocks)) {
            const sortedBlocks = resp.blocks.sort((a: Block, b: Block) => b.blockNumber - a.blockNumber);
            setBlocks(sortedBlocks);
            if (sortedBlocks.length) setSelectedBlock(sortedBlocks[0]);
            else setSelectedBlock(null);
          } else {
            setBlocks([]);
            setSelectedBlock(null);
          }
        })
        .finally(() => setBlocksLoading(false));
    } else {
      setBlocks([]);
      setSelectedBlock(null);
    }
  }, [selectedAthlete]);

  const handleBlockVisibilityChange = (checked: boolean) => {
    setNextVisible(checked);
    setOpenDialog(true);
  };

  const handleConfirmVisibility = async () => {
    if (!selectedBlock) return;
    await fetch("/api/blocks", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ blockId: selectedBlock.id, visible: nextVisible }),
    });
    setOpenDialog(false);
    setNextVisible(null);
    setDialogMode(null);
    if (selectedAthlete) {
      setBlocksLoading(true);
      fetch(`/api/blocks?userId=${selectedAthlete.id}`)
        .then(r => r.json())
        .then(resp => {
          if (Array.isArray(resp.blocks)) {
            const sortedBlocks = resp.blocks.sort((a: Block, b: Block) => b.blockNumber - a.blockNumber);
            setBlocks(sortedBlocks);
            if (sortedBlocks.length) {
              const stillThere = sortedBlocks.find((b: Block) => b.id === selectedBlock.id);
              setSelectedBlock(stillThere || sortedBlocks[0]);
            } else setSelectedBlock(null);
          } else {
            setBlocks([]);
            setSelectedBlock(null);
          }
        })
        .finally(() => setBlocksLoading(false));
    }
  };

  return (
    <Box>
      {/* Fullscreen spinner while deleting block */}
      {deletingBlock && (
        <Box sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(255,255,255,0.75)"
        }}>
          <CircularProgress size={64} />
        </Box>
      )}
      <Box mb={3} maxWidth={400}>
        <Autocomplete
          disabled={athleteLoading}
          options={athletes}
          getOptionLabel={opt =>
            opt
              ? (opt.firstName && opt.lastName
                  ? `${opt.firstName} ${opt.lastName}`
                  : (opt.firstName || opt.lastName || opt.username || opt.email || ""))
              : ""
          }
          isOptionEqualToValue={(opt, val) => opt && val && opt.id === val.id}
          value={selectedAthlete}
          onChange={(_, val) => setSelectedAthlete(val)}
          renderOption={(props, option) => {
            const label =
              option.firstName && option.lastName
                ? `${option.firstName} ${option.lastName}`
                : (option.firstName || option.lastName || option.username || option.email || "");
            return (
              <li {...props} key={option.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>{label}</span>
                {option.email && (
                  <span style={{ fontSize: 12, color: "#888" }}>{option.email}</span>
                )}
              </li>
            );
          }}
          renderInput={params => (
            <TextField
              {...params}
              label={translations[lang].createBlockWizardAthleteLabel}
              placeholder={translations[lang].createBlockWizardAthletePlaceholder}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {athleteLoading ? <CircularProgress color="inherit" size={16} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
      {selectedAthlete && (
        <Box>          
          {blocksLoading ? (
            <CircularProgress size={28} />
          ) : (
            <Box sx={{ maxWidth: 500, mt: 2 }}>
              <Autocomplete
                disabled={blocks.length === 0}
                options={blocks}
                getOptionLabel={b =>
                  `Bloque #${b.blockNumber} (creado el ${new Date(b.createdAt).toLocaleDateString("es-ES")})`
                }
                isOptionEqualToValue={(a, b) => a.id === b.id}
                value={selectedBlock}
                onChange={(_, val) => setSelectedBlock(val)}
                renderOption={(props, option) => {
                  const { key, ...rest } = props;
                  return (
                    <li key={key} {...rest} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span>
                        Bloque #{option.blockNumber} (creado el {new Date(option.createdAt).toLocaleDateString("es-ES")})
                      </span>
                      {option.isVisible ? (
                        <VisibilityIcon color="success" fontSize="small" style={{ marginLeft: 12 }} />
                      ) : (
                        <VisibilityOffIcon color="disabled" fontSize="small" style={{ marginLeft: 12 }} />
                      )}
                    </li>
                  );
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={translations[lang].adminMenuManageBlocks}
                    placeholder={translations[lang].adminMenuManageBlocks}
                  />
                )}
                sx={{ mb: 2 }}
              />
              {!selectedBlock && (
                <Typography color="text.secondary">{translations[lang].wizardNoExercises}</Typography>
              )}
            </Box>
          )}
        </Box>
      )}
      {selectedAthlete && selectedBlock && blockWithWeeks && blockWithWeeks.id === selectedBlock.id && (
        <BlockContentTable
          athleteId={selectedAthlete.id}
          blockId={selectedBlock.id}
          lang={lang}
          block={blockWithWeeks}
          onWeeksReordered={(newWeeks) => setBlockWithWeeks({...blockWithWeeks, weeks: newWeeks})}
          onRequestBlockVisibility={(visible: boolean) => {
            setNextVisible(visible);
            setDialogMode(visible ? "show" : "hide");
            setOpenDialog(true);
          }}
          onRequestBlockDelete={() => {
            setPendingDeleteBlock({
              blockId: selectedBlock.id,
              blockLabel: `Bloque #${selectedBlock.blockNumber} (creado el ${new Date(selectedBlock.createdAt).toLocaleDateString("es-ES")})`
            });
          }}
        />
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {dialogMode === "hide"
            ? translations[lang].hideBlock
            : dialogMode === "show"
            ? translations[lang].publishBlock
            : ""}
        </DialogTitle>
        <DialogContent>
          <Alert severity={dialogMode === "hide" ? "warning" : "success"}>
            {dialogMode === "hide"
              ? translations[lang].hideBlockConfirm
              : dialogMode === "show"
              ? translations[lang].publishBlockConfirm
              : ""}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            {translations[lang].actionsConfirmNo ?? "No"}
          </Button>
          <Button onClick={async () => {
            await handleConfirmVisibility();
            setDialogMode(null);
          }} color="primary" autoFocus>
            {translations[lang].actionsConfirmYes ?? "Sí"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Block delete confirmation modal at root */}
      <Dialog open={!!pendingDeleteBlock} onClose={() => setPendingDeleteBlock(null)}>
        <DialogTitle>{translations[lang].deleteBlockTitle}</DialogTitle>
        <DialogContent>
          <Typography>
            {translations[lang].deleteBlockConfirm(pendingDeleteBlock?.blockLabel ?? translations[lang].thisBlock)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingDeleteBlock(null)} color="inherit">
            {translations[lang].cancel}
          </Button>
          <Button color="error" onClick={async () => {
            if (!pendingDeleteBlock?.blockId || !selectedAthlete) return;
            setDeletingBlock(true);
            try {
              const res = await fetch("/api/blocks", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blockId: pendingDeleteBlock.blockId, userId: selectedAthlete.id }),
              });
              if (!res.ok) {
                // TODO: Show error banner for block delete (not alert)
                setDeletingBlock(false);
                return;
              }
              // Refetch blocks for current athlete
              setPendingDeleteBlock(null);
              setBlocksLoading(true);
              setSelectedBlock(null);
              setBlockWithWeeks(null);
              fetch(`/api/blocks?userId=${selectedAthlete.id}`)
                .then(r => r.json())
                .then(resp => {
                  if (Array.isArray(resp.blocks)) {
                    const sortedBlocks = resp.blocks.sort((a: Block, b: Block) => b.blockNumber - a.blockNumber);
                    setBlocks(sortedBlocks);
                    if (sortedBlocks.length) setSelectedBlock(sortedBlocks[0]);
                    else setSelectedBlock(null);
                  } else {
                    setBlocks([]);
                    setSelectedBlock(null);
                  }
                })
                .finally(() => {
                  setBlocksLoading(false);
                  setDeletingBlock(false);
                });
            } catch {
              // TODO: Show error banner for block delete (not alert)
              setPendingDeleteBlock(null);
              setDeletingBlock(false);
            }
          }} autoFocus>
            {translations[lang].delete}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
