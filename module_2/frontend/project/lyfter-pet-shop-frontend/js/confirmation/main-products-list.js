export function populateProductList() {
  const invoiceData = JSON.parse(
    sessionStorage.getItem("lyfterPetShopInvoiceData"),
  );
  const invoiceProducts = invoiceData.invoice_details || [];

  // product list
  const productsListSection = document.getElementById("products-list-section");
  invoiceProducts.forEach((item) => {
    const productItem = document.createElement("p");
    productItem.classList.add("product-item");
    productItem.textContent = `${item.product_name} x ${item.quantity} = $${(item.product_price * item.quantity).toFixed(2)}`;
    productsListSection.appendChild(productItem);
  });
}
