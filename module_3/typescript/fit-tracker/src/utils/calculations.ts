import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import type { RoutineType } from '../types/routineTypes';
import type { CaloriesPerMinute } from '../types/exerciseTypes';

// pass minutes to hours and minutes
export function minutesToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}

// calories burned
export function caloriesBurned(
  caloricRate: CaloriesPerMinute,
  duration: number
): number {
  if (duration === 0) {
    throw new Error('Duration cannot be zero');
  }

  return parseFloat((caloricRate * duration).toFixed(2));
}

// pace for distance-based exercises
export function exercisePace(minutes: number, distance: number): number {
  if (minutes === 0 || distance === 0) {
    throw new Error('Distance or Time cannot be zero');
  }

  return parseFloat((minutes / distance).toFixed(2));
}

// weekly routine total burned calories
export function weeklyRoutineTotalCalories(
  weeklyRoutine: WeeklyRoutineType
): number {
  const totalCalories = weeklyRoutine.entries.reduce(
    (total: number, entry: RoutineType) =>
      total +
      caloriesBurned(entry.exercise.caloriesPerMinute, entry.exercise.duration),
    0
  );

  return totalCalories;
}

// weekly calories average, not including days with no exercise
export function weeklyCaloriesAverage(
  weeklyRoutine: WeeklyRoutineType
): number {
  // filter out days with no exercise
  const daysWithExercise = weeklyRoutine.entries.filter(
    (entry: RoutineType) => entry.exercise.duration > 0
  );

  // guard to return a no exercise week
  if (daysWithExercise.length === 0) {
    return 0;
  }

  const totalCalories = weeklyRoutineTotalCalories(weeklyRoutine);

  return parseFloat((totalCalories / daysWithExercise.length).toFixed(2));
}

// day with the most calories burned
export function dayWithMostCaloriesBurned(
  weeklyRoutine: WeeklyRoutineType
): RoutineType | null {
  if (weeklyRoutine.entries.length === 0) {
    return null;
  }

  return weeklyRoutine.entries.reduce((maxEntry, currentEntry) => {
    const currentCalories = caloriesBurned(
      currentEntry.exercise.caloriesPerMinute,
      currentEntry.exercise.duration
    );

    const maxCalories = caloriesBurned(
      maxEntry.exercise.caloriesPerMinute,
      maxEntry.exercise.duration
    );

    if (currentCalories > maxCalories) {
      return currentEntry;
    }

    return maxEntry;
  });
}

// percentage of total calories burned for day with the most calories burned
export function percentageOfTotalCaloriesBurned(
  totalCaloriesBurned: number,
  dayMostCalories: number
): number {
  return parseFloat(((dayMostCalories / totalCaloriesBurned) * 100).toFixed(2));
}

// longest duration exercise
export function longerDurationExercise(
  entries: RoutineType[]
): RoutineType | null {
  if (entries.length === 0) {
    return null;
  }

  return entries.reduce((longestExercise, currentExercise) =>
    currentExercise.exercise.duration > longestExercise.exercise.duration
      ? currentExercise
      : longestExercise
  );
}
