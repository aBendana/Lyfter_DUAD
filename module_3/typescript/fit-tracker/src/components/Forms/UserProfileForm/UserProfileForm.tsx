import { useForm } from 'react-hook-form';
import type {
  ExperienceLevelType,
  MembershipContractType,
} from '../../../types/userTypes';
import { useState } from 'react';
import './UserProfileForm.css';

//type for the form data
export type UserProfileFormType = {
  fullName: string;
  age: number;
  experienceLevel: ExperienceLevelType;
  membership: MembershipContractType;
};

type UserProfileFormProps = {
  onSubmit: (data: UserProfileFormType) => void;
  defaultValues: UserProfileFormType;
};

export function UserProfileForm({
  onSubmit,
  defaultValues,
}: UserProfileFormProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormType>({
    defaultValues,
  });

  return (
    <form
      className="user-profile-form"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3500);
      })}
    >
      <div className="user-profile-form__field">
        <label className="user-profile-form__label" htmlFor="fullName">
          Name
        </label>
        <input
          className="user-profile-form__input"
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          {...register('fullName', { required: 'Full name is required' })}
        />
        {errors.fullName && (
          <p className="user-profile-form__error">{errors.fullName.message}</p>
        )}
      </div>

      <div className="user-profile-form__field">
        <label className="user-profile-form__label" htmlFor="age">
          Age
        </label>
        <input
          className="user-profile-form__input"
          id="age"
          type="number"
          placeholder="Enter your age"
          {...register('age', {
            valueAsNumber: true,
            required: 'Age is required',

            min: { value: 12, message: 'Age must be at least 12' },
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
        <label className="user-profile-form__label" htmlFor="experienceLevel">
          Experience Level
        </label>

        <select
          className="user-profile-form__input"
          id="experienceLevel"
          {...register('experienceLevel', {
            required: 'Experience level is required',
          })}
        >
          <option value="" disabled>
            Experience Level
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        {errors.experienceLevel && (
          <p className="user-profile-form__error">
            {errors.experienceLevel.message}
          </p>
        )}
      </div>

      <div className="user-profile-form__field">
        <label className="user-profile-form__label" htmlFor="membership">
          Membership
        </label>

        <select
          className="user-profile-form__input"
          id="membership"
          {...register('membership', {
            required: 'Membership is required',
          })}
        >
          <option value="" disabled>
            Membership
          </option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Gold">Gold</option>
        </select>
        {errors.membership && (
          <p className="user-profile-form__error">
            {errors.membership.message}
          </p>
        )}
      </div>

      <button type="submit">Save Profile</button>

      {showSuccessMessage && (
        <p className="user-profile-form__success">
          Profile saved successfully!
        </p>
      )}
    </form>
  );
}
