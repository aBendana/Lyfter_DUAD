import type { UserId } from './idsTypes';

// types for user info
export type ExperienceLevelType = 'Beginner' | 'Intermediate' | 'Advanced';

export type UserInfoType = {
  id: UserId;
  fullName: string;
  age: number;
  experienceLevel: ExperienceLevelType;
};

// types for user membership
export type MembershipContractType = 'Basic' | 'Premium' | 'Gold';

export type MembershipDateType = Date;

export type MembershipStateType = 'Active' | 'Inactive' | 'Suspended';

export type MembershipType = {
  contract: MembershipContractType;
  startDate: MembershipDateType;
  endDate: MembershipDateType;
  state: MembershipStateType;
};

// user profile type complete
export type UserProfileType = UserInfoType & MembershipType;
