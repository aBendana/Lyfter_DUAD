import type { ReactNode } from 'react';
import type { DayRoutineType } from '../types/routineTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import type { MemberProfileType } from '../types/userTypes';
import type { EntityChangesType } from '../types/storeTypes';
import { generateDayRoutineId } from '../utils/generateIds';
import { useMemberRoutine } from '../hooks/useMemberRoutine';
import { useStore } from '../hooks/useStore';
import { setExerciseStatus } from '../utils/setExerciseStatus';
import { setDayComments } from '../utils/setDayComments';
import { findMemberRoutine } from '../utils/findMemberRoutine';
import { formatExerciseName } from '../utils/formatExerciseName';
import { routineStore } from '../store/stores';
import { logActivity } from '../store/logActivity';
import { WeeklyRoutineContext } from './WeeklyRoutineContext';
import type { WeeklyRoutineContextType } from './WeeklyRoutineContext';

// stable reference while no member is selected
const noEntries: DayRoutineType[] = [];

// props for the WeeklyRoutineProvider, including its child components
interface WeeklyRoutineProviderProps {
  children: ReactNode;
}

export function WeeklyRoutineProvider({
  children,
}: WeeklyRoutineProviderProps) {
  const { activeMember } = useMemberRoutine();
  // subscribed, so the context follows every write to routineStore
  const routines = useStore(routineStore);
  const routine = activeMember
    ? findMemberRoutine(activeMember.id, routines)
    : null;

  // read from the store at call time, so two writes in one handler
  // do not overwrite each other with a stale routine
  const requireActiveRoutine = (): {
    member: MemberProfileType;
    routine: WeeklyRoutineType;
  } => {
    if (!activeMember) {
      throw new Error('Select or create a member before editing a routine');
    }

    const current = findMemberRoutine(activeMember.id, routineStore.getAll());
    if (!current) {
      throw new Error(`Member ${activeMember.id} has no routine`);
    }

    return { member: activeMember, routine: current };
  };

  // only the changed fields go to the store, the id can never be one of them
  const updateRoutine = (
    current: WeeklyRoutineType,
    changes: EntityChangesType<WeeklyRoutineType>
  ): boolean => {
    const result = routineStore.update(current.id, changes);
    if (!result.found) {
      logActivity({
        kind: 'not-found',
        entity: 'routine',
        targetId: result.id,
      });
    }

    return result.found;
  };

  const setRoutineName: WeeklyRoutineContextType['setRoutineName'] = (name) => {
    const { member, routine } = requireActiveRoutine();
    if (name === routine.name || !updateRoutine(routine, { name })) return;

    logActivity({
      kind: 'routine-renamed',
      memberName: member.fullName,
      routineName: name,
    });
  };

  // the comments are only replaced when the form sends new ones
  const addExerciseToDay: WeeklyRoutineContextType['addExerciseToDay'] = (
    day,
    exercise,
    dayComments
  ) => {
    const { member, routine } = requireActiveRoutine();
    const existingDaySession = routine.entries.find(
      (session) => session.day === day
    );

    const entries: DayRoutineType[] = existingDaySession
      ? routine.entries.map((session) =>
          session.day === day
            ? {
                ...session,
                exercises: [...session.exercises, exercise],
                dayComments: dayComments || session.dayComments,
              }
            : session
        )
      : [
          ...routine.entries,
          {
            id: generateDayRoutineId(),
            day,
            exercises: [exercise],
            dayComments,
          },
        ];

    if (!updateRoutine(routine, { entries })) return;

    logActivity({
      kind: 'routine-exercise-added',
      memberName: member.fullName,
      exerciseName: formatExerciseName(exercise),
      day,
    });
  };

  const updateExerciseStatus: WeeklyRoutineContextType['updateExerciseStatus'] =
    (dayRoutineId, exerciseId, status) => {
      const { member, routine } = requireActiveRoutine();
      const exercise = routine.entries
        .find((session) => session.id === dayRoutineId)
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

      const entries = setExerciseStatus(
        routine.entries,
        dayRoutineId,
        exerciseId,
        status
      );
      if (!updateRoutine(routine, { entries })) return;

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
    const { member, routine } = requireActiveRoutine();
    const session = routine.entries.find(
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

    const entries = setDayComments(routine.entries, dayRoutineId, dayComments);
    if (!updateRoutine(routine, { entries })) return;

    logActivity({
      kind: 'day-comments-updated',
      memberName: member.fullName,
      day: session.day,
    });
  };

  return (
    <WeeklyRoutineContext.Provider
      value={{
        routineName: routine?.name ?? '',
        setRoutineName,
        officialEntries: routine?.entries ?? noEntries,
        addExerciseToDay,
        updateExerciseStatus,
        updateDayComments,
      }}
    >
      {children}
    </WeeklyRoutineContext.Provider>
  );
}
