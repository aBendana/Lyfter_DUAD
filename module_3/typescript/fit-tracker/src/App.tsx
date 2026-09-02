import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { UserProfileProvider } from './context/UserProfileContext';
import { WeeklyRoutineProvider } from './context/WeeklyRoutineContext';

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
