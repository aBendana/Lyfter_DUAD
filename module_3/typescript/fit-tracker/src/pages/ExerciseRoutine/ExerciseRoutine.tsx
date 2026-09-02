import { DailyRoutineForm } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import type { DailyRoutineFormType } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import { WeeklyRoutineNameForm } from '../../components/Forms/WeeklyRoutineNameForm/WeeklyRoutineNameForm';
import { distanceNameExercises } from '../../types/exerciseCatalog';
import type {
  DistanceSportType,
  ExerciseType,
  NonDistanceSportType,
} from '../../types/exerciseTypes';
import type { RoutineType } from '../../types/routineTypes';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useWeeklyRoutine } from '../../context/WeeklyRoutineContext';
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

    // determine if the exercise is distance-based or not
    // and create the appropriate ExerciseType object
    const exercise: ExerciseType = distanceNameExercises.includes(
      data.exerciseName as DistanceSportType
    )
      ? {
          name: data.exerciseName as DistanceSportType,
          duration: data.duration,
          caloriesPerMinute: data.caloriesPerMinute,
          distance: data.distance ?? 0,
        }
      : {
          name: data.exerciseName as NonDistanceSportType,
          duration: data.duration,
          caloriesPerMinute: data.caloriesPerMinute,
        };

    const routineEntry: RoutineType = {
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
