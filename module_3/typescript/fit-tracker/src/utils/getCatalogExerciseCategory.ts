import type { CatalogExerciseType } from '../types/catalogExerciseTypes';
import type { ExerciseCategoryType } from '../types/exerciseTypes';
import { toExerciseCategory } from './normalizeExercise';

// api entries keep the api category ('cardio'), so both sources are compared
// with the ui one ('Cardio')
export function getCatalogExerciseCategory(
  exercise: CatalogExerciseType
): ExerciseCategoryType {
  return exercise.source === 'local'
    ? exercise.category
    : toExerciseCategory(exercise.category);
}
