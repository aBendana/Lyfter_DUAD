// exercises offered by the catalog, stored in one store whatever their source

import type { ApiExerciseType } from './apiExerciseTypes';
import type {
  ExerciseCategoryType,
  LocalExerciseNameType,
} from './exerciseTypes';
import type { CatalogExerciseId } from './idsTypes';

export type CatalogExerciseSourceType = 'local' | 'api';

// built into the app, seeded when the store is created
export interface LocalCatalogExerciseType {
  id: CatalogExerciseId;
  source: 'local';
  category: ExerciseCategoryType;
  name: LocalExerciseNameType;
}

// added by the user from api-ninjas; keeps the api fields for the reports
export interface ApiCatalogExerciseType extends ApiExerciseType {
  id: CatalogExerciseId;
  source: 'api';
}

// `source` discriminates the union
export type CatalogExerciseType =
  LocalCatalogExerciseType | ApiCatalogExerciseType;

// how many catalog exercises come from each source
export type CatalogSourceCountsType = Record<CatalogExerciseSourceType, number>;
