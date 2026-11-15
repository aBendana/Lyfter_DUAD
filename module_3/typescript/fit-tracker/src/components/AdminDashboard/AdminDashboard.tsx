import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import '../Dashboard/Dashboard.css';

export function AdminDashboard() {
  return (
    <main className="dashboard">
      <aside className="dashboard__sidebar">
        <p className="dashboard__eyebrow">Fit Tracker</p>
        <h1 className="dashboard__title">Administrator panel</h1>

        <nav className="dashboard__navigation" aria-label="Admin dashboard">
          {/* `end` keeps overview from looking active on its sub-routes */}
          <NavLink className="dashboard__item" to={ROUTES.ADMIN_OVERVIEW} end>
            Overview
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.ADMIN_MEMBERSHIPS}>
            Memberships
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.ADMIN_INSTRUCTORS}>
            Instructors
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.ADMIN_CATALOG}>
            Exercise Catalog
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.ADMIN_ACTIVITY}>
            Recent Activity
          </NavLink>

          {/* from here the admin reaches every section of the app */}
          <NavLink className="dashboard__item" to={ROUTES.USER_PROFILE}>
            Member Area
          </NavLink>

          <NavLink className="dashboard__item" to={ROUTES.INSTRUCTOR_PROFILE}>
            Instructor Area
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
