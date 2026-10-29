// Exercises received from api-ninjas, validated and discriminated by `category`.

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

export interface ApiExerciseType {
  name: string;
  category: ApiExerciseCategoryType;
}

export type ApiExerciseValidationType =
  | { status: 'valid'; exercise: ApiExerciseType }
  | { status: 'invalid'; reasons: string[] };

// an exercise rejected by validation, kept so the user can decide what to do with it
export interface IncompleteApiExerciseType {
  raw: unknown;
  reasons: string[];
}

export interface ApiExerciseReportType {
  valid: ApiExerciseType[];
  incomplete: IncompleteApiExerciseType[];
}
