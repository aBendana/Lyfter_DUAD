import type { DayRoutineType } from '../../types/routineTypes';
import {
  exerciseCounter,
  minutesToHoursAndMinutes,
  routineTotalCalories,
  weeklyCaloriesAverage,
  longerDurationSession,
  dayWithMostCaloriesBurned,
  percentageOfTotalCaloriesBurned,
  totalTime,
  totalTimeByCategory,
} from '../../utils/calculations';

export function WeeklyRoutineSummary({
  routineEntries,
}: {
  routineEntries: DayRoutineType[];
}) {
  // calculate the exercise counts total and categories
  const exerciseCounts = exerciseCounter(routineEntries);

  // calculate total time by exercise category
  const timeByCategory = totalTimeByCategory(routineEntries);

  // calculate total time of the weekly routine
  const totalRoutineTime = totalTime(routineEntries);

  // calculate the total calories burned for the weekly routine
  const totalCaloriesBurned = routineTotalCalories(routineEntries);

  // calculate the longest session by combined exercise duration
  const longestSession = longerDurationSession(routineEntries);
  const longestSessionDuration = longestSession
    ? totalTime([longestSession])
    : 0;
  const longestSessionHoursMinutes = minutesToHoursAndMinutes(
    longestSessionDuration
  );

  // calculate the session with the most calories burned
  const dayWithMostCalories = dayWithMostCaloriesBurned(routineEntries);

  // calculate the average calories burned excluding days with no exercise
  const averageCaloriesBurned = weeklyCaloriesAverage(routineEntries);

  // calculate the highest-calorie session details for display
  const dayWithMostCaloriesExercise = dayWithMostCalories
    ? dayWithMostCalories.exercises.map((exercise) => exercise.name).join(', ')
    : 'N/A';
  const dayWithMostCaloriesAmount = dayWithMostCalories
    ? routineTotalCalories([dayWithMostCalories])
    : 0;

  // calculate the percentage of total calories burned in the highest-calorie session
  const percentageOfTotalCalories =
    totalCaloriesBurned > 0
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
            Exercises and Time by Category
          </dt>
          <dd>{exerciseCounts.total ?? 'N/A'} exercise(s) in total.</dd> with a
          total time of {totalRoutineTime} min.
          <dd>{exerciseCounts.cardio ?? 0} cardio exercise(s) </dd> with a total
          time of {timeByCategory.cardioTime} min.
          <dd>{exerciseCounts.strength ?? 0} strength exercise(s) </dd> with a
          total time of {timeByCategory.strengthTime} min.
          <dd>
            {exerciseCounts.flexibility ?? 0} flexibility exercise(s)
          </dd>{' '}
          with a total time of {timeByCategory.flexibilityTime} min.
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">
            Total Weekly Routine Time
          </dt>
          <dd>
            {exerciseCounts.total > 0 ? (
              <>
                {minutesToHoursAndMinutes(totalRoutineTime)} total (
                {totalRoutineTime} min)
              </>
            ) : (
              'N/A'
            )}
          </dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">
            Total Calories Burned
          </dt>
          <dd>
            {exerciseCounts.total > 0 ? <>{totalCaloriesBurned} kcal</> : 'N/A'}
          </dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">
            Average Calories Burned
          </dt>
          <dd>
            {exerciseCounts.total > 0 ? (
              <>{averageCaloriesBurned} kcal per day</>
            ) : (
              'N/A'
            )}
          </dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">Longest session</dt>
          <dd>
            {longestSession ? (
              <>
                {longestSession.day} lasting {longestSessionHoursMinutes} (
                {longestSessionDuration} min)
              </>
            ) : (
              'N/A'
            )}
          </dd>
        </div>

        <div>
          <dt className="weekly-routine-resume__stat-label">
            Session with most calories burned
          </dt>
          <dd>
            {dayWithMostCalories ? (
              <>
                {dayWithMostCalories.day} ({dayWithMostCaloriesExercise})
                burning {dayWithMostCaloriesAmount} kcal
                <br />
                representing {percentageOfTotalCalories}% of total calories
                burned during the week.
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
