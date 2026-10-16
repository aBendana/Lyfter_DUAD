import type { DayRoutineType } from './routineTypes';

export interface ExerciseCounts {
  total: number;
  cardio: number;
  strength: number;
  flexibility: number;
}

export interface CategoryTimes {
  cardioTime: number;
  strengthTime: number;
  flexibilityTime: number;
}

// formats a non-negative integer of minutes as "Xh Ymin"
export type MinutesToHoursAndMinutes = (minutes: number) => string;

// calories burned from a caloric rate and a duration in minutes
export type CaloriesBurned = (caloricRate: number, duration: number) => number;

// minutes per distance unit
export type ExercisePace = (minutes: number, distance: number) => number;

export type RoutineTotalCalories = (entries: DayRoutineType[]) => number;

// average over days with exercise only
export type WeeklyCaloriesAverage = (entries: DayRoutineType[]) => number;

export type DayWithMostCaloriesBurned = (
  entries: DayRoutineType[]
) => DayRoutineType | null;

// percentage (0-100) of the total represented by the day with most calories
export type PercentageOfTotalCaloriesBurned = (
  totalCaloriesBurned: number,
  dayMostCalories: number
) => number;

// total time of all exercises in minutes
export type TotalTime = (entries: DayRoutineType[]) => number;

// day with the longest total exercise duration
export type LongerDurationSession = (
  entries: DayRoutineType[]
) => DayRoutineType | null;

// counts exercises by category and total
export type ExerciseCounter = (entries: DayRoutineType[]) => ExerciseCounts;

// total time of exercises by category in minutes
export type TotalTimeByCategory = (entries: DayRoutineType[]) => CategoryTimes;

// total number of training sessions
export type TotalTrainingSessions = (entries: DayRoutineType[]) => number;

// incomplete exercise with the day it belongs to
export interface IncompleteExerciseEntry {
  id: string;
  name: string;
  day: DayRoutineType['day'];
}

// list of incomplete exercises with their day
export type IncompleteExercisesList = (
  entries: DayRoutineType[]
) => IncompleteExerciseEntry[];

// total number of incomplete exercises
export type TotalIncompleteExercises = (entries: DayRoutineType[]) => number;
