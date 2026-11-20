import type {
  AssignedMemberExportType,
  ExportFileType,
  InstructorExportType,
} from '../types/exportTypes';
import type { InstructorInfoType, MemberProfileType } from '../types/userTypes';
import { createExportFile } from './createExportFile';

// assigned ids become names; an id without a member is kept as not found
export function generateInstructorsExport(
  instructors: readonly InstructorInfoType[],
  members: readonly MemberProfileType[]
): ExportFileType<InstructorExportType> {
  return createExportFile(
    instructors.map(
      ({ assignedMemberIds, ...profile }): InstructorExportType => ({
        ...profile,
        assignedMembers: assignedMemberIds.map(
          (memberId): AssignedMemberExportType => {
            const member = members.find((current) => current.id === memberId);
            return member
              ? { id: memberId, found: true, fullName: member.fullName }
              : { id: memberId, found: false };
          }
        ),
      })
    )
  );
}
