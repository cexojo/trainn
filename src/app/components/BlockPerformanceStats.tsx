import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import StatCard from "./StatCard";
import SlidingStatCard from "./SlidingStatCard";

/**
 * Shows the stat cards for the selected block performance.
 * Props:
 * - blockId: string
 * - translations: translations object for current lang
 * - lang: current language
 */
export default function BlockPerformanceStats({ blockId, translations, lang }: { blockId: string, translations: any, lang: string }) {
  const [stats, setStats] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!blockId) { setStats(null); return; }
    setLoading(true);
    fetch(`/api/block-statistics/${blockId}`)
      .then(r => r.json())
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [blockId]);

  if (loading) {
    return (
      <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>Cargando rendimiento del bloque...</Typography>
      </Box>
    );
  }
  if (!stats || !stats.block_id) {
    return null;
  }

  // StatCard data
  const statCards = [
    {
      title: "Num. series",
      value: stats.total_series?.toString() ?? "-",
      interval: "",
      trend: "neutral" as const,
      data: [],
    },
    {
      title: "Series on target",
      value: stats.series_on_target?.toString() ?? "-",
      interval: "",
      trend: "neutral" as const,
      data: [],
    },
    {
      title: "Completion time",
      value: typeof stats.completion_days === "number" && !isNaN(stats.completion_days)
        ? `${stats.completion_days} días`
        : "-",
      interval: "",
      trend: "neutral" as const,
      data: [],
    },
  ];

  const bestStatCards = [1, 2, 3].map(i => ({
    exercise: stats[`best${i}_exercise_name`],
    w0: stats[`best${i}_starting_weight`],
    w1: stats[`best${i}_last_weight`],
    wPct: stats[`best${i}_weight_improvement_pct`],
    r0: stats[`best${i}_starting_reps`],
    r1: stats[`best${i}_last_reps`],
    rPct: stats[`best${i}_reps_improvement_pct`],
  })).filter(b => !!b.exercise).map((b, i) => ({
    title: `Best #${i + 1}: ${b.exercise || ""}`,
    value: `${b.wPct ?? "-"}% (${b.w0 ?? "-"}→${b.w1 ?? "-"}kg), ${b.rPct ?? "-"}% (${b.r0 ?? "-"}→${b.r1 ?? "-"} reps)`,
    interval: "",
    trend: (typeof b.wPct === "string" && parseFloat(b.wPct) > 0 ? "up" : b.wPct === "0" ? "neutral" : "down") as "up" | "down" | "neutral",
    data: [],
  }));

  const worstStatCards = [1, 2, 3].map(i => ({
    exercise: stats[`worst${i}_exercise_name`],
    w0: stats[`worst${i}_starting_weight`],
    w1: stats[`worst${i}_last_weight`],
    wPct: stats[`worst${i}_weight_improvement_pct`],
    r0: stats[`worst${i}_starting_reps`],
    r1: stats[`worst${i}_last_reps`],
    rPct: stats[`worst${i}_reps_improvement_pct`],
  })).filter(w => !!w.exercise).map((w, i) => ({
    title: `Worst #${i + 1}: ${w.exercise || ""}`,
    value: `${w.wPct ?? "-"}% (${w.w0 ?? "-"}→${w.w1 ?? "-"}kg), ${w.rPct ?? "-"}% (${w.r0 ?? "-"}→${w.r1 ?? "-"} reps)`,
    interval: "",
    trend: (typeof w.wPct === "string" && parseFloat(w.wPct) < 0 ? "down" : w.wPct === "0" ? "neutral" : "up") as "up" | "down" | "neutral",
    data: [],
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        p: 1,
        bgcolor: "background.default",
        alignItems: "stretch",
      }}
    >
      {statCards.map((card) => (
        <Box key={card.title} sx={{ minWidth: 195, flex: "1 1 0%" }}>
          <StatCard
            title={card.title}
            value={card.value}
            interval={card.interval}
            trend={card.trend}
            data={card.data}
            showTrendChip={false}
          />
        </Box>
      ))}
      {bestStatCards.length > 0 && (
        <Box sx={{ minWidth: 260, flex: "1 1 0%" }}>
          <SlidingStatCard
            slides={bestStatCards.map(c => ({ title: c.title, value: c.value }))}
            variant="best"
          />
        </Box>
      )}
      {worstStatCards.length > 0 && (
        <Box sx={{ minWidth: 260, flex: "1 1 0%" }}>
          <SlidingStatCard
            slides={worstStatCards.map(c => ({ title: c.title, value: c.value }))}
            variant="worst"
          />
        </Box>
      )}
    </Box>
  );
}
