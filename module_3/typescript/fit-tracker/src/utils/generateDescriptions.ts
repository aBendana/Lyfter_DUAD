import type { ExerciseType } from '../types/exerciseTypes';
import type { ExerciseCategoryType } from '../types/exerciseTypes';
import type { DayRoutineType } from '../types/routineTypes';
import { minutesToHoursAndMinutes } from './calculations';
import { formatExerciseName } from './formatExerciseName';

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

  const exercisesLabel = exercises.length === 1 ? 'exercise' : 'exercises';

  // each line is its own string, so the text has no line breaks or indentation
  return (
    `${exercises.length} ${category.toLowerCase()} ${exercisesLabel} ` +
    `totaling ${minutesToHoursAndMinutes(totalMinutes)} ` +
    `and burning ${roundedTotalCalories} kcal.`
  );
}

export function generateExerciseDescription(exercise: ExerciseType): string {
  const status =
    exercise.status.charAt(0).toUpperCase() + exercise.status.slice(1);
  const name = formatExerciseName(exercise);
  const duration = minutesToHoursAndMinutes(exercise.duration);

  // each line is its own string, so the text has no line breaks or indentation
  switch (exercise.exerciseCategory) {
    case 'Cardio':
      return (
        `${name} covers ${exercise.distance} km in ${duration}, ` +
        `at a pace of ${exercise.pace} min/km, ` +
        `in heart rate zone ${exercise.heartRateZone ?? 'not specified'}. ` +
        `Status: ${status}.`
      );

    case 'Strength': {
      const weight = exercise.weight ? `${exercise.weight} lbs` : 'not specified';
      return (
        `${name} consists of ${exercise.sets} sets of ${exercise.repetitions} repetitions ` +
        `(weight: ${weight}), completed in ${duration}. ` +
        `Status: ${status}.`
      );
    }

    case 'Flexibility':
      return (
        `${name} includes ${exercise.positions} positions ` +
        `and lasts ${duration}. Status: ${status}.`
      );
  }
}
