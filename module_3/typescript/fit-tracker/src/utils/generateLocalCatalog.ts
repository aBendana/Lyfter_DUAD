import type { LocalCatalogExerciseType } from '../types/catalogExerciseTypes';
import {
  cardioNameExercises,
  exerciseNameCategories,
  flexibilityNameExercises,
  strengthNameExercises,
} from '../types/exerciseCatalog';
import type {
  ExerciseCategoryType,
  LocalExerciseNameType,
} from '../types/exerciseTypes';
import { generateCatalogExerciseId } from './generateIds';

// Record forces a name list for every category
const localExerciseNames: Record<
  ExerciseCategoryType,
  readonly LocalExerciseNameType[]
> = {
  Cardio: cardioNameExercises,
  Strength: strengthNameExercises,
  Flexibility: flexibilityNameExercises,
};

// the built-in exercises as store entities, each with its own id
export function generateLocalCatalog(): LocalCatalogExerciseType[] {
  return exerciseNameCategories.flatMap((category) =>
    localExerciseNames[category].map((name): LocalCatalogExerciseType => ({
      id: generateCatalogExerciseId(),
      source: 'local',
      category,
      name,
    }))
  );
}
