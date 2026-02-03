import React, { useEffect, useState } from "react";
import {
  Box, Stepper, Step, StepLabel, Button, Typography, TextField, Autocomplete, CircularProgress, Alert, IconButton, Paper, Checkbox, Tooltip, Dialog, Snackbar
} from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import { translations, type Lang } from "../i18n";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

const steps = (lang: Lang) => [
  translations[lang].createBlockWizardStepConfig,
  translations[lang].createBlockWizardStepDesign,
  translations[lang].createBlockWizardStepSummary
];

type Exercise = {
  id: string;
  name: string;
  exerciseGroup?: { id: string; name: string };
  recommendedMinReps?: number | null;
  recommendedMaxReps?: number | null;
};

type SeriesConfig = {
  id: string;
  dropset: boolean;
  minReps: number | "";
  maxReps: number | "";
  minRIR: number | "";
  maxRIR: number | "";
  trainerNotes: string;
};

type ExerciseConfig = {
  id: string;
  exercise: Exercise;
  sets: number;
  config: SeriesConfig[];
  hasDropsetSeries?: boolean; // New field for dropset at exercise level
  dropsetTrainerNotes?: string; // Notes for dropset row
};

function SortableExerciseRow({ exCfg, exIdx, dayIdx, children, sensors, setExercisesPerDay, translations, lang }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: exCfg.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    border: isDragging ? "2px solid #ffe082" : undefined,
    marginBottom: 16
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children(listeners)}
    </div>
  );
}

