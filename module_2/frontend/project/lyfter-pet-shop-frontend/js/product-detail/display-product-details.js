import { getProductById } from "../requests/get-products.js";
import { getCategoryImage } from "../utils/categories-img.js";

export async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    console.error("No product ID found in URL");
    const productDetailsSection = document.getElementById(
      "product-detail-section",
    );
    productDetailsSection.innerHTML = `<p class="error-message-generic">No product ID found. Please try again.</p>`;
    return;
  }

  try {
    const product = await getProductById(productId);
    // console.log("Product details:", product);

    document.getElementById("product-image-detail").src = getCategoryImage(
      product.target_species,
    );
    document.getElementById("product-name-d").textContent = product.name;
    document.getElementById("product-description-d").innerHTML =
      `<strong>About this product:</strong><br>${product.description}`;
    document.getElementById("product-price-d").innerHTML =
      `<strong>Price:</strong><br>$${product.price}`;

    // set buy quantity
    const stockQuantity = product.stock;
    let maxBuyQuantity = 0;
    if (stockQuantity === 0) {
      maxBuyQuantity = 0;
    } else if (stockQuantity >= 10) {
      maxBuyQuantity = 10;
    } else if (stockQuantity < 10) {
      maxBuyQuantity = stockQuantity;
    }

    //dinamically populate the quantity selector with options from 1 to maxBuyQuantity
    const quantitySelectorContainer = document.getElementById(
      "quantity-selector-container",
    );
    if (maxBuyQuantity === 0) {
      // out of stock message
      const outOfStockMessage = document.createElement("h3");
      outOfStockMessage.classList.add("out-of-stock-message");
      outOfStockMessage.textContent = "Out of Stock";
      quantitySelectorContainer.appendChild(outOfStockMessage);
    } else {
      // in stock message
      const inStockMessage = document.createElement("h3");
      inStockMessage.classList.add("in-stock-message");
      inStockMessage.textContent = "In Stock";
      quantitySelectorContainer.appendChild(inStockMessage);

      // create quantity selector
      const quantitySelector = document.createElement("select");
      quantitySelector.id = "quantity-selector";
      quantitySelector.classList.add("quantity-selector");
      quantitySelector.size = 1;
      quantitySelector.required = true;

      for (let i = 1; i <= maxBuyQuantity; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = "Quantity: " + i;
        quantitySelector.appendChild(option);
      }
      quantitySelectorContainer.appendChild(quantitySelector);

      // add to cart button
      const addToCartButton = document.createElement("button");
      addToCartButton.id = "add-to-cart-button";
      addToCartButton.classList.add("add-to-cart-button");
      addToCartButton.textContent = "Add to Cart";
      quantitySelectorContainer.appendChild(addToCartButton);
    }
  } catch (error) {
    const loadErrorMessage = document.getElementById("load-error");
    loadErrorMessage.textContent =
      "We're sorry. Product details not available at the moment.";
    console.error("Error loading product details:", error);
    return;
  }
}
