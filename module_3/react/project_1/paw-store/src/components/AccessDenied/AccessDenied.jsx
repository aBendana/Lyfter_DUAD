import './AccessDenied.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <main className="access-denied">
      <h1 className="access-denied__title">Acceso Denegado</h1>
      <p className="access-denied__message">
        No tienes permiso para acceder a esta sección.
      </p>
      <button
        className="access-denied__button"
        onClick={() => navigate(ROUTES.HOME)}
      >
        Ir a Inicio
      </button>
    </main>
  );
}

export default AccessDenied;
