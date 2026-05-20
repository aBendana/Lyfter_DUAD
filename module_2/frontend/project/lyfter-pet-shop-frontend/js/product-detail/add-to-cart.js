import { getCartProductIds } from "../requests/get-cart.js";
import { patchQuantityProduct } from "../requests/patch-quantity-product.js";
import { postCart } from "../requests/post-cart.js";
import { getTotalCartItems } from "../requests/get-cart.js";
import { showModal } from "./added-modal.js";

export async function isProductInCart(productId, selectedQuantity) {
  const cartProductIdsArray = await getCartProductIds();

  for (const id of cartProductIdsArray) {
    if (id === productId) {
      console.log("Product already in cart, updating quantity...");
      await patchQuantityProduct(productId, selectedQuantity);

      const totalItems = await getTotalCartItems();
      localStorage.setItem(
        "lyfterPetShopCartItems",
        JSON.stringify(totalItems),
      );

      showModal("This item is already in your cart. Quantity updated.");
      return true;
    }
  }
  return false;
}

export async function addToCart() {
  const sessionData = localStorage.getItem("lyfterPetShopSession");
  const userRole = sessionData ? JSON.parse(sessionData).role : null;

  const addToCartButton = document.getElementById("add-to-cart-button");
  if (!addToCartButton) return;

  if (userRole === "client") {
    addToCartButton.addEventListener("click", async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = parseInt(urlParams.get("id"), 10);

      const quantitySelector = document.getElementById("quantity-selector");
      const selectedQuantity = parseInt(quantitySelector.value, 10);

      try {
        if (await isProductInCart(productId, selectedQuantity)) return;
        await postCart(productId, selectedQuantity);

        const totalItems = await getTotalCartItems();
        localStorage.setItem(
          "lyfterPetShopCartItems",
          JSON.stringify(totalItems),
        );

        showModal(`Successfully added ${selectedQuantity} item(s) to cart!`);
      } catch (error) {
        console.error(error);
        showModal(`Could not add to cart`);
      }
    });
  } else {
    // disable add to cart button for admin users
    addToCartButton.disabled = true;
  }
}
