import { createContext } from 'react';
import type {
  ApiExerciseCategoryType,
  ApiExerciseType,
} from '../types/apiExerciseTypes';
import type { ExerciseCategoryType } from '../types/exerciseTypes';

export interface ExerciseCatalogCountsType {
  local: number;
  ninja: number;
}

export interface ExerciseCatalogContextType {
  addExercise: (exercise: ApiExerciseType) => void;
  getExerciseCounts: (
    category: ExerciseCategoryType
  ) => ExerciseCatalogCountsType;
  getExerciseNames: (category: ExerciseCategoryType) => string[];
  isApiExercise: (category: ExerciseCategoryType, name: string) => boolean;
  hasExercise: (
    category: ApiExerciseCategoryType,
    name: string
  ) => boolean;
}

export const ExerciseCatalogContext = createContext<
  ExerciseCatalogContextType | undefined
>(undefined);
