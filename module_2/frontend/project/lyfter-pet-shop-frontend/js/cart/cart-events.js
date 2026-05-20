import { patchQuantityProduct } from "../requests/patch-quantity-product.js";
import { getTotalCartItems } from "../requests/get-cart.js";

export async function changeQuantity() {
  //quantity change, changes item price display
  const quantityButtons = document.querySelectorAll(".quantity-button");

  quantityButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const itemContainer = event.target.closest(".item-container");
      const itemDisplayPrice = itemContainer.querySelector(".item-price");

      const unitPrice = parseFloat(itemContainer.dataset.price);
      const quantitySelector =
        itemContainer.querySelector(".quantity-selector");
      const newQuantity = parseInt(quantitySelector.value);

      try {
        await patchQuantityProduct(
          itemContainer.dataset.productId,
          newQuantity,
        );

        if (newQuantity === 0) {
          itemContainer.remove();
        }

        const newPrice = (unitPrice * newQuantity).toFixed(2);
        itemDisplayPrice.textContent = `$${newPrice}`;

        // items quantity change
        const itemsQuantitySelectors =
          document.querySelectorAll(".quantity-selector");
        let newTotalItems = 0;
        itemsQuantitySelectors.forEach((selector) => {
          newTotalItems += parseInt(selector.value);
        });
        const totalItemsElement = document.getElementById("total-items");
        totalItemsElement.textContent = `Total Items: ${newTotalItems}`;

        // update subtotal price
        const itemPrices = document.querySelectorAll(".item-price");
        let newSubtotal = 0;
        itemPrices.forEach((itemPrice) => {
          const price = parseFloat(itemPrice.textContent.replace("$", ""));
          newSubtotal += price;
        });
        const subtotalElement = document.getElementById("sub-total-price");
        subtotalElement.textContent = `Subtotal: $${newSubtotal.toFixed(2)}`;

        // set new total quantity items in local storage
        const totalItems = await getTotalCartItems();
        localStorage.setItem(
          "lyfterPetShopCartItems",
          JSON.stringify(totalItems),
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
        alert(`Failed to update quantity: ${error}`);
      }
    });
  });
}

export function goToCheckout() {
  const checkoutButton = document.getElementById("checkout-button");
  checkoutButton.addEventListener("click", () => {
    window.location.href = "./checkout.html";
  });
}
