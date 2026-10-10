import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import '../Dashboard/Dashboard.css';

export function InstructorDashboard() {
  return (
    <main className="dashboard">
      <aside className="dashboard__sidebar">
        <p className="dashboard__eyebrow">Fit Tracker</p>
        <h1 className="dashboard__title">Instructor panel</h1>

        <nav
          className="dashboard__navigation"
          aria-label="Instructor dashboard"
        >
          <NavLink className="dashboard__item" to={ROUTES.INSTRUCTOR_PROFILE}>
            Instructor Profile
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.MEMBERS_ASSIGNMENT}>
            Members Assignment
          </NavLink>

          <NavLink
            className="dashboard__item"
            to={ROUTES.INSTRUCTOR_MEMBERS_RESUME}
          >
            Members Resume
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
