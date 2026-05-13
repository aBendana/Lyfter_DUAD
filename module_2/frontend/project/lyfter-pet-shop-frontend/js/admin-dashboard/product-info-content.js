export function productInfoContent(product) {
  const productInfoContent = document.getElementById("dashboard-content");
  productInfoContent.innerHTML = "";
  productInfoContent.className = "";
  productInfoContent.classList.add("product-info-content");

  // title
  const productInfoTitle = document.createElement("h2");
  productInfoTitle.classList.add("product-info-title");
  productInfoTitle.textContent = `Product #${product.SKU} Details:`;
  productInfoContent.appendChild(productInfoTitle);

  // product name
  const productTitle = document.createElement("h4");
  productTitle.classList.add("product-titles");
  productTitle.textContent = "Product:";
  productInfoContent.appendChild(productTitle);

  const productName = document.createElement("p");
  productName.classList.add("product-text");
  productName.textContent = `${product.name}`;
  productInfoContent.appendChild(productName);

  // product description
  const descriptionTitle = document.createElement("h4");
  descriptionTitle.classList.add("product-titles");
  descriptionTitle.textContent = "Description:";
  productInfoContent.appendChild(descriptionTitle);

  const productDescription = document.createElement("p");
  productDescription.classList.add("product-text");
  productDescription.textContent = `${product.description}`;
  productInfoContent.appendChild(productDescription);

  // target animal
  const targetAnimalTitle = document.createElement("h4");
  targetAnimalTitle.classList.add("product-titles");
  targetAnimalTitle.textContent = "Target Species:";
  productInfoContent.appendChild(targetAnimalTitle);

  const targetAnimal = document.createElement("p");
  targetAnimal.classList.add("product-text");
  targetAnimal.textContent = `${product.target_species}`;
  productInfoContent.appendChild(targetAnimal);

  // supplier
  const supplierTitle = document.createElement("h4");
  supplierTitle.classList.add("product-titles");
  supplierTitle.textContent = "Supplier:";
  productInfoContent.appendChild(supplierTitle);

  const supplier = document.createElement("p");
  supplier.id = "product-supplier";
  supplier.classList.add("product-text");
  supplier.textContent = `${product.supplier}`;
  productInfoContent.appendChild(supplier);

  //stock
  const stockTitle = document.createElement("h4");
  stockTitle.classList.add("product-titles");
  stockTitle.textContent = "Stock:";
  productInfoContent.appendChild(stockTitle);

  const stock = document.createElement("p");
  stock.id = "product-stock";
  stock.classList.add("product-text");
  stock.textContent = `${product.stock}`;
  productInfoContent.appendChild(stock);

  // cost
  const costTitle = document.createElement("h4");
  costTitle.classList.add("product-titles");
  costTitle.textContent = "Cost ($):";
  productInfoContent.appendChild(costTitle);

  const cost = document.createElement("p");
  cost.id = "product-cost";
  cost.classList.add("product-text");
  cost.textContent = `${parseFloat(product.cost).toFixed(2)}`;
  productInfoContent.appendChild(cost);

  // price
  const priceTitle = document.createElement("h4");
  priceTitle.classList.add("product-titles");
  priceTitle.textContent = "Price ($):";
  productInfoContent.appendChild(priceTitle);

  const price = document.createElement("p");
  price.id = "product-price";
  price.classList.add("product-text");
  price.textContent = `${parseFloat(product.price).toFixed(2)}`;
  productInfoContent.appendChild(price);

  // edit profile button
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("update-buttons-container");

  const editInfoButton = document.createElement("button");
  editInfoButton.id = "edit-info-button";
  editInfoButton.classList.add("update-info-button");
  editInfoButton.textContent = "Edit Product";
  buttonsContainer.appendChild(editInfoButton);
  productInfoContent.appendChild(buttonsContainer);

  productInfoContent.scrollIntoView({ behavior: "smooth" });
}
