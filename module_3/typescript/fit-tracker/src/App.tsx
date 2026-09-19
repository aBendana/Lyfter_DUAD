import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { UserProfileProvider } from './context/UserProfileProvider';
import { WeeklyRoutineProvider } from './context/WeeklyRoutineProvider';

function App() {
  return (
    <UserProfileProvider>
      <WeeklyRoutineProvider>
        <Router>
          <AppRoutes />
        </Router>
      </WeeklyRoutineProvider>
    </UserProfileProvider>
  );
}

export default App;
