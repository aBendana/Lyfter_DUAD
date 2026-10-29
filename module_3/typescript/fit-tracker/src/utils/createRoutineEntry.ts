import type { DailyRoutineFormType } from '../components/Forms/DailyRoutineForm/DailyRoutineForm';
import type { ExerciseType } from '../types/exerciseTypes';
import { generateExerciseId } from '../utils/generateIds';
import { caloriesBurned, exercisePace } from '../utils/calculations';

function requirePositiveSafeInteger(
  value: number | undefined,
  field: string
): number {
  if (value === undefined || !Number.isSafeInteger(value) || value <= 0) {
    throw new RangeError(`${field} must be a positive safe integer`);
  }

  return value;
}

export function createRoutineEntry(
  data: DailyRoutineFormType,
  options: { fromNinja?: boolean } = {}
): {
  exercise: ExerciseType;
} {
  // create the appropriate ExerciseType object
  const commonData = {
    ...(options.fromNinja ? { source: 'ninja' as const } : {}),
    id: generateExerciseId(),
    caloriesPerMinute: data.caloriesPerMinute,
    duration: data.duration,
    caloriesBurned: caloriesBurned(data.caloriesPerMinute, data.duration),
    status: data.status,
  };

  let exercise: ExerciseType;
  const name = data.exerciseName.trim();
  if (!name) {
    throw new Error('Exercise name is required');
  }

  if (data.exerciseCategory === 'Cardio') {
    if (data.distance === undefined) {
      throw new RangeError('Distance is required for Cardio exercises');
    }

    const heartRateZone = Number.isNaN(data.heartRateZone)
      ? undefined
      : data.heartRateZone;
    if (
      heartRateZone !== undefined &&
      (!Number.isSafeInteger(heartRateZone) || heartRateZone < 1 || heartRateZone > 5)
    ) {
      throw new RangeError('Heart rate zone must be an integer from 1 to 5');
    }

    exercise = {
      ...commonData,
      exerciseCategory: 'Cardio',
      name,
      distance: data.distance,
      pace: exercisePace(data.duration, data.distance),
      ...(heartRateZone !== undefined ? { heartRateZone } : {}),
    };
  } else if (data.exerciseCategory === 'Strength') {
    const sets = requirePositiveSafeInteger(data.sets, 'Sets');
    const repetitions = requirePositiveSafeInteger(
      data.repetitions,
      'Repetitions'
    );
    const weight = Number.isNaN(data.weight) ? undefined : data.weight;
    if (
      weight !== undefined &&
      (!Number.isSafeInteger(weight) || weight <= 0)
    ) {
      throw new RangeError('Weight must be a positive safe integer');
    }

    exercise = {
      ...commonData,
      exerciseCategory: 'Strength',
      name,
      sets,
      repetitions,
      ...(weight !== undefined ? { weight } : {}),
    };
  } else if (data.exerciseCategory === 'Flexibility') {
    const positions = requirePositiveSafeInteger(data.positions, 'Positions');

    exercise = {
      ...commonData,
      exerciseCategory: 'Flexibility',
      name,
      positions,
      flexibilityComments: data.flexibilityComments,
    };
  } else {
    console.error('Invalid exercise category:', data.exerciseCategory);
    throw new Error('Invalid exercise category');
  }

  return { exercise };
}
