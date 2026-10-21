import { createContext } from 'react';
import type { InstructorId, MemberId } from '../types/idsTypes';
import type {
  InstructorDashboardType,
  InstructorInfoType,
} from '../types/userTypes';

export type NewInstructorType = Omit<
  InstructorInfoType,
  'instructorId' | 'assignedMemberIds'
>;

export interface InstructorContextType {
  instructors: InstructorInfoType[];
  activeInstructor: InstructorInfoType | null;
  activeInstructorId: InstructorId | null;
  dashboard: InstructorDashboardType | null;
  createInstructor: (data: NewInstructorType) => void;
  selectInstructor: (instructorId: InstructorId) => void;
  startNewInstructor: () => void;
  updateActiveInstructor: (data: NewInstructorType) => void;
  assignMember: (memberId: MemberId) => void;
  unassignMember: (memberId: MemberId) => void;
}

export const InstructorContext = createContext<
  InstructorContextType | undefined
>(undefined);