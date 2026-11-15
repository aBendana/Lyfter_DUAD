import type { MemberProfileType } from '../types/userTypes';

// a routine counts as active when it has sessions and the membership is active
export function hasActiveRoutine(member: MemberProfileType): boolean {
  return (
    member.routine.entries.length > 0 && member.membership.state === 'Active'
  );
}
