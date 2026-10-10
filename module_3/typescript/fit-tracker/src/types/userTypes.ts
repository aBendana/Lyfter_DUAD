import type { MemberId, InstructorId } from './idsTypes';
import type { WeeklyRoutineType } from './weeklyRoutineTypes';

// basic type for describing a system user
export interface BasicPersonInfoType {
  fullName: string;
  email: string;
  age: number;
}

// types for user info
export type ExperienceLevelType = 'Beginner' | 'Intermediate' | 'Advanced';

export interface MemberInfoType extends BasicPersonInfoType {
  memberId: MemberId;
  experienceLevel: ExperienceLevelType;
}

// types for user membership
export type MembershipContractType = 'Basic' | 'Premium' | 'Gold';

export type MembershipDateType = Date;

export type MembershipStateType = 'Active' | 'Inactive' | 'Suspended';

export interface MembershipType {
  contract: MembershipContractType;
  startDate: MembershipDateType;
  endDate: MembershipDateType;
  state: MembershipStateType;
}

// user profile type complete
export interface MemberProfileType extends MemberInfoType, MembershipType {}

// user instructor type complete
export interface InstructorInfoType extends BasicPersonInfoType {
  instructorId: InstructorId;
  yearsOfExperience: number;
  assignedMemberIds: MemberId[];
}

// in-memory record for a member and their current weekly routine
export interface MemberRoutineRecordType {
  member: MemberProfileType;
  routine: WeeklyRoutineType;
}

// type for the instructor dashboard
export interface InstructorDashboardType {
  instructor: InstructorInfoType;
  supervisedMembers: MemberRoutineRecordType[];
}
