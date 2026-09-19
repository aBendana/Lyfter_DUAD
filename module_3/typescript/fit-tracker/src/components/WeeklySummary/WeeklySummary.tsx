import type { RoutineType } from '../../types/routineTypes';
import {
  exerciseCounter,
  minutesToHoursAndMinutes,
  caloriesBurned,
  routineTotalCalories,
  weeklyCaloriesAverage,
  longerDurationExercise,
  dayWithMostCaloriesBurned,
  percentageOfTotalCaloriesBurned,
} from '../../utils/calculations';

export function WeeklyRoutineSummary({
  routineEntries,
}: {
  routineEntries: RoutineType[];
}) {
  // calculate the exercise counts total and categories
  const exerciseCounts = exerciseCounter(routineEntries);

  // calculate the total calories burned for the weekly routine
  const totalCaloriesBurned = routineTotalCalories(routineEntries);

  // calculate the longest exercise duration and name for display
  const longestExercise = longerDurationExercise(routineEntries);
  const longestExerciseDay = longestExercise?.name ?? 'N/A';
  const longestExerciseDuration = longestExercise?.exercise.duration ?? 0;
  const longestExerciseName = longestExercise?.exercise.name ?? 'N/A';
  const longestExerciseHoursMinutes = minutesToHoursAndMinutes(
    longestExerciseDuration
  );

  // calculate the day with the most calories burned
  const dayWithMostCalories = dayWithMostCaloriesBurned(routineEntries);

  // calculate the average calories burned excluding days with no exercise
  const averageCaloriesBurned = weeklyCaloriesAverage(routineEntries);

  // calculate the day with the most calories burned details for display
  const dayWithMostCaloriesName = dayWithMostCalories?.name ?? 'N/A';
  const dayWithMostCaloriesExercise =
    dayWithMostCalories?.exercise.name ?? 'N/A';
  const dayWithMostCaloriesAmount = dayWithMostCalories
    ? caloriesBurned(
        dayWithMostCalories.exercise.caloriesPerMinute,
        dayWithMostCalories.exercise.duration
      )
    : 0;

  // calculate the percentage of total calories burned for the day with the most calories burned
  const percentageOfTotalCalories = dayWithMostCaloriesAmount
    ? percentageOfTotalCaloriesBurned(
        totalCaloriesBurned,
        dayWithMostCaloriesAmount
      )
    : 0;

  return (
    <section
      className="weekly-routine-resume__summary"
      aria-labelledby="summary-title"
    >
      <div className="weekly-routine-resume__section-heading">
        <h2 id="summary-title">Stats Summary</h2>
      </div>

      <dl>
        <div>
          <dt className="weekly-routine-resume__stat-label">
            Total Exercises in the Routine
          </dt>
          <dd>{exerciseCounts.total ?? 'N/A'} exercise(s) in total.</dd>
          <dd>{exerciseCounts.cardio ?? 0} cardio exercise(s) </dd>
          <dd>{exerciseCounts.strength ?? 0} strength exercise(s)</dd>
          <dd>{exerciseCounts.flexibility ?? 0} flexibility exercise(s)</dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">
            Total Calories Burned
          </dt>
          <dd>{longestExercise ? <>{totalCaloriesBurned} kcal</> : 'N/A'}</dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">
            Average Calories Burned
          </dt>
          <dd>
            {longestExercise ? (
              <>{averageCaloriesBurned} kcal per day</>
            ) : (
              'N/A'
            )}
          </dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">Longest session</dt>
          <dd>
            {longestExercise ? (
              <>
                {longestExerciseName} on {longestExerciseDay} lasting{' '}
                {longestExerciseHoursMinutes}
              </>
            ) : (
              'N/A'
            )}
          </dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">
            Day with most calories burned
          </dt>
          <dd>
            {dayWithMostCalories ? (
              <>
                {dayWithMostCaloriesExercise} on {dayWithMostCaloriesName}{' '}
                burning {dayWithMostCaloriesAmount} kcal
                <br />
                representing {percentageOfTotalCalories}% of total calories
                burned
              </>
            ) : (
              'N/A'
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
