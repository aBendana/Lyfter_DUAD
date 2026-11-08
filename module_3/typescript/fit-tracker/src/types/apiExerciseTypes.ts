// Exercises received from api-ninjas, validated and discriminated by `category`.

import type { ApiExerciseNameType } from './exerciseTypes';

export type ApiExerciseCategoryType = 'cardio' | 'strength' | 'flexibility';

export type ApiExerciseSearchType =
  | 'cardio'
  | 'olympic_weightlifting'
  | 'plyometrics'
  | 'powerlifting'
  | 'strength'
  | 'stretching'
  | 'strongman';

export type ApiExerciseDifficulty = 'beginner' | 'intermediate' | 'expert';

export interface ApiExerciseSearchFilters {
  muscle: string;
  name?: string;
  type?: ApiExerciseSearchType;
  difficulty?: ApiExerciseDifficulty;
}

// a successful search of the session, with the filters used and what it returned
export interface SearchHistoryEntryType {
  filters: ApiExerciseSearchFilters;
  searchedAt: Date;
  validCount: number;
  incompleteCount: number;
}

// only the fields FitTracker requires (see validateApiExercise);
// muscle, difficulty and equipments are null (shown as "Not Specified") only when
// the user chose to add an incomplete exercise
export interface ApiExerciseType {
  name: ApiExerciseNameType;
  category: ApiExerciseCategoryType;
  muscle: string | null;
  difficulty: ApiExerciseDifficulty | null;
  equipments: string[] | null;
}

// extra information of an api exercise, shown in the unified report
export type ApiExerciseDetailsType = Pick<
  ApiExerciseType,
  'muscle' | 'difficulty' | 'equipments'
>;

export type ApiExerciseValidationType =
  | { status: 'valid'; exercise: ApiExerciseType }
  | { status: 'invalid'; reasons: string[] };

// an exercise rejected by validation, kept so the user can decide what to do with it
export interface IncompleteApiExerciseType {
  raw: unknown;
  reasons: string[];
}

// pending until the user decides to add it to the catalog or discard it
export type IncompleteApiExerciseStatusType = 'pending' | 'added' | 'discarded';

export interface ApiExerciseReportType {
  valid: ApiExerciseType[];
  incomplete: IncompleteApiExerciseType[];
}
