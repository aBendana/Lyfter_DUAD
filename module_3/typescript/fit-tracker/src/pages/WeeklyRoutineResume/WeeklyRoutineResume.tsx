import { useWeeklyRoutine } from '../../context/WeeklyRoutineContext';
import { useUserProfile } from '../../context/UserProfileContext';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import {
  minutesToHoursAndMinutes,
  caloriesBurned,
  exercisePace,
  weeklyRoutineTotalCalories,
  weeklyCaloriesAverage,
  longerDurationExercise,
  dayWithMostCaloriesBurned,
  percentageOfTotalCaloriesBurned,
} from '../../utils/calculations';
import './WeeklyRoutineResume.css';

export function WeeklyRoutineResume() {
  // state and context hooks
  const { routineEntries, routineName } = useWeeklyRoutine();
  const { userProfile } = useUserProfile();

  // calculate the total calories burned for the weekly routine
  const totalCaloriesBurned = weeklyRoutineTotalCalories({
    name: routineName,
    entries: routineEntries,
  });

  // calculate the longest exercise duration and name for display
  const longestExercise = longerDurationExercise(routineEntries);
  const longestExerciseDay = longestExercise?.name ?? 'N/A';
  const longestExerciseDuration = longestExercise?.exercise.duration ?? 0;
  const longestExerciseName = longestExercise?.exercise.name ?? 'N/A';
  const longestExerciseHoursMinutes = minutesToHoursAndMinutes(
    longestExerciseDuration
  );

  // calculate the day with the most calories burned
  const dayWithMostCalories = dayWithMostCaloriesBurned({
    name: routineName,
    entries: routineEntries,
  });

  // calculate the average calories burned excluding days with no exercise
  const averageCaloriesBurned = weeklyCaloriesAverage({
    name: routineName,
    entries: routineEntries,
  });

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
    <main className="weekly-routine-resume">
      <header className="weekly-routine-resume__header">
        <p className="weekly-routine-resume__eyebrow">Progress overview</p>
        <h1>{routineName || 'No routine name specified'}</h1>
      </header>

      <section
        className="weekly-routine-resume__profile"
        aria-labelledby="profile-title"
      >
        <h2 id="profile-title">Profile</h2>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>{userProfile.fullName || 'Not specified'}</dd>
          </div>
          <div>
            <dt>Age</dt>
            <dd>{userProfile.age || 'Not specified'}</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>{userProfile.experienceLevel}</dd>
          </div>
          <div>
            <dt>Exercises</dt>
            <dd>{routineEntries.length}</dd>
          </div>
        </dl>
      </section>

      <section
        className="weekly-routine-resume__exercises"
        aria-labelledby="exercises-title"
      >
        <div className="weekly-routine-resume__section-heading">
          <h2 id="exercises-title">Exercises</h2>
        </div>

        {routineEntries.length === 0 ? (
          <p className="weekly-routine-resume__empty">
            No exercises have been added yet.
          </p>
        ) : (
          <div className="weekly-routine-resume__entries">
            {routineEntries.map((entry, index) => (
              <article
                className="weekly-routine-resume__entry"
                key={`${entry.name}-${entry.exercise.name}-${index}`}
              >
                <div>
                  <p className="weekly-routine-resume__day">{entry.name}</p>
                  <h3>{entry.exercise.name}</h3>
                </div>
                <dl>
                  <div>
                    <dt>Duration</dt>
                    <dd>{minutesToHoursAndMinutes(entry.exercise.duration)}</dd>
                  </div>

                  <div>
                    <dt>Calories</dt>
                    <dd>
                      {entry.exercise.duration === 0
                        ? 0
                        : caloriesBurned(
                            entry.exercise.caloriesPerMinute,
                            entry.exercise.duration
                          )}{' '}
                      kcal
                    </dd>
                  </div>

                  {'distance' in entry.exercise && (
                    <div>
                      <dt>Distance</dt>
                      <dd>{entry.exercise.distance} km</dd>
                    </div>
                  )}

                  {'distance' in entry.exercise && (
                    <div>
                      <dt>Pace</dt>
                      <dd>
                        {exercisePace(
                          entry.exercise.duration,
                          entry.exercise.distance
                        )}{' '}
                        min/km
                      </dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>

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
            <dt className="weekly-routine-resume__stat-label">
              Longest session
            </dt>
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

      <div className="weekly-routine-resume__actions">
        <NavLink
          className="weekly-routine-resume__link"
          to={ROUTES.EXCERCISE_ROUTINE}
        >
          Add another exercise
        </NavLink>

        <NavLink
          className="weekly-routine-resume__link"
          to={ROUTES.USER_PROFILE}
        >
          Modify Profile
        </NavLink>
      </div>
    </main>
  );
}
