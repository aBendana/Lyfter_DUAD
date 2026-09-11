import { createContext, useContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { WeeklyRoutineId } from '../types/idsTypes';
import type { RoutineType } from '../types/routineTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import { generateWeeklyRoutineId } from '../utils/generateIds';

// context type for weekly routine
// to define the shape of the context value
/*
 * weekly routine is just created once by the moment, app scope for now just manage
 * a weekly routine with id (that now is created in the default), name and an array of
 * exercise entries, each one with their own states
 * in the future if multiple weekly routines are needed,
 * the context and state management will need to be updated accordingly.
 */
type WeeklyRoutineContextType = {
  weeklyRoutineId: WeeklyRoutineId;
  setWeeklyRoutineId: Dispatch<SetStateAction<WeeklyRoutineId>>;

  routineName: string;
  setRoutineName: Dispatch<SetStateAction<string>>;

  routineEntries: RoutineType[];
  setRoutineEntries: Dispatch<SetStateAction<RoutineType[]>>;

  // counter for total number of exercises in the weekly routine
  exerciseCount: number;
};

// default weekly routine
const defaultWeeklyRoutine: WeeklyRoutineType = {
  id: generateWeeklyRoutineId(),
  name: '',
  entries: [],
};

// create the context with default values
const WeeklyRoutineContext = createContext<
  WeeklyRoutineContextType | undefined
>(undefined);

// props for the WeeklyRoutineProvider, including its child components
type WeeklyRoutineProviderProps = {
  children: ReactNode;
};

export function WeeklyRoutineProvider({
  children,
}: WeeklyRoutineProviderProps) {
  // state for the weekly routine ID
  const [weeklyRoutineId, setWeeklyRoutineId] = useState<WeeklyRoutineId>(
    defaultWeeklyRoutine.id
  );

  //state to hold the name of the weekly routine, initialized with default value
  const [routineName, setRoutineName] = useState<string>(
    defaultWeeklyRoutine.name
  );

  // state to hold the routine entries, initialized with default values
  const [routineEntries, setRoutineEntries] = useState<RoutineType[]>(
    defaultWeeklyRoutine.entries
  );

  return (
    <WeeklyRoutineContext.Provider
      value={{
        weeklyRoutineId,
        setWeeklyRoutineId,
        routineEntries,
        setRoutineEntries,
        routineName,
        setRoutineName,
        exerciseCount: routineEntries.length,
      }}
    >
      {children}
    </WeeklyRoutineContext.Provider>
  );
}

// custom hook to access the weekly routine context
export function useWeeklyRoutine() {
  const context = useContext(WeeklyRoutineContext);

  if (!context) {
    throw new Error(
      'useWeeklyRoutine must be used within a WeeklyRoutineProvider'
    );
  }

  return context;
}
