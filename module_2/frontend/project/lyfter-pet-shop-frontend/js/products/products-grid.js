import { getCategoryImage } from "../utils/categories-img.js";

export function createProductsGrid(productsGrid, product) {
  //create product card using article tag
  const productCard = document.createElement("article");
  productCard.dataset.id = product.id;
  productCard.classList.add("product-card");
  productsGrid.appendChild(productCard);

  // create img with figure tag for use a semantic structure
  const productFigure = document.createElement("figure");
  productFigure.classList.add("product-figure");
  const productImg = document.createElement("img");
  productImg.src = getCategoryImage(product.target_species);
  productImg.alt = product.name;
  productImg.classList.add("product-image");
  productFigure.appendChild(productImg);
  productCard.appendChild(productFigure);

  // create product name
  const productName = document.createElement("h3");
  productName.textContent = product.name;
  productName.classList.add("product-title");
  productCard.appendChild(productName);

  // create product description
  const productDescription = document.createElement("p");
  productDescription.textContent = product.description;
  productDescription.classList.add("product-description");
  productCard.appendChild(productDescription);

  // create product price
  const productPrice = document.createElement("div");
  productPrice.textContent = `$${product.price.toFixed(2)}`;
  productPrice.classList.add("product-price");
  productCard.appendChild(productPrice);

  // create add to cart button
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.classList.add("add-to-cart-button");
  productCard.appendChild(addToCartButton);
}
