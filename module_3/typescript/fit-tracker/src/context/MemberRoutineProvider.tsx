import { useState } from 'react';
import type { ReactNode } from 'react';
import type { MemberId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import type {
  MemberProfileType,
  MemberRoutineRecordType,
} from '../types/userTypes';
import { generateWeeklyRoutineId } from '../utils/generateIds';
import { MemberRoutineContext } from './MemberRoutineContext';

type MemberRoutineProviderProps = {
  children: ReactNode;
};

export function MemberRoutineProvider({
  children,
}: MemberRoutineProviderProps) {
  //state for member routine context
  const [memberRecords, setMemberRecords] = useState<MemberRoutineRecordType[]>(
    []
  );

  //state for currently active member's ID
  const [activeMemberId, setActiveMemberId] = useState<MemberId | null>(null);
  const activeMember =
    memberRecords.find((record) => record.member.memberId === activeMemberId) ??
    null;

  // function to add a new member to the context
  const addMember = (member: MemberProfileType) => {
    setMemberRecords((currentRecords) => [
      ...currentRecords,
      {
        member,
        routine: {
          id: generateWeeklyRoutineId(),
          name: '',
          startDate: new Date(),
          entries: [],
        },
      },
    ]);
    setActiveMemberId(member.memberId);
  };

  // function to select an active member by ID
  const selectMember = (memberId: MemberId) => {
    if (!memberRecords.some((record) => record.member.memberId === memberId)) {
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
    setMemberRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.member.memberId === member.memberId
          ? { ...record, member }
          : record
      )
    );
  };

  // function to update the active member's routine
  const updateActiveMemberRoutine = (routine: WeeklyRoutineType) => {
    if (activeMemberId === null) {
      throw new Error('Cannot update a routine without an active member');
    }

    setMemberRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.member.memberId === activeMemberId
          ? { ...record, routine }
          : record
      )
    );
  };

  return (
    <MemberRoutineContext.Provider
      value={{
        memberRecords,
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
