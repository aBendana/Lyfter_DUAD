import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function getCart() {
  const url = "http://127.0.0.1:5000/cart";

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    const cartJson = response.data;

    return cartJson;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Cart fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}

export async function getTotalCartItems() {
  try {
    const cartInfo = await getCart();
    if (!cartInfo) return 0;
    const cartItems = cartInfo.cart_details;

    let totalItemsQuantity = 0;
    for (const item of cartItems) {
      totalItemsQuantity += item.quantity;
    }

    localStorage.setItem(
      "lyfterPetShopCartItems",
      JSON.stringify(totalItemsQuantity),
    );
    return totalItemsQuantity;
  } catch (error) {
    console.error("Failed to get cart items:", error.message);
    return 0;
  }
}

export async function getCartProductIds() {
  try {
    const cartInfo = await getCart();
    if (!cartInfo) return [];
    const cartItems = cartInfo.cart_details;
    const productIds = cartItems.map((item) => item.product_id);
    return productIds;
  } catch (error) {
    console.error("Failed to get cart product IDs:", error.message);
    return [];
  }
}
