import { createContext, useContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { UserProfileType } from '../types/userTypes';

// user profile context type
// to define the shape of the context value
type UserProfileContextType = {
  userProfile: UserProfileType;
  setUserProfile: Dispatch<SetStateAction<UserProfileType>>;
};

// default user profile values
const defaultUserProfile: UserProfileType = {
  fullName: '',
  age: 0,
  experienceLevel: 'Beginner',
};

// create the context with default values
const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

// props for the UserProfileProvider, including its child components
type UserProfileProviderProps = {
  children: ReactNode;
};

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  // state to hold the user profile, initialized with default values
  const [userProfile, setUserProfile] =
    useState<UserProfileType>(defaultUserProfile);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

// custom hook to access the user profile context
export function useUserProfile() {
  const context = useContext(UserProfileContext);

  // guard clause to ensure that the hook is used within the provider
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }

  return context;
}
