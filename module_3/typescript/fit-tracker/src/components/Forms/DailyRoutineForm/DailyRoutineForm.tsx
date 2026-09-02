import { useForm } from 'react-hook-form';
import { useState } from 'react';
import type { DayOfWeekType } from '../../../types/routineTypes';
import type {
  SportNameType,
  DistanceSportType,
} from '../../../types/exerciseTypes';
import {
  distanceNameExercises,
  nonDistanceNameExercises,
} from '../../../types/exerciseCatalog';
import './DailyRoutineForm.css';

//type for the form data
export type DailyRoutineFormType = {
  // '' is just used as a placeholder for the select input,
  // so that the user is forced to select a day of the week
  exerciseDay: DayOfWeekType | '';
  // '' is just used as a placeholder for the select input,
  // so that the user is forced to select an exercise name
  exerciseName: SportNameType | '';
  duration: number;
  caloriesPerMinute: number;
  distance?: number; // optional for non-distance-based sports
};

type DailyRoutineFormProps = {
  onSubmit: (data: DailyRoutineFormType) => void;
};

export function DailyRoutineForm({ onSubmit }: DailyRoutineFormProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<DailyRoutineFormType>({
    defaultValues: {
      exerciseDay: '',
      exerciseName: '',
      duration: undefined,
      caloriesPerMinute: undefined,
      distance: undefined,
    },
  });

  // watch the exerciseName to determine if distance input should appear
  const selectedExercise = watch('exerciseName');
  const isDistanceExercise =
    selectedExercise &&
    distanceNameExercises.includes(selectedExercise as DistanceSportType);

  return (
    <form
      className="daily-routine-form"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setShowSuccessMessage(true);
        reset();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })}
    >
      <div className="daily-routine-form__field">
        <label className="daily-routine-form__label" htmlFor="exerciseDay">
          Exercise Day
        </label>

        <select
          className="daily-routine-form__input"
          id="exerciseDay"
          {...register('exerciseDay', {
            required: 'Exercise day is required',
          })}
        >
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <div className="daily-routine-form__field">
        <label className="daily-routine-form__label" htmlFor="exerciseName">
          Exercise Name
        </label>

        <select
          className="daily-routine-form__input"
          id="exerciseName"
          {...register('exerciseName', {
            required: 'Choose an exercise',
          })}
        >
          <option value="">Select an exercise</option>

          {/* select group of distance exercises */}
          <optgroup label="Distance-based">
            {distanceNameExercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </optgroup>

          {/* select group of non-distance exercises */}
          <optgroup label="Non-distance">
            {nonDistanceNameExercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="daily-routine-form__field">
        <label className="daily-routine-form__label" htmlFor="duration">
          Duration (minutes)
        </label>
        <input
          className="daily-routine-form__input"
          id="duration"
          type="number"
          placeholder="Enter duration in minutes"
          {...register('duration', {
            valueAsNumber: true,
            required: 'Duration is required',

            min: { value: 1, message: 'Duration must be at least 1 minute' },

            validate: (value) =>
              Number.isInteger(value) || 'Duration must be a whole number',
          })}
        />
        {errors.duration && (
          <p className="daily-routine-form__error">{errors.duration.message}</p>
        )}
      </div>

      <div className="daily-routine-form__field">
        <label
          className="daily-routine-form__label"
          htmlFor="caloriesPerMinute"
        >
          Calories Per Minute
        </label>
        <input
          className="daily-routine-form__input"
          id="caloriesPerMinute"
          type="number"
          step="0.1"
          placeholder="Enter calories burned per minute"
          {...register('caloriesPerMinute', {
            valueAsNumber: true,
            required: 'Calories per minute is required',

            min: {
              value: 1,
              message:
                'Calories per minute must be at least 1, and a positive number',
            },
          })}
        />
        {errors.caloriesPerMinute && (
          <p className="daily-routine-form__error">
            {errors.caloriesPerMinute.message}
          </p>
        )}
      </div>

      {isDistanceExercise && (
        <div className="daily-routine-form__field">
          <label className="daily-routine-form__label" htmlFor="distance">
            Distance (kilometers)
          </label>
          <input
            className="daily-routine-form__input"
            id="distance"
            type="number"
            step="0.1"
            placeholder="Enter distance in kilometers"
            {...register('distance', {
              valueAsNumber: true,
              required: 'Distance is required for this exercise',
              min: {
                value: 0.1,
                message: 'Distance must be more than 0, and a positive number',
              },
            })}
          />
          {errors.distance && (
            <p className="daily-routine-form__error">
              {errors.distance.message}
            </p>
          )}
        </div>
      )}

      <button type="submit">Save Routine</button>

      {showSuccessMessage && (
        <p className="daily-routine-form__success">
          Routine saved successfully!
          <br />
          Add another exercise or go to the Weekly Routine Stats.
        </p>
      )}
    </form>
  );
}
