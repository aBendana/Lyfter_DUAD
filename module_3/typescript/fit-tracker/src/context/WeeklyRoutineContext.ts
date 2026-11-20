import { createContext } from 'react';
import type { DayRoutineId, ExerciseId } from '../types/idsTypes';
import type { ExerciseType, WorkoutStatusType } from '../types/exerciseTypes';
import type { DayOfWeekType, DayRoutineType } from '../types/routineTypes';

// context type for weekly routine
// only the operations the pages use; the id is never exposed for editing

export interface WeeklyRoutineContextType {
  // name of the active member's routine
  routineName: string;
  setRoutineName: (name: string) => void;

  // day sessions of the active member's routine
  officialEntries: DayRoutineType[];

  // adds an exercise to the day's session, creating the session if needed
  addExerciseToDay: (
    day: DayOfWeekType,
    exercise: ExerciseType,
    dayComments?: string
  ) => void;

  // changes the status of an existing exercise
  updateExerciseStatus: (
    dayRoutineId: DayRoutineId,
    exerciseId: ExerciseId,
    status: WorkoutStatusType
  ) => void;

  // changes (or removes, when empty) the comments of an existing session
  updateDayComments: (dayRoutineId: DayRoutineId, dayComments: string) => void;
}
// create the context with undefined default, so the hook can guard against
// being used outside the provider
export const WeeklyRoutineContext = createContext<
  WeeklyRoutineContextType | undefined
>(undefined);
