import type { ExerciseType } from './exerciseTypes';
import type { RoutineId } from './idsTypes';

// type day of the week
export type DayOfWeekType =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type RoutineType = {
  id: RoutineId;
  name: DayOfWeekType;
  exercise: ExerciseType;
};
