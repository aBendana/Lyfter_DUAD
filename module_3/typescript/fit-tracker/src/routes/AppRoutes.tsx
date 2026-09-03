import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import { Home } from '../pages/Home/Home';
import { ExerciseRoutine } from '../pages/ExerciseRoutine/ExerciseRoutine';
import { UserProfile } from '../pages/UserProfile/UserProfile';
import { WeeklyRoutineResume } from '../pages/WeeklyRoutineResume/WeeklyRoutineResume';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.EXCERCISE_ROUTINE} element={<ExerciseRoutine />} />
      <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
      <Route
        path={ROUTES.WEEKLY_ROUTINE_RESUME}
        element={<WeeklyRoutineResume />}
      />
    </Routes>
  );
}
