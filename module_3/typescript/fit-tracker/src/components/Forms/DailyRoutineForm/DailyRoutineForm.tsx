import { useForm } from 'react-hook-form';
import { useState } from 'react';
import type { DayOfWeekType } from '../../../types/routineTypes';
import type {
  SportNameType,
  ExerciseCategoryType,
} from '../../../types/exerciseTypes';

import {
  exerciseNameCategories,
  cardioNameExercises,
  strengthNameExercises,
  flexibilityNameExercises,
} from '../../../types/exerciseCatalog';
import './DailyRoutineForm.css';

//type for the form data
export type DailyRoutineFormType = {
  // '' is just used as a placeholder for the select input,
  // so that the user is forced to select a day of the week
  exerciseDay: DayOfWeekType | '';
  // '' is just used as a placeholder for the select input,
  // so that the user is forced to select an exercise category
  exerciseCategory: ExerciseCategoryType | '';
  // '' is just used as a placeholder for the select input,
  // so that the user is forced to select an exercise name
  exerciseName: SportNameType | '';
  duration: number;
  caloriesPerMinute: number;
  distance?: number; // option for cardio exercises
  heartRateZone?: number; // optional for cardio exercises
  sets?: number; // optional for strength exercises
  repetitions?: number; // optional for strength exercises
  weight?: number; // optional for strength exercises
  positions?: number; // optional for flexibility exercises
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
    resetField,
    watch,
    formState: { errors },
  } = useForm<DailyRoutineFormType>({
    defaultValues: {
      exerciseDay: '',
      exerciseCategory: '',
      exerciseName: '',
      // initialize all optional fields as undefined
      // to use placeholder values in the form inputs
      duration: undefined,
      caloriesPerMinute: undefined,
      distance: undefined,
      heartRateZone: undefined,
      sets: undefined,
      repetitions: undefined,
      weight: undefined,
      positions: undefined,
    },
  });

  // watch the selected exercise category to dynamically update the form fields
  const selectedCategory = watch('exerciseCategory');

  // determine the list of exercise names based on the selected category
  const exerciseNames =
    selectedCategory === 'Cardio'
      ? cardioNameExercises
      : selectedCategory === 'Strength'
        ? strengthNameExercises
        : selectedCategory === 'Flexibility'
          ? flexibilityNameExercises
          : [];

  const isCardioExercise = selectedCategory === 'Cardio';
  const isStrengthExercise = selectedCategory === 'Strength';
  const isFlexibilityExercise = selectedCategory === 'Flexibility';

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
        {errors.exerciseDay && (
          <p className="daily-routine-form__error">
            {errors.exerciseDay.message}
          </p>
        )}
      </div>

      <div className="daily-routine-form__field">
        <label className="daily-routine-form__label" htmlFor="exerciseCategory">
          Exercise Category
        </label>

        <select
          className="daily-routine-form__input"
          id="exerciseCategory"
          {...register('exerciseCategory', {
            required: 'Category is required',
            onChange: () => resetField('exerciseName'),
          })}
        >
          <option value="">Select a category</option>
          {exerciseNameCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.exerciseCategory && (
          <p className="daily-routine-form__error">
            {errors.exerciseCategory.message}
          </p>
        )}
      </div>

      <div className="daily-routine-form__field">
        <label className="daily-routine-form__label" htmlFor="exerciseName">
          Exercise Name
        </label>
        <select
          className="daily-routine-form__input"
          id="exerciseName"
          disabled={!selectedCategory}
          {...register('exerciseName', {
            required: 'Choose an exercise',
          })}
        >
          <option value="">
            {selectedCategory
              ? 'Select an exercise'
              : 'Select a category first'}
          </option>
          {exerciseNames.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
        {errors.exerciseName && (
          <p className="daily-routine-form__error">
            {errors.exerciseName.message}
          </p>
        )}
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

      {isCardioExercise && (
        <>
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
                  message:
                    'Distance must be more than 0, and a positive number',
                },
              })}
            />
            {errors.distance && (
              <p className="daily-routine-form__error">
                {errors.distance.message}
              </p>
            )}
          </div>

          <div className="daily-routine-form__field">
            <label
              className="daily-routine-form__label"
              htmlFor="heartRateZone"
            >
              Heart Rate Zone
            </label>
            <input
              className="daily-routine-form__input"
              id="heartRateZone"
              type="number"
              step="0.1"
              placeholder="Enter heart rate zone (1-5)"
              {...register('heartRateZone', {
                valueAsNumber: true,
                required: 'Heart rate zone is required for this exercise',
                min: {
                  value: 1,
                  message:
                    'Heart rate zone must be between 1 and 5, and a positive number',
                },
                max: {
                  value: 5,
                  message:
                    'Heart rate zone must be between 1 and 5, and a positive number',
                },
              })}
            />
            {errors.heartRateZone && (
              <p className="daily-routine-form__error">
                {errors.heartRateZone.message}
              </p>
            )}
          </div>
        </>
      )}

      {isStrengthExercise && (
        <>
          <div className="daily-routine-form__field">
            <label className="daily-routine-form__label" htmlFor="sets">
              Sets
            </label>
            <input
              className="daily-routine-form__input"
              id="sets"
              type="number"
              step="1"
              placeholder="Enter number of sets"
              {...register('sets', {
                valueAsNumber: true,
                required: 'Sets are required for this exercise',
                min: {
                  value: 1,
                  message: 'Sets must be at least 1, and a positive number',
                },
              })}
            />
            {errors.sets && (
              <p className="daily-routine-form__error">{errors.sets.message}</p>
            )}
          </div>

          <div className="daily-routine-form__field">
            <label className="daily-routine-form__label" htmlFor="repetitions">
              Repetitions
            </label>
            <input
              className="daily-routine-form__input"
              id="repetitions"
              type="number"
              step="1"
              placeholder="Enter number of repetitions"
              {...register('repetitions', {
                valueAsNumber: true,
                required: 'Repetitions are required for this exercise',
                min: {
                  value: 1,
                  message:
                    'Repetitions must be at least 1, and a positive number',
                },
              })}
            />
            {errors.repetitions && (
              <p className="daily-routine-form__error">
                {errors.repetitions.message}
              </p>
            )}
          </div>

          <div className="daily-routine-form__field">
            <label className="daily-routine-form__label" htmlFor="weight">
              Weight (lbs)
            </label>
            <input
              className="daily-routine-form__input"
              id="weight"
              type="number"
              step="1"
              placeholder="Enter weight used"
              {...register('weight', {
                valueAsNumber: true,
                required: 'Weight is required for this exercise',
                min: {
                  value: 1,
                  message: 'Weight must be at least 1, and a positive number',
                },
              })}
            />
            {errors.weight && (
              <p className="daily-routine-form__error">
                {errors.weight.message}
              </p>
            )}
          </div>
        </>
      )}

      {isFlexibilityExercise && (
        <div className="daily-routine-form__field">
          <label className="daily-routine-form__label" htmlFor="positions">
            Positions
          </label>
          <input
            className="daily-routine-form__input"
            id="positions"
            type="number"
            step="1"
            placeholder="Enter number of positions"
            {...register('positions', {
              valueAsNumber: true,
              required: 'Positions are required for this exercise',
              min: {
                value: 1,
                message: 'Positions must be at least 1, and a positive number',
              },
            })}
          />
          {errors.positions && (
            <p className="daily-routine-form__error">
              {errors.positions.message}
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
