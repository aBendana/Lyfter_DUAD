import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import { useMemberRoutine } from '../../hooks/useMemberRoutine';
import { UserProfileSummary } from '../../components/UserProfileSummary/UserProfileSummary';
import { WeeklyRoutineSummary } from '../../components/WeeklySummary/WeeklySummary';
import { Recommendations } from '../../components/Observations/Recommendations';
import { IncompleteRoutines } from '../../components/Observations/IncompleteRoutines';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './WeeklyRoutineResume.css';

export function WeeklyRoutineResume() {
  // state and context hooks
  const { officialEntries: routineEntries, routineName } = useWeeklyRoutine();
  const { activeMember } = useMemberRoutine();

  return (
    <section className="weekly-routine-resume">
      <header className="weekly-routine-resume__header">
        <p className="weekly-routine-resume__eyebrow">Progress overview</p>
        <h1>{routineName || 'No routine name specified'}</h1>
      </header>

      {activeMember && (
        <UserProfileSummary userProfile={activeMember.member} />
      )}
      <WeeklyRoutineSummary routineEntries={routineEntries} />
      <Recommendations routineEntries={routineEntries} />
      <IncompleteRoutines entries={routineEntries} />

      <div className="weekly-routine-resume__actions">
        <NavLink
          className="weekly-routine-resume__link"
          to={ROUTES.USER_ROUTINE}
        >
          Add another exercise
        </NavLink>

        <NavLink
          className="weekly-routine-resume__link"
          to={ROUTES.USER_PROFILE}
        >
          Modify Profile
        </NavLink>
      </div>
    </section>
  );
}
