import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function postCart(productId, quantity) {
  const url = "http://127.0.0.1:5000/cart";
  const data = {
    product_id: productId,
    quantity: quantity,
  };

  try {
    const authenticated = await initAuth();
    if (!authenticated) return;

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Post Cart Error:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}
