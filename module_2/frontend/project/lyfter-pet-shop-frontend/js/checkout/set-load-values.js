// some of these options should be fetched from backend,
// but for now we will set it manuallly for testing purposes
// payment methods, shipping gonna be loaded as functions
// and discount vouchers gonna be set in session storage

import { getShippingAddresses } from "../requests/get-shipping-adresses.js";

export function userInfo() {
  // get user info from local storage
  const userInfo = JSON.parse(localStorage.getItem("lyfterPetShopSession"));
  console.log("Fetched user info from local storage:", userInfo);
  if (!userInfo) return null;

  const name = userInfo.name;
  const email = userInfo.email;
  const phone = userInfo.phone_number;

  return { name, email, phone };
}

export async function userShippingAddresses() {
  const shippingAddressesDetails = await getShippingAddresses();
  const shippingAddresses = shippingAddressesDetails.map((address) => ({
    id: address.id,
    label: `${address.address}, ${address.canton}, ${address.province} ${address.postal_code}`,
  }));
  return shippingAddresses;
}

export function optionsForPaymentMethods() {
  const optionsPaymentMethods = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank_transfer", label: "Bank Transfer" },
  ];
  return optionsPaymentMethods;
}

export function optionsForShippingMethods() {
  const optionsShippingMethods = [
    { value: "standard", label: "Standard Shipping", cost: 5.0 },
    { value: "express", label: "Express Shipping", cost: 15.0 },
    { value: "overnight", label: "Overnight Shipping", cost: 25.0 },
  ];
  //return optionsShippingMethods;
  sessionStorage.setItem(
    "lyfterPetShopShippingMethods",
    JSON.stringify(optionsShippingMethods),
  );
}

export function discountVouchers() {
  const discountsVouchers = [
    { voucher: "FIRSTBUY", amount: 10 },
    { voucher: "HAPPYDOG", amount: 5 },
    { voucher: "SUMMERTIME", amount: 15 },
  ];

  sessionStorage.setItem(
    "lyfterPetShopDiscounts",
    JSON.stringify(discountsVouchers),
  );
}
