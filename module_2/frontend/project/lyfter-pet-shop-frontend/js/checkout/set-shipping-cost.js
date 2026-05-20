import { setTaxTotalPrice } from "./set-tax-total.js";

export function setShippingCost() {
  const allShippingMethods =
    JSON.parse(sessionStorage.getItem("lyfterPetShopShippingMethods")) || [];

  const shippingMethodSelect = document.getElementById("shipping-method");

  shippingMethodSelect.addEventListener("change", () => {
    let shippingCost = 0;
    const shippingMethod = document.getElementById("shipping-method").value;

    const selectedShippingMethod = allShippingMethods.find(
      (method) => method.value === shippingMethod,
    );
    if (selectedShippingMethod) {
      shippingCost = selectedShippingMethod.cost;
    }

    const shippingCostText = document.getElementById("shipping-cost");
    shippingCostText.textContent = `Shipping Cost: $${shippingCost.toFixed(2)}`;

    setTaxTotalPrice();
  });
}
