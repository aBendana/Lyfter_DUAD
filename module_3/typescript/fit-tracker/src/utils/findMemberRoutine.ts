import type { MemberId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';

// a member has exactly one routine, addMember creates it with the member
export function findMemberRoutine(
  memberId: MemberId,
  routines: readonly WeeklyRoutineType[]
): WeeklyRoutineType | null {
  return routines.find((routine) => routine.memberId === memberId) ?? null;
}
