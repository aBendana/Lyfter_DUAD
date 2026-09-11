import type {
  ExerciseId,
  UserId,
  RoutineId,
  WeeklyRoutineId,
} from '../types/idsTypes';

export function generateExerciseId(): ExerciseId {
  return crypto.randomUUID() as ExerciseId;
}

export function generateUserId(): UserId {
  return crypto.randomUUID() as UserId;
}

export function generateRoutineId(): RoutineId {
  return crypto.randomUUID() as RoutineId;
}

export function generateWeeklyRoutineId(): WeeklyRoutineId {
  return crypto.randomUUID() as WeeklyRoutineId;
}
