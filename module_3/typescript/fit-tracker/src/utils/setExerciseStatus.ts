import type { DayRoutineId, ExerciseId } from '../types/idsTypes';
import type { WorkoutStatusType } from '../types/exerciseTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';

// returns an updated copy of the routine with the exercise's status changed
export function setExerciseStatus(
  routine: WeeklyRoutineType,
  dayRoutineId: DayRoutineId,
  exerciseId: ExerciseId,
  status: WorkoutStatusType
): WeeklyRoutineType {
  return {
    ...routine,
    entries: routine.entries.map((session) =>
      session.id === dayRoutineId
        ? {
            ...session,
            exercises: session.exercises.map((exercise) =>
              exercise.id === exerciseId ? { ...exercise, status } : exercise
            ),
          }
        : session
    ),
  };
}
