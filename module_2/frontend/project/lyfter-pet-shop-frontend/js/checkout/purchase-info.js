import {
  userInfo,
  userShippingAddresses,
  optionsForShippingMethods,
  optionsForPaymentMethods,
  discountVouchers,
} from "./set-load-values.js";

export async function populateCheckoutInfo() {
  discountVouchers();
  optionsForShippingMethods();
  const user = userInfo();
  const shippingAddresses = await userShippingAddresses();
  //const optionsShippingMethods = optionsForShippingMethods();
  const optionsPaymentMethods = optionsForPaymentMethods();

  const name = document.getElementById("checkout-full-name");
  const email = document.getElementById("checkout-email");
  const phone = document.getElementById("checkout-phone");
  name.textContent = user.name;
  email.textContent = user.email;
  phone.textContent = user.phone;

  // shipping address
  const shippingAddressSelect = document.getElementById("shipping-address");
  shippingAddresses.forEach((address) => {
    const option = document.createElement("option");
    option.value = address.id;
    option.textContent = address.label;
    shippingAddressSelect.appendChild(option);
  });

  // shipping method
  const shippingMethodSelect = document.getElementById("shipping-method");
  const optionsShippingMethods =
    JSON.parse(sessionStorage.getItem("lyfterPetShopShippingMethods")) || [];
  optionsShippingMethods.forEach((shipping) => {
    const option = document.createElement("option");
    option.value = shipping.value;
    option.textContent = shipping.label;
    shippingMethodSelect.appendChild(option);
  });

  // payment method
  const paymentMethodSelect = document.getElementById("payment-method");
  optionsPaymentMethods.forEach((payment) => {
    const option = document.createElement("option");
    option.value = payment.value;
    option.textContent = payment.label;
    paymentMethodSelect.appendChild(option);
  });
}
