import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './Cart.css';

function Cart() {
  const { loggedUser } = useAuth();

  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="cart">
        <h1 className="cart__title">Carrito de Compras</h1>
        <h2 className="cart__empty-message">Tu carrito está vacío.</h2>
      </main>
    );
  }

  return (
    <main className="cart">
      <h1 className="cart__title">Carrito de Compras</h1>
      <div className="cart__container">
        <div className="cart__items-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="cart__item-card">
              <div className="cart__item-img-name-container">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="cart__item-img"
                />
                <h3 className="cart__item-name">{item.nombre}</h3>
              </div>

              <div className="cart-item__quantity-container">
                <button
                  className="cart-item__quantity-button-decrease"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="cart-item__quantity-value">
                  {item.cantidad}
                </span>
                <button
                  className="cart-item__quantity-button-increase"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              <div className="cart__item-price-subtotal-container">
                <p className="cart__item-price">
                  ₡{item.precio.toLocaleString('es-CR')}
                </p>
                <h4 className="cart__item-subtotal">
                  Subtotal: ₡{item.subtotal.toLocaleString('es-CR')}
                </h4>
              </div>

              <button
                className="cart__item-button-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Quitar
              </button>
            </div>
          ))}
        </div>

        <div className="cart__total-container">
          <h3 className="cart__total-title">
            Total: ₡{totalPrice.toLocaleString('es-CR')}
          </h3>
          <button
            className="cart__total-button-checkout"
            onClick={() => {
              // redirect in case user is not logged in
              if (!loggedUser) {
                navigate(ROUTES.LOGIN);
              } else {
                navigate(ROUTES.CHECKOUT);
              }
            }}
          >
            Continuar al checkout
          </button>
        </div>
      </div>
    </main>
  );
}
export default Cart;
