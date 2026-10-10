import { NavLink } from 'react-router-dom';
import { useInstructor } from '../../hooks/useInstructor';
import { ROUTES } from '../../routes/routes';
import {
  routineTotalCalories,
  totalIncompleteExercises,
  totalTime,
  totalTrainingSessions,
} from '../../utils/calculations';
import './InstructorMembersResume.css';

export function InstructorMembersResume() {
  const { dashboard } = useInstructor();

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
          {dashboard.supervisedMembers.map(({ member, routine }) => (
            <article
              className="instructor-members-resume__member"
              key={member.memberId}
            >
              <header className="instructor-members-resume__member-header">
                <h3>{member.fullName}</h3>
                <p>
                  {routine.name || 'Weekly routine'} · Started{' '}
                  {routine.startDate.toLocaleDateString()}
                </p>
              </header>

              <section aria-label={`${member.fullName}'s profile`}>
                <h4 className="instructor-members-resume__section-title">
                  Profile
                </h4>

                <div
                  className="instructor-members-resume__profile-scroll"
                  role="region"
                  aria-label={`${member.fullName}'s profile details`}
                  tabIndex={0}
                >
                  <dl className="instructor-members-resume__profile">
                    <div>
                      <dt>Name</dt>
                      <dd>{member.fullName}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{member.email}</dd>
                    </div>
                    <div>
                      <dt>Age</dt>
                      <dd>{member.age}</dd>
                    </div>
                    <div>
                      <dt>Experience</dt>
                      <dd>{member.experienceLevel}</dd>
                    </div>
                    <div>
                      <dt>Membership</dt>
                      <dd>{member.contract}</dd>
                    </div>
                    <div>
                      <dt>Start date</dt>
                      <dd>{member.startDate.toLocaleDateString()}</dd>
                    </div>
                    <div>
                      <dt>End date</dt>
                      <dd>{member.endDate.toLocaleDateString()}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{member.state}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <section
                aria-label={`${member.fullName}'s weekly routine summary`}
              >
                <h4 className="instructor-members-resume__section-title">
                  Weekly routine summary
                </h4>

                <dl className="instructor-members-resume__stats">
                  <div>
                    <dt>Workout days</dt>
                    <dd>{totalTrainingSessions(routine.entries)}</dd>
                  </div>
                  <div>
                    <dt>Exercise time</dt>
                    <dd>{totalTime(routine.entries)} min</dd>
                  </div>
                  <div>
                    <dt>Calories burned</dt>
                    <dd>{routineTotalCalories(routine.entries)} kcal</dd>
                  </div>
                  <div>
                    <dt>Incomplete exercises</dt>
                    <dd>{totalIncompleteExercises(routine.entries)}</dd>
                  </div>
                </dl>
              </section>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
