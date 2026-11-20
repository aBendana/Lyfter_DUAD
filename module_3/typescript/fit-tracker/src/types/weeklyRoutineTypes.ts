import type { DayRoutineType } from './routineTypes';
import type { MemberId, WeeklyRoutineId } from './idsTypes';

// stored on its own; memberId points to the owner, like assignedMemberIds
export interface WeeklyRoutineType {
  id: WeeklyRoutineId;
  memberId: MemberId;
  name: string;
  startDate: Date;
  entries: DayRoutineType[];
}
