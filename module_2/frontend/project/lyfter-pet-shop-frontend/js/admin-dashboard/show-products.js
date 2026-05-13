import { getProducts } from "../requests/get-products.js";
import { pageData, createPaginationControls } from "./page-data.js";
import { handleViewProduct } from "./product-info.js";

export async function showProducts() {
  try {
    const showProductsButton = document.getElementById(
      "dashboard-manage-products",
    );
    showProductsButton.addEventListener("click", async () => {
      const products = await getProducts();
      console.log("Fetched products:", products); // Debug log to check fetched products
      products.sort((a, b) => a.id - b.id); // sort products by id in ascending order
      constructProductsTable(products, 1, products);
    });
  } catch (error) {
    console.error("Failed to load products:", error);
    const productsContainer = document.getElementById("dashboard-content");
    productsContainer.innerHTML = `<p class="error-message-generic">Failed to load products: ${error}. Please try again later.</p>`;
  }
}

function constructProductsTable(products, page = 1, allProducts = products) {
  // get the products to display on the current page
  const { elementsToDisplay, totalPages } = pageData(products, page);

  const productsContainer = document.getElementById("dashboard-content");
  productsContainer.innerHTML = "";
  productsContainer.className = "";
  productsContainer.classList.add("products-container");

  // create title
  const productsTitle = document.createElement("h3");
  productsTitle.classList.add("container-title");
  productsTitle.textContent = "All Products";
  productsContainer.appendChild(productsTitle);

  // create container for search and products total
  const searchTotalContainer = document.createElement("div");
  searchTotalContainer.classList.add("search-total-container");
  productsContainer.appendChild(searchTotalContainer);

  // create search input
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search by Product SKU";
  searchInput.classList.add("search-input");
  searchTotalContainer.appendChild(searchInput);

  // add event listener for search input (trigger on Enter key)
  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const searchTerm = searchInput.value.trim().toUpperCase();
    if (!searchTerm) {
      constructProductsTable(allProducts, 1, allProducts);
      return;
    }
    const filteredProducts = allProducts.filter(
      (product) =>
        product.SKU.toUpperCase() === searchTerm ||
        product.SKU.toUpperCase().includes(searchTerm),
    );
    constructProductsTable(filteredProducts, 1, allProducts);
  });

  // total products summary (always count from the full original list)
  const totalProducts = document.createElement("h3");
  totalProducts.classList.add("total-products-title");
  totalProducts.textContent = `Total Products: ${allProducts.length}`;
  searchTotalContainer.appendChild(totalProducts);

  // create table
  const productsTable = document.createElement("table");
  productsTable.classList.add("products-table");
  productsContainer.appendChild(productsTable);

  // create table header
  const tableThead = document.createElement("thead");
  const tableHeader = document.createElement("tr");
  const headers = ["SKU", "Name", "Stock", "Price"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    tableHeader.appendChild(th);
  });
  tableThead.appendChild(tableHeader);
  productsTable.appendChild(tableThead);

  // create table rows
  const tableTbody = document.createElement("tbody");
  elementsToDisplay.forEach((product) => {
    const tableRow = document.createElement("tr");
    const productData = [
      product.SKU,
      product.name,
      product.stock,
      `$${product.price.toFixed(2)}`,
    ];

    // create row data for each product
    productData.forEach((data) => {
      const td = document.createElement("td");
      td.textContent = data;
      tableRow.appendChild(td);
    });

    // create view button for each product
    const viewProductButton = document.createElement("button");
    viewProductButton.dataset.productId = product.id;
    viewProductButton.textContent = "View";
    viewProductButton.classList.add("view-product-button");

    // add event listener to the view button
    viewProductButton.addEventListener("click", () => {
      const productId = parseInt(viewProductButton.dataset.productId);
      handleViewProduct(productId);
    });
    //add button to the row
    tableRow.appendChild(viewProductButton);

    // add all row data to the table body
    tableTbody.appendChild(tableRow);
  });
  // add table body to the table
  productsTable.appendChild(tableTbody);

  // create pagination controls
  createPaginationControls("dashboard-content", page, totalPages, (newPage) => {
    constructProductsTable(products, newPage, allProducts);
  });
}
