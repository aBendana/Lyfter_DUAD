import { getProductsBySearch } from "../requests/get-products.js";
import { createProductsGrid } from "../products/products-grid.js";

// search products by name when the user types in the search input
export async function displaySearchProducts() {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const productsTitle = document.getElementById("products-search-title");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    console.log(`Search term: "${searchTerm}"`);
    if (searchTerm) {
      // clear the product detail section and products grid before displaying search results
      const productDetailSection = document.getElementById(
        "product-detail-section",
      );
      const productsGrid = document.getElementById("products-search-grid");
      productDetailSection.style.display = "none";
      productDetailSection.innerHTML = "";
      productsGrid.innerHTML = "";

      productsTitle.textContent = `Search Results for "${searchTerm}"`;

      const searchedProducts = await getProductsBySearch(searchTerm);
      if (!searchedProducts || searchedProducts.length === 0) {
        productsTitle.textContent = `No results found for "${searchTerm}"`;
        return;
      } else {
        searchedProducts.forEach((product) => {
          createProductsGrid(productsGrid, product);
        });
      }

      searchInput.value = "";
    }
  });
}
