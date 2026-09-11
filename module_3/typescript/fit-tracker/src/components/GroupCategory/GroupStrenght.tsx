import { useWeeklyRoutine } from '../../context/WeeklyRoutineContext';
import {
  minutesToHoursAndMinutes,
  totalTime,
  routineTotalCalories,
} from '../../utils/calculations';

export function GroupStrengthExercisesResume() {
  const { routineEntries } = useWeeklyRoutine();

  // defining the strength entries
  const strengthEntries = routineEntries.filter(
    (entry) => entry.exercise.exerciseCategory === 'Strength'
  );
  console.log(strengthEntries);

  return (
    <section
      className="weekly-routine-resume__exercises"
      aria-labelledby="exercises-title"
    >
      <div className="weekly-routine-resume__section-heading">
        <h2 id="exercises-title">Strength Exercises</h2>
        <p className="weekly-routine-resume__section-description">
          {strengthEntries.length} strength exercises totaling{' '}
          {minutesToHoursAndMinutes(totalTime(strengthEntries))} and burning{' '}
          {routineTotalCalories(strengthEntries)} kcal.
        </p>
      </div>

      {strengthEntries.length === 0 ? (
        <p className="weekly-routine-resume__empty">
          No strength exercises have been added yet.
        </p>
      ) : (
        <div className="weekly-routine-resume__entries">
          {strengthEntries.map((entry, index) => (
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

                {entry.exercise.exerciseCategory === 'Strength' && (
                  <>
                    <div>
                      <dt>Sets</dt>
                      <dd>{entry.exercise.sets}</dd>
                    </div>

                    <div>
                      <dt>Reps</dt>
                      <dd>{entry.exercise.repetitions}</dd>
                    </div>

                    <div>
                      <dt>Weight</dt>
                      <dd>{entry.exercise.weight} kg</dd>
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
