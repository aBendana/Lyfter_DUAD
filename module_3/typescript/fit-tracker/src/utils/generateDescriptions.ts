import type { ExerciseType } from '../types/exerciseTypes';
import type { ExerciseCategoryType } from '../types/exerciseTypes';
import type { DayRoutineType } from '../types/routineTypes';
import { minutesToHoursAndMinutes } from './calculations';

export function generateCategoryWeeklyResumeDescription(
  routineEntries: DayRoutineType[],
  category: ExerciseCategoryType
): string {
  const exercises = routineEntries.flatMap((session) =>
    session.exercises.filter(
      (exercise) => exercise.exerciseCategory === category
    )
  );
  const totalMinutes = exercises.reduce(
    (total, exercise) => total + exercise.duration,
    0
  );
  const totalCalories = exercises.reduce(
    (total, exercise) => total + exercise.caloriesBurned,
    0
  );
  const roundedTotalCalories = Number(totalCalories.toFixed(2));

  return `${exercises.length} ${category.toLowerCase()} exercises totaling ${minutesToHoursAndMinutes(totalMinutes)} 
  and burning ${roundedTotalCalories} kcal.`;
}

export function generateExerciseDescription(exercise: ExerciseType): string {
  const status = exercise.completed ? 'Completed' : 'Incomplete';

  switch (exercise.exerciseCategory) {
    case 'Cardio':
      return `${exercise.name} covers ${exercise.distance} km in ${minutesToHoursAndMinutes(
        exercise.duration
      )}, at a pace of ${exercise.pace} min/km, in heart rate zone 
      ${exercise.heartRateZone ?? 'not specified'}. Status: ${status}.`;

    case 'Strength':
      return `${exercise.name} consists of ${exercise.sets} sets of ${exercise.repetitions} 
      (weight: ${exercise.weight ?? 'not specified'} kg), completed in ${minutesToHoursAndMinutes(
        exercise.duration
      )}. Status: ${status}.`;

    case 'Flexibility':
      return `${exercise.name} includes ${exercise.positions} positions and lasts ${minutesToHoursAndMinutes(
        exercise.duration
      )}. Status: ${status}.`;
  }
}
