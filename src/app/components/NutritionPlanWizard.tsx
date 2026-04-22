import React, { useState, useEffect, useRef } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Paper,
  Divider,
  CircularProgress,
  Alert
} from "@mui/material";

import NotificationSnackbar, { NotificationProps } from "./NotificationSnackbar";
import { useRouter } from "next/navigation";

import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { DefaultTemplate } from "./RichEditor/DefaultTemplate";
import { type Lang } from "@/app/i18n";

type MealOptionFood = { foodId: string; quantity: number };
type MealOption = { optionName: string; foods: MealOptionFood[]; description?: string };
type Meal = { name: string; description?: string; options: MealOption[] };

// Placeholder: replace these with real fetches/props from context or endpoints
type Athlete = { id: string; name: string; firstName?: string; lastName?: string; email?: string; username?: string; hidden?: boolean };
type Nutrient = { key: string; label: string; unit: string };
type Food = { id: string; name: string; kcal: number; [key: string]: any };

import { NUTRIENT_GROUPS } from "../utils/nutrients";

function NutritionPlanWizard({ lang }: { lang: Lang }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<NotificationProps["notification"]>(null);
  // -- New for edit/reuse logic --
  const [existingPlan, setExistingPlan] = useState<any | null>(null);
  const [wizardMode, setWizardMode] = useState<"new" | "edit" | null>(null); // null = no choice yet
  const [showPlanChoiceDialog, setShowPlanChoiceDialog] = useState(false);
  const [userSelectionLocked, setUserSelectionLocked] = useState(false);
  // I18n translations are always present per codebase convention
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { translations } = require("../i18n");
  const steps: string[] = [
    translations[lang].nutritionWizardStep1,
    translations[lang].nutritionWizardStep2,
    translations[lang].nutritionWizardStep3,
    translations[lang].nutritionWizardStep4,
    translations[lang].nutritionWizardStep5,
  ];
  // Wizard state

  // Foods for Step 3 (flattened: food group - food - state)
  const [foodStates, setFoodStates] = useState<
    { id: string; label: string; stateObj: any }[]
  >([]);
  
  useEffect(() => {
    fetch("/api/nutrition/nutrients")
      .then(r => r.json())
      .then((result) => {
        let allStates: { id: string; label: string; stateObj: any }[] = [];

        function flattenLatestAPI(input: any) {
          if (!input) return;
          if (Array.isArray(input)) {
            input.forEach(flattenLatestAPI);
            return;
          }
          // input is the root object
          if (input.groups && Array.isArray(input.groups)) {
            input.groups.forEach((group: any) => {
              const groupName = group.name || "";
              // Each group has components
              if (Array.isArray(group.components)) {
                group.components.forEach((component: any) => {
                  const componentName = component.name || "";
                  if (Array.isArray(component.states)) {
                    component.states.forEach((state: any) => {
                      // make food state IDs unique by prefixing group/component/state name if duplicates found
                      let uniqueId = state.id;
                      // Check for duplicates so far (rare: but possible if not globally unique from db)
                      if (allStates.some(s => s.id === uniqueId)) {
                        uniqueId = `${state.id}-${groupName}-${componentName}-${state.state}`;
                      }
                      allStates.push({
                        id: uniqueId,
                        label: `${groupName} - ${componentName}${state.state ? " - " + state.state : ""}`,
                        stateObj: state
                      });
                    });
                  }
                });
              }
            });
          }
        }

        flattenLatestAPI(result);

        setFoodStates(allStates.sort((a, b) => a.label.localeCompare(b.label)));
      })
      .catch(() => setFoodStates([]));
  }, []);

  const [activeStep, setActiveStep] = useState(0);

  // Weekly plan async loading spinner state (for edit)
  const [weeklyPlanLoading, setWeeklyPlanLoading] = useState(false); 

  // Step 1: athlete and meals per day
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [athleteOptions, setAthleteOptions] = useState<Athlete[]>([]);
  const [athleteLoading, setAthleteLoading] = useState(false);
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);

  // --- New: Load plan if athlete changes
  useEffect(() => {
    if (selectedAthlete && !userSelectionLocked) {
      // On user change, reset mode choice and get their active plan if any
      setWizardMode(null);
      setExistingPlan(null);
      setShowPlanChoiceDialog(false);

      fetch("/api/nutrition/plan?athleteId=" + selectedAthlete.id + "&active=true")
        .then(r => r.json())
        .then(plans => {
          if (Array.isArray(plans) && plans.length > 0) {
            setExistingPlan(plans[0]);
            setShowPlanChoiceDialog(true);
          } else {
            setExistingPlan(null);
            setWizardMode("new");
          }
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAthlete]);

  // Step 2: Nutrient restrictions
  const [nutrientRestrictions, setNutrientRestrictions] = useState<Record<string, { min?: number; max?: number }>>({});

  // Step 3: Template day (meals, options, foods, etc)
  const [templateMeals, setTemplateMeals] = useState<Meal[]>([]);
  // Rich plan description shown above meals
  const [planDescription, setPlanDescription] = useState<string>("");
  // Ref for DefaultTemplate in step 0
  const planDescRef = useRef<any>(null);
  // Plan title state
  const [planTitle, setPlanTitle] = useState<string>("");
  // e.g. [{name: "Comida 1", options: [{optionName: "", foods: [{foodId, quantity}]}]}]

  // Step 4: Weekly plan (copy template, allow specific edits)
  const [weeklyMeals, setWeeklyMeals] = useState<Meal[][]>([]); // Meals[] for each weekday/tab
  const [activeDayTab, setActiveDayTab] = useState<number>(0);

  // Step 5: Confirmation
  // You might display a summary state object

  // --- Effects ---

  // When entering Step 4, initialize weeklyMeals from templateMeals if creating a NEW plan only.
  useEffect(() => {
    if (activeStep === 3 && wizardMode === "new") {
      setWeeklyMeals(
        Array.from({ length: 7 }, () =>
          templateMeals.map(meal => JSON.parse(JSON.stringify(meal)) as Meal)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, wizardMode]);

  // Fetch athletes on mount
  useEffect(() => {
    setAthleteLoading(true);
    fetch("/api/athletes/active")
      .then(r => r.json())
      .then(arr => {
        setAthleteOptions(Array.isArray(arr) ? arr.filter((a: Athlete) => !a.hidden) : []);
      })
      .finally(() => setAthleteLoading(false));
  }, []);

  useEffect(() => {
    // On selecting meal count, (re)init the template meals
    setTemplateMeals(
      Array.from({ length: mealsPerDay }, (_, i) => ({
        name: `Comida ${i + 1}`,
        options: [
          {
            optionName: "",
            foods: []
          }
        ]
      }))
    );
  }, [mealsPerDay]);

  // Logic for copying base day across week for step 4
  const handleCopyToWeek = () => {
    setWeeklyMeals(Array.from({ length: 7 }, () =>
      templateMeals.map(meal => JSON.parse(JSON.stringify(meal)) as Meal)
    ));
  };

  function InfoIconWithNutrients({ mealIdx, optIdx, option, foodStates }: any) {
    const [open, setOpen] = React.useState(false);

    // Calculate totals
    // Sum all numeric nutrients dynamically
    const totals = React.useMemo(() => {
      if (!option.foods) return {};
      let sums: Record<string, number> = {};
      let encounteredKeys = new Set<string>();

      // Identify all numeric keys across all foods
      for (const nf of option.foods) {
        const fs = foodStates.find((f: any) => f.id === nf.foodId);
        if (fs && fs.stateObj) {
          for (const [key, val] of Object.entries(fs.stateObj)) {
            if (typeof val === "number" && key !== "id" && key !== "foodId") {
              encounteredKeys.add(key);
            }
          }
        }
      }
      // Sum each key
      for (const k of encounteredKeys) {
        for (const nf of option.foods) {
          const fs = foodStates.find((f: any) => f.id === nf.foodId);
          if (fs && fs.stateObj && typeof fs.stateObj[k] === "number") {
            sums[k] = (sums[k] || 0) + fs.stateObj[k] * (nf.quantity || 0) / 100;
          }
        }
      }
      return sums;
    }, [option.foods, foodStates]);

    // Build a key-to-meta map from NUTRIENT_GROUPS for efficient lookup
    const nutrientMetaMap: { [key: string]: { label?: string; name?: string; unit?: string } } = React.useMemo(() => {
      const map: { [key: string]: { label?: string; name?: string; unit?: string } } = {};
      NUTRIENT_GROUPS.filter(group => group.showInSummary).forEach(group => {
        group.fields.forEach(field => {
          map[field.key] = { label: (field as any).label, name: (field as any).name, unit: field.unit || "" };
        });
      });
      return map;
    }, []);

    return (
      <>
        <Button
          size="small"
          sx={{ minWidth: 24, ml: 1, mt: 0.5, padding: 0, minHeight: 24, height: 24, lineHeight: 1, color: "#1976d2" }}
          onClick={() => setOpen(true)}
          title="Option nutrition info"
        >
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <svg width="18" height="18" fill="currentColor" style={{ marginRight: 2 }}>
              <circle cx="9" cy="9" r="8" stroke="#1976d2" strokeWidth="1" fill="none" />
              <text x="9" y="13" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1976d2">i</text>
            </svg>
          </span>
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            {option.optionName || translations[lang].optionInfo}
          </DialogTitle>
          <DialogContent>
            <div>
              {NUTRIENT_GROUPS.filter(group => group.showInSummary).map((group) => {
                // List of nutrient keys in this group that are present in totals
                const groupNutrients = group.fields
                  .map(field => field.key)
                  .filter(key => typeof totals[key] !== "undefined");
                if (groupNutrients.length === 0) {
                  return null;
                }
                // Translate group label
                const groupLabelTranslated = translations[lang][group.groupLabel] || group.groupLabel;
                return (
                  <div key={group.groupLabel} style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, marginTop: 10, marginBottom: 2 }}>
                      {groupLabelTranslated}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 16, listStyle: "none" }}>
                      {group.fields.map((field) => {
                        const k = field.key;
                        if (typeof totals[k] === "undefined") return null;
                        // Translate nutrient field label
                        const nutrientTranslationKey =
                          "nutrient" + k.charAt(0).toUpperCase() + k.slice(1);
                        const label =
                          translations[lang][nutrientTranslationKey] ||
                          (nutrientMetaMap[k] && (nutrientMetaMap[k].label || nutrientMetaMap[k].name)) ||
                          k.charAt(0).toUpperCase() + k.slice(1);
                        const unit = nutrientMetaMap[k]?.unit || "";
                        return (
                          <li key={k} style={{ fontSize: 11, marginBottom: 2 }}>
                            <span style={{ color: "#bbbbbb" }}>{label}:</span>{" "}
                            <span style={{ fontWeight: 500 }}>{Number(totals[k]).toFixed(0)}</span>
                            {unit ? " " + unit : ""}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Step content renderers
  function renderStepContent() {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              {translations[lang].nutritionWizardAthleteStepHint}
            </Alert>
            {/* Athlete Selection */}
            <Autocomplete
              fullWidth
              autoHighlight
              disabled={athleteLoading || userSelectionLocked}
              options={athleteOptions}
              getOptionLabel={option =>
                option
                  ? (
                      option.firstName && option.lastName
                        ? `${option.firstName} ${option.lastName}`
                        : (option.firstName || option.lastName || option.username || option.name || "")
                    )
                  : ""
              }
              isOptionEqualToValue={(option, value) => option && value && option.id === value.id}
              value={selectedAthlete}
              onChange={(_, value) => {
                // Reset everything on athlete change, unless locked due to editing
                if (!userSelectionLocked) {
                  setSelectedAthlete(value);
                  setWizardMode(null);
                  setExistingPlan(null);
                  setMealsPerDay(3);
                  setPlanTitle("");
                  setPlanDescription("");
                  setWeeklyMeals([]);
                  setNutrientRestrictions({});
                  setTemplateMeals([]);
                  if (value && !planTitle) {
                    const fullName =
                      value.firstName && value.lastName
                        ? `${value.firstName} ${value.lastName}`
                        : value.firstName || value.lastName || value.username || value.name || "";
                    const dateStr = new Date().toLocaleDateString("es-ES");
                    setPlanTitle(`Plan nutricional para ${fullName} - ${dateStr}`);
                  }
                }
              }}
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    <span>
                      {option.firstName && option.lastName
                        ? `${option.firstName} ${option.lastName}`
                        : (option.firstName || option.lastName || option.username || option.name || "")}
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
                );
              }}
              renderInput={params => {
                const { InputProps, ...rest } = params;
                return (
                  <TextField
                    {...rest}
                    label={translations[lang].athlete}
                    placeholder={translations[lang].selectAthlete}
                    InputProps={{
                      ...InputProps,
                      endAdornment: athleteLoading ? <CircularProgress color="inherit" size={16} /> : null,
                    }}
                    sx={{ mb: 2 }}
                  />
                );
              }}
            />
            {/* Meals per day */}
            <TextField
              type="number"
              value={mealsPerDay}
              label={translations[lang].mealsPerDay}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = Number(e.target.value);
                if (isNaN(value) || value < 1) value = 1;
                setMealsPerDay(value);
              }}
              inputProps={{ min: 1, max: 10 }}
              fullWidth
              sx={{ mb: 2, maxWidth: 200 }}
            />
            {/* Plan Title */}
            <TextField
              label={translations[lang].planTitle}
              value={planTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlanTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            {/* Plan Description */}
            <DefaultTemplate ref={planDescRef} placeholder={translations[lang].describePlanPlaceholder} />            
          </Box>
        );
      case 1:
        // -- NUTRIENT INDICATOR GROUPS & FIELDS --
        return (
          <>
            <Alert severity="warning" sx={{ mb: 2 }}>
              {translations[lang].nutritionWizardRestrictionHint}
            </Alert>
            <Box sx={{ maxHeight: "calc(80vh - 100px)", overflowY: "auto" }}>
              {NUTRIENT_GROUPS.map((group) => (
                <Box key={group.groupLabel} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }} fontWeight="bold">
                    {translations[lang][group.groupLabel]}
                  </Typography>
                  {group.fields.map((nut) => (
                    <Box key={nut.key} sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ minWidth: 170, fontSize: 13 }}
                        variant="body2"
                      >
                        {translations[lang]["nutrient" +
                          nut.key.charAt(0).toUpperCase() +
                          nut.key.slice(1)]}
                        {nut.unit ? ` (${nut.unit})` : ""}
                      </Typography>
                      <TextField
                        label={translations[lang].min}
                        type="number"
                        value={nutrientRestrictions[nut.key]?.min ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNutrientRestrictions(r => ({
                          ...r,
                          [nut.key]: { ...r[nut.key], min: e.target.value ? Number(e.target.value) : undefined }
                        }))}
                        sx={{ mx: 1, width: 90, fontSize: 13 }}
                        size="small"
                        InputProps={{ style: { fontSize: 13 } }} />
                      <TextField
                        label={translations[lang].max}
                        type="number"
                        value={nutrientRestrictions[nut.key]?.max ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNutrientRestrictions(r => ({
                          ...r,
                          [nut.key]: { ...r[nut.key], max: e.target.value ? Number(e.target.value) : undefined }
                        }))}
                        sx={{ mx: 1, width: 90, fontSize: 13 }}
                        size="small"
                        InputProps={{ style: { fontSize: 13 } }} />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </>
        );
      case 2:
        return (
          <Box>
            <Box sx={{ maxHeight: "calc(80vh - 100px)", overflowY: "auto" }}>
              <Typography variant="h6" gutterBottom>
                {translations[lang].composeTemplateDay}
              </Typography>
              <MealEditor
                meals={templateMeals}
                setMeals={setTemplateMeals}
                foodStates={foodStates}
                InfoIconWithNutrients={InfoIconWithNutrients}
                translations={translations[lang]}
              />
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ position: "relative", minHeight: 250 }}>
            {weeklyPlanLoading ? (
              <Box
                sx={{
                  position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
                  bgcolor: "rgba(255,255,255,0.66)"
                }}
              >
                <CircularProgress size={62} thickness={5} />
              </Box>
            ) : (
              <>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {translations[lang].weeklyPlanHint}
                </Alert>
                <Tabs value={activeDayTab} onChange={(_, idx) => setActiveDayTab(idx)}>
                  {translations[lang].weekdays.map((day: string, i: number) => (
                    <Tab label={day} key={i} />
                  ))}
                </Tabs>
                <Box sx={{ p: 2, maxHeight: "calc(80vh - 180px)", overflowY: "auto" }}>
                  <MealEditor
                    meals={weeklyMeals[activeDayTab] || []}
                    setMeals={(newMeals: Meal[]) => {
                      const updated = [...weeklyMeals];
                      updated[activeDayTab] = newMeals;
                      setWeeklyMeals(updated);
                    }}
                    foodStates={foodStates}
                    InfoIconWithNutrients={InfoIconWithNutrients}
                    translations={translations[lang]}
                  />
                </Box>
              </>
            )}
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6">{translations[lang].confirmPlanTitle}</Typography>
            <Box sx={{ mt: 2 }}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "1.1rem", mb: 0.5 }}>
                  {translations[lang].athlete}: {" "}
                  {(selectedAthlete && (selectedAthlete.firstName || selectedAthlete.lastName))
                    ? `${selectedAthlete.firstName ?? ""} ${selectedAthlete.lastName ?? ""}`.trim()
                    : (selectedAthlete?.username || selectedAthlete?.name || "—")
                  }
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  {planTitle || translations[lang].emptyValue}
                </Typography>
                {planDescription?.trim() !== "" && (
                  <>
                    <Divider sx={{ mb: 1 }} />
                    <div
                      style={{
                        marginBottom: "0.5em",
                        fontStyle: "italic",
                        color: "var(--mui-palette-text-secondary,#C0C0C0)"
                      }}
                      dangerouslySetInnerHTML={{ __html: planDescription }}
                    />
                  </>
                )}
              </Paper>
              {translations[lang].weekdays.map((day: string, dIdx: number) => (
                <Paper key={dIdx} sx={{ p: 2, mb: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.35rem",
                      lineHeight: 1.18,
                      mb: 0.5
                    }}
                    gutterBottom
                  >
                    {day}
                  </Typography>
                  {(weeklyMeals[dIdx] || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary">{translations[lang].emptyValue}</Typography>
                  ) : (
                    (weeklyMeals[dIdx] || []).map((meal, mIdx) => (
                      <Box key={mIdx} sx={{ mb: 2 }}>
                        <Typography sx={{ fontWeight: 500 }}>
                          {meal.name}
                        </Typography>
                        {meal.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5, fontWeight: 400, fontStyle: "italic" }}
                          >
                            {meal.description}
                          </Typography>
                        )}
                        {meal.options.length > 0 && (
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.98rem",
                              mt: 1,
                              mb: 0.4,
                              color: "text.secondary",
                            }}
                          >
                            {translations[lang].optionsLabel}
                          </Typography>
                        )}
                        {meal.options.map((option, oIdx) => (
                          <Box key={oIdx} sx={{ pl: 2, mb: 1, borderLeft: "2px solid #ececec" }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                              {option.optionName || translations[lang].optionName}
                            </Typography>
                            {option.description && (
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontStyle: "italic",
                                  fontSize: "0.82rem",
                                  color: "text.secondary",
                                  mb: 0.5
                                }}
                              >
                                {option.description}
                              </Typography>
                            )}
                            {option.foods.length > 0 && (
                              <ul style={{ margin: 0, paddingLeft: 16 }}>
                                {option.foods.map((food, fIdx) => {
                                  const fs = foodStates.find(f => f.id === food.foodId);
                                  return (
                                    <li key={fIdx} style={{ fontWeight: 400, fontSize: "0.72rem" }}>
                                      {fs ? fs.label : (food.foodId || <span style={{ color: "#aaa" }}>{translations[lang].emptyValue}</span>)}:&nbsp;
                                      <span style={{ fontWeight: 400 }}>{food.quantity}g</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </Box>
                        ))}
                      </Box>
                    ))
                  )}
                </Paper>
              ))}
            </Box>
          </Box>
        );
      default:
        return null;
    }
  }

  // Confirmation Dialog State
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const submitPayloadRef = useRef<any>(null);

  async function handleSubmit() {
    const payload = {
      athleteId: selectedAthlete?.id,
      title: planTitle,
      description: planDescription,
      nutrientRestrictions,
      templateMeals,
      weeklyMeals,
    };
    // Check if athlete already has an active nutrition plan
    if (payload.athleteId) {
      try {
        const resp = await fetch(
          `/api/nutrition/plan?athleteId=${encodeURIComponent(payload.athleteId)}&active=true`
        );
        const plans = await resp.json();
        if (Array.isArray(plans) && plans.length > 0) {
          submitPayloadRef.current = payload;
          setShowArchiveDialog(true);
          return;
        }
      } catch (err) {
      }
    }

    // No active plan exists, proceed to submit
    await doFinalize(payload);
  }

  async function doFinalize(payload: any) {
    try {
      setSaving(true);
      const resp = await fetch("/api/nutrition/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await resp.json();
      if (resp.ok && result?.success) {
        setNotification({
          type: "success",
          message: translations[lang].planSavedSuccess
        });
        setSaving(false);
        setTimeout(() => { window.location.reload(); }, 3500); // match TrainingBlocksWizard
      } else {
        setNotification({ type: "error", message: translations[lang].planSaveError + (result?.error ? ": " + result.error : "") });
        setSaving(false);
      }
    } catch (e) {
      setNotification({ type: "error", message: translations[lang].planSaveError + (e && e.toString ? `: ${e.toString()}` : "") });
      setSaving(false);
    }
  }

  const handleNext = () => {
    // On leaving first step, capture the plan description from the editor
    if (activeStep === 0 && planDescRef.current?.getHTML) {
      const html = planDescRef.current.getHTML();
      setPlanDescription(html);
    }
    setActiveStep(s => Math.min(s + 1, steps.length - 1));
  };

  // Snackbar close handler: on close, just clear
  const handleNotificationClose = React.useCallback(() => {
    setNotification(null);
  }, []);
  const handleBack = () => setActiveStep(s => Math.max(s - 1, 0));

  return (
    <Box p={3}>
      {/* Spinner overlay while saving */}
      {saving && (
        <Box
          sx={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            bgcolor: "rgba(255,255,255,0.55)", zIndex: 20000, display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <CircularProgress size={60} thickness={5} />
        </Box>
      )}
      <NotificationSnackbar notification={notification} onClose={handleNotificationClose} />
      <Stepper activeStep={activeStep}>
        {steps.map(step => (
          <Step key={step}><StepLabel>{step}</StepLabel></Step>
        ))}
      </Stepper>
      <Box sx={{ my: 4 }}>{renderStepContent()}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>{translations[lang].back}</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (activeStep === steps.length - 1) {
              handleSubmit();
            } else {
              handleNext();
            }
          }}
          disabled={
            (activeStep === 0 &&
              (!selectedAthlete ||
                typeof mealsPerDay !== "number" ||
                isNaN(mealsPerDay) ||
                mealsPerDay < 1 ||
                wizardMode === null // block Next until user decides edit/new if dialog offered, or no info
              )
            ) ||
            (activeStep === 2 &&
              (
                templateMeals.some(meal => !meal.name.trim()) ||
                templateMeals.some(meal =>
                  meal.options.some(option => !option.optionName.trim())
                ) ||
                templateMeals.some(meal =>
                  meal.options.some(option =>
                    option.foods.some(food => !food.foodId)
                  )
                )
              )
            )
          }
        >{activeStep === steps.length - 1 ? translations[lang].finish : translations[lang].next}</Button>
      </Box>

      {/* Archive active plan confirmation dialog */}
      <Dialog open={showArchiveDialog} onClose={() => setShowArchiveDialog(false)}>
        <DialogTitle>
          {translations[lang].activePlanExistsTitle}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            {translations[lang].activePlanReplacementText}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => setShowArchiveDialog(false)}>
              {translations[lang].cancel}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                setShowArchiveDialog(false);
                setSaving(true);
                await doFinalize(submitPayloadRef.current);
              }}
            >
              {translations[lang].confirm}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Choose between edit or create new plan */}
      <Dialog open={showPlanChoiceDialog} onClose={() => setShowPlanChoiceDialog(false)}>
        <DialogTitle>
          {translations[lang].activePlanExistsTitle}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            {translations[lang].activePlanExistsText}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => {
                // Create new plan, allow normal flow
                setWizardMode("new");
                setShowPlanChoiceDialog(false);
                // reset non-user fields
                setPlanTitle("");
                setPlanDescription("");
                setWeeklyMeals([]);
                setTemplateMeals([]);
                setNutrientRestrictions({});
                setMealsPerDay(3);
              }}
            >{translations[lang].newPlan}</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                if (!selectedAthlete?.id) return;
                setWeeklyPlanLoading(true);
                try {
                  const resp = await fetch(`/api/nutrition/plan?athleteId=${encodeURIComponent(selectedAthlete.id)}&active=true`);
                  const plans = await resp.json();
                  const planData = Array.isArray(plans) && plans.length > 0 ? plans[0] : null;
                  if (!planData) { setWeeklyPlanLoading(false); return; }

                  setPlanTitle(planData.name || "");
                  setPlanDescription(planData.description || "");
                  setMealsPerDay(
                    Array.isArray(planData.days) && planData.days.length > 0 && planData.days[0].meals
                      ? planData.days[0].meals.length
                      : 3
                  );
                  // Parse weeklyMeals (7 days, each with current meals)
                  const weekly: Meal[][] = [];
                  for (let d = 0; d < 7; ++d) {
                    // Get day by .dayNumber
                    const dayObj = Array.isArray(planData.days) && planData.days.find((day: any) => day.dayNumber === d);
                    if (!dayObj) { weekly.push([]); continue; }
                    const mealsOut = [];
                    for (const meal of dayObj.meals || []) {
                      mealsOut.push({
                        name: meal.name,
                        description: meal.description,
                        options: (meal.mealOptions || []).map((opt: any) => ({
                          optionName: opt.name,
                          description: opt.description,
                          foods: (opt.foods || []).map((food: any) => ({
                            foodId: food.foodId,
                            quantity: food.quantity ?? 0
                          }))
                        }))
                      });
                    }
                    weekly.push(mealsOut);
                  }
                  setWeeklyMeals(weekly);
                  // Optionally fill in restrictions, etc. from API if present
                  if (planData.nutrientRestrictions) setNutrientRestrictions(planData.nutrientRestrictions);
                  setWizardMode("edit");
                  setShowPlanChoiceDialog(false);
                  setUserSelectionLocked(true);
                  setActiveStep(3); // jump to weekly plan
                } catch (err) {
                  setNotification({
                    type: "error",
                    message: (err && err.toString) ? err.toString() : "Could not load the nutrition plan data."
                  });
                  setShowPlanChoiceDialog(false);
                }
                setWeeklyPlanLoading(false);
              }}
            >{translations[lang].editPlan}</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}


