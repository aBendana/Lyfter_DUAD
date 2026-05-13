import { getProductsByPages } from "../requests/get-products.js";
import { createProductsGrid } from "./products-grid.js";

export function createPaginationNav(page) {
  const paginationNav = document.getElementById("pagination-nav");

  const beginningButton = document.createElement("button");
  beginningButton.textContent = "<<";
  beginningButton.id = "beginning-button";
  beginningButton.classList.add("pagination-button");
  paginationNav.appendChild(beginningButton);

  const backButton = document.createElement("button");
  backButton.textContent = "<";
  backButton.id = "back-button";
  backButton.classList.add("pagination-button");
  paginationNav.appendChild(backButton);

  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = `Page ${page}`;
  pageIndicator.id = "page-indicator";
  pageIndicator.classList.add("page-indicator");
  paginationNav.appendChild(pageIndicator);

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.id = "next-button";
  nextButton.classList.add("pagination-button");
  paginationNav.appendChild(nextButton);

  const endButton = document.createElement("button");
  endButton.textContent = ">>";
  endButton.id = "end-button";
  endButton.classList.add("pagination-button");
  paginationNav.appendChild(endButton);
}

export async function refreshPaginationNav(page) {
  const pageIndicator = document.getElementById("page-indicator");
  pageIndicator.textContent = `Page ${page}`;

  const productsArray = await getProductsByPages(page);
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = "";
  productsArray.forEach((product) => {
    createProductsGrid(productsGrid, product);
  });
}
