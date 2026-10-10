import { createContext } from 'react';
import type { MemberId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import type {
  MemberProfileType,
  MemberRoutineRecordType,
} from '../types/userTypes';

// context type for member routine
// to define the shape of the context value

export interface MemberRoutineContextType {
  memberRecords: MemberRoutineRecordType[];
  activeMember: MemberRoutineRecordType | null;
  activeMemberId: MemberId | null;
  addMember: (member: MemberProfileType) => void;
  selectMember: (memberId: MemberId) => void;
  startNewMember: () => void;
  updateMemberProfile: (member: MemberProfileType) => void;
  updateActiveMemberRoutine: (routine: WeeklyRoutineType) => void;
}

export const MemberRoutineContext = createContext<
  MemberRoutineContextType | undefined
>(undefined);
