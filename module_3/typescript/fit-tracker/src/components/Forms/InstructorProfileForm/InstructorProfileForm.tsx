import { useForm } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';
import '../UserProfileForm/UserProfileForm.css';

export type InstructorProfileFormType = {
  fullName: string;
  email: string;
  age: number;
  yearsOfExperience: number;
};

type InstructorProfileFormProps = {
  onSubmit: (data: InstructorProfileFormType) => void;
  defaultValues: DefaultValues<InstructorProfileFormType>;
  showSuccessMessage: boolean;
};

export function InstructorProfileForm({
  onSubmit,
  defaultValues,
  showSuccessMessage,
}: InstructorProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InstructorProfileFormType>({
    defaultValues,
  });

  return (
    <form
      className="user-profile-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="user-profile-form__field">
        <label className="user-profile-form__label" htmlFor="instructorName">
          Name
        </label>
        <input
          className="user-profile-form__input"
          id="instructorName"
          type="text"
          placeholder="Enter the instructor's full name"
          {...register('fullName', { required: 'Full name is required' })}
        />
        {errors.fullName && (
          <p className="user-profile-form__error">{errors.fullName.message}</p>
        )}
      </div>

      <div className="user-profile-form__field">
        <label className="user-profile-form__label" htmlFor="instructorEmail">
          Email
        </label>
        <input
          className="user-profile-form__input"
          id="instructorEmail"
          type="email"
          placeholder="Enter the instructor's email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />
        {errors.email && (
          <p className="user-profile-form__error">{errors.email.message}</p>
        )}
      </div>

      <div className="user-profile-form__field">
        <label className="user-profile-form__label" htmlFor="instructorAge">
          Age
        </label>
        <input
          className="user-profile-form__input"
          id="instructorAge"
          type="number"
          placeholder="Enter the instructor's age"
          {...register('age', {
            valueAsNumber: true,
            required: 'Age is required',
            min: { value: 18, message: 'Instructor must be at least 18' },
            max: {
              value: 120,
              message: 'Age must be less than or equal to 120',
            },
            validate: (value) =>
              Number.isInteger(value) || 'Must be a valid age (whole number)',
          })}
        />
        {errors.age && (
          <p className="user-profile-form__error">{errors.age.message}</p>
        )}
      </div>

      <div className="user-profile-form__field">
        <label className="user-profile-form__label" htmlFor="yearsOfExperience">
          Years of Experience
        </label>
        <input
          className="user-profile-form__input"
          id="yearsOfExperience"
          type="number"
          placeholder="Enter years of experience"
          {...register('yearsOfExperience', {
            valueAsNumber: true,
            required: 'Years of experience is required',
            min: {
              value: 0,
              message: 'Years of experience cannot be negative',
            },
            max: {
              value: 80,
              message: 'Years of experience must be 80 or less',
            },
            validate: (value) =>
              Number.isInteger(value) || 'Must be a whole number of years',
          })}
        />
        {errors.yearsOfExperience && (
          <p className="user-profile-form__error">
            {errors.yearsOfExperience.message}
          </p>
        )}
      </div>

      <button type="submit">Save Instructor</button>

      {showSuccessMessage && (
        <p className="user-profile-form__success">
          Instructor saved successfully!
        </p>
      )}
    </form>
  );
}
