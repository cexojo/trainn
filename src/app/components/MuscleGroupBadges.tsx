import React from "react";
import { Box, Tooltip } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";

/**
 * Props:
 * - exerciseSeries: array of series objects, each having exercise or exerciseDef subobjects
 * - lang: current language string
 */
interface MuscleGroupBadgesProps {
  exerciseSeries: any[];
  lang: Lang;
}

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
  { factor: "factorAbdomen", label: "muscleGroupAbdomen" }
];

const MuscleGroupBadges: React.FC<MuscleGroupBadgesProps> = ({ exerciseSeries, lang }) => {
  // Calculate muscle volumes from all series
  const muscleVolume = React.useMemo(() => {
    const vol: Record<string, number> = Object.fromEntries(
      muscleGroupFactorMap.map(({ factor }) => [factor, 0])
    );
    for (const series of exerciseSeries) {
      const ex = series.exercise || series.exerciseDef || {};
      for (const { factor } of muscleGroupFactorMap) {
        const factorValue =
          typeof ex[factor] === "number"
            ? ex[factor]
            : parseFloat((ex[factor] || 0).toString());
        if (!isNaN(factorValue) && factorValue !== 0) {
          vol[factor] += factorValue;
        }
      }
    }
    return vol;
  }, [exerciseSeries]);

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
        mb: 3,
        alignItems: "center",
        border: "1px solid #e0e0e0",
        bgcolor: "background.paper",
        boxShadow: 1
      }}
    >
      {muscleGroupFactorMap
        .filter(({ factor }) => muscleVolume[factor] > 0)
        .sort((a, b) => muscleVolume[b.factor] - muscleVolume[a.factor])
        .map(({ factor, label }) => {
          // For this muscle group, build a detailed breakdown by exercise
          // Group series by exercise name, sum counts and contributions
          const breakdown: { exName: string; nSeries: number; factorValue: number; contribution: number }[] = [];
          // Group by exercise name and factor value
          const groupByExercise: Record<string, { nSeries: number; factorValue: number }> = {};
          for (const series of exerciseSeries) {
            const ex = series.exercise || series.exerciseDef || {};
            const exName = ex.name || ex.exerciseName || "Exercise";
            const factorValue = typeof ex[factor] === "number"
              ? ex[factor]
              : parseFloat((ex[factor] || 0).toString());
            if (!isNaN(factorValue) && factorValue !== 0) {
              // One series per occurrence in exerciseSeries
              if (!groupByExercise[exName]) {
                groupByExercise[exName] = { nSeries: 0, factorValue };
              }
              groupByExercise[exName].nSeries += 1;
              // Always take the same factorValue as all should be equal within a single block
            }
          }
          for (const exName in groupByExercise) {
            const { nSeries, factorValue } = groupByExercise[exName];
            breakdown.push({
              exName,
              nSeries,
              factorValue,
              contribution: nSeries * factorValue
            });
          }
          breakdown.sort((a, b) => b.contribution - a.contribution);

          return (
            <Tooltip
              key={factor}
              title={
                <Box>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>
                    {(translations[lang] as any)[label] || factor.replace(/^factor/, "")}
                  </div>
                  {breakdown.length === 0 ? (
                    <div style={{ fontSize: "0.83em", color: "#777" }}>No contribution</div>
                  ) : (
                    <div>
                      {breakdown.map(row => (
                        <div key={row.exName + row.factorValue} style={{ marginBottom: 2 }}>
                          {row.exName}: {row.nSeries} × {row.factorValue} = <b>{row.contribution}</b>
                        </div>
                      ))}
                      <div style={{ borderTop: "1px solid #bbb", margin: "6px 0 2px" }} />
                      <div style={{ fontWeight: 600 }}>
                        Total: {muscleVolume[factor]}
                      </div>
                    </div>
                  )}
                </Box>
              }
              arrow
              slotProps={{
                tooltip: {
                  sx: {
                    fontSize: "0.78em",
                    maxWidth: 320,
                    bgcolor: "#fff",
                    color: "#1a1a1a",
                    border: "1px solid #ccc",
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
          );
        })}
    </Box>
  );
};

export default MuscleGroupBadges;
