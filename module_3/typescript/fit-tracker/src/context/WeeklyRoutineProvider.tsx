import type { ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { DayRoutineType } from '../types/routineTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import type { MemberProfileType } from '../types/userTypes';
import {
  generateDayRoutineId,
  generateWeeklyRoutineId,
} from '../utils/generateIds';
import { useMemberRoutine } from '../hooks/useMemberRoutine';
import { setExerciseStatus } from '../utils/setExerciseStatus';
import { setDayComments } from '../utils/setDayComments';
import { isStateUpdater } from '../utils/typeGuards';
import { formatExerciseName } from '../utils/formatExerciseName';
import { logActivity } from '../store/logActivity';
import { WeeklyRoutineContext } from './WeeklyRoutineContext';
import type { WeeklyRoutineContextType } from './WeeklyRoutineContext';

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
  return isStateUpdater(action) ? action(currentValue) : action;
}

// props for the WeeklyRoutineProvider, including its child components
interface WeeklyRoutineProviderProps {
  children: ReactNode;
}

export function WeeklyRoutineProvider({
  children,
}: WeeklyRoutineProviderProps) {
  const { activeMember, updateActiveMemberRoutine } = useMemberRoutine();
  const routine = activeMember?.routine ?? emptyWeeklyRoutine;

  const requireActiveMember = (): MemberProfileType => {
    if (!activeMember) {
      throw new Error('Select or create a member before editing a routine');
    }

    return activeMember;
  };

  // returns the member and the new routine so callers can log what changed
  const updateRoutine = (
    update: (currentRoutine: WeeklyRoutineType) => WeeklyRoutineType
  ) => {
    const member = requireActiveMember();
    const routine = update(member.routine);
    updateActiveMemberRoutine(routine);
    return { member, routine };
  };

  const setWeeklyRoutineId: Dispatch<
    SetStateAction<WeeklyRoutineType['id']>
  > = (value) =>
    updateRoutine((currentRoutine) => ({
      ...currentRoutine,
      id: resolveStateAction(value, currentRoutine.id),
    }));

  const setRoutineName: Dispatch<SetStateAction<string>> = (value) => {
    const { member, routine } = updateRoutine((currentRoutine) => ({
      ...currentRoutine,
      name: resolveStateAction(value, currentRoutine.name),
    }));

    if (routine.name !== member.routine.name) {
      logActivity({
        kind: 'routine-renamed',
        memberName: member.fullName,
        routineName: routine.name,
      });
    }
  };

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

  // the comments are only replaced when the form sends new ones
  const addExerciseToDay: WeeklyRoutineContextType['addExerciseToDay'] = (
    day,
    exercise,
    dayComments
  ) => {
    const { member } = updateRoutine((currentRoutine) => {
      const existingDaySession = currentRoutine.entries.find(
        (session) => session.day === day
      );

      if (!existingDaySession) {
        const newDaySession: DayRoutineType = {
          id: generateDayRoutineId(),
          day,
          exercises: [exercise],
          dayComments,
        };

        return {
          ...currentRoutine,
          entries: [...currentRoutine.entries, newDaySession],
        };
      }

      return {
        ...currentRoutine,
        entries: currentRoutine.entries.map((session) =>
          session.day === day
            ? {
                ...session,
                exercises: [...session.exercises, exercise],
                dayComments: dayComments || session.dayComments,
              }
            : session
        ),
      };
    });

    logActivity({
      kind: 'routine-exercise-added',
      memberName: member.fullName,
      exerciseName: formatExerciseName(exercise),
      day,
    });
  };

  const updateExerciseStatus: WeeklyRoutineContextType['updateExerciseStatus'] =
    (dayRoutineId, exerciseId, status) => {
      const exercise = requireActiveMember()
        .routine.entries.find((session) => session.id === dayRoutineId)
        ?.exercises.find((current) => current.id === exerciseId);

      if (!exercise) {
        logActivity({
          kind: 'not-found',
          entity: 'exercise',
          targetId: exerciseId,
        });
        return;
      }

      if (exercise.status === status) return;

      const { member } = updateRoutine((currentRoutine) =>
        setExerciseStatus(currentRoutine, dayRoutineId, exerciseId, status)
      );

      logActivity({
        kind: 'exercise-status-changed',
        memberName: member.fullName,
        exerciseName: formatExerciseName(exercise),
        status,
      });
    };

  const updateDayComments: WeeklyRoutineContextType['updateDayComments'] = (
    dayRoutineId,
    dayComments
  ) => {
    const session = requireActiveMember().routine.entries.find(
      (current) => current.id === dayRoutineId
    );

    if (!session) {
      logActivity({
        kind: 'not-found',
        entity: 'day session',
        targetId: dayRoutineId,
      });
      return;
    }

    const { member } = updateRoutine((currentRoutine) =>
      setDayComments(currentRoutine, dayRoutineId, dayComments)
    );

    logActivity({
      kind: 'day-comments-updated',
      memberName: member.fullName,
      day: session.day,
    });
  };

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
        addExerciseToDay,
        updateExerciseStatus,
        updateDayComments,
      }}
    >
      {children}
    </WeeklyRoutineContext.Provider>
  );
}
