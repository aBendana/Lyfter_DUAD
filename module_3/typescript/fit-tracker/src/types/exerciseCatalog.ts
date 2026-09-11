// this module is used to define the types of exercises
// that can be in the options of the UI select input
// for the user to choose sports

import type {
  ExerciseCategoryType,
  ExerciseCardioNameType,
  ExerciseStrengthNameType,
  ExerciseFlexibilityNameType,
} from './exerciseTypes';

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

export const flexibilityNameExercises: ExerciseFlexibilityNameType[] = [
  'Yoga',
  'Pilates',
  'Tai Chi',
  'Barre',
  'Stretching',
];
