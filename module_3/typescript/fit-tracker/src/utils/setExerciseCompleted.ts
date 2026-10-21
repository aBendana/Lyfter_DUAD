import type { DayRoutineId, ExerciseId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';

// returns an updated copy of the routine with the exercise's completed state changed
export function setExerciseCompleted(
  routine: WeeklyRoutineType,
  dayRoutineId: DayRoutineId,
  exerciseId: ExerciseId,
  completed: boolean
): WeeklyRoutineType {
  return {
    ...routine,
    entries: routine.entries.map((session) =>
      session.id === dayRoutineId
        ? {
            ...session,
            exercises: session.exercises.map((exercise) =>
              exercise.id === exerciseId ? { ...exercise, completed } : exercise
            ),
          }
        : session
    ),
  };
}
