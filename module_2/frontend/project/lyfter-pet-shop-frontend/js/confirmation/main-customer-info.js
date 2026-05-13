import { getShippingAddressById } from "../requests/get-shipping-adresses.js";

export async function displayCustomerInfo() {
  // gather user data
  const userData = JSON.parse(localStorage.getItem("lyfterPetShopSession"));
  const userName = userData?.name || "N/A";
  const userEmail = userData?.email || "N/A";

  // get shipping address id
  const invoiceData = JSON.parse(
    sessionStorage.getItem("lyfterPetShopInvoiceData"),
  );
  const customerInfoSection = document.getElementById("customer-info-section");
  const shippingAddressId = invoiceData?.invoice?.[0]?.shipping_address_id;
  if (!shippingAddressId) {
    customerInfoSection.innerHTML = `<p class="error-message-generic">Order details are incomplete. Shipping address not found.</p>`;
    return;
  }
  const shippingAddressData = await getShippingAddressById(shippingAddressId);
  const shippingAddress = shippingAddressData?.[0];
  if (!shippingAddress) {
    customerInfoSection.innerHTML = `<p class="error-message-generic">Could not load shipping address. Please contact support.</p>`;
    return;
  }
  // format shipping address for display
  const shippingAddressFormatted = `${shippingAddress.address}, ${shippingAddress.canton}, ${shippingAddress.province}`;
  const shippingPostalCode = shippingAddress.postal_code;

  // other data
  const shippingMethod = invoiceData?.invoice?.[0]?.shipping_method || "N/A";
  const paymentMethod = invoiceData?.invoice?.[0]?.payment_method || "N/A";
  const orderId = invoiceData?.invoice?.[0]?.id || "N/A";

  // display data on page
  document.getElementById("order-id").textContent = `Order # ID: ${orderId}`;
  document.getElementById("customer-email").textContent = userEmail;
  document.getElementById("customer-name").textContent = userName;
  document.getElementById("customer-shipping-method").textContent =
    `Shipping method: ${shippingMethod}`;
  document.getElementById("customer-shipping-address").textContent =
    `Address: ${shippingAddressFormatted}`;
  document.getElementById("customer-shipping-postal-code").textContent =
    shippingPostalCode;
  document.getElementById("customer-payment-method").textContent =
    paymentMethod;
}
