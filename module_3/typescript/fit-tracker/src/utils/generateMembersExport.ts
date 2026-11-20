import type { ExportFileType, MemberExportType } from '../types/exportTypes';
import type { InstructorInfoType, MemberProfileType } from '../types/userTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import {
  routineTotalCalories,
  totalIncompleteExercises,
  totalTime,
  totalTrainingSessions,
} from './calculations';
import { createExportFile } from './createExportFile';
import { findMemberInstructor } from './findMemberInstructor';
import { findMemberRoutine } from './findMemberRoutine';
import { isActiveRoutine } from './isActiveRoutine';

// same figures the members card shows; the file joins each member
// with its routine, so the export keeps the nested shape
export function generateMembersExport(
  members: readonly MemberProfileType[],
  routines: readonly WeeklyRoutineType[],
  instructors: readonly InstructorInfoType[]
): ExportFileType<MemberExportType> {
  return createExportFile(
    members.map((member): MemberExportType => {
      const routine = findMemberRoutine(member.id, routines);
      const entries = routine?.entries ?? [];
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
          name: routine?.name ?? '',
          active: routine !== null && isActiveRoutine(routine),
          workoutDays: totalTrainingSessions(entries),
          minutes: totalTime(entries),
          calories: routineTotalCalories(entries),
          incompleteExercises: totalIncompleteExercises(entries),
        },
      };
    })
  );
}
