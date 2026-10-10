import { useState } from 'react';
import type { ReactNode } from 'react';
import type { InstructorId, MemberId } from '../types/idsTypes';
import type { InstructorInfoType } from '../types/userTypes';
import { generateInstructorId } from '../utils/generateIds';
import { useMemberRoutine } from '../hooks/useMemberRoutine';
import { InstructorContext } from './InstructorContext';
import type { NewInstructorType } from './InstructorContext';

type InstructorProviderProps = {
  children: ReactNode;
};

export function InstructorProvider({ children }: InstructorProviderProps) {
  // retrieve member records from the custom hook
  const { memberRecords } = useMemberRoutine();

  //state for instructors and active instructor ID
  const [instructors, setInstructors] = useState<InstructorInfoType[]>([]);

  //state for active instructor ID
  const [activeInstructorId, setActiveInstructorId] =
    useState<InstructorId | null>(null);

  // get the currently active instructor based on the activeInstructorId
  const activeInstructor =
    instructors.find(
      (instructor) => instructor.instructorId === activeInstructorId
    ) ?? null;

  // prepare the dashboard data for the active instructor
  const dashboard = activeInstructor
    ? {
        instructor: activeInstructor,
        supervisedMembers: memberRecords.filter((record) =>
          activeInstructor.assignedMemberIds.includes(record.member.memberId)
        ),
      }
    : null;

  // function to create a new instructor
  const createInstructor = (data: NewInstructorType) => {
    const instructor: InstructorInfoType = {
      ...data,
      instructorId: generateInstructorId(),
      assignedMemberIds: [],
    };

    setInstructors((currentInstructors) => [...currentInstructors, instructor]);
    setActiveInstructorId(instructor.instructorId);
  };

  // guard to ensure the instructor being selected exists
  const selectInstructor = (instructorId: InstructorId) => {
    if (!instructors.some((item) => item.instructorId === instructorId)) {
      throw new Error('Cannot select an instructor that is not registered');
    }

    setActiveInstructorId(instructorId);
  };

  // function to start creating a new instructor
  const startNewInstructor = () => {
    setActiveInstructorId(null);
  };

  // function to update the currently active instructor
  const updateActiveInstructor = (data: NewInstructorType) => {
    if (!activeInstructor) {
      throw new Error('Select an instructor before updating their profile');
    }

    setInstructors((currentInstructors) =>
      currentInstructors.map((instructor) =>
        instructor.instructorId === activeInstructor.instructorId
          ? { ...instructor, ...data }
          : instructor
      )
    );
  };

  const assignMember = (memberId: MemberId) => {
    if (!activeInstructor) {
      throw new Error(
        'Select or create an instructor before assigning members'
      );
    }

    if (!memberRecords.some((record) => record.member.memberId === memberId)) {
      throw new Error('Cannot assign a member that is not registered');
    }

    const assignedInstructor = instructors.find((instructor) =>
      instructor.assignedMemberIds.includes(memberId)
    );
    if (
      assignedInstructor &&
      assignedInstructor.instructorId !== activeInstructor.instructorId
    ) {
      throw new Error('Member is already assigned to another instructor');
    }

    setInstructors((currentInstructors) =>
      currentInstructors.map((instructor) =>
        instructor.instructorId === activeInstructor.instructorId &&
        !instructor.assignedMemberIds.includes(memberId)
          ? {
              ...instructor,
              assignedMemberIds: [...instructor.assignedMemberIds, memberId],
            }
          : instructor
      )
    );
  };

  // guard to ensure the instructor is active before unassigning a member
  const unassignMember = (memberId: MemberId) => {
    if (!activeInstructor) {
      throw new Error('Select an instructor before removing assigned members');
    }

    setInstructors((currentInstructors) =>
      currentInstructors.map((instructor) =>
        instructor.instructorId === activeInstructor.instructorId
          ? {
              ...instructor,
              assignedMemberIds: instructor.assignedMemberIds.filter(
                (assignedMemberId) => assignedMemberId !== memberId
              ),
            }
          : instructor
      )
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
