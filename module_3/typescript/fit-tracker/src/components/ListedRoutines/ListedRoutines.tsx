import type { DayOfWeekType, DayRoutineType } from '../../types/routineTypes';
import './ListedRoutines.css';

const daysOfWeek: DayOfWeekType[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function ListedRoutines({ routines }: { routines: DayRoutineType[] }) {
  return (
    <div>
      {daysOfWeek.map((day) => {
        const routine = routines.find((entry) => entry.day === day);

        return (
          <div key={day} className="routine-row">
            <h3>{day} exercises:</h3>
            {routine ? (
              <div className="routine-row__details">
                {routine.exercises.map((exercise) => (
                  <article key={exercise.id} className="routine-row__item">
                    <h4>{exercise.name}</h4>
                    <dl>
                      <div>
                        <dt>Category</dt>
                        <dd>{exercise.exerciseCategory}</dd>
                      </div>
                      <div>
                        <dt>Duration</dt>
                        <dd>{exercise.duration} min</dd>
                      </div>
                      <div>
                        <dt>Calories per minute</dt>
                        <dd>{exercise.caloriesPerMinute} kcal</dd>
                      </div>
                      <div>
                        <dt>Calories burned</dt>
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
                            <dt>Heart rate zone</dt>
                            <dd>{exercise.heartRateZone ?? 'N/A'}</dd>
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
                            <dt>Repetitions</dt>
                            <dd>{exercise.repetitions}</dd>
                          </div>
                          <div>
                            <dt>Weight</dt>
                            <dd>
                              {exercise.weight != null
                                ? `${exercise.weight} kg`
                                : 'N/A'}
                            </dd>
                          </div>
                        </>
                      )}

                      {exercise.exerciseCategory === 'Flexibility' && (
                        <>
                          <div>
                            <dt>Positions</dt>
                            <dd>{exercise.positions}</dd>
                          </div>
                          <div>
                            <dt>Comments</dt>
                            <dd>{exercise.flexibilityComments || 'N/A'}</dd>
                          </div>
                        </>
                      )}

                      <div>
                        <dt>Status</dt>
                        <dd>
                          {exercise.completed ? 'Completed' : 'Incomplete'}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}

                <div className="routine-row__comments">
                  <p>Day Comments:</p>
                  <p> {routine.dayComments || 'N/A'}</p>
                </div>
              </div>
            ) : (
              <span className="routine-row__item">Rest day</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
