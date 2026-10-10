import { useState } from 'react';
import type { DefaultValues } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { InstructorProfileForm } from '../../components/Forms/InstructorProfileForm/InstructorProfileForm';
import type { InstructorProfileFormType } from '../../components/Forms/InstructorProfileForm/InstructorProfileForm';
import { useInstructor } from '../../hooks/useInstructor';
import { ROUTES } from '../../routes/routes';
import '../UserProfile/UserProfile.css';

const newInstructorDefaults: DefaultValues<InstructorProfileFormType> = {
  fullName: '',
  email: '',
  age: undefined,
  yearsOfExperience: undefined,
};

export function InstructorProfile() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    instructors,
    activeInstructor,
    activeInstructorId,
    createInstructor,
    selectInstructor,
    startNewInstructor,
    updateActiveInstructor,
  } = useInstructor();

  const handleSubmit = (data: InstructorProfileFormType): void => {
    const profile = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      age: data.age,
      yearsOfExperience: data.yearsOfExperience,
    };

    if (activeInstructor) {
      updateActiveInstructor(profile);
    } else {
      createInstructor(profile);
    }

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3500);
  };

  const defaultValues = activeInstructor
    ? {
        fullName: activeInstructor.fullName,
        email: activeInstructor.email,
        age: activeInstructor.age,
        yearsOfExperience: activeInstructor.yearsOfExperience,
      }
    : newInstructorDefaults;

  return (
    <main className="user-profile">
      <h2 className="user-profile__title">Instructor Profile</h2>

      <label className="user-profile__member-switcher">
        <span>Instructor profile</span>
        <select
          className="user-profile-form__input"
          value={activeInstructorId ?? ''}
          onChange={(event) => {
            const selected = instructors.find(
              (instructor) => instructor.instructorId === event.target.value
            );

            if (selected) {
              selectInstructor(selected.instructorId);
            } else {
              startNewInstructor();
            }
          }}
        >
          <option value="">New Instructor</option>
          {instructors.map((instructor) => (
            <option
              key={instructor.instructorId}
              value={instructor.instructorId}
            >
              {instructor.fullName || instructor.email}
            </option>
          ))}
        </select>
      </label>

      <InstructorProfileForm
        key={activeInstructorId ?? 'new-instructor'}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        showSuccessMessage={showSuccessMessage}
      />

      {activeInstructor && (
        <NavLink to={ROUTES.MEMBERS_ASSIGNMENT}>Assign members</NavLink>
      )}
    </main>
  );
}
