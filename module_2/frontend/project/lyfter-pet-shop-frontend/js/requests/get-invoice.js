import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function getInvoiceById(orderId) {
  const url = `http://127.0.0.1:5000/invoice?id=${orderId}`;

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    const invoiceJson = response.data;

    return invoiceJson;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Invoice fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}
