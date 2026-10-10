import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './Dashboard.css';

export function Dashboard() {
  return (
    <main className="dashboard">
      <aside className="dashboard__sidebar">
        <p className="dashboard__eyebrow">Fit Tracker</p>
        <h1 className="dashboard__title">Your training</h1>

        <nav className="dashboard__navigation" aria-label="Routine dashboard">
          <NavLink className="dashboard__item" to={ROUTES.USER_PROFILE}>
            Your Profile
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.USER_ROUTINE}>
            Create Your Weekly Routine
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.EXERCISES_RESUME}>
            Your Exercises Resume
          </NavLink>

          <NavLink
            className="dashboard__item"
            to={ROUTES.WEEKLY_ROUTINE_RESUME}
          >
            Your Weekly Statistics Resume
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.HOME}>
            Back Home!
          </NavLink>
        </nav>
      </aside>

      <section className="dashboard__content" aria-live="polite">
        <Outlet />
      </section>
    </main>
  );
}
