import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function patchQuantityProduct(productId, newQuantity) {
  const url = `http://127.0.0.1:5000/cart/item`;
  const payload = {
    product_id: productId,
    quantity: newQuantity,
  };

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.patch(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error(
      "Failed to update product quantity:",
      apiMessage,
      error?.response?.data,
    );
    throw new Error(apiMessage);
  }
}
