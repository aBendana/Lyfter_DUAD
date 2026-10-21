import type {
  CaloriesBurned,
  CategoryTimes,
  DayWithMostCaloriesBurned,
  ExerciseCounter,
  ExerciseCounts,
  ExercisePace,
  IncompleteExercisesList,
  LongerDurationSession,
  MinutesToHoursAndMinutes,
  PercentageOfTotalCaloriesBurned,
  RoutineTotalCalories,
  TotalIncompleteExercises,
  TotalTime,
  TotalTimeByCategory,
  TotalTrainingSessions,
  WeeklyCaloriesAverage,
} from '../types/calculationTypes';

// pass minutes to hours and minutes
export const minutesToHoursAndMinutes: MinutesToHoursAndMinutes = (minutes) => {
  if (!Number.isInteger(minutes) || minutes < 0) {
    throw new RangeError('Minutes must be a non-negative integer');
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
};

// calories burned
export const caloriesBurned: CaloriesBurned = (caloricRate, duration) => {
  if (!Number.isFinite(caloricRate) || caloricRate < 1) {
    throw new RangeError('Caloric rate must be a finite number of at least 1');
  }

  if (!Number.isSafeInteger(duration) || duration <= 0) {
    throw new RangeError('Duration must be a positive safe integer');
  }

  const totalCalories = caloricRate * duration;

  if (!Number.isFinite(totalCalories)) {
    throw new RangeError('Calculated calories must be finite');
  }

  return parseFloat(totalCalories.toFixed(2));
};

// pace for distance-based exercises
export const exercisePace: ExercisePace = (minutes, distance) => {
  if (!Number.isSafeInteger(minutes) || minutes <= 0) {
    throw new RangeError('Minutes must be a positive safe integer');
  }

  if (!Number.isFinite(distance) || distance <= 0) {
    throw new RangeError('Distance must be a finite positive number');
  }

  const pace = minutes / distance;

  if (!Number.isFinite(pace)) {
    throw new RangeError('Calculated pace must be finite');
  }

  return parseFloat(pace.toFixed(2));
};

// weekly routine total burned calories
// or for any other array of routine entries
export const routineTotalCalories: RoutineTotalCalories = (entries) => {
  const totalCalories = entries.reduce(
    (total, session) =>
      total +
      session.exercises.reduce(
        (sessionTotal, exercise) => sessionTotal + exercise.caloriesBurned,
        0
      ),
    0
  );

  return Number(totalCalories.toFixed(2));
};

// weekly calories average, not including days with no exercise
export const weeklyCaloriesAverage: WeeklyCaloriesAverage = (entries) => {
  const daysWithExercise = entries.filter((session) =>
    session.exercises.some((exercise) => exercise.duration > 0)
  );

  // guard to return a no exercise week
  if (daysWithExercise.length === 0) {
    return 0;
  }

  const totalCalories = routineTotalCalories(daysWithExercise);

  return parseFloat((totalCalories / daysWithExercise.length).toFixed(2));
};

// day with the most calories burned
export const dayWithMostCaloriesBurned: DayWithMostCaloriesBurned = (entries) => {
  if (entries.length === 0) {
    return null;
  }

  return entries.reduce((maxSession, currentSession) =>
    routineTotalCalories([currentSession]) > routineTotalCalories([maxSession])
      ? currentSession
      : maxSession
  );
};

// percentage of total calories burned for day with the most calories burned
export const percentageOfTotalCaloriesBurned: PercentageOfTotalCaloriesBurned = (totalCaloriesBurned, dayMostCalories) => {
  if (!Number.isFinite(totalCaloriesBurned) || totalCaloriesBurned <= 0) {
    throw new RangeError('Total calories burned must be finite and positive');
  }

  if (!Number.isFinite(dayMostCalories) || dayMostCalories < 0) {
    throw new RangeError('Day calories must be finite and non-negative');
  }

  if (dayMostCalories > totalCaloriesBurned) {
    throw new RangeError('Day calories cannot exceed total calories burned');
  }

  const percentage = (dayMostCalories / totalCaloriesBurned) * 100;
  return Number(percentage.toFixed(2));
};

// total time for an array of routine entries
export const totalTime: TotalTime = (entries) => {
  return entries.reduce(
    (total, session) =>
      total +
      session.exercises.reduce(
        (sessionTotal, exercise) => sessionTotal + exercise.duration,
        0
      ),
    0
  );
};

// longest training session by combined exercise duration
export const longerDurationSession: LongerDurationSession = (entries) => {
  const sessionsWithExercise = entries.filter((session) =>
    session.exercises.some((exercise) => exercise.duration > 0)
  );

  if (sessionsWithExercise.length === 0) {
    return null;
  }

  return sessionsWithExercise.reduce((longestSession, currentSession) =>
    totalTime([currentSession]) > totalTime([longestSession])
      ? currentSession
      : longestSession
  );
};

// exercise total exercises counter
// + total exercises per category
export const exerciseCounter: ExerciseCounter = (entries) => {
  const counts: ExerciseCounts = {
    total: 0,
    cardio: 0,
    strength: 0,
    flexibility: 0,
  };

  for (const session of entries) {
    for (const exercise of session.exercises) {
      counts.total++;
      switch (exercise.exerciseCategory) {
        case 'Cardio':
          counts.cardio++;
          break;
        case 'Strength':
          counts.strength++;
          break;
        case 'Flexibility':
          counts.flexibility++;
          break;
      }
    }
  }

  return counts;
};

// count total time for exercise category
export const totalTimeByCategory: TotalTimeByCategory = (entries) => {
  const times: CategoryTimes = {
    cardioTime: 0,
    strengthTime: 0,
    flexibilityTime: 0,
  };

  for (const session of entries) {
    for (const exercise of session.exercises) {
      switch (exercise.exerciseCategory) {
        case 'Cardio':
          times.cardioTime += exercise.duration;
          break;
        case 'Strength':
          times.strengthTime += exercise.duration;
          break;
        case 'Flexibility':
          times.flexibilityTime += exercise.duration;
          break;
      }
    }
  }

  return times;
};

// count total of training sessions (trained days)
export const totalTrainingSessions: TotalTrainingSessions = (entries) => {
  return entries.filter((session) =>
    session.exercises.some((exercise) => exercise.duration > 0)
  ).length;
};

// list incomplete exercises with the day they belong to
export const incompleteExercisesList: IncompleteExercisesList = (entries) => {
  return entries.flatMap((session) =>
    session.exercises
      .filter((exercise) => !exercise.completed)
      .map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        day: session.day,
      }))
  );
};

// count incomplete exercises (exercises marked as incomplete)
export const totalIncompleteExercises: TotalIncompleteExercises = (entries) => {
  let count = 0;
  for (const session of entries) {
    for (const exercise of session.exercises) {
      if (!exercise.completed) {
        count++;
      }
    }
  }
  return count;
};
