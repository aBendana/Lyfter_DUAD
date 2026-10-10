import type { ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { DayRoutineType } from '../types/routineTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import { generateWeeklyRoutineId } from '../utils/generateIds';
import { useMemberRoutine } from '../hooks/useMemberRoutine';
import { WeeklyRoutineContext } from './WeeklyRoutineContext';

const emptyWeeklyRoutine: WeeklyRoutineType = {
  id: generateWeeklyRoutineId(),
  name: '',
  startDate: new Date(),
  entries: [],
};

function resolveStateAction<Value>(
  action: SetStateAction<Value>,
  currentValue: Value
): Value {
  return typeof action === 'function'
    ? (action as (previousValue: Value) => Value)(currentValue)
    : action;
}

// props for the WeeklyRoutineProvider, including its child components
type WeeklyRoutineProviderProps = {
  children: ReactNode;
};

export function WeeklyRoutineProvider({
  children,
}: WeeklyRoutineProviderProps) {
  const { activeMember, updateActiveMemberRoutine } = useMemberRoutine();
  const routine = activeMember?.routine ?? emptyWeeklyRoutine;

  const updateRoutine = (
    update: (currentRoutine: WeeklyRoutineType) => WeeklyRoutineType
  ) => {
    if (!activeMember) {
      throw new Error('Select or create a member before editing a routine');
    }

    updateActiveMemberRoutine(update(activeMember.routine));
  };

  const setWeeklyRoutineId: Dispatch<SetStateAction<WeeklyRoutineType['id']>> = (
    value
  ) =>
    updateRoutine((currentRoutine) => ({
      ...currentRoutine,
      id: resolveStateAction(value, currentRoutine.id),
    }));

  const setRoutineName: Dispatch<SetStateAction<string>> = (value) =>
    updateRoutine((currentRoutine) => ({
      ...currentRoutine,
      name: resolveStateAction(value, currentRoutine.name),
    }));

  const setStartDate: Dispatch<SetStateAction<Date>> = (value) =>
    updateRoutine((currentRoutine) => ({
      ...currentRoutine,
      startDate: resolveStateAction(value, currentRoutine.startDate),
    }));

  const setOfficialEntries: Dispatch<SetStateAction<DayRoutineType[]>> = (
    value
  ) =>
    updateRoutine((currentRoutine) => ({
      ...currentRoutine,
      entries: resolveStateAction(value, currentRoutine.entries),
    }));

  return (
    <WeeklyRoutineContext.Provider
      value={{
        weeklyRoutineId: routine.id,
        setWeeklyRoutineId,
        routineName: routine.name,
        setRoutineName,
        startDate: routine.startDate,
        setStartDate,
        officialEntries: routine.entries,
        setOfficialEntries,
      }}
    >
      {children}
    </WeeklyRoutineContext.Provider>
  );
}
