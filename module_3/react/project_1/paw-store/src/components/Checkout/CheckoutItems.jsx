import { useCart } from '../../context/CartContext';
import './CheckoutItems.css';

function CheckoutItems() {
  // state to bring cart items and total price from the cart
  const { cartItems, totalPrice } = useCart();
  console.log('CheckoutItems - cartItems:', cartItems);
  return (
    <section className="checkout-items">
      <h2 className="checkout-items__title">Resumen del pedido</h2>

      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-items__item">
            <span className="checkout-items__item-name">{item.nombre}</span>
            <span className="checkout-items__item-quantity">
              x{item.cantidad}
            </span>
            <span className="checkout-items__item-price">
              ₡{item.subtotal.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <div className="checkout-items__total">
        <span>Total:</span>
        <span>₡{totalPrice.toLocaleString()}</span>
      </div>
    </section>
  );
}

export default CheckoutItems;
