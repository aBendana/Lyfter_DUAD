import type {
  ActivityId,
  ExerciseId,
  MemberId,
  InstructorId,
  WeeklyRoutineId,
  DayRoutineId,
  CatalogExerciseId,
} from '../types/idsTypes';
import {
  isActivityId,
  isCatalogExerciseId,
  isDayRoutineId,
  isExerciseId,
  isInstructorId,
  isMemberId,
  isWeeklyRoutineId,
} from './typeGuards';

// ids continue after the highest seeded id, deleted ids are never reused
function createIdCounter(seedIds: readonly number[]): () => number {
  let lastId = seedIds.length > 0 ? Math.max(...seedIds) : 0;
  return () => ++lastId;
}

const nextExerciseId = createIdCounter([]);
const nextMemberId = createIdCounter([]);
const nextInstructorId = createIdCounter([]);
const nextWeeklyRoutineId = createIdCounter([]);
const nextCatalogExerciseId = createIdCounter([]);
const nextDayRoutineId = createIdCounter([]);
const nextActivityId = createIdCounter([]);

export function generateExerciseId(): ExerciseId {
  const id = nextExerciseId();
  if (!isExerciseId(id)) throw new Error('Invalid exercise id');
  return id;
}

export function generateMemberId(): MemberId {
  const id = nextMemberId();
  if (!isMemberId(id)) throw new Error('Invalid member id');
  return id;
}

export function generateInstructorId(): InstructorId {
  const id = nextInstructorId();
  if (!isInstructorId(id)) throw new Error('Invalid instructor id');
  return id;
}

export function generateWeeklyRoutineId(): WeeklyRoutineId {
  const id = nextWeeklyRoutineId();
  if (!isWeeklyRoutineId(id)) throw new Error('Invalid weekly routine id');
  return id;
}

export function generateDayRoutineId(): DayRoutineId {
  const id = nextDayRoutineId();
  if (!isDayRoutineId(id)) throw new Error('Invalid day routine id');
  return id;
}

export function generateCatalogExerciseId(): CatalogExerciseId {
  const id = nextCatalogExerciseId();
  if (!isCatalogExerciseId(id)) throw new Error('Invalid catalog exercise id');
  return id;
}

export function generateActivityId(): ActivityId {
  const id = nextActivityId();
  if (!isActivityId(id)) throw new Error('Invalid activity id');
  return id;
}
