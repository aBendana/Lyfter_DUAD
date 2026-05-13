import { postProduct } from "../requests/post-product.js";

export function createProduct() {
  const createProductButton = document.getElementById(
    "dashboard-create-products",
  );
  createProductButton.addEventListener("click", () => {
    try {
      createProductForm();
    } catch (error) {
      console.error("Create Product Error:", error);
    }
  });
}

async function createProductForm() {
  // container for the form
  const newProductContent = document.getElementById("dashboard-content");
  newProductContent.innerHTML = ""; // clear previous content
  newProductContent.className = ""; // clear previous classes
  newProductContent.classList.add("create-product-content");

  // form title
  const formTitle = document.createElement("h3");
  formTitle.classList.add("container-title");
  formTitle.textContent = "Create New Product";
  newProductContent.appendChild(formTitle);

  // form product
  const productForm = document.createElement("form");
  productForm.classList.add("create-product-form");
  newProductContent.appendChild(productForm);

  // SKU code
  const skuLabel = document.createElement("label");
  skuLabel.textContent = "SKU Code:";
  productForm.appendChild(skuLabel);
  const skuInput = document.createElement("input");
  skuInput.type = "text";
  productForm.appendChild(skuInput);

  // product name
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Product Name:";
  productForm.appendChild(nameLabel);
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  productForm.appendChild(nameInput);

  // product description
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Product Description:";
  productForm.appendChild(descriptionLabel);
  const descriptionInput = document.createElement("textarea");
  descriptionInput.rows = 2;
  productForm.appendChild(descriptionInput);

  // create select for target species
  const speciesLabel = document.createElement("label");
  speciesLabel.textContent = "Target Species:";
  productForm.appendChild(speciesLabel);
  const speciesSelect = document.createElement("select");
  productForm.appendChild(speciesSelect);
  const species = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "fish", label: "Fish" },
    { value: "bird", label: "Bird" },
    { value: "small_mammal", label: "Small Mammal" },
    { value: "reptile", label: "Reptile" },
    { value: "rodent", label: "Rodent" },
  ];

  // add options to select
  species.forEach((species) => {
    const option = document.createElement("option");
    option.value = species.value;
    option.textContent = species.label;
    speciesSelect.appendChild(option);
  });

  // supplier name
  const supplierLabel = document.createElement("label");
  supplierLabel.textContent = "Supplier Name:";
  productForm.appendChild(supplierLabel);
  const supplierInput = document.createElement("input");
  supplierInput.type = "text";
  productForm.appendChild(supplierInput);

  // stock quantity
  const stockLabel = document.createElement("label");
  stockLabel.textContent = "Stock Quantity:";
  productForm.appendChild(stockLabel);
  const stockInput = document.createElement("input");
  stockInput.type = "number";
  productForm.appendChild(stockInput);

  // product cost
  const costLabel = document.createElement("label");
  costLabel.textContent = "Product Cost:";
  productForm.appendChild(costLabel);
  const costInput = document.createElement("input");
  costInput.type = "number";
  costInput.step = "0.01";
  productForm.appendChild(costInput);

  // product price
  const priceLabel = document.createElement("label");
  priceLabel.textContent = "Product Price:";
  productForm.appendChild(priceLabel);
  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.step = "0.01";
  productForm.appendChild(priceInput);

  // buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("create-product-buttons-container");
  productForm.appendChild(buttonsContainer);

  // create submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("create-product-button");
  submitButton.textContent = "Create Product";
  buttonsContainer.appendChild(submitButton);

  // create cancel button
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.id = "cancel-button";
  cancelButton.classList.add("create-product-button", "cancel-button");
  cancelButton.textContent = "Cancel";
  buttonsContainer.appendChild(cancelButton);

  // create success message
  const successMessage = document.createElement("h2");
  successMessage.classList.add("success-message");
  productForm.appendChild(successMessage);

  // error message
  const errorMessage = document.createElement("h2");
  errorMessage.classList.add("error-message");
  productForm.appendChild(errorMessage);

  // cancel button event listener
  cancelButton.addEventListener("click", () => {
    productForm.reset();
    successMessage.textContent = "";
    errorMessage.textContent = "";
    window.location.href = "./admin-dashboard.html";
  });

  // submit button event listener
  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // gather info from form
    const newProduct = {
      SKU: skuInput.value,
      name: nameInput.value,
      description: descriptionInput.value,
      target_species: speciesSelect.value,
      supplier: supplierInput.value,
      stock: parseInt(stockInput.value, 10),
      cost: parseFloat(costInput.value),
      price: parseFloat(priceInput.value),
    };

    try {
      await postProduct(newProduct);
      productForm.reset();
      errorMessage.textContent = "";
      successMessage.textContent = "Product created successfully!";
    } catch (error) {
      console.error("Error creating product:", error);
      successMessage.textContent = "";
      errorMessage.textContent = `Error: ${error} Failed to create product. Please try again.`;
    }
  });
}
