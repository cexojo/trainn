import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";

// NutritionPlanSummary shows a nutrition plan for a given userId.
export default function NutritionPlanSummary({ userId, lang }: { userId: string; lang: Lang }) {
  const [effectiveUserId, setEffectiveUserId] = React.useState<string>(userId);
  const [plan, setPlan] = React.useState<any>(null);
  const [foodsLookup, setFoodsLookup] = React.useState<Record<string, { name: string, state: string, group: string }> | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // On mount: if userId is empty, fetch it from /api/get-user-id
  React.useEffect(() => {
    if (!userId) {
      fetch("/api/get-user-id")
        .then(r => r.json())
        .then(data => {
          setEffectiveUserId(data.id);
        });
    }
  }, [userId]);

  // Fetch plan when effectiveUserId is available
  React.useEffect(() => {
    if (!effectiveUserId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/nutrition/plan?athleteId=${effectiveUserId}`)
      .then(r => {
        if (!r.ok) throw new Error("Request failed");
        return r.json();
      })
      .then(d => {
        setPlan(d || null);
        setLoading(false);
      })
      .catch(() => {
        setPlan(null);
        setError("Error loading plan");
        setLoading(false);
      });
  }, [effectiveUserId]);

  // Fetch foods nutrients lookup
  React.useEffect(() => {
    fetch("/api/nutrition/nutrients")
      .then(r => r.json())
      .then(data => {
        const lookup: Record<string, { name: string, state: string, group: string }> = {};
        if (Array.isArray(data?.groups)) {
          for (const group of data.groups) {
            const groupName = group.name;
            if (Array.isArray(group.components)) {
              for (const comp of group.components) {
                if (Array.isArray(comp.states)) {
                  for (const state of comp.states) {
                    lookup[state.id] = {
                      name: comp.name,
                      state: state.state,
                      group: groupName
                    };
                  }
                }
              }
            }
          }
        }
        setFoodsLookup(lookup);
      });
  }, []);

  if (!effectiveUserId || loading || !foodsLookup) return <Box sx={{ py: 3, display: "flex", alignItems: "center" }}><CircularProgress size={24} sx={{ mr: 1 }} /> <Typography>{translations[lang].loadingNutritionPlan}</Typography></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  // Handle the case where plan is an array of plans
  let selectedPlan: any = null;
  if (Array.isArray(plan) && plan.length > 0) {
    selectedPlan = plan.find((p: any) => p.active) || plan[0];
  } else if (plan && typeof plan === 'object' && Object.keys(plan).length > 0) {
    selectedPlan = plan;
  }

  if (!selectedPlan) {
    return <Typography sx={{ py: 2 }}>{translations[lang].noActiveNutritionPlan}</Typography>;
  }

  const isEmptyPlan = (!selectedPlan.title && !selectedPlan.name && !selectedPlan.description && (!Array.isArray(selectedPlan.days) || selectedPlan.days.length === 0));
  if (isEmptyPlan) {
    return <Typography sx={{ py: 2 }}>{translations[lang].noActiveNutritionPlan}</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography>
        <strong>{translations[lang].planTitle}:</strong> {selectedPlan.title || selectedPlan.name || "-"}
      </Typography>
      <Typography>
        <strong>{"Descripción"}:</strong>
      </Typography>
      <Box sx={{ mb: 2 }}>
        <span dangerouslySetInnerHTML={{ __html: selectedPlan.description || "" }} />
      </Box>
      {/* Display meals per day, if available */}
      <Typography>
        <strong>{translations[lang].mealsPerDay}:</strong>{" "}
        {Array.isArray(selectedPlan.days)
          ? Math.max(
              ...selectedPlan.days.map((d: any) => Array.isArray(d.meals) ? d.meals.length : 0),
              0
            )
          : "-"}
      </Typography>
      {/* Render days and meals */}
      {Array.isArray(selectedPlan.days) && (
        <Box sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}>
          {[0,1,2,3,4,5,6].map(dayIdx => {
            const dayObj = selectedPlan.days.find((d: any) => d.dayNumber === dayIdx);
            const localizedDay = Array.isArray(translations[lang].weekdays) && translations[lang].weekdays[dayIdx]
              ? translations[lang].weekdays[dayIdx]
              : `Día ${dayIdx+1}`;
            return (
              <Box
                key={dayIdx}
                sx={{
                  backgroundColor: "#97999c",
                  borderRadius: 2,
                  border: "1px solid #b0b3b8",
                  minWidth: 220,
                  maxWidth: 420,
                  px: 2,
                  py: 2,
                  mb: 1.5,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Typography sx={{ fontWeight: 700, mb: 1, fontSize: "1.08rem", color: "#254" }}>{localizedDay}</Typography>
                {dayObj && Array.isArray(dayObj.meals) && dayObj.meals.length > 0 ? (
                  <Box
                    sx={{
                      pl: 1,
                      mb: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2
                    }}
                  >
                    {dayObj.meals.map((meal: any, mealIdx: number) => (
                      <Box
                        key={mealIdx}
                        sx={{
                          borderRadius: 2,
                          px: 2,
                          py: 1.5,
                          boxShadow: "0 2px 7px 0 rgba(110,124,140,0.08)",
                          border: "1px solid #e3e5e9"
                        }}
                      >
                        <Typography sx={{ fontWeight: 1000, mb: 1 }}>
                          {meal?.name || meal?.foodName || meal?.food || `Meal ${mealIdx + 1}`}
                        </Typography>
                        {Array.isArray(meal.mealOptions) && meal.mealOptions.length > 0 && (
                          <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                            {meal.mealOptions.map((opt: any, optIdx: number) => (
                              <React.Fragment key={optIdx}>
                                <Box sx={{ borderTop: "1px solid #cfcfd5", mt: 1.5, mb: 1.5 }} />
                                <li>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 400,
                                      fontStyle: "italic",
                                      display: "block",
                                      minWidth: 0,
                                      width: "100%",
                                      maxWidth: "unset",
                                      whiteSpace: "pre-line",
                                      pr: 3
                                    }}
                                  >
                                    {opt.optionName || opt.name || `Option ${optIdx + 1}`}
                                  </Typography>
                                  {opt.description && (
                                    <Typography variant="body2" sx={{
                                      fontStyle: "italic",
                                      color: "#cfcfd5",
                                      mb: 0.5,
                                      pb: 0,
                                      pl: 0.5,
                                    }}>
                                      {opt.description}
                                    </Typography>
                                  )}
                                  {Array.isArray(opt.foods) && opt.foods.length > 0 && (
                                    <React.Fragment>
                                      <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                                        {opt.foods.map((f: any, fIdx: number) => {
                                          const foodMeta = foodsLookup[f.foodId] || {};
                                          return (
                                            <li key={f.foodId || fIdx}>
                                              <Typography variant="body2" sx={{ fontSize: "0.73em", color: "#444" }}>
                                                {foodMeta.name || "Food"}{" "}
                                                {foodMeta.state && <span>({foodMeta.state})</span>}{" "}
                                                <span style={{ color: "#444" }}>{foodMeta.group ? `- ${foodMeta.group}` : ""}</span>
                                                {typeof f.quantity === "number" ? ` - ${f.quantity}g` : ""}
                                              </Typography>
                                            </li>
                                          );
                                        })}
                                      </Box>
                                    </React.Fragment>
                                  )}
                                </li>
                              </React.Fragment>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: "#888", pl: 2 }}>
                    {translations[lang].manageUsersAddPaymentNone}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
