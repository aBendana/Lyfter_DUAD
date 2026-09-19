import type { RoutineType } from '../../types/routineTypes';
import { minutesToHoursAndMinutes } from '../../utils/calculations';
import { generateExerciseDescription } from '../../utils/generateDescriptions';

export function GroupExercises({
  routineEntries,
}: {
  routineEntries: RoutineType[];
}) {
  return (
    <div className="weekly-routine-resume__entries">
      {routineEntries.map((entry) => (
        <article className="weekly-routine-resume__entry" key={entry.id}>
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

            {entry.exercise.exerciseCategory === 'Flexibility' && (
              <>
                <div>
                  <dt>Positions</dt>
                  <dd>{entry.exercise.positions}</dd>
                </div>
              </>
            )}
          </dl>

          <div>
            <p className="weekly-routine-resume__section-description">
              {generateExerciseDescription(entry.exercise)}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
