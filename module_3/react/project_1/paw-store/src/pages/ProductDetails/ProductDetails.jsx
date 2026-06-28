import './ProductDetails.css';

function ProductDetails({ product, setCurrentPage }) {
  if (!product) {
    return (
      <main className="product-details">
        <p>No se encontró el producto.</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('products');
          }}
        >
          Volver a productos
        </a>
      </main>
    );
  }

  return (
    <main className="product-details">
      <div className="card">
        <img src={product.imagen} alt={product.nombre} className="card__img" />

        {/* container for product details */}
        <div className="card__body">
          <h2 className="card__name">{product.nombre}</h2>
          <p className="product__price">
            ₡{product.precio.toLocaleString('es-CR')}
          </p>
          <span className="card__category">{product.categoria}</span>
          <p className="card__desc">{product.descripcion}</p>
          <p className="card__informative">
            Más adelante aquí se podrá agregar este producto al carrito y
            completar la compra.
          </p>
          <button
            className="card__btn"
            onClick={() => setCurrentPage('products')}
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
