import { createContext, useContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { RoutineType } from '../types/routineTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';

// context type for weekly routine
// to define the shape of the context value
type WeeklyRoutineContextType = {
  routineName: string;
  setRoutineName: Dispatch<SetStateAction<string>>;

  routineEntries: RoutineType[];
  setRoutineEntries: Dispatch<SetStateAction<RoutineType[]>>;
};

// default weekly routine
const defaultWeeklyRoutine: WeeklyRoutineType = { name: '', entries: [] };

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
      value={{ routineEntries, setRoutineEntries, routineName, setRoutineName }}
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
