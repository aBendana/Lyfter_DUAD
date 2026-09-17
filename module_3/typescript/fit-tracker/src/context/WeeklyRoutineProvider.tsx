import { useState } from 'react';
import type { ReactNode } from 'react';
import type { WeeklyRoutineId } from '../types/idsTypes';
import type { RoutineType } from '../types/routineTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import { generateWeeklyRoutineId } from '../utils/generateIds';
import { WeeklyRoutineContext } from './WeeklyRoutineContext';

// default weekly routine
const defaultWeeklyRoutine: WeeklyRoutineType = {
  id: generateWeeklyRoutineId(),
  name: '',
  entries: [],
};

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
      }}
    >
      {children}
    </WeeklyRoutineContext.Provider>
  );
}
