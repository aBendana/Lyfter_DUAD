import { getProducts } from "../requests/get-products.js";
import { getCategoryImage } from "./categories-img.js";

async function getFeaturedProducts() {
  const productsArray = await getProducts();
  const featuredProducts = productsArray.slice();

  for (let i = featuredProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [featuredProducts[i], featuredProducts[j]] = [
      featuredProducts[j],
      featuredProducts[i],
    ];
  }

  return featuredProducts.slice(0, 5);
}

export async function displayFeaturedProducts() {
  const productsGrid = document.getElementById("products-grid");

  let featuredProducts;
  try {
    featuredProducts = await getFeaturedProducts();
  } catch (error) {
    productsGrid.innerHTML = `<p class="error-message-generic">Failed to load products: ${error}. Please reload the page.</p>`;
    return;
  }

  featuredProducts.forEach((product) => {
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
  });
}
