import { useState } from 'react';
import type { ReactNode } from 'react';
import type { MemberId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import type { MemberProfileType } from '../types/userTypes';
import type { EntityChangesType } from '../types/storeTypes';
import type { MemberEditableFieldType } from '../types/activityTypes';
import { memberStore } from '../store/stores';
import { logActivity } from '../store/logActivity';
import { useStore } from '../hooks/useStore';
import { MemberRoutineContext } from './MemberRoutineContext';

// fields compared to log what an update really changed
const memberEditableFields: readonly MemberEditableFieldType[] = [
  'fullName',
  'email',
  'age',
  'experienceLevel',
];

interface MemberRoutineProviderProps {
  children: ReactNode;
}

export function MemberRoutineProvider({
  children,
}: MemberRoutineProviderProps) {
  // members live in the store; the provider only keeps the ui selection
  const members = useStore(memberStore);

  //state for currently active member's ID
  const [activeMemberId, setActiveMemberId] = useState<MemberId | null>(null);
  const activeMember =
    members.find((member) => member.id === activeMemberId) ?? null;

  // function to add a new member to the store
  const addMember = (member: MemberProfileType) => {
    memberStore.add(member);
    logActivity({ kind: 'member-added', memberName: member.fullName });
    setActiveMemberId(member.id);
  };

  // function to select an active member by ID
  const selectMember = (memberId: MemberId) => {
    if (!memberStore.getById(memberId).found) {
      logActivity({ kind: 'not-found', entity: 'member', targetId: memberId });
      throw new Error('Cannot select a member that is not registered');
    }

    setActiveMemberId(memberId);
  };

  // function to set the active member to null,
  // effectively starting a new member session
  const startNewMember = () => {
    setActiveMemberId(null);
  };

  // only the changed fields are sent, the store keeps the rest;
  // the form sends every field, so the log compares against the previous member
  const updateMember = (
    memberId: MemberId,
    changes: EntityChangesType<MemberProfileType>
  ) => {
    const previous = memberStore.getById(memberId);
    const result = memberStore.update(memberId, changes);

    if (!previous.found || !result.found) {
      logActivity({ kind: 'not-found', entity: 'member', targetId: memberId });
      return result;
    }

    const memberName = result.item.fullName;
    const fields = memberEditableFields.filter(
      (field) => previous.item[field] !== result.item[field]
    );
    if (fields.length > 0) {
      logActivity({ kind: 'member-updated', memberName, fields });
    }

    const from = previous.item.membership.contract;
    const to = result.item.membership.contract;
    if (from !== to) {
      logActivity({ kind: 'membership-changed', memberName, from, to });
    }

    return result;
  };

  // function to update the active member's routine
  const updateActiveMemberRoutine = (routine: WeeklyRoutineType) => {
    if (activeMemberId === null) {
      throw new Error('Cannot update a routine without an active member');
    }

    memberStore.update(activeMemberId, { routine });
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
        updateMember,
        updateActiveMemberRoutine,
      }}
    >
      {children}
    </MemberRoutineContext.Provider>
  );
}
