import { createContext } from 'react';
import type {
  ApiExerciseCategoryType,
  ApiExerciseType,
  IncompleteApiExerciseStatusType,
  IncompleteApiExerciseType,
  SearchHistoryEntryType,
} from '../types/apiExerciseTypes';
import type {
  ExerciseCategoryType,
  SportNameType,
} from '../types/exerciseTypes';

export interface ExerciseCatalogCountsType {
  local: number;
  ninja: number;
}

export interface ExerciseCatalogContextType {
  addedExercises: ApiExerciseType[];

  addExercise: (exercise: ApiExerciseType) => void;

  addIncompleteExercises: (exercises: IncompleteApiExerciseType[]) => void;

  resolveIncompleteExercise: (
    exercise: IncompleteApiExerciseType,
    decision: Exclude<IncompleteApiExerciseStatusType, 'pending'>
  ) => void;

  getIncompleteExerciseStatus: (
    exercise: IncompleteApiExerciseType
  ) => IncompleteApiExerciseStatusType;

  incompleteExercises: IncompleteApiExerciseType[];

  getExerciseCounts: (
    category: ExerciseCategoryType
  ) => ExerciseCatalogCountsType;

  getExerciseNames: (category: ExerciseCategoryType) => SportNameType[];

  isCatalogExerciseName: (
    category: ExerciseCategoryType,
    name: string
  ) => name is SportNameType;

  isApiExercise: (category: ExerciseCategoryType, name: string) => boolean;

  hasExercise: (category: ApiExerciseCategoryType, name: string) => boolean;

  // successful searches of the session, newest first
  searchHistory: SearchHistoryEntryType[];

  addSearchToHistory: (entry: SearchHistoryEntryType) => void;

  clearSearchHistory: () => void;
}

export const ExerciseCatalogContext = createContext<
  ExerciseCatalogContextType | undefined
>(undefined);
