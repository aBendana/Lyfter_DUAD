async function getProducts() {
  const url = "https://dummyjson.com/products";

  try {
    const response = await axios.get(url);
    const products = response.data.products;
    console.log("Products:", products);
    return products;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function displayProducts(page) {
  // pages preparation
  let currentPage = page;
  const itemsPerPage = 5;
  const totalProducts = await getProducts();
  const totalPages = Math.ceil(totalProducts.length / itemsPerPage);

  // products per page
  const startProductsIndex = (currentPage - 1) * itemsPerPage;
  const endProductsIndex = startProductsIndex + itemsPerPage;
  const productsToDisplay = totalProducts.slice(
    startProductsIndex,
    endProductsIndex,
  );

  // display products
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    // create product card
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");

    // add all elements
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = product.thumbnail || "imgs/no_image.png";
    img.alt = "product image";
    img.classList.add("product-image");
    figure.appendChild(img);

    const title = document.createElement("h3");
    title.classList.add("product-title");
    title.textContent = product.title ?? "Unnamed product";

    const category = document.createElement("p");
    category.classList.add("product-category");
    category.textContent = product.category ?? "No category available";

    const brand = document.createElement("p");
    brand.classList.add("product-brand");
    brand.textContent = product.brand ?? "No brand available";

    const price = document.createElement("div");
    price.classList.add("product-price");
    price.textContent =
      product.price != null ? `$${product.price}` : "Price N/A";

    const button = document.createElement("button");
    button.classList.add("add-to-cart");
    button.textContent = "Add to cart";

    // add all card elements
    productCard.appendChild(figure);
    productCard.appendChild(title);
    productCard.appendChild(category);
    productCard.appendChild(brand);
    productCard.appendChild(price);
    productCard.appendChild(button);

    // add to all products container
    itemsContainer.appendChild(productCard);
  });

  // pagination controls previous and next buttons
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  previousButton.addEventListener("click", () => {
    previousPage(currentPage);
  });

  nextButton.addEventListener("click", () => {
    nextPage(currentPage, totalPages);
  });
}

function goToPage(page) {
  displayProducts(page);
}

function nextPage(currentPage, totalPages) {
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(currentPage);
  }
}

function previousPage(currentPage) {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(currentPage);
  }
}

displayProducts(1);
