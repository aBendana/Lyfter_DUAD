import type {
  ApiExerciseDifficulty,
  ApiExerciseSearchType,
} from '../types/apiExerciseTypes';
import {
  apiMuscles,
  exerciseDifficulties,
  exerciseSearchTypes,
  workoutStatuses,
} from '../types/exerciseCatalog';
import type {
  ApiExerciseNameType,
  WorkoutStatusType,
} from '../types/exerciseTypes';
import type {
  ApiCatalogExerciseType,
  CatalogExerciseType,
} from '../types/catalogExerciseTypes';
import type {
  ActivityId,
  CatalogExerciseId,
  DayRoutineId,
  ExerciseId,
  InstructorId,
  MemberId,
  WeeklyRoutineId,
} from '../types/idsTypes';

export function isWorkoutStatus(value: string): value is WorkoutStatusType {
  return workoutStatuses.some((status) => status === value);
}

// the only way to get an ApiExerciseNameType: a trimmed, non-empty name
export function isApiExerciseName(value: string): value is ApiExerciseNameType {
  return value !== '' && value === value.trim();
}

export function isApiMuscle(value: string): boolean {
  return apiMuscles.some((muscle) => muscle === value);
}

export function isExerciseSearchType(
  value: string
): value is ApiExerciseSearchType {
  return exerciseSearchTypes.some((searchType) => searchType === value);
}

export function isExerciseDifficulty(
  value: string
): value is ApiExerciseDifficulty {
  return exerciseDifficulties.some((difficulty) => difficulty === value);
}

function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

// branded ids are earned by a runtime check, never by a type assertion
export function isExerciseId(value: number): value is ExerciseId {
  return isPositiveInteger(value);
}

export function isMemberId(value: number): value is MemberId {
  return isPositiveInteger(value);
}

export function isInstructorId(value: number): value is InstructorId {
  return isPositiveInteger(value);
}

export function isWeeklyRoutineId(value: number): value is WeeklyRoutineId {
  return isPositiveInteger(value);
}

export function isDayRoutineId(value: number): value is DayRoutineId {
  return isPositiveInteger(value);
}

export function isCatalogExerciseId(value: number): value is CatalogExerciseId {
  return isPositiveInteger(value);
}

export function isActivityId(value: number): value is ActivityId {
  return isPositiveInteger(value);
}

export function isApiCatalogExercise(
  exercise: CatalogExerciseType
): exercise is ApiCatalogExerciseType {
  return exercise.source === 'api';
}
