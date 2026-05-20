export function setTaxTotalPrice() {
  // clear previous tax and total price values
  const taxText = document.getElementById("tax-amount");
  const totalPriceText = document.getElementById("total-price");
  taxText.textContent = "";
  totalPriceText.textContent = "";

  const subtotal =
    parseFloat(
      document
        .getElementById("subtotal")
        .textContent.replace("Subtotal: $", ""),
    ) || 0;

  const discountRaw = document
    .getElementById("discount-amount")
    .textContent.replace("Discount: -$", "")
    .replace("Discount: $", "");
  const discount = parseFloat(discountRaw) || 0;

  const shippingCost =
    parseFloat(
      document
        .getElementById("shipping-cost")
        .textContent.replace("Shipping Cost: $", ""),
    ) || 0;

  const calculatedTax = ((subtotal - discount + shippingCost) * 0.07).toFixed(
    2,
  );
  taxText.textContent = `Tax: $${calculatedTax}`;

  const totalPrice = (
    subtotal -
    discount +
    shippingCost +
    parseFloat(calculatedTax)
  ).toFixed(2);
  totalPriceText.textContent = `Total: $${totalPrice}`;
}
