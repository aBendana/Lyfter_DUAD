import { useProducts } from '../../context/ProductsContext';
import Loading from '../../components/Loading';
import './Products.css';

// simulate no products available
//const catalog = [];

function Products({ setCurrentPage, setSelectedProductDetailsId }) {
  const { products, loading, loadProductsError } = useProducts();
  console.log('Products:', products);

  if (loading) {
    return <Loading />;
  }

  // guard in case there is an error while fetching products from the API
  if (loadProductsError) {
    return (
      <main className="products products--empty">
        <h1 className="products__title-no-products">
          No se pudo cargar el catálogo
        </h1>
        <p className="products__error-message">{loadProductsError}</p>
      </main>
    );
  }

  // guard in case there are no products available in the catalog
  if (!products || products.length === 0) {
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
        {products.map((product) => (
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
                  setSelectedProductDetailsId(product.id);
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
