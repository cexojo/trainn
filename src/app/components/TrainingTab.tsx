import React from "react";
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent } from "@mui/material";
import MuscleGroupBadges from "./MuscleGroupBadges";
import BlockWeeklyProgress from "./BlockWeeklyProgress";
import { translations, type Lang } from "@/app/i18n";

function TrainingTab({ userId, lang }: { userId: string, lang: Lang }) {
  const [blocks, setBlocks] = React.useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = React.useState<any | null>(null);
  const [trainingDays, setTrainingDays] = React.useState<any[]>([]);
  const [exerciseSeries, setExerciseSeries] = React.useState<any[]>([]);
  const [weekDialog, setWeekDialog] = React.useState<{open: boolean, week: any | null}>({ open: false, week: null });
  const [notesPopover, setNotesPopover] = React.useState<{ anchorEl: HTMLElement | null, notes: string }>({ anchorEl: null, notes: "" });
  const [loadingBlocks, setLoadingBlocks] = React.useState(true);
  const [loadingBlockDetails, setLoadingBlockDetails] = React.useState(false);

  // Always fetch all blocks for this athlete on mount, but per-block data when block changes
  React.useEffect(() => {
    setLoadingBlocks(true);
    fetch(`/api/training-data?userId=${userId}`)
      .then(r => r.json())
      .then((data) => {
        if (Array.isArray(data.blocks)) {
          setBlocks(data.blocks);
          setSelectedBlock(data.blocks.length > 0 ? data.blocks[data.blocks.length - 1] : null);
        }
      })
      .finally(() => setLoadingBlocks(false));
  }, [userId]);

  React.useEffect(() => {
    if (!selectedBlock) {
      setTrainingDays([]);
      setExerciseSeries([]);
      return;
    }
    setLoadingBlockDetails(true);
    fetch(`/api/training-data?userId=${userId}&blockId=${selectedBlock.id}`)
      .then(r => r.json())
      .then((data) => {
        // Do NOT update selectedBlock here, only update trainingDays and exerciseSeries
        if (Array.isArray(data.trainingDays)) {
          setTrainingDays(data.trainingDays);
        }
        if (Array.isArray(data.exerciseDefs)) {
          setExerciseSeries(data.exerciseDefs);
        }
      })
      .finally(() => setLoadingBlockDetails(false));
  }, [selectedBlock, userId]);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ maxWidth: 320, minHeight: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {loadingBlocks ? (
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 2, py: 2 }}>
            <CircularProgress size={22} />
            <Typography variant="body1">{translations[lang].loadingBlocks}</Typography>
          </Box>
        ) : (
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
        )}
      </Box>
      <Box sx={{ minHeight: 220 }}>
        {loadingBlockDetails ? (
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 2, py: 6 }}>
            <CircularProgress size={22} />
            <Typography variant="body1">{translations[lang].loadingBlockDetails}</Typography>
          </Box>
        ) : (
          selectedBlock?.weeks && selectedBlock.weeks.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, fontWeight: 500 }}>
                {translations[lang].muscleGroupsLabel}
              </Typography>
              <MuscleGroupBadges exerciseSeries={exerciseSeries} lang={lang} />
              <BlockWeeklyProgress
                selectedBlock={selectedBlock}
                trainingDays={trainingDays}
                exerciseSeries={exerciseSeries}
                lang={lang}
                setWeekDialog={setWeekDialog}
              />
            </Box>
          )
        )}
      </Box>
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
                                        {s.isDropSet ? "DS" : (s.seriesNumber != null ? s.seriesNumber : "")}
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

export default TrainingTab;
