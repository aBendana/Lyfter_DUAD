import {
  getProducts,
  getProductsByPages,
  getProductsBySpecies,
  getProductsBySearch,
} from "../requests/get-products.js";
import { createProductsGrid } from "./products-grid.js";
import { createPaginationNav, refreshPaginationNav } from "./pagination-nav.js";

// display products when the page loads
export async function displayProducts() {
  try {
    const page = 1;
    const productsArray = await getProductsByPages(page);
    const productsGrid = document.getElementById("products-grid");

    // if there no products show an friendly message instead of an empty grid
    if (!productsArray || productsArray.length === 0) {
      const productsTitle = document.getElementById("products-title");
      productsTitle.textContent = "No products available at the moment.";
      return;
    }

    productsArray.forEach((product) => {
      createProductsGrid(productsGrid, product);
    });
    createPaginationNav(page);
  } catch (error) {
    console.error("Error displaying products:", error);
    const productsGrid = document.getElementById("products-grid");
    productsGrid.innerHTML = `<p class="error-message-generic">Failed to load products: ${error}. Please reload the page.</p>`;
  }
}

export async function displayProductsByPages() {
  const beginningButton = document.getElementById("beginning-button");
  const backButton = document.getElementById("back-button");
  const nextButton = document.getElementById("next-button");
  const endButton = document.getElementById("end-button");
  const pageIndicator = document.getElementById("page-indicator");
  // Extract the page number from the text content
  let currentPage = parseInt(pageIndicator.textContent.split(" ")[1]);

  // backend doesn't provide total pages, so we calculate it
  // by fetching all products and dividing by items per page
  let totalPages;
  let totalProducts;
  try {
    totalProducts = await getProducts();
    const itemsPerPage = 12;

    // if there no products, set totalPages to 1 to avoid division by zero
    // and allow pagination to show the "No products available"
    if (!totalProducts || totalProducts.length === 0) {
      totalPages = 1;
    } else {
      totalPages = Math.ceil(totalProducts.length / itemsPerPage);
    }
  } catch (error) {
    console.error("Error fetching total products for pagination:", error);
    const paginationNav = document.getElementById("pagination-nav");
    paginationNav.innerHTML = `<p class="error-message-generic">Failed to load pagination: ${error}. Please reload the page.</p>`;
    return;
  }

  // if there no products show an friendly message instead of pagination
  if (!totalProducts || totalProducts.length === 0) {
    const productsTitle = document.getElementById("products-title");
    productsTitle.textContent = "No products available at the moment.";

    return;
  } else {
    // set the state of the buttons according to current page
    const updateButtonStates = () => {
      beginningButton.disabled = currentPage === 1;
      backButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
      endButton.disabled = currentPage === totalPages;
    };

    // initially set the button states for page 1
    updateButtonStates();

    beginningButton.addEventListener("click", async () => {
      if (currentPage !== 1) {
        currentPage = 1;
        updateButtonStates();
        await refreshPaginationNav(currentPage);
      }
    });

    backButton.addEventListener("click", async () => {
      // ensure page number doesn't go below 1
      currentPage = Math.max(1, currentPage - 1);
      updateButtonStates();
      await refreshPaginationNav(currentPage);
    });

    nextButton.addEventListener("click", async () => {
      currentPage = currentPage + 1;
      updateButtonStates();
      await refreshPaginationNav(currentPage);
    });

    endButton.addEventListener("click", async () => {
      if (currentPage !== totalPages) {
        currentPage = totalPages;
        updateButtonStates();
        await refreshPaginationNav(currentPage);
      }
    });
  }
}

export async function displayProductsBySpecies() {
  const productsTitle = document.getElementById("products-title");
  const categories = document.querySelectorAll(".species-category-button");

  categories.forEach((button) => {
    button.addEventListener("click", async () => {
      let species = button.dataset.species;

      switch (species) {
        case "all":
          productsTitle.textContent = "All Products";
          species = "all";
          break;

        case "dogs":
          productsTitle.textContent = "Dogs Products";
          species = "dog";
          break;

        case "cats":
          productsTitle.textContent = "Cats Products";
          species = "cat";
          break;

        case "fish":
          productsTitle.textContent = "Fish Products";
          species = "fish";
          break;

        case "birds":
          productsTitle.textContent = "Birds Products";
          species = "bird";
          break;

        case "reptiles":
          productsTitle.textContent = "Reptiles Products";
          species = "reptile";
          break;

        case "rodents":
          productsTitle.textContent = "Rodents Products";
          species = "rodent";
          break;

        case "small-mammals":
          productsTitle.textContent = "Small Mammals Products";
          species = "small_mammal";
          break;
      }

      // clean the products grid and paginatation before displaying
      // the new requested products
      const productsGrid = document.getElementById("products-grid");
      const paginationNav = document.getElementById("pagination-nav");
      productsGrid.innerHTML = "";
      paginationNav.innerHTML = "";

      try {
        let productsArrayFilter;
        if (species === "all") {
          await displayProducts();
          displayProductsByPages();
        } else {
          productsArrayFilter = await getProductsBySpecies(species);

          // display a friendly message if there are no products for the selected category
          if (!productsArrayFilter || productsArrayFilter.length === 0) {
            productsTitle.textContent =
              "No products available for this category.";
            return;
          }

          productsArrayFilter.forEach((product) => {
            createProductsGrid(productsGrid, product);
          });
        }
      } catch (error) {
        console.error("Error displaying products by species:", error);
        const productsGrid = document.getElementById("products-grid");
        productsGrid.innerHTML = `<p class="error-message-generic">Failed to load products: ${error}. Please reload the page.</p>`;
      }
    });
  });
}

// search products by name when the user types in the search input
export async function displaySearchProducts() {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const productsTitle = document.getElementById("products-title");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    // console.log(`Search term: "${searchTerm}"`);
    if (searchTerm) {
      const productsGrid = document.getElementById("products-grid");
      productsGrid.innerHTML = "";

      productsTitle.textContent = `Search Results for "${searchTerm}"`;

      try {
        const searchedProducts = await getProductsBySearch(searchTerm);
        if (!searchedProducts || searchedProducts.length === 0) {
          productsTitle.textContent = `No results found for "${searchTerm}"`;
          return;
        } else {
          searchedProducts.forEach((product) => {
            createProductsGrid(productsGrid, product);
          });
        }
      } catch (error) {
        console.error("Error searching products:", error);
        productsGrid.innerHTML = `<p class="error-message-generic">Failed to load search results: ${error}. Please reload the page.</p>`;
      }
      searchInput.value = "";
    }
  });
}
