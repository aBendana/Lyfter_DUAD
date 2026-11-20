import type { DayRoutineId, ExerciseId } from '../types/idsTypes';
import type { WorkoutStatusType } from '../types/exerciseTypes';
import type { DayRoutineType } from '../types/routineTypes';

// returns updated entries, the store receives them as a partial update
export function setExerciseStatus(
  entries: readonly DayRoutineType[],
  dayRoutineId: DayRoutineId,
  exerciseId: ExerciseId,
  status: WorkoutStatusType
): DayRoutineType[] {
  return entries.map((session) =>
    session.id === dayRoutineId
      ? {
          ...session,
          exercises: session.exercises.map((exercise) =>
            exercise.id === exerciseId ? { ...exercise, status } : exercise
          ),
        }
      : session
  );
}
