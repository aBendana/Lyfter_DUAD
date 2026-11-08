import type { ExerciseType } from '../types/exerciseTypes';

// exercise name for the UI, flagged when it came from the api-ninjas catalog
export function formatExerciseName(
  exercise: Pick<ExerciseType, 'name' | 'source'>
): string {
  return exercise.source === 'ninja'
    ? `${exercise.name} (Ninja)`
    : exercise.name;
}
