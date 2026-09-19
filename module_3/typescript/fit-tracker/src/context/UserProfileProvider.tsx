import { useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfileType } from '../types/userTypes';
import { generateUserId } from '../utils/generateIds';
import { generateExpireDate, getMembershipState } from '../utils/generateDates';
import { UserProfileContext } from './UserProfileContext';

const defaultUserProfile: UserProfileType = {
  id: generateUserId(),
  fullName: '',
  age: 0,
  experienceLevel: 'Beginner',
  contract: 'Basic',
  startDate: new Date(),
  endDate: generateExpireDate(),
  state: getMembershipState(generateExpireDate()),
};

type UserProfileProviderProps = {
  children: ReactNode;
};

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [userProfile, setUserProfile] =
    useState<UserProfileType>(defaultUserProfile);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}
