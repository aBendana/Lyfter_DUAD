import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';

// only the routine's own data decides, so it can be counted without members
export function isActiveRoutine(routine: WeeklyRoutineType): boolean {
  return routine.entries.length > 0;
}
