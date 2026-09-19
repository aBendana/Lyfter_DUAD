import type { DailyRoutineFormType } from '../components/Forms/DailyRoutineForm/DailyRoutineForm';
import type {
  ExerciseType,
  ExerciseCardioNameType,
  ExerciseStrengthNameType,
  ExerciseFlexibilityNameType,
} from '../types/exerciseTypes';
import { generateExerciseId } from '../utils/generateIds';
import { caloriesBurned, exercisePace } from '../utils/calculations';

export function createRoutineEntry(data: DailyRoutineFormType): {
  exercise: ExerciseType;
} {
  // create the appropriate ExerciseType object
  const commonData = {
    id: generateExerciseId(),
    caloriesPerMinute: data.caloriesPerMinute,
    duration: data.duration,
    caloriesBurned: caloriesBurned(data.caloriesPerMinute, data.duration),
  };

  let exercise: ExerciseType;

  if (data.exerciseCategory === 'Cardio') {
    exercise = {
      ...commonData,
      exerciseCategory: 'Cardio',
      name: data.exerciseName as ExerciseCardioNameType,
      distance: data.distance ?? 0,
      pace: exercisePace(data.duration, data.distance ?? 0),
      heartRateZone: data.heartRateZone ?? 0,
    };
  } else if (data.exerciseCategory === 'Strength') {
    exercise = {
      ...commonData,
      exerciseCategory: 'Strength',
      name: data.exerciseName as ExerciseStrengthNameType,
      sets: data.sets ?? 0,
      repetitions: data.repetitions ?? 0,
      weight: data.weight ?? 0,
    };
  } else if (data.exerciseCategory === 'Flexibility') {
    exercise = {
      ...commonData,
      exerciseCategory: 'Flexibility',
      name: data.exerciseName as ExerciseFlexibilityNameType,
      positions: data.positions ?? 0,
    };
  } else {
    console.error('Invalid exercise category:', data.exerciseCategory);
    throw new Error('Invalid exercise category');
  }

  return { exercise };
}
