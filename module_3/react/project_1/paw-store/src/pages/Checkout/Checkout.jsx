import BuyerInfoForm from '../../components/Checkout/BuyerInfoForm';
import CheckoutItems from '../../components/Checkout/CheckoutItems';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { useForm } from 'react-hook-form';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import { ROUTES } from '../../routes/routes';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  // guard to verify if the user is logged in
  const { loggedUser } = useAuth();
  if (!loggedUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // state to bring cart items and total price
  const { cartItems, totalPrice, clearCart } = useCart();

  // guard to verify if the cart is empty
  if (cartItems.length === 0) {
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  // bring the createOrder function from the checkout context
  const { createOrder, createOrderError } = useCheckout();

  // set up the form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle the submit of the buyer info form
  const handleCompleteOrder = async (buyerData) => {
    // create an order with the buyer data and cart data
    const checkoutData = {
      buyer: buyerData,
      items: cartItems,
      total: totalPrice,
      // mock flag for the send email functionality
      sendEmail: true,
    };

    // create order and wait for the response
    const createdOrder = await createOrder(checkoutData);

    // guard clause: if the order was not created, do not proceed
    if (!createdOrder) {
      return;
    }

    /*
    ! this commented code should be used to send an order confirmation email
    ! more details are in the checkoutService.js file
    * await sendOrderConfirmation(createdOrder.id);
    */

    // clear the cart after creating the order
    clearCart();

    // redirect to the order confirmation page
    navigate(ROUTES.CONFIRMATION, {
      // pass the order data to the confirmation page
      state: { orderData: checkoutData },
    });
  };

  return (
    <main className="checkout">
      <h1 className="checkout__title">Checkout</h1>

      <form
        className="checkout__form"
        onSubmit={handleSubmit(handleCompleteOrder)}
      >
        <div className="checkout__form-data-container">
          <BuyerInfoForm register={register} errors={errors} />
          <CheckoutItems />
        </div>

        <button type="submit" className="checkout__confirm-button">
          Confirmar compra
        </button>

        {createOrderError && (
          <h3 className="checkout__error-message">{createOrderError}</h3>
        )}
      </form>
    </main>
  );
}

export default Checkout;
