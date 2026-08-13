import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found">
      <h1 className="not-found__title">Página no encontrada</h1>
      <p className="not-found__message">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link className="not-found__link-button" to={ROUTES.HOME}>
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;
