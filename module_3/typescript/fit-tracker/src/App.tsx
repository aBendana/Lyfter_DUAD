import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { WeeklyRoutineProvider } from './context/WeeklyRoutineProvider';
import { MemberRoutineProvider } from './context/MemberRoutineProvider';
import { InstructorProvider } from './context/InstructorProvider';
import { ExerciseCatalogProvider } from './context/ExerciseCatalogProvider';

function App() {
  return (
    <ExerciseCatalogProvider>
      <MemberRoutineProvider>
        <InstructorProvider>
          <WeeklyRoutineProvider>
            <Router>
              <AppRoutes />
            </Router>
          </WeeklyRoutineProvider>
        </InstructorProvider>
      </MemberRoutineProvider>
    </ExerciseCatalogProvider>
  );
}

export default App;
