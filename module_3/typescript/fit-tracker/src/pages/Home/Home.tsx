import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './Home.css';

export function Home() {
  return (
    <main className="home">
      <h1 className="home__title">Welcome to Fit Tracker</h1>

      <p className="home__description">
        This app allows you to track your fitness routines, monitor your
        progress, and stay motivated on your fitness journey.
      </p>

      <p className="home__description">
        Explore our catalog to find workouts, nutrition plans, and fitness
        accessories.
      </p>

      {/* link to user profile page */}
      <NavLink to={ROUTES.USER_PROFILE}>Let's start!</NavLink>
    </main>
  );
}
