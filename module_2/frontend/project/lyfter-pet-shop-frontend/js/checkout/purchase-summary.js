import { getCart } from "../requests/get-cart.js";
import { setShippingCost } from "./set-shipping-cost.js";
import { setDiscount } from "./set-discount.js";
import { setTaxTotalPrice } from "./set-tax-total.js";

export async function populateProductSummary() {
  try {
    const cartInfo = await getCart();
    if (!cartInfo) return;

    const cartItems = cartInfo.cart_details;
    //console.log("Fetched cart items for summary:", cartItems);

    // items summary
    const totalItemsText = document.getElementById("total-items");
    const totalItems = localStorage.getItem("lyfterPetShopCartItems");
    totalItemsText.textContent = `Total items quantity: ${totalItems}`;

    // product list
    const productsContainer = document.getElementById(
      "checkout-items-container",
    );
    cartItems.forEach((item) => {
      const productItem = document.createElement("p");
      productItem.textContent = `${item.product_name} x ${item.quantity} = $${(item.product_price * item.quantity).toFixed(2)}`;
      productsContainer.appendChild(productItem);
    });

    // subtotal
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0,
    );
    const subtotal = calculatedSubtotal.toFixed(2);

    const subtotalText = document.getElementById("subtotal");
    subtotalText.textContent = `Subtotal: $${subtotal}`;

    // discount
    setDiscount(calculatedSubtotal);

    //shipping cost
    setShippingCost();

    // tax
    // tax is calculated as 7% of the subtotal after discount and adding shipping cost
    // do it dinamically in case user changes discount code or shipping method
    // VERY IMPORTANT: total price is calculated in the same module
    setTaxTotalPrice();
  } catch (error) {
    const summaryContainer = document.getElementById(
      "checkout-items-container",
    );
    summaryContainer.innerHTML = `<p class="error-message-generic">Failed to load purchase summary: ${error}. Please try again.</p>`;
  }
}
