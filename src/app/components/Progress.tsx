import { translations, Lang } from "../i18n";

type ProgressProps = {
  currentReps: number | null,
  currentWeight: number | null,
  prevReps: number | null | undefined,
  prevWeight: number | null | undefined,
  lang: Lang
};

export function Progress({
  currentReps,
  currentWeight,
  prevReps,
  prevWeight,
  lang
}: ProgressProps) {
  let dReps, dWeight;
  if (typeof currentReps === "number" && typeof prevReps === "number") {
    dReps = currentReps - prevReps;
  }
  if (typeof currentWeight === "number" && typeof prevWeight === "number") {
    dWeight = currentWeight - prevWeight;
  }
  let colorR = "text-zinc-700 dark:text-zinc-300";
  if (dReps !== undefined) {
    colorR = dReps > 0
      ? "text-green-700 dark:text-green-400 font-bold"
      : dReps < 0
      ? "text-red-700 dark:text-red-400 font-bold"
      : "text-zinc-700 dark:text-zinc-300";
  }
  let colorW = "text-zinc-700 dark:text-zinc-300";
  if (dWeight !== undefined) {
    colorW = dWeight > 0
      ? "text-green-700 dark:text-green-400 font-bold"
      : dWeight < 0
      ? "text-red-700 dark:text-red-400 font-bold"
      : "text-zinc-700 dark:text-zinc-300";
  }
  let arrow = "";
  let arrowColor = "";
  let miniLegend = "";
  if (dReps !== undefined && dWeight !== undefined) {
    if (dReps > 0 && dWeight > 0) {
      arrow = "▲";
      arrowColor = "text-green-800 dark:text-green-400";
      miniLegend = translations[lang].progressLegendMoreWeightMoreReps || "";
    } else if (
      (dReps > 0 && dWeight === 0)
    ) {
      arrow = "▲";
      arrowColor = "text-green-400 dark:text-green-300";
      miniLegend = translations[lang].progressLegendSameWeightMoreReps || "";
    } else if (
      (dReps === 0 && dWeight > 0)
    ) {
      arrow = "▲";
      arrowColor = "text-green-400 dark:text-green-300";
      miniLegend = translations[lang].progressLegendMoreWeightSameReps || "";
    } else if (
      (dReps > 0 && dWeight < 0)
    ) {
      arrow = "↔";
      arrowColor = "text-orange-500 dark:text-orange-400";
      miniLegend = translations[lang].progressLegendLessWeightMoreReps || "";
    } else if (
      (dReps < 0 && dWeight > 0)
    ) {
      arrow = "↔";
      arrowColor = "text-orange-500 dark:text-orange-400";
      miniLegend = translations[lang].progressLegendMoreWeightLessReps || "";
    } else if (dReps < 0 && dWeight === 0) {
      arrow = "▼";
      arrowColor = "text-red-400 dark:text-red-400";
      miniLegend = translations[lang].progressLegendSameWeightLessReps || "";
    } else if (dReps < 0 && dWeight < 0) {
      arrow = "▼";
      arrowColor = "text-red-700 dark:text-red-500";
      miniLegend = translations[lang].progressLegendLessWeightLessReps || "";
    } else {
      arrow = "→";
      arrowColor = "text-zinc-400";
      miniLegend = translations[lang].progressLegendNoProgress || "";
    }
  } else if (dReps !== undefined) {
    if (dReps > 0) {
      arrow = "▲";
      arrowColor = "text-green-400 dark:text-green-300";
      miniLegend = translations[lang].progressLegendMoreRepsOnly || "";
    }
    else if (dReps < 0) {
      arrow = "▼";
      arrowColor = "text-red-700 dark:text-red-500";
      miniLegend = translations[lang].progressLegendLessRepsOnly || "";
    }
    else {
      arrow = "→";
      arrowColor = "text-zinc-400";
      miniLegend = translations[lang].progressLegendNoProgress || "";
    }
  } else if (dWeight !== undefined) {
    if (dWeight > 0) {
      arrow = "▲";
      arrowColor = "text-green-400 dark:text-green-300";
      miniLegend = translations[lang].progressLegendMoreWeightOnly || "";
    }
    else if (dWeight < 0) {
      arrow = "▼";
      arrowColor = "text-red-700 dark:text-red-500";
      miniLegend = translations[lang].progressLegendLessWeightOnly || "";
    }
    else {
      arrow = "→";
      arrowColor = "text-zinc-400";
      miniLegend = translations[lang].progressLegendNoProgress || "";
    }
  } else {
    return <div />;
  }
  return (
    <div className="flex flex-row items-center justify-center gap-1 h-full text-xs md:text-sm">
      <span style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.15 }}>
        {dWeight !== undefined && dWeight !== 0 && (
          <span className={colorW}>{translations[lang].progressWLabel}</span>
        )}
        {dReps !== undefined && dReps !== 0 && (
          <span className={colorR}>{translations[lang].progressRLabel}</span>
        )}        
      </span>
      {miniLegend && (
        <span style={{ fontSize: "0.68em", color: "#888", marginTop: 1, display: "block", textAlign: "center" }}>
          {miniLegend}
        </span>
      )}
    </div>
  );
}
