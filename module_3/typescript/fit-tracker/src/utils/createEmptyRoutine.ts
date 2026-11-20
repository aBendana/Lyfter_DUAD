import type { MemberId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import { generateWeeklyRoutineId } from './generateIds';

export function createEmptyRoutine(memberId: MemberId): WeeklyRoutineType {
  return {
    id: generateWeeklyRoutineId(),
    memberId,
    name: '',
    startDate: new Date(),
    entries: [],
  };
}
