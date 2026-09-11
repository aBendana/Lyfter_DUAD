import { DailyRoutineForm } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import type { DailyRoutineFormType } from '../../components/Forms/DailyRoutineForm/DailyRoutineForm';
import { WeeklyRoutineNameForm } from '../../components/Forms/WeeklyRoutineNameForm/WeeklyRoutineNameForm';
import type {
  ExerciseType,
  ExerciseCardioNameType,
  ExerciseStrengthNameType,
  ExerciseFlexibilityNameType,
} from '../../types/exerciseTypes';
import type { RoutineType } from '../../types/routineTypes';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useWeeklyRoutine } from '../../context/WeeklyRoutineContext';
import { generateExerciseId, generateRoutineId } from '../../utils/generateIds';
import { caloriesBurned, exercisePace } from '../../utils/calculations';
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

    // create the appropriate ExerciseType object
    let exercise: ExerciseType;
    if (data.exerciseCategory === 'Cardio') {
      exercise = {
        id: generateExerciseId(),
        exerciseCategory: 'Cardio',
        name: data.exerciseName as ExerciseCardioNameType,
        caloriesPerMinute: data.caloriesPerMinute,
        duration: data.duration,
        caloriesBurned: caloriesBurned(data.caloriesPerMinute, data.duration),
        distance: data.distance ?? 0,
        pace: exercisePace(data.duration, data.distance ?? 0),
        heartRateZone: data.heartRateZone ?? 0,
      };
      console.log('Created cardio exercise:', exercise);
    } else if (data.exerciseCategory === 'Strength') {
      exercise = {
        id: generateExerciseId(),
        exerciseCategory: 'Strength',
        name: data.exerciseName as ExerciseStrengthNameType,
        caloriesPerMinute: data.caloriesPerMinute,
        duration: data.duration,
        caloriesBurned: caloriesBurned(data.caloriesPerMinute, data.duration),
        sets: data.sets ?? 0,
        repetitions: data.repetitions ?? 0,
        weight: data.weight ?? 0,
      };
    } else if (data.exerciseCategory === 'Flexibility') {
      exercise = {
        id: generateExerciseId(),
        exerciseCategory: 'Flexibility',
        name: data.exerciseName as ExerciseFlexibilityNameType,
        caloriesPerMinute: data.caloriesPerMinute,
        duration: data.duration,
        caloriesBurned: caloriesBurned(data.caloriesPerMinute, data.duration),
        positions: data.positions ?? 0,
      };
    } else {
      return;
    }

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
