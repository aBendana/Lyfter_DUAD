import type { ExerciseCategoryType } from '../../types/exerciseTypes';
import type { DayRoutineType } from '../../types/routineTypes';
import { minutesToHoursAndMinutes } from '../../utils/calculations';
import { generateExerciseDescription } from '../../utils/generateDescriptions';

export function GroupExercises({
  routineEntries,
  category,
}: {
  routineEntries: DayRoutineType[];
  category: ExerciseCategoryType;
}) {
  return (
    <div className="weekly-routine-resume__entries">
      {routineEntries.flatMap((session) =>
        session.exercises
          .filter((exercise) => exercise.exerciseCategory === category)
          .map((exercise) => (
            <article
              className="weekly-routine-resume__entry"
              key={`${session.id}-${exercise.id}`}
            >
              <div>
                <p className="weekly-routine-resume__day">{session.day}</p>
                <h3>{exercise.name}</h3>
              </div>

              <dl>
                <div>
                  <dt>Duration</dt>
                  <dd>{minutesToHoursAndMinutes(exercise.duration)}</dd>
                </div>

                <div>
                  <dt>Calories</dt>
                  <dd>{exercise.caloriesBurned} kcal</dd>
                </div>

                {exercise.exerciseCategory === 'Cardio' && (
                  <>
                    <div>
                      <dt>Distance</dt>
                      <dd>{exercise.distance} km</dd>
                    </div>

                    <div>
                      <dt>Pace</dt>
                      <dd>{exercise.pace} min/km</dd>
                    </div>

                    <div>
                      <dt>Heart Rate Z</dt>
                      <dd>
                        {exercise.heartRateZone
                          ? `Zone ${exercise.heartRateZone}`
                          : 'N/A'}
                      </dd>
                    </div>
                  </>
                )}

                {exercise.exerciseCategory === 'Strength' && (
                  <>
                    <div>
                      <dt>Sets</dt>
                      <dd>{exercise.sets}</dd>
                    </div>

                    <div>
                      <dt>Reps</dt>
                      <dd>{exercise.repetitions}</dd>
                    </div>

                    <div>
                      <dt>Weight</dt>
                      <dd>
                        {exercise.weight ? `${exercise.weight} kg` : 'N/A'}
                      </dd>
                    </div>
                  </>
                )}

                {exercise.exerciseCategory === 'Flexibility' && (
                  <div>
                    <dt>Positions</dt>
                    <dd>{exercise.positions}</dd>
                  </div>
                )}
              </dl>

              <div>
                <p className="weekly-routine-resume__section-description">
                  {generateExerciseDescription(exercise)}
                </p>

                {exercise.exerciseCategory === 'Flexibility' && (
                  <p className="weekly-routine-resume__section-description">
                    Comments: {exercise.flexibilityComments || 'N/A'}
                  </p>
                )}
              </div>
            </article>
          ))
      )}
    </div>
  );
}
