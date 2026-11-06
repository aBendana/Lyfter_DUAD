import type {
  ExerciseId,
  MemberId,
  InstructorId,
  WeeklyRoutineId,
  DayRoutineId,
} from '../types/idsTypes';
import {
  isDayRoutineId,
  isExerciseId,
  isInstructorId,
  isMemberId,
  isWeeklyRoutineId,
} from './typeGuards';

export function generateExerciseId(): ExerciseId {
  const id = crypto.randomUUID();
  if (!isExerciseId(id)) throw new Error('Invalid exercise id');
  return id;
}

export function generateMemberId(): MemberId {
  const id = crypto.randomUUID();
  if (!isMemberId(id)) throw new Error('Invalid member id');
  return id;
}

export function generateInstructorId(): InstructorId {
  const id = crypto.randomUUID();
  if (!isInstructorId(id)) throw new Error('Invalid instructor id');
  return id;
}

export function generateWeeklyRoutineId(): WeeklyRoutineId {
  const id = crypto.randomUUID();
  if (!isWeeklyRoutineId(id)) throw new Error('Invalid weekly routine id');
  return id;
}

export function generateDayRoutineId(): DayRoutineId {
  const id = crypto.randomUUID();
  if (!isDayRoutineId(id)) throw new Error('Invalid day routine id');
  return id;
}
