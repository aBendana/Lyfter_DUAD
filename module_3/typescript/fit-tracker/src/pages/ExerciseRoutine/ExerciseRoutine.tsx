import { DailyRoutineForm } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import type { DailyRoutineFormType } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import { WeeklyRoutineNameForm } from '../../components/Forms/WeeklyRoutineNameForm/WeeklyRoutineNameForm';
import { createRoutineEntry } from '../../utils/createRoutineEntry';
import type { RoutineType } from '../../types/routineTypes';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import { generateRoutineId } from '../../utils/generateIds';
import './ExerciseRoutine.css';

export function ExerciseRoutine() {
  const { routineName, setRoutineName, setRoutineEntries } = useWeeklyRoutine();

  const handleRoutineNameSubmit = (name: string): void => {
    setRoutineName(name);
  };

  const handleSubmit = (data: DailyRoutineFormType): void => {
    if (data.exerciseDay === '' || data.exerciseName === '') {
      return;
    }

    // create the appropriate ExerciseType object using the utility function
    const { exercise } = createRoutineEntry(data);

    const routineEntry: RoutineType = {
      id: generateRoutineId(),
      name: data.exerciseDay,
      exercise,
    };

    setRoutineEntries((currentEntries) => [...currentEntries, routineEntry]);
  };

  return (
    <main className="exercise-routine">
      <h1 className="exercise-routine__title">Exercise Routine</h1>

      <WeeklyRoutineNameForm
        routineName={routineName}
        onSubmit={handleRoutineNameSubmit}
      />

      <DailyRoutineForm onSubmit={handleSubmit} />

      <div className="exercise-routine__actions">
        <NavLink to={ROUTES.USER_PROFILE}>Modify Profile</NavLink>

        <NavLink to={ROUTES.WEEKLY_ROUTINE_RESUME}>
          Weekly Routine Stats
        </NavLink>
      </div>
    </main>
  );
}
