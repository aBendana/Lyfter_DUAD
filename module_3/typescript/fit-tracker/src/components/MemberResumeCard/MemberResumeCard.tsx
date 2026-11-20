import type { ReactNode } from 'react';
import type { MemberProfileType } from '../../types/userTypes';
import type { WeeklyRoutineType } from '../../types/weeklyRoutineTypes';
import {
  routineTotalCalories,
  totalIncompleteExercises,
  totalTime,
  totalTrainingSessions,
} from '../../utils/calculations';
import './MemberResumeCard.css';

interface MemberResumeCardProps {
  member: MemberProfileType;
  // looked up by the view in routineStore, null if it is missing
  routine: WeeklyRoutineType | null;
  // extra sections each view adds at the end of the card
  children?: ReactNode;
}

// profile and weekly summary shared by the instructor and admin views
export function MemberResumeCard({
  member,
  routine,
  children,
}: MemberResumeCardProps) {
  const entries = routine?.entries ?? [];

  return (
    <article className="member-resume-card">
      <header className="member-resume-card__header">
        <h3>{member.fullName}</h3>
        <p>
          {routine
            ? `${routine.name || 'Weekly routine'} · Started ${routine.startDate.toLocaleDateString()}`
            : 'No routine yet'}
        </p>
      </header>

      <section aria-label={`${member.fullName}'s profile`}>
        <h4 className="member-resume-card__section-title">Profile</h4>

        <div
          className="member-resume-card__profile-scroll"
          role="region"
          aria-label={`${member.fullName}'s profile details`}
          tabIndex={0}
        >
          <dl className="member-resume-card__profile">
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
              <dd>{member.membership.contract}</dd>
            </div>
            <div>
              <dt>Start date</dt>
              <dd>{member.membership.startDate.toLocaleDateString()}</dd>
            </div>
            <div>
              <dt>End date</dt>
              <dd>{member.membership.endDate.toLocaleDateString()}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{member.membership.state}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-label={`${member.fullName}'s weekly routine summary`}>
        <h4 className="member-resume-card__section-title">
          Weekly routine summary
        </h4>

        <dl className="member-resume-card__stats">
          <div>
            <dt>Workout days</dt>
            <dd>{totalTrainingSessions(entries)}</dd>
          </div>
          <div>
            <dt>Exercise time</dt>
            <dd>{totalTime(entries)} min</dd>
          </div>
          <div>
            <dt>Calories burned</dt>
            <dd>{routineTotalCalories(entries)} kcal</dd>
          </div>
          <div>
            <dt>Incomplete exercises</dt>
            <dd>{totalIncompleteExercises(entries)}</dd>
          </div>
        </dl>
      </section>
      {children}
    </article>
  );
}
