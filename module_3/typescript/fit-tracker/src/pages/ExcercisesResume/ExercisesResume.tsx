import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import { useMemberRoutine } from '../../hooks/useMemberRoutine';
import { GroupCategoriesResume } from '../../components/GroupCategory/GroupCategories';
import { UserProfileSummary } from '../../components/UserProfileSummary/UserProfileSummary';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './ExercisesResume.css';

export function ExercisesResume() {
  // state and context hooks
  const { routineName } = useWeeklyRoutine();
  const { activeMember } = useMemberRoutine();

  return (
    <section className="exercises-resume">
      <header className="exercises-resume__header">
        <p className="exercises-resume__eyebrow">Progress overview</p>
        <h1>{routineName || 'No routine name specified'}</h1>
      </header>

      {activeMember && (
        <UserProfileSummary userProfile={activeMember.member} />
      )}
      <GroupCategoriesResume />

      <div className="exercises-resume__actions">
        <NavLink className="exercises-resume__link" to={ROUTES.USER_ROUTINE}>
          Add another exercise
        </NavLink>

        <NavLink className="exercises-resume__link" to={ROUTES.USER_PROFILE}>
          Modify Profile
        </NavLink>
      </div>
    </section>
  );
}
