import { useState } from 'react';
import { UserProfileForm } from '../../components/Forms/UserProfileForm/UserProfileForm';
import type { UserProfileFormType } from '../../components/Forms/UserProfileForm/UserProfileForm';
import type { DefaultValues } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useMemberRoutine } from '../../hooks/useMemberRoutine';
import { generateMemberId } from '../../utils/generateIds';
import {
  generateExpireDate,
  getMembershipState,
} from '../../utils/generateDates';
import type { MemberProfileType } from '../../types/userTypes';
import { generateWeeklyRoutineId } from '../../utils/generateIds';
import './UserProfile.css';

const newMemberDefaults: DefaultValues<UserProfileFormType> = {
  fullName: '',
  email: '',
  age: undefined,
  experienceLevel: 'Beginner',
  membership: 'Basic',
};

export function UserProfile() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    members,
    activeMember,
    activeMemberId,
    addMember,
    selectMember,
    startNewMember,
    updateMember,
  } = useMemberRoutine();

  const handleSubmit = (data: UserProfileFormType): void => {
    const formFields = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      age: data.age,
      experienceLevel: data.experienceLevel,
    };

    if (activeMember) {
      // partial update: id, routine and membership dates stay as they are;
      // membership is nested, so it is sent whole with only the contract changed
      updateMember(activeMember.id, {
        ...formFields,
        membership: { ...activeMember.membership, contract: data.membership },
      });
    } else {
      const endDate = generateExpireDate();
      const newMember: MemberProfileType = {
        ...formFields,
        id: generateMemberId(),
        membership: {
          contract: data.membership,
          startDate: new Date(),
          endDate,
          state: getMembershipState(endDate),
        },
        routine: {
          id: generateWeeklyRoutineId(),
          name: '',
          startDate: new Date(),
          entries: [],
        },
      };
      addMember(newMember);
    }

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3500);
  };

  // show default values for the form based on the active member
  const defaultValues = activeMember
    ? {
        fullName: activeMember.fullName,
        email: activeMember.email,
        age: activeMember.age,
        experienceLevel: activeMember.experienceLevel,
        membership: activeMember.membership.contract,
      }
    : newMemberDefaults;

  return (
    <main className="user-profile">
      <h1 className="user-profile__title">Your Profile</h1>

      <label className="user-profile__member-switcher">
        <span>Member profile</span>
        <select
          className="user-profile-form__input"
          value={activeMemberId ?? ''}
          onChange={(event) => {
            const selectedMember = members.find(
              (member) => String(member.id) === event.target.value
            );

            if (selectedMember) {
              selectMember(selectedMember.id);
            } else {
              startNewMember();
            }
          }}
        >
          <option value="">New Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.fullName || member.email}
            </option>
          ))}
        </select>
      </label>

      <UserProfileForm
        key={activeMemberId ?? 'new-member'}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        showSuccessMessage={showSuccessMessage}
      />

      {activeMember && (
        <NavLink to={ROUTES.USER_ROUTINE}>Time to exercise!</NavLink>
      )}
    </main>
  );
}
