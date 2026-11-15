import type { ExportFileType, MemberExportType } from '../types/exportTypes';
import type { InstructorInfoType, MemberProfileType } from '../types/userTypes';
import {
  routineTotalCalories,
  totalIncompleteExercises,
  totalTime,
  totalTrainingSessions,
} from './calculations';
import { createExportFile } from './createExportFile';
import { findMemberInstructor } from './findMemberInstructor';
import { hasActiveRoutine } from './hasActiveRoutine';

// same figures the members card shows
export function generateMembersExport(
  members: readonly MemberProfileType[],
  instructors: readonly InstructorInfoType[]
): ExportFileType<MemberExportType> {
  return createExportFile(
    members.map((member): MemberExportType => {
      const { entries } = member.routine;
      return {
        id: member.id,
        fullName: member.fullName,
        email: member.email,
        age: member.age,
        experienceLevel: member.experienceLevel,
        membership: member.membership,
        instructor:
          findMemberInstructor(member.id, instructors)?.fullName ?? null,
        routine: {
          name: member.routine.name,
          active: hasActiveRoutine(member),
          workoutDays: totalTrainingSessions(entries),
          minutes: totalTime(entries),
          calories: routineTotalCalories(entries),
          incompleteExercises: totalIncompleteExercises(entries),
        },
      };
    })
  );
}
