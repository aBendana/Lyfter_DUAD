import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import { WeeklyRoutineNameForm } from '../../components/Forms/WeeklyRoutineNameForm/WeeklyRoutineNameForm';
import type { DayRoutineType } from '../../types/routineTypes';
import type { DailyRoutineFormType } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import { DailyRoutineForm } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import { ListedRoutines } from '../../components/ListedRoutines/ListedRoutines';
import { createRoutineEntry } from '../../utils/createRoutineEntry';
import { generateDayRoutineId } from '../../utils/generateIds';
import { useMemberRoutine } from '../../hooks/useMemberRoutine';
import { useExerciseCatalog } from '../../hooks/useExerciseCatalog';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './UserRoutine.css';

export function UserRoutine() {
  const { activeMember } = useMemberRoutine();
  const { isApiExercise, isCatalogExerciseName } = useExerciseCatalog();
  const {
    routineName,
    setRoutineName,
    officialEntries,
    setOfficialEntries,
    updateExerciseStatus,
    updateDayComments,
  } = useWeeklyRoutine();

  // handle the submission of the weekly routine name
  const handleRoutineNameSubmit = (name: string) => {
    setRoutineName(name);
  };

  // handle adding an exercise to the day's session,
  // creating the session if it doesn't exist yet;
  // returns whether it was saved, so the form shows success or error
  const handleEntrySubmit = (data: DailyRoutineFormType): boolean => {
    const { exerciseDay, exerciseName, exerciseCategory } = data;

    if (exerciseDay === '' || exerciseName === '' || exerciseCategory === '') {
      return false;
    }

    // the select value arrives as plain text: it must exist in the catalog
    if (!isCatalogExerciseName(exerciseCategory, exerciseName)) {
      return false;
    }

    const { exercise } = createRoutineEntry(data, {
      fromNinja: isApiExercise(exerciseCategory, exerciseName),
    });
    const dayComments = data.dayComments;

    setOfficialEntries((currentEntries) => {
      const existingDaySession = currentEntries.find(
        (session) => session.day === exerciseDay
      );

      // if the day session already exists, update its comments as well
      if (!existingDaySession) {
        const newDaySession: DayRoutineType = {
          id: generateDayRoutineId(),
          day: exerciseDay,
          exercises: [exercise],
          dayComments,
        };

        return [...currentEntries, newDaySession];
      }

      return currentEntries.map((session) =>
        session.day === exerciseDay
          ? {
              ...session,
              exercises: [...session.exercises, exercise],
              dayComments: dayComments || session.dayComments,
            }
          : session
      );
    });

    return true;
  };

  if (!activeMember) {
    return (
      <section>
        <h2>Create a member profile first</h2>
        <p>Select or create a member before building a weekly routine.</p>
        <NavLink to={ROUTES.USER_PROFILE}>Go to member profile</NavLink>
      </section>
    );
  }

  return (
    <>
      <h2 className="user-routine__title">Create Session</h2>
      <WeeklyRoutineNameForm
        routineName={routineName}
        onSubmit={handleRoutineNameSubmit}
      />

      <DailyRoutineForm onSubmit={handleEntrySubmit} />
      <ListedRoutines
        routines={officialEntries}
        onChangeStatus={updateExerciseStatus}
        onChangeDayComments={updateDayComments}
      />

      <div className="weekly-routine-resume__actions">
        <NavLink
          className="weekly-routine-resume__link"
          to={ROUTES.EXERCISES_RESUME}
        >
          Exercises Resume
        </NavLink>

        <NavLink
          className="weekly-routine-resume__link"
          to={ROUTES.WEEKLY_ROUTINE_RESUME}
        >
          Statistics Resume
        </NavLink>
      </div>
    </>
  );
}
