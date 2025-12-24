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
  if (dReps !== undefined && dWeight !== undefined) {
    if (dReps > 0 && dWeight > 0) {
      arrow = "▲";
      arrowColor = "text-green-800 dark:text-green-400";
    } else if (
      (dReps > 0 && dWeight === 0) ||
      (dReps === 0 && dWeight > 0)
    ) {
      arrow = "▲";
      arrowColor = "text-green-400 dark:text-green-300";
    } else if (
      (dReps > 0 && dWeight < 0) ||
      (dReps < 0 && dWeight > 0)
    ) {
      arrow = "↔";
      arrowColor = "text-orange-500 dark:text-orange-400";
    } else if (dReps < 0 && dWeight === 0) {
      arrow = "▼";
      arrowColor = "text-red-400 dark:text-red-400";
    } else if (dReps < 0 && dWeight < 0) {
      arrow = "▼";
      arrowColor = "text-red-700 dark:text-red-500";
    } else {
      arrow = "→";
      arrowColor = "text-zinc-400";
    }
  } else if (dReps !== undefined) {
    if (dReps > 0) { arrow = "▲"; arrowColor = "text-green-400 dark:text-green-300"; }
    else if (dReps < 0) { arrow = "▼"; arrowColor = "text-red-700 dark:text-red-500"; }
    else { arrow = "→"; arrowColor = "text-zinc-400"; }
  } else if (dWeight !== undefined) {
    if (dWeight > 0) { arrow = "▲"; arrowColor = "text-green-400 dark:text-green-300"; }
    else if (dWeight < 0) { arrow = "▼"; arrowColor = "text-red-700 dark:text-red-500"; }
    else { arrow = "→"; arrowColor = "text-zinc-400"; }
  } else {
    return <div />;
  }
  return (
    <div className="flex flex-row items-center justify-center gap-1 h-full text-xs md:text-sm">
      <span className={arrowColor}>{arrow}</span>
      {dReps !== undefined && dReps !== 0 && (
        <span className={colorR}>{translations[lang].progressRLabel}</span>
      )}
      {dWeight !== undefined && dWeight !== 0 && dReps !== 0 && dReps !== undefined && dWeight !== undefined ? (
        <span className="mx-0.5"></span>
      ) : null}
      {dWeight !== undefined && dWeight !== 0 && (
        <span className={colorW}>{translations[lang].progressWLabel}</span>
      )}
    </div>
  );
}
