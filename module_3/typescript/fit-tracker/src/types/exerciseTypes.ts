import type { ExerciseId } from './idsTypes';

//exercise categories
export type ExerciseCategoryType = 'Cardio' | 'Strength' | 'Flexibility';

// the only valid states of a workout
export type WorkoutStatusType = 'pending' | 'completed' | 'skipped';

// fields shared by every exercise, regardless of category
export interface ExerciseGenericType {
  id: ExerciseId;
  caloriesPerMinute: number;
  duration: number;
  caloriesBurned: number;
  status: WorkoutStatusType;
  source?: 'ninja'; // set when the exercise came from the api-ninjas catalog
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
  name: string;
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
  name: string;
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
  name: string;
  positions: number;
  flexibilityComments?: string; // optional for the user to add notes about the exercise
}

// local exercises: closed list of literals
export type LocalExerciseNameType =
  | ExerciseCardioNameType
  | ExerciseStrengthNameType
  | ExerciseFlexibilityNameType;

// api exercises: any text, but only after passing the validator (isApiExerciseName)
export type ApiExerciseNameType = string & {
  readonly __brand: 'ApiExerciseName';
};

// every exercise name the catalog can offer in the form; a plain string is not
// accepted, so the catalog can grow with api exercises without opening the type
export type SportNameType = LocalExerciseNameType | ApiExerciseNameType;

//
export type ExerciseType =
  | ExerciseCardioType
  | ExerciseStrengthType
  | ExerciseFlexibilityType;
