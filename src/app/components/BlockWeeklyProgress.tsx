import React from "react";
import { Box, Typography } from "@mui/material";
import { Lang, translations as translationsObj } from "@/app/i18n";

interface BlockWeeklyProgressProps {
  selectedBlock: any;
  trainingDays: any[];
  exerciseSeries: any[];
  lang: Lang;
  setWeekDialog: (val: { open: boolean; week: any | null }) => void;
}

function BlockWeeklyProgress({
  selectedBlock,
  trainingDays,
  exerciseSeries,
  lang,
  setWeekDialog,
}: BlockWeeklyProgressProps) {
  const translations = translationsObj[lang];

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
          {translations.noDaysForWeek}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500, mb: 0 }}>
        {translations.weeklyProgressTitle}
      </Typography>
      <Box component="table" sx={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid #e0e0e0"
      }}>
        <Box component="thead">
          <Box component="tr">
            <Box component="th" sx={{ textAlign: "left", p: 1, border: "1px solid #e0e0e0" }}>{translations.weekLabel}</Box>
            <Box component="th" sx={{ textAlign: "center", p: 1, minWidth: 120, border: "1px solid #e0e0e0" }}>{translations.weekProgressLabel}</Box>
            {dayNumbersSorted.map(dayNum => (
              <Box
                component="th"
                key={`head-${String(dayNum)}`}
                sx={{ textAlign: "center", p: 1, minWidth: 70, border: "1px solid #e0e0e0" }}
              >
                {translations.day} {dayNum}
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
                      {translations.weekLabel} {week.weekNumber}
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
                        {weekPercent}{translations.percentLabel}
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
                            {percent}{translations.percentLabel}
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
    </>
  );
}

export default BlockWeeklyProgress;
