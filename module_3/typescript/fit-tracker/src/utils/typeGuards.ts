import type { SetStateAction } from 'react';
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

// a state action is either the next value or an updater of the previous value
export function isStateUpdater<Value>(
  action: SetStateAction<Value>
): action is (previousValue: Value) => Value {
  return typeof action === 'function';
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(value: string): boolean {
  return uuidPattern.test(value);
}

// branded ids are earned by a runtime check, never by a type assertion
export function isExerciseId(value: string): value is ExerciseId {
  return isUuid(value);
}

export function isMemberId(value: string): value is MemberId {
  return isUuid(value);
}

export function isInstructorId(value: string): value is InstructorId {
  return isUuid(value);
}

export function isWeeklyRoutineId(value: string): value is WeeklyRoutineId {
  return isUuid(value);
}

export function isDayRoutineId(value: string): value is DayRoutineId {
  return isUuid(value);
}
