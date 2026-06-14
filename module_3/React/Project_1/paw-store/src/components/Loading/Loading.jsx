import './Loading.css';

function Loading() {
  return (
    <main className="loading">
      <div className="loading__spinner"></div>
      <p className="loading__text">Cargando productos...</p>
    </main>
  );
}

export default Loading;
