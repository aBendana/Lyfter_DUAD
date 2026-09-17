import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { UserProfileType } from '../types/userTypes';

export type UserProfileContextType = {
  userProfile: UserProfileType;
  setUserProfile: Dispatch<SetStateAction<UserProfileType>>;
};

export const UserProfileContext = createContext<
  UserProfileContextType | undefined
>(undefined);
