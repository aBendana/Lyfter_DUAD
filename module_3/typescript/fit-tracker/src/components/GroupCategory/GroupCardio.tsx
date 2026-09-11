import { useWeeklyRoutine } from '../../context/WeeklyRoutineContext';
import {
  minutesToHoursAndMinutes,
  totalTime,
  routineTotalCalories,
} from '../../utils/calculations';

export function GroupCardioExercisesResume() {
  const { routineEntries } = useWeeklyRoutine();

  // defining the cardio entries
  const cardioEntries = routineEntries.filter(
    (entry) => entry.exercise.exerciseCategory === 'Cardio'
  );
  console.log(cardioEntries);

  return (
    <section
      className="weekly-routine-resume__exercises"
      aria-labelledby="exercises-title"
    >
      <div className="weekly-routine-resume__section-heading">
        <h2 id="exercises-title">Cardio Exercises</h2>
        <p className="weekly-routine-resume__section-description">
          {cardioEntries.length} cardio exercises totaling{' '}
          {minutesToHoursAndMinutes(totalTime(cardioEntries))} and burning{' '}
          {routineTotalCalories(cardioEntries)} kcal.
        </p>
      </div>

      {cardioEntries.length === 0 ? (
        <p className="weekly-routine-resume__empty">
          No cardio exercises have been added yet.
        </p>
      ) : (
        <div className="weekly-routine-resume__entries">
          {cardioEntries.map((entry, index) => (
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

                {entry.exercise.exerciseCategory === 'Cardio' && (
                  <>
                    <div>
                      <dt>Distance</dt>
                      <dd>{entry.exercise.distance} km</dd>
                    </div>

                    <div>
                      <dt>Pace</dt>
                      <dd>{entry.exercise.pace} min/km</dd>
                    </div>

                    <div>
                      <dt>Heart Rate Z</dt>
                      <dd>Zone {entry.exercise.heartRateZone}</dd>
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