interface MealEditorProps {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>> | ((meals: Meal[]) => void);
  foodStates: { id: string; label: string; stateObj: any }[];
  InfoIconWithNutrients: (props: { mealIdx: number; optIdx: number; option: MealOption; foodStates: { id: string; label: string; stateObj: any }[] }) => React.ReactNode;
  translations: Record<string, string>;
}

function MealEditor({ meals, setMeals, foodStates, InfoIconWithNutrients, translations }: MealEditorProps) {
  return (
    <>
      {meals.map((meal: Meal, mealIdx: number) => (
        <Paper key={mealIdx} sx={{ mb: 2, p: 2, position: "relative" }}>
          {/* Add and Remove buttons to control meals */}
          <Box sx={{ position: 'absolute', top: 12, right: 16, display: 'flex', gap: 1, zIndex: 3 }}>
            {/* Add meal */}
            <Button
              size="small"
              sx={{ minWidth: 32, padding: 0, minHeight: 32, color: "#24c661" }}
              onClick={() => {
                const newMeals = [...meals];
                newMeals.splice(mealIdx + 1, 0, {
                  name: `${translations.mealLabel} #${mealIdx + 2}`,
                  options: [{
                    optionName: "",
                    foods: []
                  }]
                });
                setMeals(newMeals);
              }}
              title={translations.addMeal}
              aria-label={translations.addMeal}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#24c661" strokeWidth="2" fill="none" />
                <path d="M12 8v8M8 12h8" stroke="#24c661" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Button>
            {/* Remove meal */}
            <Button
              size="small"
              sx={{
                minWidth: 32,
                padding: 0,
                minHeight: 32,
                color: meals.length === 1 ? "#ccc" : "#e74c3c"
              }}
              onClick={() => {
                if (meals.length === 1) return;
                const newMeals = meals.slice(0, mealIdx).concat(meals.slice(mealIdx + 1));
                setMeals(newMeals);
              }}
              title={translations.removeMeal}
              aria-label={translations.removeMeal}
              disabled={meals.length === 1}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={meals.length === 1 ? "#ccc" : "#e74c3c"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              </svg>
            </Button>
          </Box>
          <TextField
            label={`${translations.mealLabel} #${mealIdx + 1}`}
            value={meal.name}
            onChange={(e) => {
              const newMeals = [...meals];
              newMeals[mealIdx].name = e.target.value;
              setMeals(newMeals);
            }}
            sx={{ mb: 1 }}
          />
          <TextField
            label={translations.mealDescriptionLabel}
            value={meal.description ?? ""}
            onChange={(e) => {
              const newMeals = [...meals];
              newMeals[mealIdx].description = e.target.value;
              setMeals(newMeals);
            }}
            size="small"
            fullWidth
            multiline
            minRows={1}
            maxRows={3}
            sx={{ fontSize: 12, mb: 2 }}
            InputProps={{ style: { fontSize: 12, minHeight: 30 } }}
            InputLabelProps={{ style: { fontSize: 12 } }}
          />
          {meal.options.map((option: MealOption, optIdx: number) => (
            <Box
              key={optIdx}
              sx={{
                mt: 2,
                mb: 2,
                pl: 2,
                pb: 2,
                borderLeft: "2px solid #ccc",
                display: "block",
                background: "rgba(200,200,200,0.01)"
              }}
            >
              <Box sx={{ display: "block", alignItems: "flex-start", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TextField
                    label={translations.optionName}
                    value={option.optionName}
                    onChange={(e) => {
                      const newMeals = [...meals];
                      newMeals[mealIdx].options[optIdx].optionName = e.target.value;
                      setMeals(newMeals);
                    }}
                    sx={{ minWidth: 300, maxWidth: 480 }}
                    InputProps={{
                      style: { fontWeight: 700 }
                    }}
                  />
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginLeft: 8,
                      cursor: "pointer",
                      color: "#24c661"
                    }}
                    title={translations.addOption}
                    aria-label={translations.addOption}
                    onClick={() => {
                      const newMeals = [...meals];
                      newMeals[mealIdx].options.push({
                        optionName: "",
                        foods: []
                      });
                      setMeals(newMeals);
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#24c661" strokeWidth="2" fill="none" />
                      <path d="M12 8v8M8 12h8" stroke="#24c661" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginLeft: 8,
                      cursor: meal.options.length === 1 ? "not-allowed" : "pointer",
                      color: meal.options.length === 1 ? "#ccc" : "#e74c3c"
                    }}
                    title={translations.removeOption}
                    aria-label={translations.removeOption}
                    onClick={() => {
                      if (meal.options.length === 1) return;
                      const newMeals = [...meals];
                      newMeals[mealIdx].options.splice(optIdx, 1);
                      setMeals(newMeals);
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke={meal.options.length === 1 ? "#ccc" : "#e74c3c"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </span>
                  {option.foods && option.foods.length > 0 && (
                    <InfoIconWithNutrients
                      mealIdx={mealIdx}
                      optIdx={optIdx}
                      option={option}
                      foodStates={foodStates}
                    />
                  )}
                </Box>
                <TextField
                  label={translations.optionDescription}
                  value={option.description || ""}
                  onChange={(e) => {
                    const newMeals = [...meals];
                    newMeals[mealIdx].options[optIdx].description = e.target.value;
                    setMeals(newMeals);
                  }}
                  size="small"
                  multiline
                  minRows={1}
                  maxRows={3}
                  sx={{ fontSize: 11, width: 200, maxWidth: 300, minWidth: 120 }}
                  InputProps={{
                    style: { fontSize: 11, minHeight: 30 }
                  }}
                  InputLabelProps={{
                    style: { fontSize: 11 }
                  }}
                />
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="caption" sx={{ mb: 1 }}>
                  {translations.foodsCaption}
                </Typography>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginLeft: 8,
                    cursor: "pointer",
                    color: "#24c661"
                  }}
                  title={translations.addFood}
                  aria-label={translations.addFood}
                  onClick={() => {
                    const newMeals = [...meals];
                    newMeals[mealIdx].options[optIdx].foods.push({ foodId: "", quantity: 0 });
                    setMeals(newMeals);
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#24c661" strokeWidth="2" fill="none" />
                    <path d="M12 8v8M8 12h8" stroke="#24c661" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </Box>
              <Box sx={{ display: "block", flexWrap: "wrap", alignItems: "center", gap: 1, my: 1 }}>
                {option.foods.map((food: MealOptionFood, foodIdx: number) => (
                  <div
                    key={foodIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginRight: 16,
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Autocomplete
                        options={foodStates}
                        filterOptions={(options, state) => {
                          function stripAccents(str: string) {
                            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                          }
                          const input = stripAccents(state.inputValue.trim().toLowerCase());
                          if (!input) return options;
                          return options.filter((opt) => {
                            const labelRaw = opt.label.toLowerCase();
                            const labelStripped = stripAccents(labelRaw);
                            const withoutStateRaw = opt.label.replace(/ - [^-]+$/, "").toLowerCase();
                            const withoutStateStripped = stripAccents(withoutStateRaw);
                            const stateOnlyRaw = opt.label.match(/ - ([^-]+)$/) ? opt.label.match(/ - ([^-]+)$/)![1].toLowerCase() : "";
                            const stateOnlyStripped = stripAccents(stateOnlyRaw);
                            return (
                              labelRaw.includes(input) ||
                              labelStripped.includes(input) ||
                              withoutStateRaw.includes(input) ||
                              withoutStateStripped.includes(input) ||
                              stateOnlyRaw.includes(input) ||
                              stateOnlyStripped.includes(input)
                            );
                          });
                        }}
                        getOptionLabel={(f: { label: string }) => f.label}
                        value={
                          foodStates.length === 0
                            ? undefined
                            : (food.foodId
                              ? foodStates.find(f => f.id === food.foodId)
                              : undefined)
                        }
                        onChange={(_, val) => {
                          const newMeals = [...meals];
                          newMeals[mealIdx].options[optIdx].foods[foodIdx].foodId = val ? val.id : "";
                          setMeals(newMeals);
                        }}
                        renderOption={(props, option) => {
                          const { key, ...domProps } = props;
                          return (
                            <li key={option.id} {...domProps}>
                              <span style={{ fontWeight: "bold", fontSize: 11 }}>
                                {option.label.replace(/ - [^-]+$/, "")}
                              </span>
                              <span style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>
                                {option.label.match(/ - ([^-]+)$/) ? option.label.match(/ - ([^-]+)$/)![1] : ""}
                              </span>
                            </li>
                          );
                        }}
                        renderInput={(params) => {
                          // Remove dropdown icon/adornment
                          const { InputProps, ...rest } = params;
                          return (
                            <TextField
                              {...rest}
                              InputProps={{
                                ...InputProps,
                                sx: { fontSize: 11 },
                                endAdornment: null
                              }}
                              placeholder={translations.selectOrSearchFood}
                              fullWidth
                            />
                          );
                        }}
                        size="small"
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        disableClearable
                      />
                    </div>
                    <div style={{ width: 90, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          label={translations.grams}
                          type="number"
                          value={String(food.quantity)}
                          onChange={(e) => {
                            const newMeals = [...meals];
                            const val = e.target.value;
                            newMeals[mealIdx].options[optIdx].foods[foodIdx].quantity = val === '' ? 0 : Number(val);
                            setMeals(newMeals);
                          }}
                          onBlur={(e) => {
                            const newMeals = [...meals];
                            let next = parseInt(e.target.value || "0", 10);
                            if (isNaN(next)) next = 0;
                            newMeals[mealIdx].options[optIdx].foods[foodIdx].quantity = next;
                            setMeals(newMeals);
                          }}
                          size="small"
                          fullWidth
                          sx={{ fontSize: 11 }}
                          InputProps={{
                            inputProps: {
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            },
                            sx: {
                              fontSize: 11,
                              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                              '& input[type=number]': {
                                MozAppearance: 'textfield',
                              },
                            }
                          }}
                        />
                        <span
                          role="button"
                          title={translations.remove}
                          style={{ cursor: "pointer", display: "flex", alignItems: "center", marginLeft: 6, marginTop: 2 }}
                          onClick={() => {
                            const newMeals = [...meals];
                            newMeals[mealIdx].options[optIdx].foods.splice(foodIdx, 1);
                            setMeals(newMeals);
                          }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Box>
            </Box>
          ))}
        </Paper>
      ))}
    </>
  );
}

export default NutritionPlanWizard;
