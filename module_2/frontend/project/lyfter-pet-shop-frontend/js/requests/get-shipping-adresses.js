import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function getShippingAddresses() {
  const url = "http://127.0.0.1:5000/client/info/shipping-addresses";

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    const shippingAddresses = response.data;
    return shippingAddresses;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error(
      "Shipping addresses fetch failed:",
      apiMessage,
      error?.response?.data,
    );
    throw new Error(apiMessage);
  }
}

export async function getShippingAddressById(addressId) {
  const url = `http://127.0.0.1:5000/client/info/shipping-addresses?id=${addressId}`;

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    const shippingAddress = response.data;
    return shippingAddress;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error(
      "Shipping address fetch failed:",
      apiMessage,
      error?.response?.data,
    );
    throw new Error(apiMessage);
  }
}
