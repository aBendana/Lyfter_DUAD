//import products from '../../data/products.json';
import { useCatalog } from '../../context/CatalogContext';
import './Products.css';

// simulate no products available
//const catalog = [];

function Products({ setCurrentPage, setSelectedProduct }) {
  const { catalog } = useCatalog();

  if (!catalog || catalog.length === 0) {
    return (
      <main className="products products--empty">
        <h1 className="products__title-no-products">
          No hay productos disponibles por el momento
        </h1>
      </main>
    );
  }

  return (
    <main className="products">
      <h1 className="products__title">Catálogo de Productos</h1>
      <div className="products__grid">
        {catalog.map((product) => (
          <div key={product.id} className="product__card">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="product__img"
            />
            <div className="product__details">
              <h2 className="product__name">{product.nombre}</h2>
              <p className="product__price">
                ₡{product.precio.toLocaleString('es-CR')}
              </p>
              <span className="product__category">{product.categoria}</span>
              <button
                className="product__button"
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentPage('product-details');
                }}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;
