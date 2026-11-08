import { BrowserRouter } from 'react-router-dom';
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
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </WeeklyRoutineProvider>
        </InstructorProvider>
      </MemberRoutineProvider>
    </ExerciseCatalogProvider>
  );
}

export default App;