function SortableSeriesRow({
  config,
  sIdx,
  dayIdx,
  exIdx,
  handleChangeSeriesConfig,
  setExercisesPerDay,
  exCfg,
  translations,
  lang,
  handleSeriesCopy,
  handleSeriesAdd,
  handleSeriesRemove
}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: config.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    background: isDragging ? "#ffe082" : undefined
  };

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 1,
        ...style
      }}
      {...attributes}
    >
      <Tooltip title={translations[lang].wizardDragSeries}>
        <span style={{ cursor: "grab", opacity: 0.7 }} {...listeners}>
          <span role="img" aria-label="drag">⋮⋮</span>
        </span>
      </Tooltip>
      <Typography sx={{ width: 20, textAlign: "center", color: "#888" }}>
        {sIdx + 1}
      </Typography>
      <TextField
        label={translations[lang].wizardMinReps}
        type="number"
        size="small"
        sx={{ width: 100 }}
        inputProps={{ min: 0 }}
        value={config.minReps}
        onChange={e =>
          handleChangeSeriesConfig(dayIdx, exIdx, sIdx, "minReps", e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <TextField
        label={translations[lang].wizardMaxReps}
        type="number"
        size="small"
        sx={{ width: 100 }}
        inputProps={{ min: 0 }}
        value={config.maxReps}
        onChange={e =>
          handleChangeSeriesConfig(dayIdx, exIdx, sIdx, "maxReps", e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <TextField
        label={translations[lang].wizardMinRIR}
        type="number"
        size="small"
        sx={{ width: 100 }}
        inputProps={{ min: 0 }}
        value={config.minRIR}
        onChange={e =>
          handleChangeSeriesConfig(dayIdx, exIdx, sIdx, "minRIR", e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <TextField
        label={translations[lang].wizardMaxRIR}
        type="number"
        size="small"
        sx={{ width: 100 }}
        inputProps={{ min: 0 }}
        value={config.maxRIR}
        onChange={e =>
          handleChangeSeriesConfig(dayIdx, exIdx, sIdx, "maxRIR", e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <TextField
        label={translations[lang].wizardSeriesNotes}
        size="small"
        sx={{ flex: 1, minWidth: 120 }}
        value={config.trainerNotes}
        onChange={e =>
          handleChangeSeriesConfig(dayIdx, exIdx, sIdx, "trainerNotes", e.target.value)
        }
      />
      {/* Icons for copy, add, remove */}
      <Tooltip title={translations[lang].wizardSeriesCopy}>
        <IconButton size="small" onClick={() => handleSeriesCopy(sIdx)}>
          <span role="img" aria-label="copy">📋</span>
        </IconButton>
      </Tooltip>
      <Tooltip title={translations[lang].wizardSeriesAdd}>
        <IconButton size="small" onClick={() => handleSeriesAdd(sIdx)}>
          <span role="img" aria-label="add">➕</span>
        </IconButton>
      </Tooltip>
      <Tooltip title={translations[lang].wizardSeriesRemove}>
        <span>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleSeriesRemove(sIdx)}
            disabled={exCfg.config.length === 1}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}

export default function TrainingBlocksWizard() {
  const [activeStep, setActiveStep] = useState(0);

  const lang: Lang = "es";

  // Banner state
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerSeverity, setBannerSeverity] = useState<"success" | "error" | "info">("info");

  // Step 1 state
  const [athleteOptions, setAthleteOptions] = useState<any[]>([]);
  const [athleteLoading, setAthleteLoading] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<any>(null);
  const [weeks, setWeeks] = useState<number>(6);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [visible, setVisible] = useState<boolean>(true);

  // Step 2 state
  const [exercisesPerDay, setExercisesPerDay] = useState<ExerciseConfig[][]>([]);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [exerciseFetchLoading, setExerciseFetchLoading] = useState(false);
  const [finalizeLoading, setFinalizeLoading] = useState(false);

  // UI helper state for exercise selection per day
  const [addingExerciseIdx, setAddingExerciseIdx] = useState<number | null>(null);
  const [exerciseSearchValue, setExerciseSearchValue] = useState<string>("");

  // Fetch active athletes
  useEffect(() => {
    setAthleteLoading(true);
    fetch("/api/get-user-management-info")
      .then(r => r.json())
      .then(arr => {
        if (Array.isArray(arr)) {
          setAthleteOptions(arr.filter(a => !a.hidden));
        }
      })
      .finally(() => setAthleteLoading(false));
  }, []);

  // Fetch exercises when entering step 2
  useEffect(() => {
    if (activeStep === 1 && allExercises.length === 0) {
      setExerciseFetchLoading(true);
      fetch("/api/exercises")
        .then(r => r.json())
        .then(data => {
          if (data && Array.isArray(data.exercises)) {
            setAllExercises(data.exercises);
          }
        })
        .finally(() => setExerciseFetchLoading(false));
    }
  }, [activeStep, allExercises.length]);

  // Reset exercisesPerDay if daysPerWeek changes
  useEffect(() => {
    if (activeStep === 1) {
      setExercisesPerDay(prev => {
        let arr = [...prev];
        if (arr.length < daysPerWeek) {
          for (let i = arr.length; i < daysPerWeek; i++) arr.push([]);
        }
        if (arr.length > daysPerWeek) {
          arr = arr.slice(0, daysPerWeek);
        }
        return arr;
      });
    }
  }, [activeStep, daysPerWeek]);

  // Add an exercise to day i
  const handleAddExercise = (dayIdx: number, ex: Exercise) => {
    setExercisesPerDay(prev => {
      const arr = [...prev];
      const exists = arr[dayIdx].some(e => e.exercise.id === ex.id);
      if (!exists) {
        arr[dayIdx] = [
          ...arr[dayIdx],
          {
            id: uuidv4(),
            exercise: ex,
            sets: 1,
            config: [
              {
                id: uuidv4(),
                dropset: false,
                minReps: "",
                maxReps: "",
                minRIR: "",
                maxRIR: "",
                trainerNotes: "",
              },
            ],
          },
        ];
      }
      return arr;
    });
    setAddingExerciseIdx(null);
    setExerciseSearchValue("");
  };

  // Remove an exercise from a day
  const handleRemoveExercise = (dayIdx: number, exId: string) => {
    setExercisesPerDay(prev => {
      const arr = [...prev];
      arr[dayIdx] = arr[dayIdx].filter(e => e.exercise.id !== exId);
      return arr;
    });
  };

  // Remove unused handleChangeSets as it's not needed in new UI

  // Per-series config change
  const handleChangeSeriesConfig = (dayIdx: number, exIdx: number, sIdx: number, field: keyof SeriesConfig, value: any) => {
    setExercisesPerDay(prev => {
      const arr = [...prev];
      const exConf = arr[dayIdx][exIdx];
      const newConfig = exConf.config.map((c, idx) =>
        idx === sIdx ? { ...c, [field]: value } : c
      );
      arr[dayIdx][exIdx] = { ...exConf, config: newConfig };
      return arr;
    });
  };

  // For DnD kit - provide sensors hook high-level to prevent Rules of Hooks breakage
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps(lang).map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              {translations[lang].createBlockWizardStep1Info}
            </Alert>
            <Box mb={3}>
              <Autocomplete
                autoHighlight
                disabled={athleteLoading}
                options={athleteOptions}
                getOptionLabel={option =>
                  option
                    ? (
                        option.firstName && option.lastName
                          ? `${option.firstName} ${option.lastName}`
                          : (option.firstName || option.lastName || option.username || "")
                      )
                    : ""
                }
                isOptionEqualToValue={(option, value) => option && value && option.id === value.id}
                value={selectedAthlete}
                onChange={(_, value) => setSelectedAthlete(value)}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    <span>
                      {option.firstName && option.lastName
                        ? `${option.firstName} ${option.lastName}`
                        : (option.firstName || option.lastName || option.username || "")}
                    </span>
                    {option.email && (
                      <span style={{
                        color: "#999",
                        fontSize: "0.77em",
                        marginLeft: 6,
                        verticalAlign: "middle"
                      }}>
                        ({option.email})
                      </span>
                    )}
                  </li>
                )}
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
            <Box mb={3}>
              <TextField
                type="number"
                inputProps={{ min: 1, max: 20 }}
                label={translations[lang].createBlockWizardWeeksLabel}
                value={weeks}
                onChange={e => setWeeks(Math.max(1, Math.min(20, Number(e.target.value))))}
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <TextField
                type="number"
                inputProps={{ min: 1, max: 7 }}
                label={translations[lang].createBlockWizardDaysPerWeekLabel}
                value={daysPerWeek}
                onChange={e => setDaysPerWeek(Math.max(1, Math.min(7, Number(e.target.value))))}
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {translations[lang].blockVisibilityLabel}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <label>
                  <input
                    type="radio"
                    name="visible"
                    value="true"
                    checked={visible === true}
                    onChange={() => setVisible(true)}
                  />
                  {translations[lang].blockVisibilityImmediately}
                </label>
                <label>
                  <input
                    type="radio"
                    name="visible"
                    value="false"
                    checked={visible === false}
                    onChange={() => setVisible(false)}
                  />
                  {translations[lang].blockVisibilityNotYet}
                </label>
              </Box>
            </Box>
          </Box>
        )}
        {activeStep === 1 && (
          <Box sx={{
            minHeight: '70vh',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              {translations[lang].createBlockWizardDesignStepText}
            </Alert>
            {(() => {
              // List of muscle group keys and their translation keys
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

              // Compute total week muscle volume per group: sum of (sets * factor) for each exercise for each day
              const muscleVolume = Object.fromEntries(
                muscleGroupFactorMap.map(({ factor }) => [factor, 0])
              );
              // Iterate all days/exercises and sum up
              exercisesPerDay.forEach(dayArr => {
                dayArr.forEach(exCfg => {
                  let nSeries = Array.isArray(exCfg.config) ? exCfg.config.length : exCfg.sets || 1;
                  muscleGroupFactorMap.forEach(({ factor }) => {
                    const f =
                      typeof (exCfg.exercise as any)[factor] === "number"
                        ? (exCfg.exercise as any)[factor]
                        : parseFloat(((exCfg.exercise as any)[factor] || 0).toString());
                    if (!isNaN(f) && f !== 0) muscleVolume[factor] += nSeries * f;
                  });
                });
              });

              // Only show if at least one > 0
              const anyVolume = Object.values(muscleVolume).some(v => v > 0);

              return anyVolume ? (
                <Box sx={{ 
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  borderRadius: 2,
                  p: 2,
                  mb: 4,
                  alignItems: "center",
                  border: "1px solid #e0e0e0",
                  position: "sticky",
                  top: 0,
                  left: 0,
                  zIndex: 10,
                  bgcolor: "background.paper",
                  boxShadow: 2
                }}>
                  {muscleGroupFactorMap
                    .filter(({ factor }) => muscleVolume[factor] > 0)
                    .sort((a, b) => muscleVolume[b.factor] - muscleVolume[a.factor])
                    .map(({ factor, label }) =>
                      <Tooltip
                        title={
                          <div>
                            {(() => {
                              // Gather exercise-wise breakdowns for this factor
                              const exerciseRows: string[] = [];
                              exercisesPerDay.forEach((dayArr, dayIdx) => {
                                dayArr.forEach((exCfg, exIdx) => {
                                  const exName = exCfg.exercise?.name || `Ejercicio ${exIdx + 1}`;
                                  const factorValue = (exCfg.exercise as any)[factor] ?? 0;
                                  const nSeries = Array.isArray(exCfg.config) ? exCfg.config.length : exCfg.sets || 1;
                                  const contribution = nSeries * parseFloat(factorValue || 0);
                                  // Only if the factor exists and is not zero
                                  if (!isNaN(contribution) && contribution !== 0) {
                                    exerciseRows.push(
                                      `${exName}: ${nSeries} × ${factorValue} = ${contribution}`
                                    );
                                  }
                                });
                              });
                              return (
                                <>
                                  {exerciseRows.length > 0 ? (
                                    <>
                                      {exerciseRows.map((row, i) => (
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
                              p: 1.2,
                            }
                          }
                        }}
                      >
                        <Box
                          key={factor}
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
                    )}
                </Box>
              ) : null;
            })()}

            <Box sx={{ position: "relative" }}>
              {[...Array(daysPerWeek)].map((_, dayIdx) => (
                <Paper key={dayIdx} sx={{ p: 2, width: "100%", mb: 2 }} elevation={3}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    Día {dayIdx + 1}
                  </Typography>
                  <Box>
                    {exercisesPerDay[dayIdx]?.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {translations[lang].wizardNoExercises}
                      </Typography>
                    )}
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={event => {
                        const { active, over } = event;
                        if (over && active.id !== over.id) {
                          setExercisesPerDay(prev => {
                            const arr = [...prev];
                            const dayExercises = arr[dayIdx];
                            const oldIdx = dayExercises.findIndex(exCfg => exCfg.id === active.id);
                            const newIdx = dayExercises.findIndex(exCfg => exCfg.id === over.id);
                            if (oldIdx === -1 || newIdx === -1) return arr;
                            arr[dayIdx] = arrayMove(dayExercises, oldIdx, newIdx);
                            return arr;
                          });
                        }
                      }}
                    >
                      <SortableContext
                        items={exercisesPerDay[dayIdx]?.map(exCfg => exCfg.id) || []}
                        strategy={verticalListSortingStrategy}
                      >
                        {exercisesPerDay[dayIdx]?.map((exCfg, exIdx) => (
                          <SortableExerciseRow
                            key={exCfg.id}
                            exCfg={exCfg}
                            exIdx={exIdx}
                            dayIdx={dayIdx}
                            sensors={sensors}
                            setExercisesPerDay={setExercisesPerDay}
                            translations={translations}
                            lang={lang}
                          >
                            {(listeners: any) => (
                              <Box sx={{ flex: 1, border: "1px solid #e3e3e3", p: 1.2, borderRadius: 2, mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Tooltip title={translations[lang].wizardDragExercise}>
                                      <span style={{ cursor: "grab", opacity: 0.7 }} {...listeners}>
                                        <span role="img" aria-label="drag">⋮⋮</span>
                                      </span>
                                    </Tooltip>
                                    <Typography variant="body1">{exCfg.exercise.name}</Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Checkbox
                                      checked={!!exCfg.hasDropsetSeries}
                                      onChange={e => {
                                        setExercisesPerDay(prev => {
                                          const arr = [...prev];
                                          arr[dayIdx][exIdx] = {
                                            ...exCfg,
                                            hasDropsetSeries: e.target.checked
                                          };
                                          return arr;
                                        });
                                      }}
                                      size="small"
                                    />
                                    <Typography variant="body2">
                                      Añadir serie dropset
                                    </Typography>
                                    <IconButton
                                      color="error"
                                      onClick={() => handleRemoveExercise(dayIdx, exCfg.exercise.id)}
                                      size="small"
                                      aria-label="Remove Exercise"
                                    >
                                      <DeleteOutline fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </Box>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, minWidth: 50, mb: 1 }}>
                                  Series:
                                </Typography>
                                {/* Series drag-and-drop */}
                                <DndContext
                                  sensors={sensors}
                                  collisionDetection={closestCenter}
                                  onDragEnd={event => {
                                    const { active, over } = event;
                                    if (over && active.id !== over.id) {
                                      setExercisesPerDay(prev => {
                                        const arr = [...prev];
                                        const oldIdx = arr[dayIdx][exIdx].config.findIndex((cfg: any) => cfg.id === active.id);
                                        const newIdx = arr[dayIdx][exIdx].config.findIndex((cfg: any) => cfg.id === over.id);
                                        if (oldIdx === -1 || newIdx === -1) return arr;
                                        const updatedConfig = arrayMove(arr[dayIdx][exIdx].config, oldIdx, newIdx);
                                        arr[dayIdx][exIdx] = {
                                          ...arr[dayIdx][exIdx],
                                          config: updatedConfig,
                                        };
                                        return arr;
                                      });
                                    }
                                  }}
                                >
                                  <SortableContext
                                    items={exCfg.config.map(cfg => cfg.id)}
                                    strategy={verticalListSortingStrategy}
                                  >
                                    {exCfg.config.map((config, sIdx) => (
                                      <SortableSeriesRow
                                        key={config.id}
                                        config={config}
                                        sIdx={sIdx}
                                        dayIdx={dayIdx}
                                        exIdx={exIdx}
                                        handleChangeSeriesConfig={handleChangeSeriesConfig}
                                        setExercisesPerDay={setExercisesPerDay}
                                        exCfg={exCfg}
                                        translations={translations}
                                        lang={lang}
                                        handleSeriesCopy={(copyIdx: number) => {
                                          setExercisesPerDay(prev => {
                                            const arr = [...prev];
                                            const series = [...exCfg.config];
                                            series.splice(copyIdx + 1, 0, { ...config, id: uuidv4() });
                                            arr[dayIdx][exIdx] = {
                                              ...exCfg,
                                              config: series,
                                            };
                                            return arr;
                                          });
                                        }}
                                        handleSeriesAdd={(addIdx: number) => {
                                          setExercisesPerDay(prev => {
                                            const arr = [...prev];
                                            const series = [...exCfg.config];
                                            series.splice(addIdx + 1, 0, {
                                              id: uuidv4(),
                                              dropset: false,
                                              minReps: "",
                                              maxReps: "",
                                              minRIR: "",
                                              maxRIR: "",
                                              trainerNotes: "",
                                            });
                                            arr[dayIdx][exIdx] = {
                                              ...exCfg,
                                              config: series,
                                            };
                                            return arr;
                                          });
                                        }}
                                        handleSeriesRemove={(removeIdx: number) => {
                                          setExercisesPerDay(prev => {
                                            const arr = [...prev];
                                            const series = [...exCfg.config];
                                            if (series.length > 1) {
                                              series.splice(removeIdx, 1);
                                              arr[dayIdx][exIdx] = {
                                                ...exCfg,
                                                config: series,
                                              };
                                            }
                                            return arr;
                                          });
                                        }}
                                      />
                                    ))}
                                  </SortableContext>
                                </DndContext>
                                {/* Dropset row (renders after all other series if hasDropsetSeries is set) */}
                                {exCfg.hasDropsetSeries && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mb: 1,
                                      opacity: 0.85,
                                    }}
                                    key="dropset-row"
                                  >
                                    <span style={{ width: 60, textAlign: "center" }}>
                                      Dropset
                                    </span>
                                    <TextField
                                      label={translations[lang].wizardDropsetNotes}
                                      size="small"
                                      sx={{ flex: 1, minWidth: 120, ml: 1 }}
                                      value={exCfg.dropsetTrainerNotes || ""}
                                      onChange={e => {
                                        setExercisesPerDay(prev => {
                                          const arr = [...prev];
                                          arr[dayIdx][exIdx] = {
                                            ...exCfg,
                                            dropsetTrainerNotes: e.target.value
                                          };
                                          return arr;
                                        });
                                      }}
                                    />
                                  </Box>
                                )}
                              </Box>
                            </Box>
                            )}
                          </SortableExerciseRow>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </Box>
                  {addingExerciseIdx === dayIdx ? (
                    <Box mt={1}>
                      <Autocomplete
                        loading={exerciseFetchLoading}
                        size="small"
                        options={allExercises}
                        getOptionLabel={o => o?.name || ""}
                        onChange={(_, v) => v && handleAddExercise(dayIdx, v)}
                        inputValue={exerciseSearchValue}
                        onInputChange={(_, val) => setExerciseSearchValue(val)}
                        renderInput={params => (
                          <TextField {...params} label={translations[lang].wizardAddExercise} autoFocus />
                        )}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Button
                        fullWidth
                        startIcon={<AddCircleOutline />}
                        variant="contained"
                        sx={{ mt: 1 }}
                        onClick={() => setAddingExerciseIdx(dayIdx)}
                        size="small"
                        color="primary"
                      >
                        {translations[lang].wizardAddExercise}
                      </Button>
                    </Box>
                  )}
                </Paper>
              ))}
            </Box>
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              {translations[lang].createBlockWizardSummaryStepText ?? "Revisa tu configuración antes de crear el bloque."}
            </Alert>
            {/* Badges section: show muscle group volumes in summary */}
            {(() => {
              // (Badges logic duplicated from step 1, but using exercisesPerDay)
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
              const muscleVolume = Object.fromEntries(
                muscleGroupFactorMap.map(({ factor }) => [factor, 0])
              );
              exercisesPerDay.forEach(dayArr => {
                dayArr.forEach(exCfg => {
                  let nSeries = Array.isArray(exCfg.config) ? exCfg.config.length : exCfg.sets || 1;
                  muscleGroupFactorMap.forEach(({ factor }) => {
                    const f =
                      typeof (exCfg.exercise as any)[factor] === "number"
                        ? (exCfg.exercise as any)[factor]
                        : parseFloat(((exCfg.exercise as any)[factor] || 0).toString());
                    if (!isNaN(f) && f !== 0) muscleVolume[factor] += nSeries * f;
                  });
                });
              });
              const anyVolume = Object.values(muscleVolume).some(v => v > 0);
              return anyVolume ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, borderRadius: 2, p: 2, mb: 3, mt: 1, alignItems: "center", border: "1px solid #e0e0e0" }}>
                  {muscleGroupFactorMap
                    .filter(({ factor }) => muscleVolume[factor] > 0)
                    .sort((a, b) => muscleVolume[b.factor] - muscleVolume[a.factor])
                    .map(({ factor, label }) =>
                      <Tooltip
                        title={
                          <div>
                            {(() => {
                              const exerciseRows: string[] = [];
                              exercisesPerDay.forEach((dayArr, dayIdx) => {
                                dayArr.forEach((exCfg, exIdx) => {
                                  const exName = exCfg.exercise?.name || `Ejercicio ${exIdx + 1}`;
                                  const factorValue = (exCfg.exercise as any)[factor] ?? 0;
                                  const nSeries = Array.isArray(exCfg.config) ? exCfg.config.length : exCfg.sets || 1;
                                  const contribution = nSeries * parseFloat(factorValue || 0);
                                  if (!isNaN(contribution) && contribution !== 0) {
                                    exerciseRows.push(
                                      `${exName}: ${nSeries} × ${factorValue} = ${contribution}`
                                    );
                                  }
                                });
                              });
                              return (
                                <>
                                  {exerciseRows.length > 0 ? (
                                    <>
                                      {exerciseRows.map((row, i) => (
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
                          key={factor}
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
                    )}
                </Box>
              ) : null;
            })()}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Atleta:&nbsp;
              <span style={{ fontWeight: 400 }}>
                {selectedAthlete
                  ? (
                      selectedAthlete.firstName && selectedAthlete.lastName
                        ? `${selectedAthlete.firstName} ${selectedAthlete.lastName}`
                        : (
                            selectedAthlete.firstName
                              ? selectedAthlete.firstName
                              : (
                                  selectedAthlete.lastName
                                    ? selectedAthlete.lastName
                                    : selectedAthlete.username
                                )
                          )
                    )
                  : ""}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Semanas: {weeks} &nbsp;·&nbsp; Días por semana: {daysPerWeek}
            </Typography>
            {[...Array(daysPerWeek)].map((_, dayIdx) => (
              <Paper key={dayIdx} sx={{ p: 2, width: "100%", mb: 2 }} elevation={0}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  Día {dayIdx + 1}
                </Typography>
                {exercisesPerDay[dayIdx]?.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {translations[lang].wizardNoExercises}
                  </Typography>
                ) : (
                  exercisesPerDay[dayIdx].map((exCfg) => (
                    <Box key={exCfg.exercise.id} sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {exCfg.exercise.name}{" "}
                        <span style={{ fontWeight: 400 }}>
                          (
                          {exCfg.config.length}{" "}
                          {exCfg.config.length === 1
                            ? translations[lang].seriesSingular
                            : translations[lang].seriesPlural}
                          {exCfg.hasDropsetSeries ? " + dropset" : ""}
                          )
                        </span>
                      </Typography>
                      <Box sx={{ width: "100%", overflow: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.97em" }}>
                          <thead>
                            <tr>
                              <th style={{ textAlign: "left", padding: "2px 8px" }}>{translations[lang].seriesSingular}</th>
                              <th style={{ textAlign: "left", padding: "2px 8px" }}>{translations[lang].wizardMinReps}</th>
                              <th style={{ textAlign: "left", padding: "2px 8px" }}>{translations[lang].wizardMaxReps}</th>
                              <th style={{ textAlign: "left", padding: "2px 8px" }}>{translations[lang].wizardMinRIR}</th>
                              <th style={{ textAlign: "left", padding: "2px 8px" }}>{translations[lang].wizardMaxRIR}</th>
                              <th style={{ textAlign: "left", padding: "2px 8px" }}>{translations[lang].wizardSeriesNotes}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exCfg.config.map((serie, sIdx) => (
                              <tr key={sIdx} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "2px 8px" }}>{sIdx + 1}</td>
                                <td style={{ padding: "2px 8px" }}>{serie.minReps || "-"}</td>
                                <td style={{ padding: "2px 8px" }}>{serie.maxReps || "-"}</td>
                                <td style={{ padding: "2px 8px" }}>{serie.minRIR || "-"}</td>
                                <td style={{ padding: "2px 8px" }}>{serie.maxRIR || "-"}</td>
                                <td style={{ padding: "2px 8px" }}>{serie.trainerNotes || "-"}</td>
                              </tr>
                            ))}
                            {exCfg.hasDropsetSeries && (
                              <tr style={{ borderBottom: "1px solid #eee", opacity: 0.85 }}>
                                <td style={{ padding: "2px 8px" }}>Dropset</td>
                                <td colSpan={4}></td>
                                <td style={{ padding: "2px 8px" }}>{exCfg.dropsetTrainerNotes || "-"}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </Box>
                    </Box>
                  ))
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((s) => s - 1)}
          sx={{ mr: 1 }}
        >
          {translations[lang].createBlockWizardBackButton ?? "Atrás"}
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          disabled={
            finalizeLoading ||
            (activeStep === 0 && (!selectedAthlete || weeks < 1 || daysPerWeek < 1)) ||
            (activeStep === 1 && exercisesPerDay.some(day => day.length === 0))
          }
          onClick={async () => {
            if (activeStep < steps(lang).length - 1) {
              setActiveStep((s) => s + 1);
            } else {
              setFinalizeLoading(true);
              try {
                const blockName = `Bloque ${new Date().toLocaleDateString("es-ES")}`;
                const exercisesByDay = exercisesPerDay.map((dayArr, dayIdx) =>
                  dayArr.map((exCfg, exIdx) => ({
                    exerciseId: exCfg.exercise.id,
                    exerciseNumber: exIdx + 1,
                    trainerNotes: "", // Add field if needed
                    series: [
                      ...exCfg.config.map((ser, sIdx) => ({
                        minReps: ser.minReps === "" ? undefined : ser.minReps,
                        maxReps: ser.maxReps === "" ? undefined : ser.maxReps,
                        minRIR: ser.minRIR === "" ? undefined : ser.minRIR,
                        maxRIR: ser.maxRIR === "" ? undefined : ser.maxRIR,
                        isDropset: !!ser.dropset,
                        trainerNotes: ser.trainerNotes || null,
                      })),
                      ...(exCfg.hasDropsetSeries
                        ? [{
                            minReps: null,
                            maxReps: null,
                            minRIR: null,
                            maxRIR: null,
                            isDropset: true,
                            trainerNotes: exCfg.dropsetTrainerNotes || null,
                          }]
                        : [])
                    ],
                  }))
                );
                const payload = {
                  userId: selectedAthlete.id,
                  name: blockName,
                  numWeeks: weeks,
                  daysPerWeek,
                  exercisesByDay,
                  visible: visible
                };
                // Visual feedback
                const res = await fetch("/api/wizard-create-block", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (data && data.success) {
                  setBannerMessage(lang === "es"
                    ? "Bloque creado correctamente"
                    : "Block created successfully");
                  setBannerSeverity("success");
                  setBannerOpen(true);
                  // Delay reload until after banner closes (handled below)
                } else {
                  setBannerMessage((lang === "es"
                    ? "Error al crear el bloque: "
                    : "Failed to create block: ") + ((data && data.error) || "Desconocido"));
                  setBannerSeverity("error");
                  setBannerOpen(true);
                }
              } catch (err) {
                setBannerMessage(lang === "es" ? "Error inesperado" : "Unexpected error: " + err);
                setBannerSeverity("error");
                setBannerOpen(true);
              } finally {
                setFinalizeLoading(false);
              }
            }
          }}
        >
          {activeStep === steps(lang).length - 1
            ? (translations[lang].createBlockWizardFinishButton ?? "Finalizar")
            : (translations[lang].createBlockWizardNextButton ?? "Siguiente")
          }
        </Button>
        <Dialog
          open={finalizeLoading}
          disableEscapeKeyDown
          aria-labelledby="creating-block-dialog-title"
          aria-describedby="creating-block-dialog-desc"
          PaperProps={{ sx: { textAlign: "center", p: 5 } }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
            <CircularProgress size={50} color="primary" sx={{ mb: 3 }}/>
            <Typography id="creating-block-dialog-title" variant="h6" sx={{ mb: 2 }}>
              {lang === "es"
                ? "Creando bloque, esto puede tardar un poco..."
                : "Creating block, it may take some time..."}
            </Typography>
          </Box>
        </Dialog>
      </Box>
      {/* Footer snackbar/banner */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={bannerOpen}
        autoHideDuration={3500}
        onClose={(_, reason) => {
          setBannerOpen(false);
          // Reload after success banner closes
          if (bannerSeverity === "success") {
            window.location.reload();
          }
        }}
      >
        <Alert
          severity={bannerSeverity}
          onClose={() => {
            setBannerOpen(false);
            if (bannerSeverity === "success") {
              window.location.reload();
            }
          }}
          sx={{ width: '100%' }}
        >
          {bannerMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
