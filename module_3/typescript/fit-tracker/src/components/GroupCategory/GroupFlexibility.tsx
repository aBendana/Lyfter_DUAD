import { useWeeklyRoutine } from '../../context/WeeklyRoutineContext';
import {
  minutesToHoursAndMinutes,
  totalTime,
  routineTotalCalories,
} from '../../utils/calculations';

export function GroupFlexibilityExercisesResume() {
  const { routineEntries } = useWeeklyRoutine();

  // defining the flexibility entries
  const flexibilityEntries = routineEntries.filter(
    (entry) => entry.exercise.exerciseCategory === 'Flexibility'
  );
  console.log(flexibilityEntries);

  return (
    <section
      className="weekly-routine-resume__exercises"
      aria-labelledby="exercises-title"
    >
      <div className="weekly-routine-resume__section-heading">
        <h2 id="exercises-title">Flexibility Exercises</h2>
        <p className="weekly-routine-resume__section-description">
          {flexibilityEntries.length} flexibility exercises totaling{' '}
          {minutesToHoursAndMinutes(totalTime(flexibilityEntries))} and burning{' '}
          {routineTotalCalories(flexibilityEntries)} kcal.
        </p>
      </div>

      {flexibilityEntries.length === 0 ? (
        <p className="weekly-routine-resume__empty">
          No flexibility exercises have been added yet.
        </p>
      ) : (
        <div className="weekly-routine-resume__entries">
          {flexibilityEntries.map((entry, index) => (
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
                  <dd>{entry.exercise.caloriesBurned} kcal</dd>
                </div>

                {entry.exercise.exerciseCategory === 'Flexibility' && (
                  <>
                    <div>
                      <dt>Positions</dt>
                      <dd>{entry.exercise.positions}</dd>
                    </div>
                  </>
                )}
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
