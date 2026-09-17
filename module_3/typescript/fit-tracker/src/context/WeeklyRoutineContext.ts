import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { WeeklyRoutineId } from '../types/idsTypes';
import type { RoutineType } from '../types/routineTypes';

// context type for weekly routine
// to define the shape of the context value
/*
 * weekly routine is just created once by the moment, app scope for now just manage
 * a weekly routine with id (that now is created in the default), name and an array of
 * exercise entries, each one with their own states
 * in the future if multiple weekly routines are needed,
 * the context and state management will need to be updated accordingly.
 */
export type WeeklyRoutineContextType = {
  // unique identifier for the weekly routine
  weeklyRoutineId: WeeklyRoutineId;
  setWeeklyRoutineId: Dispatch<SetStateAction<WeeklyRoutineId>>;

  // name of the weekly routine
  routineName: string;
  setRoutineName: Dispatch<SetStateAction<string>>;

  // array of exercise entries for the weekly routine
  routineEntries: RoutineType[];
  setRoutineEntries: Dispatch<SetStateAction<RoutineType[]>>;
};

// create the context with undefined default, so the hook can guard against
// being used outside the provider
export const WeeklyRoutineContext = createContext<
  WeeklyRoutineContextType | undefined
>(undefined);
