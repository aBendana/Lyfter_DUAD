import { NavLink } from 'react-router-dom';
import { useInstructor } from '../../hooks/useInstructor';
import { useStore } from '../../hooks/useStore';
import { ROUTES } from '../../routes/routes';
import { routineStore } from '../../store/stores';
import { findMemberRoutine } from '../../utils/findMemberRoutine';
import { MemberResumeCard } from '../../components/MemberResumeCard/MemberResumeCard';
import './InstructorMembersResume.css';

export function InstructorMembersResume() {
  const { dashboard } = useInstructor();
  const routines = useStore(routineStore);

  return (
    <main className="instructor-members-resume">
      <header className="instructor-members-resume__header">
        <p className="instructor-members-resume__eyebrow">---Instructor---</p>
        <h2>Members overview</h2>
        <p>Review your members’ profiles and weekly progress.</p>
      </header>

      {!dashboard ? (
        <p className="instructor-members-resume__empty">
          Select or create an instructor profile to view your members.{' '}
          <NavLink to={ROUTES.INSTRUCTOR_PROFILE}>
            Go to instructor profile
          </NavLink>
        </p>
      ) : dashboard.supervisedMembers.length === 0 ? (
        <p className="instructor-members-resume__empty">
          You have no assigned members. Assign members from the{' '}
          <NavLink to={ROUTES.MEMBERS_ASSIGNMENT}>
            members assignment page
          </NavLink>
          .
        </p>
      ) : (
        <div className="instructor-members-resume__list">
          {dashboard.supervisedMembers.map((member) => (
            <MemberResumeCard
              member={member}
              routine={findMemberRoutine(member.id, routines)}
              key={member.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}
