import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { WeeklyRoutineId } from '../types/idsTypes';
import type { DayRoutineType } from '../types/routineTypes';

// context type for weekly routine
// to define the shape of the context value

export interface WeeklyRoutineContextType {
  // unique identifier for the weekly routine
  weeklyRoutineId: WeeklyRoutineId;
  setWeeklyRoutineId: Dispatch<SetStateAction<WeeklyRoutineId>>;

  // name of the weekly routine
  routineName: string;
  setRoutineName: Dispatch<SetStateAction<string>>;

  // starting date of the weekly routine
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;

  // array of official exercise entries for the weekly routine
  officialEntries: DayRoutineType[];
  setOfficialEntries: Dispatch<SetStateAction<DayRoutineType[]>>;
}
// create the context with undefined default, so the hook can guard against
// being used outside the provider
export const WeeklyRoutineContext = createContext<
  WeeklyRoutineContextType | undefined
>(undefined);
