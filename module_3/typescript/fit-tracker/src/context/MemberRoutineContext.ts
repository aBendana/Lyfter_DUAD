import { createContext } from 'react';
import type { MemberId } from '../types/idsTypes';
import type { MemberProfileType } from '../types/userTypes';
import type { EntityChangesType, StoreResultType } from '../types/storeTypes';

// context type for member routine
// to define the shape of the context value

export interface MemberRoutineContextType {
  members: readonly MemberProfileType[];
  activeMember: MemberProfileType | null;
  activeMemberId: MemberId | null;
  addMember: (member: MemberProfileType) => void;
  selectMember: (memberId: MemberId) => void;
  startNewMember: () => void;
  updateMember: (
    memberId: MemberId,
    changes: EntityChangesType<MemberProfileType>
  ) => StoreResultType<MemberProfileType>;
}

export const MemberRoutineContext = createContext<
  MemberRoutineContextType | undefined
>(undefined);
