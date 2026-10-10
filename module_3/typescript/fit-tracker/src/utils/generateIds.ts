import type {
  ExerciseId,
  MemberId,
  InstructorId,
  WeeklyRoutineId,
  DayRoutineId,
} from '../types/idsTypes';

export function generateExerciseId(): ExerciseId {
  return crypto.randomUUID() as ExerciseId;
}

export function generateMemberId(): MemberId {
  return crypto.randomUUID() as MemberId;
}

export function generateInstructorId(): InstructorId {
  return crypto.randomUUID() as InstructorId;
}

export function generateWeeklyRoutineId(): WeeklyRoutineId {
  return crypto.randomUUID() as WeeklyRoutineId;
}

export function generateDayRoutineId(): DayRoutineId {
  return crypto.randomUUID() as DayRoutineId;
}
