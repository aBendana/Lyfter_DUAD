import { createContext } from 'react';
import type { ApiError } from '../services/apiErrors';
import type {
  ApiExerciseCategoryType,
  ApiExerciseType,
  IncompleteApiExerciseStatusType,
  IncompleteApiExerciseType,
  SearchHistoryEntryType,
} from '../types/apiExerciseTypes';
import type {
  ApiCatalogExerciseType,
  CatalogSourceCountsType,
} from '../types/catalogExerciseTypes';
import type {
  ExerciseCategoryType,
  SportNameType,
} from '../types/exerciseTypes';

export interface ExerciseCatalogContextType {
  // the api part of the catalog store
  addedExercises: ApiCatalogExerciseType[];

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

  // the search runs in the page, so its failures reach the log through here
  logSearchError: (error: ApiError, muscle: string) => void;

  // without a category it counts the whole catalog
  getExerciseCounts: (
    category?: ExerciseCategoryType
  ) => CatalogSourceCountsType;

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
