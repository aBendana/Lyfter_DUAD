import type { ExerciseType } from './exerciseTypes';

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
  name: DayOfWeekType;
  exercise: ExerciseType;
};
