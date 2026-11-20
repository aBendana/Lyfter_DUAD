import type { MemberId } from '../types/idsTypes';
import type { InstructorInfoType } from '../types/userTypes';

// a member has at most one instructor, assignMember enforces it
export function findMemberInstructor(
  memberId: MemberId,
  instructors: readonly InstructorInfoType[]
): InstructorInfoType | null {
  return (
    instructors.find((instructor) =>
      instructor.assignedMemberIds.includes(memberId)
    ) ?? null
  );
}
