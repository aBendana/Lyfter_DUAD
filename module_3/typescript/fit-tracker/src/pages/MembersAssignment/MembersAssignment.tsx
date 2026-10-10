import { NavLink } from 'react-router-dom';
import { useInstructor } from '../../hooks/useInstructor';
import { useMemberRoutine } from '../../hooks/useMemberRoutine';
import { ROUTES } from '../../routes/routes';
import './MembersAssignment.css';

export function MembersAssignment() {
  const { memberRecords } = useMemberRoutine();
  const { instructors, activeInstructor, assignMember, unassignMember } =
    useInstructor();

  return (
    <main className="members-assignment">
      <header className="members-assignment__header">
        <p className="members-assignment__eyebrow">--- Instructor ---</p>
        <h2>Members assignment</h2>
        <p className="members-assignment__description">
          Select the members you want supervise.
        </p>
      </header>

      {!activeInstructor && (
        <p className="members-assignment__notice" role="status">
          Select or create an instructor profile before assigning members.{' '}
          <NavLink to={ROUTES.INSTRUCTOR_PROFILE}>
            Go to instructor profile
          </NavLink>
        </p>
      )}

      {memberRecords.length === 0 ? (
        <p className="members-assignment__empty">
          There are no registered members yet. Create a member profile first.
        </p>
      ) : (
        <ul className="members-assignment__list">
          {memberRecords.map(({ member }) => {
            const assignedInstructor = instructors.find((instructor) =>
              instructor.assignedMemberIds.includes(member.memberId)
            );
            const assignedToAnotherInstructor =
              assignedInstructor !== undefined &&
              assignedInstructor.instructorId !==
                activeInstructor?.instructorId;
            const isAssignedToActiveInstructor =
              activeInstructor?.assignedMemberIds.includes(member.memberId) ??
              false;
            const checkboxId = `member-assignment-${member.memberId}`;

            return (
              <li className="members-assignment__item" key={member.memberId}>
                <input
                  id={checkboxId}
                  className="members-assignment__checkbox"
                  type="checkbox"
                  checked={isAssignedToActiveInstructor}
                  disabled={!activeInstructor || assignedToAnotherInstructor}
                  onChange={(event) => {
                    if (event.target.checked) {
                      assignMember(member.memberId);
                    } else {
                      unassignMember(member.memberId);
                    }
                  }}
                  aria-describedby={`${checkboxId}-status`}
                />

                <label
                  className="members-assignment__member"
                  htmlFor={checkboxId}
                >
                  <span className="members-assignment__name">
                    {member.fullName}
                  </span>
                  <span className="members-assignment__details">
                    {member.email} · Age {member.age} · {member.experienceLevel}
                  </span>
                </label>

                <span
                  className={`members-assignment__status${
                    assignedToAnotherInstructor
                      ? ' members-assignment__status--unavailable'
                      : ''
                  }`}
                  id={`${checkboxId}-status`}
                >
                  {!activeInstructor
                    ? 'Select an instructor'
                    : assignedToAnotherInstructor
                      ? `Assigned to ${assignedInstructor?.fullName ?? 'another instructor'}`
                      : isAssignedToActiveInstructor
                        ? 'Assigned to you'
                        : 'Available'}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {activeInstructor && (
        <NavLink to={ROUTES.INSTRUCTOR_MEMBERS_RESUME}>
          Follow Your Assignments
        </NavLink>
      )}
    </main>
  );
}
