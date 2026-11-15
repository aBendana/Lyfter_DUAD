import { useState } from 'react';
import type { ReactNode } from 'react';
import type { InstructorId, MemberId } from '../types/idsTypes';
import type { InstructorInfoType } from '../types/userTypes';
import { generateInstructorId } from '../utils/generateIds';
import { instructorStore, memberStore } from '../store/stores';
import { logActivity } from '../store/logActivity';
import { useStore } from '../hooks/useStore';
import { InstructorContext } from './InstructorContext';
import type { NewInstructorType } from './InstructorContext';

interface InstructorProviderProps {
  children: ReactNode;
}

export function InstructorProvider({ children }: InstructorProviderProps) {
  // both lists come from the stores, so this provider no longer depends on
  // being nested inside the member provider
  const members = useStore(memberStore);
  const instructors = useStore(instructorStore);

  //state for active instructor ID
  const [activeInstructorId, setActiveInstructorId] =
    useState<InstructorId | null>(null);

  // get the currently active instructor based on the activeInstructorId
  const activeInstructor =
    instructors.find((instructor) => instructor.id === activeInstructorId) ??
    null;

  // prepare the dashboard data for the active instructor
  const dashboard = activeInstructor
    ? {
        instructor: activeInstructor,
        supervisedMembers: members.filter((member) =>
          activeInstructor.assignedMemberIds.includes(member.id)
        ),
      }
    : null;

  // function to create a new instructor
  const createInstructor = (data: NewInstructorType) => {
    const instructor: InstructorInfoType = {
      ...data,
      id: generateInstructorId(),
      assignedMemberIds: [],
    };

    instructorStore.add(instructor);
    logActivity({
      kind: 'instructor-added',
      instructorName: instructor.fullName,
    });
    setActiveInstructorId(instructor.id);
  };

  // guard to ensure the instructor being selected exists
  const selectInstructor = (instructorId: InstructorId) => {
    if (!instructorStore.getById(instructorId).found) {
      logActivity({
        kind: 'not-found',
        entity: 'instructor',
        targetId: instructorId,
      });
      throw new Error('Cannot select an instructor that is not registered');
    }

    setActiveInstructorId(instructorId);
  };

  // function to start creating a new instructor
  const startNewInstructor = () => {
    setActiveInstructorId(null);
  };

  // the form data has no id or assigned members, so it is a valid partial update
  const updateActiveInstructor = (data: NewInstructorType) => {
    if (activeInstructorId === null) {
      throw new Error('Select an instructor before updating their profile');
    }

    const result = instructorStore.update(activeInstructorId, data);
    logActivity(
      result.found
        ? { kind: 'instructor-updated', instructorName: result.item.fullName }
        : { kind: 'not-found', entity: 'instructor', targetId: result.id }
    );
  };

  const assignMember = (memberId: MemberId) => {
    if (activeInstructorId === null) {
      throw new Error(
        'Select or create an instructor before assigning members'
      );
    }

    const member = memberStore.getById(memberId);
    if (!member.found) {
      logActivity({ kind: 'not-found', entity: 'member', targetId: memberId });
      throw new Error('Cannot assign a member that is not registered');
    }

    const [assignedInstructor] = instructorStore.findBy((instructor) =>
      instructor.assignedMemberIds.includes(memberId)
    );
    if (assignedInstructor && assignedInstructor.id !== activeInstructorId) {
      throw new Error('Member is already assigned to another instructor');
    }

    // read from the store, not the render, so two quick clicks cannot duplicate it
    const current = instructorStore.getById(activeInstructorId);
    if (!current.found || current.item.assignedMemberIds.includes(memberId)) {
      return;
    }

    instructorStore.update(activeInstructorId, {
      assignedMemberIds: [...current.item.assignedMemberIds, memberId],
    });
    logActivity({
      kind: 'member-assigned',
      instructorName: current.item.fullName,
      memberName: member.item.fullName,
    });
  };

  // guard to ensure the instructor is active before unassigning a member
  const unassignMember = (memberId: MemberId) => {
    if (activeInstructorId === null) {
      throw new Error('Select an instructor before removing assigned members');
    }

    const current = instructorStore.getById(activeInstructorId);
    if (!current.found || !current.item.assignedMemberIds.includes(memberId)) {
      return;
    }

    instructorStore.update(activeInstructorId, {
      assignedMemberIds: current.item.assignedMemberIds.filter(
        (assignedMemberId) => assignedMemberId !== memberId
      ),
    });

    // members are never removed, but the lookup still reports a missing one
    const member = memberStore.getById(memberId);
    logActivity(
      member.found
        ? {
            kind: 'member-unassigned',
            instructorName: current.item.fullName,
            memberName: member.item.fullName,
          }
        : { kind: 'not-found', entity: 'member', targetId: memberId }
    );
  };

  return (
    <InstructorContext.Provider
      value={{
        instructors,
        activeInstructor,
        activeInstructorId,
        dashboard,
        createInstructor,
        selectInstructor,
        startNewInstructor,
        updateActiveInstructor,
        assignMember,
        unassignMember,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
