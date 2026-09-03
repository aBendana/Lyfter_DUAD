import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../DailyRoutineForm/DailyRoutineForm.css';

// type for the form data
type WeeklyRoutineNameFormType = {
  routineName: string;
};

// type for the form props
type WeeklyRoutineNameFormProps = {
  onSubmit: (name: string) => void;
  routineName: string;
};

export function WeeklyRoutineNameForm({
  onSubmit,
  routineName,
}: WeeklyRoutineNameFormProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeeklyRoutineNameFormType>({
    defaultValues: {
      routineName,
    },
  });

  const handleFormSubmit = (data: WeeklyRoutineNameFormType) => {
    const trimmedName = data.routineName.trim();

    if (trimmedName) {
      onSubmit(trimmedName);
    }
  };

  return (
    <form
      className="daily-routine-form"
      onSubmit={handleSubmit((data) => {
        handleFormSubmit(data);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })}
    >
      <div className="daily-routine-form__field">
        <label className="daily-routine-form__label" htmlFor="routineName">
          Weekly Routine Name
        </label>

        <input
          className="daily-routine-form__input"
          id="routineName"
          type="text"
          placeholder="Enter routine name (e.g., Summer Week #)"
          {...register('routineName', {
            required: 'Routine name is required',
          })}
        />
        {errors.routineName && (
          <p className="daily-routine-form__error">
            {errors.routineName.message}
          </p>
        )}
      </div>

      <button type="submit">Set Routine Name</button>

      {showSuccessMessage && (
        <p className="daily-routine-form__success">
          Weekly routine saved successfully!
        </p>
      )}
    </form>
  );
}
