import './ProductDetails.css';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import Loading from '../../components/Loading';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

function ProductDetails() {
  const { products, loading } = useProducts();
  const { id: productId } = useParams(); // get the product ID
  const product = products.find((p) => p.id === productId); // find the product by ID
  const navigate = useNavigate();
  const { cartTotalItems, addToCart } = useCart();

  // handle adding the product to the cart
  const handleAddToCart = () => {
    addToCart(product);
  };

  // loading guard in case the products are still being fetched from the API
  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <main className="product-details">
        <p>No se encontró el producto.</p>
        <NavLink to={ROUTES.PRODUCTS}>Volver a productos</NavLink>
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

          <button className="card__btn" onClick={handleAddToCart}>
            Agregar al carrito
          </button>

          <button
            className={`card__btn ${cartTotalItems === 0 ? 'card_btn-disabled' : ''}`}
            disabled={cartTotalItems === 0}
            onClick={() => navigate(ROUTES.CART)}
          >
            Ir al carrito
          </button>

          <NavLink
            to={ROUTES.PRODUCTS}
            className="card__btn card__btn-products"
          >
            Volver al catálogo
          </NavLink>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
