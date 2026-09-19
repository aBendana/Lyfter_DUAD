import type { RoutineType } from './routineTypes';
import type { WeeklyRoutineId } from './idsTypes';

export type WeeklyRoutineType = {
  id: WeeklyRoutineId;
  name: string;
  entries: RoutineType[];
};
