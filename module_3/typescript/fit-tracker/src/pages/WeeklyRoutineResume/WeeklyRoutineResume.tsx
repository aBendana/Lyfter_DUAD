import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import { useUserProfile } from '../../hooks/useUserProfile';
import { GroupCategoriesResume } from '../../components/GroupCategory/GroupCategories';
import { WeeklyRoutineSummary } from '../../components/WeeklySummary/WeeklySummary';
import { UserProfileSummary } from '../../components/UserProfileSummary/UserProfileSummary';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './WeeklyRoutineResume.css';

export function WeeklyRoutineResume() {
  // state and context hooks
  const { routineEntries, routineName } = useWeeklyRoutine();
  const { userProfile } = useUserProfile();

  return (
    <main className="weekly-routine-resume">
      <header className="weekly-routine-resume__header">
        <p className="weekly-routine-resume__eyebrow">Progress overview</p>
        <h1>{routineName || 'No routine name specified'}</h1>
      </header>

      <UserProfileSummary userProfile={userProfile} />
      <GroupCategoriesResume />
      <WeeklyRoutineSummary routineEntries={routineEntries} />

      <div className="weekly-routine-resume__actions">
        <NavLink
          className="weekly-routine-resume__link"
          to={ROUTES.EXCERCISE_ROUTINE}
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
    </main>
  );
}
