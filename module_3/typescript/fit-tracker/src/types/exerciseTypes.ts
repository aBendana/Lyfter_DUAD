import type { ExerciseId } from './idsTypes';

//exercise categories
export type ExerciseCategoryType = 'Cardio' | 'Strength' | 'Flexibility';

// cardio exercises and attributes
export type ExerciseCardioNameType =
  | 'Running'
  | 'Cycling'
  | 'Swimming'
  | 'Walking'
  | 'Hiking'
  | 'Rowing';

export type ExerciseCardioType = {
  id: ExerciseId;
  exerciseCategory: 'Cardio';
  name: ExerciseCardioNameType;
  caloriesPerMinute: number;
  duration: number;
  caloriesBurned: number;
  distance: number;
  pace: number;
  heartRateZone: number;
};

export type ExerciseStrengthNameType =
  | 'Bench Press'
  | 'Squats'
  | 'Deadlifts'
  | 'Overhead Press'
  | 'Pull-Ups'
  | 'Push-Ups';

export type ExerciseStrengthType = {
  id: ExerciseId;
  exerciseCategory: 'Strength';
  name: ExerciseStrengthNameType;
  caloriesPerMinute: number;
  duration: number;
  caloriesBurned: number;
  sets: number;
  repetitions: number;
  weight: number;
};

export type ExerciseFlexibilityNameType =
  | 'Yoga'
  | 'Pilates'
  | 'Tai Chi'
  | 'Barre'
  | 'Stretching';

export type ExerciseFlexibilityType = {
  id: ExerciseId;
  exerciseCategory: 'Flexibility';
  name: ExerciseFlexibilityNameType;
  caloriesPerMinute: number;
  duration: number;
  caloriesBurned: number;
  positions: number;
};

// union type of all sports
// this is used for generate the catalog list in the UI
export type SportNameType =
  | ExerciseCardioNameType
  | ExerciseStrengthNameType
  | ExerciseFlexibilityNameType;

//
export type ExerciseType =
  | ExerciseCardioType
  | ExerciseStrengthType
  | ExerciseFlexibilityType;
