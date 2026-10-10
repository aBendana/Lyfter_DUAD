import type { ExerciseId } from './idsTypes';

//exercise categories
export type ExerciseCategoryType = 'Cardio' | 'Strength' | 'Flexibility';

// fields shared by every exercise, regardless of category
export interface ExerciseGenericType {
  id: ExerciseId;
  caloriesPerMinute: number;
  duration: number;
  caloriesBurned: number;
  completed: boolean;
}

// cardio exercises and attributes
export type ExerciseCardioNameType =
  | 'Running'
  | 'Cycling'
  | 'Swimming'
  | 'Walking'
  | 'Hiking'
  | 'Rowing';

export interface ExerciseCardioType extends ExerciseGenericType {
  exerciseCategory: 'Cardio';
  name: ExerciseCardioNameType;
  distance: number;
  pace: number;
  heartRateZone?: number; // optional: not all users will know their heart rate zone
}

export type ExerciseStrengthNameType =
  | 'Bench Press'
  | 'Squats'
  | 'Deadlifts'
  | 'Overhead Press'
  | 'Pull-Ups'
  | 'Push-Ups';

export interface ExerciseStrengthType extends ExerciseGenericType {
  exerciseCategory: 'Strength';
  name: ExerciseStrengthNameType;
  sets: number;
  repetitions: number;
  weight?: number; // optional: not all strength exercises will have a weight associated
}

export type ExerciseFlexibilityNameType =
  | 'Yoga'
  | 'Pilates'
  | 'Tai Chi'
  | 'Barre'
  | 'Stretching';

export interface ExerciseFlexibilityType extends ExerciseGenericType {
  exerciseCategory: 'Flexibility';
  name: ExerciseFlexibilityNameType;
  positions: number;
  flexibilityComments?: string; // optional for the user to add notes about the exercise
}

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
