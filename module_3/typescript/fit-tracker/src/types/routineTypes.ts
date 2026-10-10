import type { ExerciseType } from './exerciseTypes';
import type { DayRoutineId } from './idsTypes';

// type day of the week
export type DayOfWeekType =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

interface DaySchedule {
  day: DayOfWeekType;
}

// day session type representing a day's workout session
export interface DayRoutineType extends DaySchedule {
  id: DayRoutineId;
  exercises: ExerciseType[];
  dayComments?: string;
}
