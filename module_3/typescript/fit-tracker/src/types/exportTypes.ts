import type { ApiExerciseDetailsType } from './apiExerciseTypes';
import type { CatalogExerciseSourceType } from './catalogExerciseTypes';
import type { ExerciseCategoryType } from './exerciseTypes';
import type { MemberId } from './idsTypes';
import type { EntityType } from './storeTypes';
import type { InstructorInfoType, MemberProfileType } from './userTypes';

// which admin view the file comes from; it also names the file
export type ExportSectionType = 'members' | 'instructors' | 'catalog';

// every export file shares this wrapper, whatever entity it carries
export interface ExportFileType<T extends EntityType> {
  exportedAt: Date;
  count: number;
  items: T[];
}

// the routine is summarized, the file does not carry every exercise
export interface MemberRoutineExportType {
  name: string;
  active: boolean;
  workoutDays: number;
  minutes: number;
  calories: number;
  incompleteExercises: number;
}

export interface MemberExportType extends Pick<
  MemberProfileType,
  'id' | 'fullName' | 'email' | 'age' | 'experienceLevel' | 'membership'
> {
  instructor: string | null;
  routine: MemberRoutineExportType;
}

// a missing member is kept and flagged, like in the instructors view
export type AssignedMemberExportType =
  | { id: MemberId; found: true; fullName: string }
  | { id: MemberId; found: false };

export interface InstructorExportType extends Omit<
  InstructorInfoType,
  'assignedMemberIds'
> {
  assignedMembers: AssignedMemberExportType[];
}

// both sources share the ui category; only api ones have the extra details
interface CatalogExportBaseType {
  id: number;
  name: string;
  category: ExerciseCategoryType;
}

export type CatalogExportItemType =
  | (CatalogExportBaseType & { source: 'local' })
  | (CatalogExportBaseType & { source: 'api' } & ApiExerciseDetailsType);

export interface CatalogExportFileType extends ExportFileType<CatalogExportItemType> {
  summary: Record<CatalogExerciseSourceType | ExerciseCategoryType, number>;
}
