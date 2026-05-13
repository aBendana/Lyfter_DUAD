import { getProductById } from "../requests/get-products.js";
import { productInfoContent } from "./product-info-content.js";
import { editProductInfo } from "./edit-product.js";

export async function handleViewProduct(productId) {
  try {
    const product = await getProductById(productId);
    console.log("Fetched product:", product); // Debug log to check fetched product
    productInfoContent(product);
    editProductInfo(product.id);
  } catch (error) {
    console.error("Error fetching product:", error);
    const productInfoContainer = document.getElementById("dashboard-content");
    productInfoContainer.innerHTML = `<p class="error-message-generic">Failed to load product info: ${error}. Please try again later.</p>`;
  }
}
