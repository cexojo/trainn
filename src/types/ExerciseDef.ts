export type ExerciseDef = {
  athleteUserRead?: boolean;
  id: string;
  day: string;
  exerciseNumber?: number;
  athleteNotes?: string | null;
  trainerNotes?: string | null;
  exercise: {
    name: string;
    group: string;
    id?: string;
  };
  trainingDay?: {
    id?: string;
    date?: string;
  };
  dayExerciseId?: string;
  seriesNumber: number;
  minReps: number;
  maxReps: number;
  minRir: number;
  maxRir: number;
  effectiveReps: number | null;
  effectiveWeight: number | null;
  effectiveRir: number | null;
  lastWeekValues?: {
    effectiveReps: number | null;
    effectiveWeight: number | null;
    effectiveRir: number | null;
  } | null;
  isDropset?: boolean;
};
