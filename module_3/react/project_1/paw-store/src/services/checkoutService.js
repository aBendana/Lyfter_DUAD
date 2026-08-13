import api from './api';

export const checkoutService = {
  async createOrder(checkoutData) {
    try {
      const res = await api.post('/orders', checkoutData);
      return res.data;
    } catch (err) {
      console.error(
        'Create checkout error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  /*
   ! sends an order confirmation email for the specified order ID.
   ! this code is not currently used in the application,
   ! but it is implemented and commented out
   ! in case we work with a real backend with email capabilities.
   */

  /*
   * async sendOrderConfirmation(orderId) {
   *  try {
   *      const res = await api.post(`/orders/${orderId}/send-confirmation`);
   *      return res.data;
   *    } catch (err) {
   *      console.error(
   *        'Send order confirmation error:',
   *        err.response?.data?.message || err.message
   *      );
   *      throw new Error(err.response?.data?.message || err.message);
   *    }
   *  },
   */
};
