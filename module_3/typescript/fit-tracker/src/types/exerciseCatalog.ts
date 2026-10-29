// this module is used to define the types of exercises
// that can be in the options of the UI select input
// for the user to choose sports

import type {
  ExerciseCategoryType,
  ExerciseCardioNameType,
  ExerciseStrengthNameType,
  ExerciseFlexibilityNameType,
  WorkoutStatusType,
} from './exerciseTypes';

// array of every valid workout status
export const workoutStatuses: readonly WorkoutStatusType[] = [
  'pending',
  'completed',
  'skipped',
];

// array of exercise categories
export const exerciseNameCategories: ExerciseCategoryType[] = [
  'Cardio',
  'Strength',
  'Flexibility',
];

// array of distance-based sports,
export const cardioNameExercises: ExerciseCardioNameType[] = [
  'Running',
  'Cycling',
  'Swimming',
  'Walking',
  'Hiking',
  'Rowing',
];

// array of non-distance-based sports
export const strengthNameExercises: ExerciseStrengthNameType[] = [
  'Bench Press',
  'Squats',
  'Deadlifts',
  'Overhead Press',
  'Pull-Ups',
  'Push-Ups',
];

// muscle values accepted by the api-ninjas `muscle` query parameter;
// any other value returns an empty list without an error
export const apiMuscles: readonly string[] = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'shoulders',
  'traps',
  'triceps',
];

export const flexibilityNameExercises: ExerciseFlexibilityNameType[] = [
  'Yoga',
  'Pilates',
  'Tai Chi',
  'Barre',
  'Stretching',
];
