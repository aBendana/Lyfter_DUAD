import { createContext, useContext, useState } from 'react';
import { checkoutService } from '../services/checkoutService';

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  // state to manage the error message for the create order operation
  const [createOrderError, setCreateOrderError] = useState('');

  const createOrder = async (checkoutData) => {
    try {
      // clear any previous error messages
      setCreateOrderError('');

      const newOrder = await checkoutService.createOrder(checkoutData);
      return newOrder;
    } catch (error) {
      setCreateOrderError(
        'Ocurrió un problema al procesar tu compra. Por favor intenta de nuevo.'
      );
      console.error('Create order error:', error);

      // return null to indicate that the order creation failed
      // useful for the use of guard clauses (checkout page)
      return null;
    }
  };

  /*
  ! this is the code we should use to send an order confirmation email 
  ! if we had a real backend with email capabilities
  ! details are in the checkoutService.js file

   * const sendOrderConfirmation = async (orderId) => {
   *  try {
   *    return await checkoutService.sendOrderConfirmation(orderId);
   *  } catch (error) {
   *    console.error('Send order confirmation error:', error);
   *    return null;
   *  }
   * };
  */

  return (
    <CheckoutContext.Provider value={{ createOrder, createOrderError }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
