import type {
  ActivityType,
  FormattedActivityType,
  MemberEditableFieldType,
  NotFoundEntityType,
} from '../types/activityTypes';
import type { WorkoutStatusType } from '../types/exerciseTypes';

// a record forces a label for every field, so a new one cannot be forgotten
const memberFieldLabels: Record<MemberEditableFieldType, string> = {
  fullName: 'name',
  email: 'email',
  age: 'age',
  experienceLevel: 'experience',
};

const workoutStatusLabels: Record<WorkoutStatusType, string> = {
  pending: 'marked as pending',
  completed: 'completed',
  skipped: 'skipped',
};

const notFoundEntityLabels: Record<NotFoundEntityType, string> = {
  member: 'Member',
  instructor: 'Instructor',
  exercise: 'Exercise',
  'day session': 'Day session',
};

// the switch is exhaustive: a new activity kind does not compile until it has a text
export function formatActivity(activity: ActivityType): FormattedActivityType {
  switch (activity.kind) {
    case 'member-added':
      return {
        outcome: 'success',
        message: `Member ${activity.memberName} registered`,
      };
    case 'member-updated':
      return {
        outcome: 'success',
        message: `${activity.memberName} updated (${activity.fields
          .map((field) => memberFieldLabels[field])
          .join(', ')})`,
      };
    case 'membership-changed':
      return {
        outcome: 'success',
        message: `${activity.memberName} membership ${activity.from} → ${activity.to}`,
      };
    case 'routine-renamed':
      return {
        outcome: 'success',
        message: `${activity.memberName} routine renamed to "${activity.routineName}"`,
      };
    case 'routine-exercise-added':
      return {
        outcome: 'success',
        message: `${activity.exerciseName} added on ${activity.day}, ${activity.memberName}`,
      };
    case 'exercise-status-changed':
      return {
        outcome: 'success',
        message: `${activity.exerciseName} ${workoutStatusLabels[activity.status]}, ${activity.memberName}`,
      };
    case 'day-comments-updated':
      return {
        outcome: 'success',
        message: `${activity.day} comments updated, ${activity.memberName}`,
      };
    case 'instructor-added':
      return {
        outcome: 'success',
        message: `Instructor ${activity.instructorName} registered`,
      };
    case 'instructor-updated':
      return {
        outcome: 'success',
        message: `Instructor ${activity.instructorName} updated`,
      };
    case 'member-assigned':
      return {
        outcome: 'success',
        message: `${activity.memberName} assigned to ${activity.instructorName}`,
      };
    case 'member-unassigned':
      return {
        outcome: 'success',
        message: `${activity.memberName} unassigned from ${activity.instructorName}`,
      };
    case 'catalog-exercise-added':
      return {
        outcome: 'success',
        message: `${activity.exerciseName} (Ninja) added to the ${activity.category} catalog`,
      };
    case 'catalog-exercise-discarded':
      return {
        outcome: 'success',
        message: `${activity.exerciseName} (Ninja) discarded for incomplete info`,
      };
    case 'data-exported':
      return {
        outcome: 'success',
        message: `${activity.section} exported to JSON (${activity.count} ${activity.count === 1 ? 'item' : 'items'})`,
      };
    case 'not-found':
      return {
        outcome: 'error',
        message: `${notFoundEntityLabels[activity.entity]} ID ${activity.targetId} not found`,
      };
    case 'api-error':
      return {
        outcome: 'error',
        message: `Ninja search for "${activity.muscle}" failed (${activity.errorKind})`,
      };
  }
}
