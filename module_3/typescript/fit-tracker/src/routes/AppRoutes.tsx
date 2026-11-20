import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import { Home } from '../pages/Home/Home';
import { UserProfile } from '../pages/UserProfile/UserProfile';
import { UserRoutine } from '../pages/UserRoutine/UserRoutine';
import { ExercisesResume } from '../pages/ExcercisesResume/ExercisesResume';
import { WeeklyRoutineResume } from '../pages/WeeklyRoutineResume/WeeklyRoutineResume';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { InstructorDashboard } from '../components/InstructorDashboard/InstructorDashboard';
import { InstructorProfile } from '../pages/InstructorProfile/InstructorProfile';
import { MembersAssignment } from '../pages/MembersAssignment/MembersAssignment';
import { InstructorMembersResume } from '../pages/InstructorMembersResume/InstructorMembersResume';
import { NinjaExercises } from '../pages/NinjaExercises/NinjaExercises';
import { UnifiedReport } from '../pages/UnifiedReport/UnifiedReport';
import { AdminDashboard } from '../components/AdminDashboard/AdminDashboard';
import { AdminOverview } from '../pages/AdminOverview/AdminOverview';
import { AdminMemberships } from '../pages/AdminMemberships/AdminMemberships';
import { AdminInstructors } from '../pages/AdminInstructors/AdminInstructors';
import { AdminCatalog } from '../pages/AdminCatalog/AdminCatalog';
import { AdminActivity } from '../pages/AdminActivity/AdminActivity';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />

      <Route element={<Dashboard />}>
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
        <Route path={ROUTES.NINJA_EXERCISES} element={<NinjaExercises />} />
        <Route path={ROUTES.USER_ROUTINE} element={<UserRoutine />} />
        <Route path={ROUTES.EXERCISES_RESUME} element={<ExercisesResume />} />
        <Route
          path={ROUTES.WEEKLY_ROUTINE_RESUME}
          element={<WeeklyRoutineResume />}
        />
        <Route path={ROUTES.UNIFIED_REPORT} element={<UnifiedReport />} />
      </Route>

      <Route element={<InstructorDashboard />}>
        <Route
          path={ROUTES.INSTRUCTOR_PROFILE}
          element={<InstructorProfile />}
        />
        <Route
          path={ROUTES.MEMBERS_ASSIGNMENT}
          element={<MembersAssignment />}
        />
        <Route
          path={ROUTES.INSTRUCTOR_MEMBERS_RESUME}
          element={<InstructorMembersResume />}
        />
      </Route>

      <Route element={<AdminDashboard />}>
        <Route path={ROUTES.ADMIN_OVERVIEW} element={<AdminOverview />} />
        <Route path={ROUTES.ADMIN_MEMBERSHIPS} element={<AdminMemberships />} />
        <Route path={ROUTES.ADMIN_INSTRUCTORS} element={<AdminInstructors />} />
        <Route path={ROUTES.ADMIN_CATALOG} element={<AdminCatalog />} />
        <Route path={ROUTES.ADMIN_ACTIVITY} element={<AdminActivity />} />
      </Route>
    </Routes>
  );
}
