import type { ExerciseType } from '../types/exerciseTypes';
import type { RoutineType } from '../types/routineTypes';
import {
  minutesToHoursAndMinutes,
  routineTotalCalories,
  totalTime,
} from './calculations';

export function generateCategoryWeeklyResumeDescription(
  exercisesRoutines: RoutineType[]
): string {
  return `${exercisesRoutines.length} cardio exercises totaling ${minutesToHoursAndMinutes(totalTime(exercisesRoutines))} and burning ${routineTotalCalories(exercisesRoutines)} kcal.`;
}

export function generateExerciseDescription(exercise: ExerciseType): string {
  switch (exercise.exerciseCategory) {
    case 'Cardio':
      return `${exercise.name} covers ${exercise.distance} km in ${minutesToHoursAndMinutes(
        exercise.duration
      )}, at a pace of ${exercise.pace} min/km, in heart rate zone ${exercise.heartRateZone}.`;

    case 'Strength':
      return `${exercise.name} consists of ${exercise.sets} sets of ${exercise.repetitions} repetitions with ${exercise.weight} kg, completed in ${minutesToHoursAndMinutes(
        exercise.duration
      )}.`;

    case 'Flexibility':
      return `${exercise.name} includes ${exercise.positions} positions and lasts ${minutesToHoursAndMinutes(
        exercise.duration
      )}.`;
  }
}
