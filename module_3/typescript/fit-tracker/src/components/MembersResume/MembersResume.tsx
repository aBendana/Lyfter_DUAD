import type { MemberProfileType } from '../../types/userTypes';
import type { WeeklyRoutineType } from '../../types/weeklyRoutineTypes';
import type { WeeklyLoadType } from '../../types/weeklyLoadTypes';
import {
  routineTotalCalories,
  totalTime,
  totalTrainingSessions,
} from '../../utils/calculations';
import { findMemberRoutine } from '../../utils/findMemberRoutine';
import { getWeeklyLoad } from '../../utils/getWeeklyLoad';
import './MembersResume.css';

// a record forces a text for every load, so a new one cannot be forgotten
const weeklyLoadLabels: Record<WeeklyLoadType, string> = {
  none: '— No sessions yet',
  low: '⬇️ Below the recommended range',
  balanced: '✅ Within the recommended range',
  high: '⚠️ Consider adding a rest day',
};

interface MembersResumeProps {
  members: readonly MemberProfileType[];
  routines: readonly WeeklyRoutineType[];
}

// one line per member, the full card and recommendation live in Memberships
export function MembersResume({ members, routines }: MembersResumeProps) {
  return (
    <section className="members-resume" aria-labelledby="members-resume-title">
      <h3 id="members-resume-title" className="members-resume__title">
        Members resume
      </h3>

      {members.length === 0 ? (
        <p className="members-resume__empty">No members registered yet.</p>
      ) : (
        <ul className="members-resume__list">
          {members.map((member) => {
            const entries =
              findMemberRoutine(member.id, routines)?.entries ?? [];
            const load = getWeeklyLoad(entries);

            return (
              <li className="members-resume__row" key={member.id}>
                <span className="members-resume__name">{member.fullName}</span>
                <span>{totalTrainingSessions(entries)} days</span>
                <span>{totalTime(entries)} min</span>
                <span>{routineTotalCalories(entries)} kcal</span>
                <span
                  className={`members-resume__load members-resume__load--${load}`}
                >
                  {weeklyLoadLabels[load]}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
