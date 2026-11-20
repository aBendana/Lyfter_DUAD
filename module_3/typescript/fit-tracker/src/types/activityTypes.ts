import type { ApiErrorKind } from '../services/apiErrors';
import type { ExerciseCategoryType, WorkoutStatusType } from './exerciseTypes';
import type { ExportSectionType } from './exportTypes';
import type { ActivityId } from './idsTypes';
import type { DayOfWeekType } from './routineTypes';
import type { MemberProfileType, MembershipContractType } from './userTypes';

// profile fields the member form can change; the update log lists them by name
export type MemberEditableFieldType = keyof Pick<
  MemberProfileType,
  'fullName' | 'email' | 'age' | 'experienceLevel'
>;

// what a lookup was searching for when it found nothing
export type NotFoundEntityType =
  'member' | 'instructor' | 'routine' | 'exercise' | 'day session';

// what happened, without id or time; `kind` discriminates the union
// and the formatter turns each kind into its text
export type ActivityEventType =
  | { kind: 'member-added'; memberName: string }
  | {
      kind: 'member-updated';
      memberName: string;
      fields: MemberEditableFieldType[];
    }
  | {
      kind: 'membership-changed';
      memberName: string;
      from: MembershipContractType;
      to: MembershipContractType;
    }
  | { kind: 'routine-renamed'; memberName: string; routineName: string }
  | {
      kind: 'routine-exercise-added';
      memberName: string;
      exerciseName: string;
      day: DayOfWeekType;
    }
  | {
      kind: 'exercise-status-changed';
      memberName: string;
      exerciseName: string;
      status: WorkoutStatusType;
    }
  | { kind: 'day-comments-updated'; memberName: string; day: DayOfWeekType }
  | { kind: 'instructor-added'; instructorName: string }
  | { kind: 'instructor-updated'; instructorName: string }
  | { kind: 'member-assigned'; instructorName: string; memberName: string }
  | { kind: 'member-unassigned'; instructorName: string; memberName: string }
  | {
      kind: 'catalog-exercise-added';
      exerciseName: string;
      category: ExerciseCategoryType;
    }
  | { kind: 'catalog-exercise-discarded'; exerciseName: string }
  | { kind: 'data-exported'; section: ExportSectionType; count: number }
  | { kind: 'not-found'; entity: NotFoundEntityType; targetId: number }
  | { kind: 'api-error'; errorKind: ApiErrorKind; muscle: string };

// the stored entry: the event plus the id and time the log gives it
export type ActivityType = ActivityEventType & { id: ActivityId; at: Date };

export type ActivityOutcomeType = 'success' | 'error';

export interface FormattedActivityType {
  outcome: ActivityOutcomeType;
  message: string;
}
