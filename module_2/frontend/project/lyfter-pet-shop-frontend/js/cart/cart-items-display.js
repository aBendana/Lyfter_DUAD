import { getCart } from "../requests/get-cart.js";
import { getCategoryImage } from "../utils/categories-img.js";

async function getItemsInCart() {
  const response = await getCart();
  if (!response) return [];
  return response.cart_details;
}

export async function displayCartItems() {
  let subTotalPrice = 0; // initialize total price variable
  const cartItemsSection = document.getElementById("cart-items-section");

  let cartItemsArray;
  try {
    cartItemsArray = await getItemsInCart();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    // cartItemsSection.innerHTML = `<p class="error-message-generic">Failed to load cart: ${error}. Please reload the page.</p>`;
  }

  // if cart is empty or not cart display message and hide cart summary
  if (!cartItemsArray || cartItemsArray.length === 0) {
    const cartTitle = document.getElementById("cart-title");
    cartTitle.textContent = "Your cart is empty";

    const cartAllInfo = document.getElementById("cart-info");
    cartAllInfo.textContent = "";
    cartAllInfo.style.display = "none";
    return;
  }

  cartItemsArray.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    itemContainer.dataset.productId = item.product_id;
    itemContainer.dataset.price = item.product_price;
    cartItemsSection.appendChild(itemContainer);

    // create img with figure tag for use a semantic structure
    const productFigure = document.createElement("figure");
    productFigure.classList.add("product-figure");
    const productImg = document.createElement("img");
    productImg.src = getCategoryImage(item.product_target_species);
    productImg.alt = item.name;
    productImg.classList.add("product-image");
    productFigure.appendChild(productImg);
    itemContainer.appendChild(productFigure);

    //create item info container
    const itemInfoContainer = document.createElement("div");
    itemInfoContainer.classList.add("item-info-container");
    itemContainer.appendChild(itemInfoContainer);

    // create item name
    const itemName = document.createElement("h3");
    itemName.textContent = `${item.product_name}`;
    itemName.classList.add("item-name");
    itemInfoContainer.appendChild(itemName);

    const quantitySelectorContainer = document.createElement("div");
    quantitySelectorContainer.classList.add("quantity-selector-container");
    itemInfoContainer.appendChild(quantitySelectorContainer);

    const quantityButton = document.createElement("button");
    quantityButton.textContent = "Change quantity:";
    quantityButton.classList.add("quantity-button");
    quantitySelectorContainer.appendChild(quantityButton);

    // create item quantity selector
    // set buy quantity
    const stockQuantity = item.product_stock;
    let maxBuyQuantity = 0;
    if (stockQuantity === 0) {
      maxBuyQuantity = 0;
    } else if (stockQuantity >= 10) {
      maxBuyQuantity = 10;
    } else if (stockQuantity < 10) {
      maxBuyQuantity = stockQuantity;
    }

    const quantitySelector = document.createElement("select");
    quantitySelector.classList.add("quantity-selector");
    quantitySelector.size = 1;
    quantitySelector.required = true;

    for (let i = 0; i <= maxBuyQuantity; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (i === item.quantity) {
        option.selected = true; // actual quantity
        option.classList.add("option-default");
      }
      quantitySelector.appendChild(option);
    }
    quantitySelectorContainer.appendChild(quantitySelector);

    // create item price
    const itemFinalPrice = item.quantity * item.product_price;
    const itemPrice = document.createElement("p");
    itemPrice.id = "item-display-price";
    itemPrice.dataset.productId = item.product_id;
    itemPrice.dataset.price = item.product_price;
    itemPrice.textContent = `$${itemFinalPrice.toFixed(2)}`;
    itemPrice.classList.add("item-price");
    itemInfoContainer.appendChild(itemPrice);

    // update cart total price
    subTotalPrice += itemFinalPrice;
  });

  // display total items and total price in cart summary
  const totalItemsElement = document.getElementById("total-items");
  let totalItems = 0;
  cartItemsArray.forEach((item) => {
    totalItems += item.quantity;
  });
  totalItemsElement.textContent = `Total Items: ${totalItems}`;

  const subTotalPriceElement = document.getElementById("sub-total-price");
  subTotalPriceElement.textContent = `Subtotal: $${subTotalPrice.toFixed(2)}`;
}
