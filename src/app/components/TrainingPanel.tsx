"use client";
import React, {
  useState,
  useEffect,
  useRef
} from "react";
import { Box, Typography, FormControl, Select, MenuItem, InputLabel, Button, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar, Modal, IconButton } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { translations, Lang } from "../i18n";
import { Progress } from "./Progress";
import type { ExerciseDef } from "../../types/ExerciseDef";
import StatusModal from "./StatusModal";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type DefByDay = Record<string, ExerciseDef[]>;

function formatDateEu(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("T")[0].split("-");
  return [d, m, y].join("/");
}

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


import CancelIcon from "@mui/icons-material/Cancel";
import NotificationSnackbar from "./NotificationSnackbar";

export default function TrainingPanel({
  selectedBlock,
  setSelectedBlock,
  selectedWeek,
  setSelectedWeek,
  selectedDay,
  setSelectedDay,
}: {
  selectedBlock: any | null,
  setSelectedBlock: (block: any) => void,
  selectedWeek: any | null,
  setSelectedWeek: (week: any) => void,
  selectedDay?: number | null,
  setSelectedDay?: (dayIdx: number | null) => void,
}) {
  // Modal state/hooks, must be inside the function!
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [editingSeries, setEditingSeries] = useState<string | null>(null);
  const [modalNotes, setModalNotes] = useState<string>("");


  // Modal close handler
  const handleCloseNotesModal = async () => {
    setOpenNotesModal(false);
    if (editingSeries !== null) {
      await fetch(`/api/day-exercise-series/${editingSeries}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ athleteNotes: modalNotes }),
      });
      // Update athleteNotes in exerciseDefs in state for immediate UI refresh
      setExerciseDefs(prevDefs =>
        prevDefs.map(def =>
          def.id === editingSeries
            ? { ...def, athleteNotes: modalNotes }
            : def
        )
      );
    }
    setEditingSeries(null);
  };

  const [dayDates, setDayDates] = useState<string[]>([]);
  const [trainingDayIds, setTrainingDayIds] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<{ id: string, firstName: string, lastName?: string, isocode: string, lastVisitedWeek?: string | null } | null>(null);
  const [blockOpts, setBlockOpts] = useState<any[]>([]);
  // REMOVE local selectedBlock/selectedWeek state
  // const [selectedBlock, setSelectedBlock] = useState<any | null>(null);
  // const [selectedWeek, setSelectedWeek] = useState<any | null>(null);
  const [weekId, setWeekId] = useState<string | null>(null);
  const [exerciseDefs, setExerciseDefs] = useState<any[]>([]);

  // Ensure modalNotes always reflects the latest notes for the editing series when modal opens
  useEffect(() => {
    if (editingSeries) {
      const editingDef = exerciseDefs.find((def: any) => def.id === editingSeries);
      setModalNotes(editingDef?.athleteNotes || "");
    }
  }, [editingSeries, exerciseDefs]);
  const [loading, setLoading] = useState(true);
  const [creatingBlock, setCreatingBlock] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [changed, setChanged] = useState<Record<string, boolean>>({});
  // Sticky summary logic
  const blockWeekRef = useRef<HTMLDivElement | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  // Track focused exercise for highlight
  const [focusedExerciseKey, setFocusedExerciseKey] = useState<string | null>(null);

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (!blockWeekRef.current) return;
      const rect = blockWeekRef.current.getBoundingClientRect();
      setShowSummary(rect.bottom <= 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // User info fetch effect
  useEffect(() => {
    fetch("/api/get-user-id")
      .then(r => r.json())
      .then((d) => {
        setUserInfo({
          id: d.id,
          firstName: d.firstName || "",
          lastName: d.lastName || "",
          isocode: d.isocode || "en",
          lastVisitedWeek: d.lastVisitedWeek || null,
        });
        setLang((d.isocode || "es") as Lang);
        if (d.lastVisitedWeek) {
          setWeekId(d.lastVisitedWeek);
        }
      });
  }, []);

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

  const statusModalOpen = loading || creatingBlock;
  const statusModalMsg = creatingBlock 
    ? translations[lang].creatingBlock || "Creando bloque..." 
    : translations[lang].loadingScheduledTraining || "Cargando entrenamiento...";
  const statusModalIcon = <span role="img" aria-label="info">ℹ️</span>;

  useEffect(() => {
    if (!userInfo?.id) return;
    const endpoint = `/api/training-data?userId=${userInfo.id}${weekId ? "&weekId=" + weekId : ""}`;
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
        setBlockOpts(data.blocks || []);
        // Enhanced selection logic:
        // If user has no lastVisitedWeek and no explicit weekId, pick the first week of the last block.
        // Otherwise, use backend's selectedWeek as before.
        let blockToSet = data.selectedBlock || null;
        let weekToSet = null;

        if ((!userInfo?.lastVisitedWeek && !weekId) && Array.isArray(data.blocks) && data.blocks.length > 0) {
          const lastBlock = data.blocks[data.blocks.length - 1];
          if (lastBlock && Array.isArray(lastBlock.weeks) && lastBlock.weeks.length > 0) {
            blockToSet = lastBlock;
            weekToSet = lastBlock.weeks[0];
            setWeekId(String(weekToSet.id));
          }
        } else {
          weekToSet = data.selectedWeek || null;
        }

        if (typeof setSelectedBlock === "function") setSelectedBlock(blockToSet);
        if (typeof setSelectedWeek === "function") setSelectedWeek(weekToSet);
        setExerciseDefs(data.exerciseDefs || []);
        if (data.trainingDays && Array.isArray(data.trainingDays)) {
          const sorted = [...data.trainingDays]
            .sort((a, b) => {
              const numA = parseInt((a.dayLabel || "").replace(/^\D+/g, "")) || 0;
              const numB = parseInt((b.dayLabel || "").replace(/^\D+/g, "")) || 0;
              return numA - numB;
            });
          setDayDates(sorted.map(d => d.date ? d.date.split("T")[0] : ""));
          setTrainingDayIds(sorted.map(d => d.id));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userInfo?.id, weekId]);

  const handleBlur = async (defId: string, field: "effectiveReps" | "effectiveWeight" | "effectiveRir", value: string | number) => {
    setChanged(c => ({ ...c, [defId + field]: true }));
    try {
      const res = await fetch(`/api/day-exercise-series/${defId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) {
        let showRangeError = false;
        try {
          const result = await res.json();
          showRangeError = res.status === 400 && result && result.error === "out_of_range_value";
        } catch {}
        if (showRangeError) {
          const msg = lang === "es"
            ? "El valor debe estar entre 0 y 999"
            : "Value must be between 0 and 999";
          setNotification({ type: "error", message: msg });
        } else {
          // fallback generic
          setNotification({ type: "error", message: lang === "es" ? "Error al guardar resultado" : "Error saving result" });
        }
      }
    } catch {
      setNotification({ type: "error", message: lang === "es" ? "Error de red" : "Network error" });
    } finally {
      setChanged(c => ({ ...c, [defId + field]: false }));
    }
  };

  const handleLocalChange = (
    id: string,
    field: "effectiveReps" | "effectiveWeight" | "effectiveRir",
    value: string
  ) => {
    setExerciseDefs(prevDefs =>
      prevDefs.map(def => {
        if (def.id === id) {
          let newVal: number | null = null;
          if (field === "effectiveReps" || field === "effectiveRir") {
            newVal = value === "" ? null : Math.max(0, Math.floor(Number(value)));
          } else if (field === "effectiveWeight") {
            newVal = value === "" ? null : Math.round(Math.max(0, parseFloat(value)) * 10) / 10;
          }
          return { ...def, [field]: newVal };
        }
        return def;
      })
    );
  };

  const handleBlockChange = (blockId: string) => {
    const block = blockOpts.find(b => String(b.id) === String(blockId));
    if (block && block.weeks && block.weeks.length > 0) {
      setSelectedBlock(block);
      const firstWeek = block.weeks[0];
      setSelectedWeek(firstWeek);
      setWeekId(String(firstWeek.id));
      setSelectedDay?.(null);
      setFocusedExerciseKey(null);
    }
  };

  const handleWeekNav = async (dir: -1 | 1) => {
    if (!selectedBlock || !selectedWeek) return;
    const idx = selectedBlock.weeks.findIndex((wk: any) => String(wk.id) === String(selectedWeek.id));
    const toIdx = idx + dir;
    if (toIdx >= 0 && toIdx < selectedBlock.weeks.length) {
      const newWeek = selectedBlock.weeks[toIdx];
      setSelectedWeek(newWeek);
      setWeekId(String(newWeek.id));
      setSelectedDay?.(null);
      setFocusedExerciseKey(null);
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
    <>
      <Box>
      {(statusModalOpen) && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(255,255,255,0.65)",
            zIndex: 1400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2
              }}
            >
              <span style={{ display: "inline-flex", marginRight: 8 }}>
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#1976d2"
                    strokeWidth="4"
                    opacity="0.2"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#1976d2"
                    strokeWidth="4"
                    strokeDasharray="90"
                    strokeDashoffset="60"
                    style={{ transformOrigin: "center", animation: "spin 1s linear infinite" } as any}
                  />
                  <style>{`
                    @keyframes spin {
                      100% {
                        transform: rotate(360deg);
                      }
                    }
                  `}</style>
                </svg>
              </span>
              <Typography variant="h6" sx={{ fontWeight: 500, color: "#1976d2" }}>
                {statusModalMsg}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {/* Athlete notes modal */}
      <Box>
        <Modal
          open={openNotesModal}
          onClose={handleCloseNotesModal}
          aria-labelledby="athlete-notes-modal-title"
          aria-describedby="athlete-notes-modal-desc"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 340,
              bgcolor: 'background.paper',
              border: '2px solid #1976d2',
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
              outline: "none",
            }}
          >
            <Typography variant="subtitle1" id="athlete-notes-modal-title" fontWeight={600} sx={{ mb: 1 }}>
              {translations[lang].athleteNotesModalTitle(
                userInfo?.firstName ?? "", userInfo?.lastName ?? ""
              )}
            </Typography>
            {/* Subtitle: Day / Exercise / Series */}
            {(() => {
              // Find def from editingSeries
              const editingDef = exerciseDefs.find((def: any) => def.id === editingSeries);
              if (!editingDef) return null;
              // Find day label or number for this editingDef
              let dayIdx = -1;
              Object.entries(
                exerciseDefs.reduce((acc: any, cur: any) => { (acc[cur.day] = acc[cur.day] || []).push(cur); return acc; }, {})
              ).forEach(([_d, defs], idx) => {
                const defsArray = defs as any[];
                if (defsArray.some((def: any) => def.id === editingSeries)) { dayIdx = idx; }
              });
              const exName = editingDef.exercise?.name || "";
              const seriesNum = editingDef.seriesNumber || "";
              const labelString = lang === "es"
                ? `Día ${dayIdx+1} / ${exName} / Serie ${seriesNum}`
                : `Day ${dayIdx+1} / ${exName} / Series ${seriesNum}`;
              return (
                <Typography variant="subtitle2" sx={{ color: "#757575", mb: 2 }}>
                  {labelString}
                </Typography>
              );
            })()}
            <TextField
              id="athlete-notes-modal-desc"
              fullWidth
              value={modalNotes}
              onChange={e => setModalNotes(e.target.value)}
              onKeyDown={e => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !(e.nativeEvent as any).isComposing // to avoid IME composition bugs
                ) {
                  e.preventDefault();
                  handleCloseNotesModal();
                }
              }}
            />
          </Box>
        </Modal>
      </Box>
      <Box sx={{ minHeight: "100vh" }}>
        <Box
          ref={blockWeekRef}
          sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'background.default', pt: 0, pb: 2, mb: 3, borderBottom: '1px solid', borderColor: 'divider', boxShadow: 1 }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={0}
            flexDirection={{ xs: "column", md: "row" }}
            sx={{ width: "100%", maxWidth: 500, mx: "auto" }}
          >
            {selectedBlock && (
              <FormControl size="small" sx={{ minWidth: 210, mb: { xs: 2, md: 0 } }}>
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
                      {`${translations[lang].block} ${b.blockNumber}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {selectedBlock && selectedWeek && (
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ width: "100%", justifyContent: { xs: "center", md: "flex-start" } }}
              >
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
        <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 3 }}>
          {(() => {
            const byDay: DefByDay = {};
            exerciseDefs.forEach((def: any) => {
              if (!byDay[def.day]) byDay[def.day] = [];
              byDay[def.day].push(def);
            });
            return Object.entries(byDay).map(([dayName, defs], dayIdx) => (
              <Box key={dayName} sx={{
                mb: 4,
                p: 2,
                border: '2.5px solid',
                borderColor: dayIdx === selectedDay ? 'success.main' : 'divider',
                borderRadius: 2
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    position: "sticky",
                    top: { xs: 70, md: 60 },
                    zIndex: 20,
                    bgcolor: "background.default",
                    boxShadow: 1,
                    pb: 1,
                  }}
                >
                  {`${translations[lang].day} ${dayIdx + 1}`}
                  
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
                        <Box
                          sx={{
                            mb: 0,
                            p: 1,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: exKey === focusedExerciseKey ? 'success.light' : undefined
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">{exDefs[0].exercise.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{exDefs[0].exercise.group}</Typography>
                        </Box>
                        <TableContainer component={Box} sx={{ boxShadow: 'none', mb: 2, mt: 1, maxWidth: '100%' }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center" sx={{ width: 28 }}>#</TableCell>
                                <TableCell align="center">{translations[lang].weight}</TableCell>
                                <TableCell align="center">{translations[lang].reps}</TableCell>
                                <TableCell align="center">{translations[lang].rir}</TableCell>
                                <TableCell align="center">{translations[lang].progress}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {exDefs.map((def: any, i: number) => {
                                const hasTrainer = def.trainerNotes && def.trainerNotes.trim() !== "";
                                const hasAthlete = def.athleteNotes && def.athleteNotes.trim() !== "";
                                const rowSpan = 1 + (hasTrainer ? 1 : 0) + (hasAthlete ? 1 : 0);
                                let currentRow = 0;
                                return (
                                  <React.Fragment key={def.id}>
                                    {hasTrainer && (
                                      <TableRow>
                                        <TableCell
                                          rowSpan={rowSpan}
                                          align="center"
                                          sx={{
                                            verticalAlign: "middle",
                                            borderBottom: "none",
                                            borderTop: currentRow === 0 ? undefined : "none"
                                          }}
                                        >
                                          <IconButton
                                            size="large"
                                            onClick={e => {
                                              e.stopPropagation();
                                              setEditingSeries(def.id);
                                              setOpenNotesModal(true);
                                              setSelectedDay?.(dayIdx);
                                              setFocusedExerciseKey(exKey);
                                            }}
                                            title={
                                              translations[lang].noteButtonTitle(
                                                userInfo?.firstName ?? "",
                                                userInfo?.lastName ?? ""
                                              )
                                            }
                                            sx={{
                                              p: 0,
                                              m: 0,
                                              background: "none"
                                            }}
                                          >
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#607d8b">
                                              <text x="50%" y="56%" textAnchor="middle" alignmentBaseline="middle" style={{ fontSize: "0.5em", fill: "#607d8b", fontWeight: "bold" }}>{def.isDropset ? "DS" : def.seriesNumber}</text>
                                            </svg>
                                          </IconButton>
                                        </TableCell>
                                        <TableCell colSpan={5} sx={{ bgcolor: "#565656ff", fontSize: "0.75em", color: "#a7a7a7ff", px: 2, py: 0.5 }}>
                                          <span style={{ fontStyle: "italic", fontWeight: 1000, color: "white" }}>Elena: </span>{def.trainerNotes}
                                        </TableCell>
                                      </TableRow>
                                    )}
                                    <TableRow>
                                      {!hasTrainer && (
                                        <TableCell
                                          rowSpan={rowSpan}
                                          align="center"
                                          sx={{
                                            verticalAlign: "middle",
                                            borderBottom: "none"
                                          }}
                                        >
                                          <IconButton
                                            size="large"
                                            onClick={e => {
                                              e.stopPropagation();
                                              setEditingSeries(def.id);
                                              setOpenNotesModal(true);
                                              setSelectedDay?.(dayIdx);
                                              setFocusedExerciseKey(exKey);
                                            }}
                                            title={userInfo?.firstName ? `${userInfo.firstName}'s notes` : 'Notes'}
                                            sx={{
                                              p: 0,
                                              m: 0,
                                              background: "none"
                                            }}
                                          >
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#607d8b">
                                              <text x="50%" y="56%" textAnchor="middle" alignmentBaseline="middle" style={{ fontSize: "0.5em", fill: "#607d8b", fontWeight: "bold" }}>{def.isDropset ? "DS" : def.seriesNumber}</text>
                                            </svg>
                                          </IconButton>

                                          
                                        </TableCell>
                                      )}
                                      <TableCell align="center" sx={{ verticalAlign: "top" }}>
                                        <TextField
                                          type="number"
                                          inputProps={{
                                            inputMode: "decimal",
                                            step: "0.1",
                                            min: 0,
                                            pattern: "[0-9]*[.,]?[0-9]*"
                                          }}
                                          value={def.effectiveWeight ?? ""}
                                          onChange={e => handleLocalChange(def.id, "effectiveWeight", e.target.value)}
                                          onFocus={() => {
                                            setSelectedDay?.(dayIdx);
                                            setFocusedExerciseKey(exKey);
                                          }}
                                          onBlur={e => {
                                            handleBlur(def.id, "effectiveWeight", e.target.value);
                                            setSelectedDay?.(dayIdx);
                                          }}
                                          placeholder={
                                            def.lastWeekValues && def.lastWeekValues.effectiveWeight != null
                                              ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveWeight}`
                                              : translations[lang].weight
                                          }
                                          variant="standard"
                                          size="small"
                                          sx={{
                                            "& .MuiInputBase-input::placeholder": { fontSize: "0.75em", opacity: 1 }
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell align="center" sx={{ verticalAlign: "top" }}>
                                        <TextField
                                          type="text"
                                          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                          value={def.effectiveReps ?? ""}
                                          onChange={e => handleLocalChange(def.id, "effectiveReps", e.target.value)}
                                          onFocus={() => {
                                            setSelectedDay?.(dayIdx);
                                            setFocusedExerciseKey(exKey);
                                          }}
                                          onBlur={e => {
                                            handleBlur(def.id, "effectiveReps", e.target.value);
                                            setSelectedDay?.(dayIdx);
                                          }}
                                          placeholder={
                                            def.lastWeekValues && def.lastWeekValues.effectiveReps != null
                                              ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveReps}`
                                              : translations[lang].reps
                                          }
                                          variant="standard"
                                          size="small"
                                        sx={{
                                          "& .MuiInputBase-input::placeholder": { fontSize: "0.75em", opacity: 1 }
                                        }}
                                        />
                                        {(def.minReps != null && def.maxReps != null) && (
                                          <span style={{ marginLeft: 4, fontSize: "0.85em", color: "#888" }}>
                                            {def.minReps}&ndash;{def.maxReps}
                                          </span>
                                        )}
                                      </TableCell>
                                      <TableCell align="center" sx={{ verticalAlign: "top" }}>
                                        <TextField
                                          type="text"
                                          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                          value={def.effectiveRir ?? ""}
                                          onChange={e => handleLocalChange(def.id, "effectiveRir", e.target.value)}
                                          onFocus={() => {
                                            setSelectedDay?.(dayIdx);
                                            setFocusedExerciseKey(exKey);
                                          }}
                                          onBlur={e => {
                                            handleBlur(def.id, "effectiveRir", e.target.value);
                                            setSelectedDay?.(dayIdx);
                                          }}
                                          placeholder={
                                            def.lastWeekValues && def.lastWeekValues.effectiveRir != null
                                              ? `${translations[lang].lastWeekShort}${def.lastWeekValues.effectiveRir}`
                                              : translations[lang].rir
                                          }
                                          variant="standard"
                                          size="small"
                                        sx={{
                                          "& .MuiInputBase-input::placeholder": { fontSize: "0.75em", opacity: 1 }
                                        }}
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
                                    {hasAthlete && (
                                      <TableRow>
                                        <TableCell colSpan={5} sx={{ bgcolor: "#565656ff", fontSize: "0.75em", color: "#a7a7a7ff", px: 2, py: 0.5 }}>
                                          <span style={{ fontStyle: "italic", fontWeight: 1000, color: "white" }}>Yo: </span>{def.athleteNotes}
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </React.Fragment>
                                )
                              })}
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
    </Box>
      <NotificationSnackbar
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </>
  );
}
