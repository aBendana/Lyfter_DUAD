import { updateProduct } from "../requests/patch-product-info.js";

export async function editProductInfo(productId) {
  const suplierOriginalContent = document.getElementById("product-supplier");
  const stockOriginalContent = document.getElementById("product-stock");
  const costOriginalContent = document.getElementById("product-cost");
  const priceOriginalContent = document.getElementById("product-price");
  const editInfoButton = document.getElementById("edit-info-button");
  const buttonsContainer = editInfoButton.parentElement;

  // replace <p> elements with <input> elements
  const supplierInput = document.createElement("input");
  supplierInput.type = "text";
  supplierInput.id = "product-supplier";
  supplierInput.classList.add("product-text", "product-input");
  supplierInput.value = suplierOriginalContent.textContent;
  supplierInput.disabled = true;
  suplierOriginalContent.replaceWith(supplierInput);

  const stockInput = document.createElement("input");
  stockInput.type = "number";
  stockInput.min = "0";
  stockInput.id = "product-stock";
  stockInput.classList.add("product-text", "product-input");
  stockInput.value = parseInt(stockOriginalContent.textContent, 10);
  stockInput.disabled = true;
  stockOriginalContent.replaceWith(stockInput);

  const costInput = document.createElement("input");
  costInput.type = "number";
  costInput.min = "0";
  costInput.id = "product-cost";
  costInput.classList.add("product-text", "product-input");
  costInput.value = parseFloat(costOriginalContent.textContent);
  costInput.disabled = true;
  costOriginalContent.replaceWith(costInput);

  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.min = "0";
  priceInput.id = "product-price";
  priceInput.classList.add("product-text", "product-input");
  priceInput.value = parseFloat(priceOriginalContent.textContent);
  priceInput.disabled = true;
  priceOriginalContent.replaceWith(priceInput);

  // add event listener for edit button
  editInfoButton.addEventListener("click", () => {
    const lastSupplierValue = supplierInput.value;
    const lastStockValue = stockInput.value;
    const lastCostValue = costInput.value;
    const lastPriceValue = priceInput.value;

    // enable input fields for editing
    supplierInput.disabled = false;
    stockInput.disabled = false;
    costInput.disabled = false;
    priceInput.disabled = false;
    supplierInput.focus();

    // disable edit button while in edit mode
    editInfoButton.disabled = true;

    //add save and cancel buttons
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    saveButton.classList.add("update-info-button");
    buttonsContainer.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("update-info-button");
    buttonsContainer.appendChild(cancelButton);

    // save button functionality
    saveButton.addEventListener("click", async () => {
      const supplierInputValue = supplierInput.value.trim();
      const stockInputValue = stockInput.value.trim();
      const costInputValue = costInput.value.trim();
      const priceInputValue = priceInput.value.trim();

      // prevent empty values
      if (
        supplierInputValue === "" ||
        stockInputValue === "" ||
        costInputValue === "" ||
        priceInputValue === ""
      ) {
        alert("Supplier, stock, cost, or price cannot be empty.");
        return;
      }

      // payload for patch request
      const updatedInfo = {
        supplier: supplierInputValue,
        stock: parseInt(stockInputValue, 10),
        cost: parseFloat(costInputValue, 10),
        price: parseFloat(priceInputValue, 10),
      };

      try {
        await updateProduct(productId, updatedInfo);
        cleanupEditMode(saveButton, cancelButton);
      } catch (error) {
        console.error("Failed to update product information:", error);
        alert("Failed to update product information. Please try again.");
      }
    });

    // cancel button functionality
    cancelButton.addEventListener("click", () => {
      supplierInput.value = lastSupplierValue;
      stockInput.value = lastStockValue;
      costInput.value = lastCostValue;
      priceInput.value = lastPriceValue;
      cleanupEditMode(saveButton, cancelButton);
    });
  });
}

// clean up the edit mode
function cleanupEditMode(saveButton, cancelButton) {
  const supplierInput = document.getElementById("product-supplier");
  const stockInput = document.getElementById("product-stock");
  const costInput = document.getElementById("product-cost");
  const priceInput = document.getElementById("product-price");
  const editInfoButton = document.getElementById("edit-info-button");

  // disable input fields
  supplierInput.disabled = true;
  stockInput.disabled = true;
  costInput.disabled = true;
  priceInput.disabled = true;

  // remove save and cancel buttons
  if (saveButton) saveButton.remove();
  if (cancelButton) cancelButton.remove();

  // enable edit button
  editInfoButton.disabled = false;
}
