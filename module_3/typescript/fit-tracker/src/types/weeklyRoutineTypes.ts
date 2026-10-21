import type { DayRoutineType } from './routineTypes';
import type { WeeklyRoutineId } from './idsTypes';

export interface WeeklyRoutineType {
  id: WeeklyRoutineId;
  name: string;
  startDate: Date;
  entries: DayRoutineType[];
}
