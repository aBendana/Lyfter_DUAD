import { UserProfileForm } from '../../components/Forms/UserProfileForm/UserProfileForm';
import type { UserProfileFormType } from '../../components/Forms/UserProfileForm/UserProfileForm';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useUserProfile } from '../../context/UserProfileContext';
import './UserProfile.css';

export function UserProfile() {
  const { userProfile, setUserProfile } = useUserProfile();

  const handleSubmit = (data: UserProfileFormType): void => {
    // guard clause to ensure that the experience level is selected before proceeding
    if (!data.experienceLevel) {
      return;
    }

    setUserProfile({
      ...userProfile,
      fullName: data.fullName.trim(),
      age: data.age,
      experienceLevel: data.experienceLevel,
      contract: data.membership,
    });
  };

  return (
    <main className="user-profile">
      <h1 className="user-profile__title">Your Profile</h1>

      <UserProfileForm
        onSubmit={handleSubmit}
        defaultValues={{
          fullName: userProfile.fullName,
          age: userProfile.age,
          experienceLevel: userProfile.experienceLevel,
          membership: userProfile.contract,
        }}
      />

      <NavLink to={ROUTES.EXCERCISE_ROUTINE}>Time to exercise!</NavLink>
    </main>
  );
}
