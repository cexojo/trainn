import React from "react";
import { Box, Typography } from "@mui/material";
import { translations, Lang } from "../i18n";

// Mini visual progress bar
function MiniProgressBar({ percent, color = "#1976d2" }: { percent: number, color?: string }) {
  return (
    <Box
      sx={{
        height: 22,
        background: "#E0E3E6",
        borderRadius: 8,
        width: 60,
        position: "relative",
        overflow: "hidden",
        mx: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${percent}%`,
          background: percent === 100 ? "#43a047" : color,
          borderRadius: 8,
          position: "absolute",
          left: 0,
          top: 0,
          transition: "width 0.2s"
        }}
      />
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          zIndex: 1,
          color: percent > 42 ? "#fff" : "#333",
          fontWeight: 700,
          fontSize: "0.76em",
          letterSpacing: 0.5,
          position: "relative",
          userSelect: "none"
        }}
      >
        {percent}%
      </Box>
    </Box>
  );
}

// Scope progress bar
function ProgressBarForScope({
  exerciseDefs,
  filterDay, // pass as a string for day filter, undefined for no filter
  label,
  valueLabel
}: {
  exerciseDefs: any[],
  filterDay?: string,
  label: string,
  valueLabel: string
}) {
  let filteredDefs = exerciseDefs;

  // For block and week, show progress over ALL exercises
  // For day, filter only the exercises with day == valueLabel
  if (filterDay !== undefined) {
    filteredDefs = filteredDefs.filter((def: any) => def.day == filterDay);
  }

  const numTotal = filteredDefs.length;
  const numCompleted = filteredDefs.filter(
    (def: any) =>
      def.effectiveWeight != null &&
      def.effectiveReps != null
  ).length;
  const percent = numTotal > 0 ? Math.round((numCompleted / numTotal) * 100) : 0;

  return (
    <Box sx={{ textAlign: "center" }}>
      <MiniProgressBar percent={percent} />
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.78em", mt: 0.2 }}>
        {label} {valueLabel}
      </Typography>
    </Box>
  );
}

// Main table component for training header
import { Select, MenuItem } from "@mui/material";

export default function DashboardProgressTable({
  selectedBlock,
  setSelectedBlock,
  selectedWeek,
  setSelectedWeek,
  blockOpts,
  selectedDay,
  exerciseDefs,
  lang
}: {
  selectedBlock: any;
  setSelectedBlock: (block: any) => void;
  selectedWeek: any;
  setSelectedWeek: (week: any) => void;
  blockOpts: any[];
  selectedDay: number | null;
  exerciseDefs: any[];
  lang: Lang;
}) {
  return (
    <Box
      sx={{
        width: '100%',
        mb: 1.2,
        alignItems: "center",
      }}
    >
      {/* Block/week browser selector */}
      {blockOpts.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", pb: 1, justifyContent: "center", gap: 2 }}>
          <Select
            size="small"
            value={selectedBlock ? String(selectedBlock.id) : ""}
            onChange={e => {
              const block = blockOpts.find((b: any) => String(b.id) === String(e.target.value));
              if (block) {
                setSelectedBlock(block);
                // Choose first week in this block by default
                if (block.weeks && block.weeks.length > 0) setSelectedWeek(block.weeks[0]);
              }
            }}
            sx={{ minWidth: 90 }}
          >
            {blockOpts.map((b: any) => (
              <MenuItem key={b.id} value={String(b.id)}>
                {`Block ${b.blockNumber}`}
              </MenuItem>
            ))}
          </Select>
          {selectedBlock && selectedBlock.weeks && (
            <Select
              size="small"
              value={selectedWeek ? String(selectedWeek.id) : ""}
              onChange={e => {
                const week = selectedBlock.weeks.find((w: any) => String(w.id) === String(e.target.value));
                if (week) setSelectedWeek(week);
              }}
              sx={{ minWidth: 90 }}
            >
              {selectedBlock.weeks.map((w: any) => (
                <MenuItem key={w.id} value={String(w.id)}>
                  {`Week ${w.weekNumber}`}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      )}
      {/* Progress bars and label */}
      <Box
        sx={{
          display: 'table',
          borderCollapse: 'separate',
          width: '100%',
          maxWidth: { xs: "100%", md: 560 },
          background: 'none',
          mx: "auto",
          justifyContent: "center"
        }}
      >
        {/* Header: 3 "cells" with label centered */}
         <Box component="div" sx={{ display: 'table-row' }}>
          {/* Block progress */}
          <Box component="div" sx={{ display: 'table-cell', px: 1, py: 0.5, textAlign: 'center' }}>
            {(selectedBlock?.weeks && selectedWeek) ? (() => {
              // block progress = SUM (all weeks in block):
              //   for current week: live from exerciseDefs
              //   for all other weeks: use .numExerciseSeriesTotal/Completed from week obj

              let total = 0;
              let completed = 0;
              for (const w of selectedBlock.weeks) {
                if (String(w.id) === String(selectedWeek.id)) {
                  // Current week: live calculation
                  total += exerciseDefs.length;
                  completed += exerciseDefs.filter(
                    (def: any) =>
                      def.effectiveWeight != null &&
                      def.effectiveReps != null
                  ).length;
                } else {
                  // Other weeks: aggregate from data
                  total += w.numExerciseSeriesTotal || 0;
                  completed += w.numExerciseSeriesCompleted || 0;
                }
              }
              const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
              return (
                <Box sx={{ textAlign: "center" }}>
                  <MiniProgressBar percent={percent} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.78em", mt: 0.2 }}>
                    {translations[lang].block} {selectedBlock?.blockNumber != null ? selectedBlock.blockNumber : "-"}
                  </Typography>
                </Box>
              );
            })() : (
              <ProgressBarForScope
                exerciseDefs={exerciseDefs}
                label={translations[lang].block}
                valueLabel={selectedBlock?.blockNumber != null ? selectedBlock.blockNumber : "-"}
              />
            )}
          </Box>
          {/* Week progress */}
          <Box component="div" sx={{ display: 'table-cell', px: 1, py: 0.5, textAlign: 'center' }}>
            <ProgressBarForScope
              exerciseDefs={exerciseDefs}
              label={translations[lang].week}
              valueLabel={selectedWeek?.weekNumber != null ? selectedWeek.weekNumber : "-"}
            />
          </Box>
          {/* Day progress */}
          {typeof selectedDay === "number" && (
            <Box component="div" sx={{ display: 'table-cell', px: 1, py: 0.5, textAlign: 'center' }}>
              <ProgressBarForScope
                exerciseDefs={exerciseDefs}
                filterDay={
                  (() => {
                    // Find unique day values for this block/week
                    const days = Array.from(new Set(exerciseDefs.map((def: any) => def.day)));
                    const dayVal = days[selectedDay] != null ? days[selectedDay] : (selectedDay + 1);
                    // Show the actual unique day value as is, to match your data
                    return dayVal ?? (selectedDay + 1);
                  })()
                }
                label={translations[lang].day}
                valueLabel={
                  (() => {
                    const allDefs = exerciseDefs || [];
                    const byDayIndex = Object.entries(
                      allDefs.reduce((acc: any, cur: any) => {
                        (acc[cur.day] = acc[cur.day] || []).push(cur);
                        return acc;
                      }, {})
                    )[selectedDay]?.[1] as any[];
                    // Use trainingDay.dayNumber from the first exerciseDef, fallback to selectedDay + 1
                    return byDayIndex && byDayIndex.length
                      ? byDayIndex[0]?.trainingDay?.dayNumber ?? (selectedDay + 1)
                      : (selectedDay + 1);
                  })()
                }
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
