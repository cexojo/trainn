export type Lang = "en" | "es";

type Translations = {
  [K in Lang]: {
    dashboardTitle: string;
    previousWeek: string;
    ds: string;
    nextWeek: string;
    block: string;
    week: string;
    day: string;
    exercise: string;
    muscleGroup: string;
    reps: string;
    weight: string;
    rir: string;
    progress: string;
    showLegend: string;
    progressLegend: string;
    legend1: string;
    legend2: string;
    legend3: string;
    legend4: string;
    legend5: string;
    legend6: string;
    legend7: string;
    legend8: string;
    legend9: string;
    close: string;
    calendarAria: (idx: number) => string;
    athleteSeparator: string;
    language: string;
    nameDefault: string;
    progressRLabel: string;
    progressWLabel: string;
    lastWeekShort: string;
  };
};

// Export translations used in front-end
export const translations: Translations = {
  en: {
    dashboardTitle: "Athlete Dashboard",
    previousWeek: "Previous week",
    ds: "DS",
    nextWeek: "Next week",
    block: "Block",
    week: "Week",
    day: "Day",
    exercise: "Exercise",
    muscleGroup: "Muscle Group",
    reps: "Reps",
    weight: "Weight (kg)",
    rir: "RIR",
    progress: "Progress",
    showLegend: "Show progress legend",
    progressLegend: "Progress Legend",
    legend1: "Both reps and weight positive",
    legend2: "One positive, other neutral",
    legend3: "One positive, other negative",
    legend4: "One negative, other neutral",
    legend5: "Both metrics negative",
    legend6: "Both metrics neutral",
    legend7: "Metric increased",
    legend8: "Metric unchanged",
    legend9: "Metric decreased",
    close: "Close",
    calendarAria: (idx: number) => `Set date for day ${idx + 1}`,
    athleteSeparator: "|",
    language: "Language",
    nameDefault: "John Doe",
    progressRLabel: "R",
    progressWLabel: "W",
    lastWeekShort: "Last wk: "
  },
  es: {
    dashboardTitle: "Panel del Atleta",
    previousWeek: "Semana anterior",
    ds: "DS",
    nextWeek: "Semana siguiente",
    block: "Bloque",
    week: "Semana",
    day: "Día",
    exercise: "Ejercicio",
    muscleGroup: "Grupo muscular",
    reps: "Repeticiones",
    weight: "Peso (kg)",
    rir: "RIR",
    progress: "Progreso",
    showLegend: "Ver leyenda de progreso",
    progressLegend: "Leyenda de Progreso",
    legend1: "Repeticiones y peso suben",
    legend2: "Uno sube, otro neutro",
    legend3: "Uno sube, otro baja",
    legend4: "Uno baja, otro neutro",
    legend5: "Ambos bajan",
    legend6: "Ambos neutros",
    legend7: "Métrica mejoró",
    legend8: "Métrica igual",
    legend9: "Métrica empeoró",
    close: "Cerrar",
    calendarAria: (idx: number) => `Seleccionar fecha del día ${idx + 1}`,
    athleteSeparator: "|",
    language: "Idioma",
    nameDefault: "John Doe",
    progressRLabel: "R",
    progressWLabel: "P",
    lastWeekShort: "Sem. ant.: "
  }
};
