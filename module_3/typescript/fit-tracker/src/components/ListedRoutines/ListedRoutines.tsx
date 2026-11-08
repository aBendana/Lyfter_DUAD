import type { DayOfWeekType, DayRoutineType } from '../../types/routineTypes';
import type { DayRoutineId, ExerciseId } from '../../types/idsTypes';
import { workoutStatuses } from '../../types/exerciseCatalog';
import { isWorkoutStatus } from '../../utils/typeGuards';
import { formatExerciseName } from '../../utils/formatExerciseName';
import type { WorkoutStatusType } from '../../types/exerciseTypes';
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

interface ListedRoutinesProps {
  routines: DayRoutineType[];
  onChangeStatus: (
    dayRoutineId: DayRoutineId,
    exerciseId: ExerciseId,
    status: WorkoutStatusType
  ) => void;
  onChangeDayComments: (
    dayRoutineId: DayRoutineId,
    dayComments: string
  ) => void;
}

export function ListedRoutines({
  routines,
  onChangeStatus,
  onChangeDayComments,
}: ListedRoutinesProps) {
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
                    <h4>{formatExerciseName(exercise)}</h4>
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
                                ? `${exercise.weight} lbs`
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
                          <select
                            className="routine-row__status"
                            aria-label={`Status of ${formatExerciseName(exercise)}`}
                            value={exercise.status}
                            onChange={(event) => {
                              if (isWorkoutStatus(event.target.value)) {
                                onChangeStatus(
                                  routine.id,
                                  exercise.id,
                                  event.target.value
                                );
                              }
                            }}
                          >
                            {workoutStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}

                <div className="routine-row__comments">
                  <label htmlFor={`day-comments-${routine.id}`}>
                    Day Comments:
                  </label>
                  {/* key remounts the field when the stored note changes */}
                  <textarea
                    key={routine.dayComments ?? ''}
                    id={`day-comments-${routine.id}`}
                    rows={2}
                    placeholder="N/A"
                    defaultValue={routine.dayComments ?? ''}
                    onBlur={(event) => {
                      if (
                        event.target.value.trim() !==
                        (routine.dayComments ?? '')
                      ) {
                        onChangeDayComments(routine.id, event.target.value);
                      }
                    }}
                  />
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
