import { workoutStatuses } from '../types/exerciseCatalog';
import type { WorkoutStatusType } from '../types/exerciseTypes';

export function isWorkoutStatus(value: string): value is WorkoutStatusType {
  return workoutStatuses.some((status) => status === value);
}
