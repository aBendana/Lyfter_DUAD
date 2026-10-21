import { useState } from 'react';
import type { ReactNode } from 'react';
import type { MemberId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import type { MemberProfileType } from '../types/userTypes';
import { MemberRoutineContext } from './MemberRoutineContext';

interface MemberRoutineProviderProps {
  children: ReactNode;
}

export function MemberRoutineProvider({
  children,
}: MemberRoutineProviderProps) {
  // state for member profiles and their routines
  const [members, setMembers] = useState<MemberProfileType[]>([]);

  //state for currently active member's ID
  const [activeMemberId, setActiveMemberId] = useState<MemberId | null>(null);
  const activeMember =
    members.find((member) => member.memberId === activeMemberId) ?? null;

  // function to add a new member to the context
  const addMember = (member: MemberProfileType) => {
    setMembers((currentMembers) => [...currentMembers, member]);
    setActiveMemberId(member.memberId);
  };

  // function to select an active member by ID
  const selectMember = (memberId: MemberId) => {
    if (!members.some((member) => member.memberId === memberId)) {
      throw new Error('Cannot select a member that is not registered');
    }

    setActiveMemberId(memberId);
  };

  // function to set the active member to null,
  // effectively starting a new member session
  const startNewMember = () => {
    setActiveMemberId(null);
  };

  // function to update a member's profile
  const updateMemberProfile = (member: MemberProfileType) => {
    setMembers((currentMembers) =>
      currentMembers.map((currentMember) =>
        currentMember.memberId === member.memberId ? member : currentMember
      )
    );
  };

  // function to update the active member's routine
  const updateActiveMemberRoutine = (routine: WeeklyRoutineType) => {
    if (activeMemberId === null) {
      throw new Error('Cannot update a routine without an active member');
    }

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.memberId === activeMemberId ? { ...member, routine } : member
      )
    );
  };

  return (
    <MemberRoutineContext.Provider
      value={{
        members,
        activeMember,
        activeMemberId,
        addMember,
        selectMember,
        startNewMember,
        updateMemberProfile,
        updateActiveMemberRoutine,
      }}
    >
      {children}
    </MemberRoutineContext.Provider>
  );
}
