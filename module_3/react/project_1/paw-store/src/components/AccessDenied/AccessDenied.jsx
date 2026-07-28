import './AccessDenied.css';

function AccessDenied({ setCurrentPage }) {
  return (
    <div className="access-denied">
      <h1 className="access-denied__title">Acceso Denegado</h1>
      <p className="access-denied__message">
        No tienes permiso para acceder a esta sección.
      </p>
      <button
        className="access-denied__button"
        onClick={() => setCurrentPage('home')}
      >
        Ir a Inicio
      </button>
    </div>
  );
}

export default AccessDenied;
