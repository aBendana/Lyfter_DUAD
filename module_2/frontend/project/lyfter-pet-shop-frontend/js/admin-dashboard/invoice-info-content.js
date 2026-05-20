import { formatDate } from "./show-invoices.js";

export function invoiceInfoContent(invoiceDetails) {
  const invoiceInfoContent = document.getElementById("dashboard-content");
  invoiceInfoContent.innerHTML = "";
  invoiceInfoContent.className = "";
  invoiceInfoContent.classList.add("invoice-info-content");

  // title
  const invoiceInfoTitle = document.createElement("h2");
  invoiceInfoTitle.classList.add("invoice-info-title");
  invoiceInfoTitle.textContent = `Invoice #${invoiceDetails.invoices[0].id} Details:`;
  invoiceInfoContent.appendChild(invoiceInfoTitle);

  // customer info
  const customerTitle = document.createElement("h4");
  customerTitle.classList.add("invoice-titles");
  customerTitle.textContent = "Customer:";
  invoiceInfoContent.appendChild(customerTitle);

  const customerName = document.createElement("p");
  customerName.classList.add("invoice-text");
  customerName.textContent = `#${invoiceDetails.user_id} ${invoiceDetails.user_name}`;
  invoiceInfoContent.appendChild(customerName);

  // date placed
  const dateTitle = document.createElement("h4");
  dateTitle.classList.add("invoice-titles");
  dateTitle.textContent = "Date Placed:";
  invoiceInfoContent.appendChild(dateTitle);

  const datePlaced = document.createElement("p");
  datePlaced.classList.add("invoice-text");
  datePlaced.textContent = formatDate(invoiceDetails.invoices[0].date_placed);
  invoiceInfoContent.appendChild(datePlaced);

  // items
  const itemsTitle = document.createElement("h4");
  itemsTitle.classList.add("invoice-titles");
  itemsTitle.textContent = "Items Purchased:";
  invoiceInfoContent.appendChild(itemsTitle);

  const itemsList = document.createElement("ul");
  itemsList.classList.add("items-list");
  // add items to the list
  const invoiceItems = invoiceDetails.invoice_details;
  invoiceItems.forEach((item) => {
    const itemElement = document.createElement("li");
    itemElement.textContent = `${item.product_name} (x${item.quantity}) - $${item.item_total.toFixed(2)}`;
    itemsList.appendChild(itemElement);
  });
  invoiceInfoContent.appendChild(itemsList);

  // invoice subtotal
  const subtotalTitle = document.createElement("h4");
  subtotalTitle.classList.add("invoice-titles");
  subtotalTitle.textContent = "Invoice Subtotal:";
  invoiceInfoContent.appendChild(subtotalTitle);

  const subtotal = document.createElement("p");
  subtotal.classList.add("invoice-text");
  subtotal.textContent = `$${invoiceDetails.invoices[0].invoice_subtotal.toFixed(2)}`;
  invoiceInfoContent.appendChild(subtotal);

  // discount
  const discountTitle = document.createElement("h4");
  discountTitle.classList.add("invoice-titles");
  discountTitle.textContent = "Discount Applied:";
  invoiceInfoContent.appendChild(discountTitle);

  const discount = document.createElement("p");
  discount.classList.add("invoice-text");
  discount.textContent = `$${invoiceDetails.invoices[0].discount.toFixed(2)}`;
  invoiceInfoContent.appendChild(discount);

  // shipping
  const shippingTitle = document.createElement("h4");
  shippingTitle.classList.add("invoice-titles");
  shippingTitle.textContent = "Shipping:";
  invoiceInfoContent.appendChild(shippingTitle);

  const shipping = document.createElement("p");
  shipping.classList.add("invoice-text");
  shipping.textContent = `${invoiceDetails.invoices[0].shipping_method}: $${invoiceDetails.invoices[0].shipping_cost.toFixed(2)}`;
  invoiceInfoContent.appendChild(shipping);

  // taxes
  const taxesTitle = document.createElement("h4");
  taxesTitle.classList.add("invoice-titles");
  taxesTitle.textContent = "Taxes:";
  invoiceInfoContent.appendChild(taxesTitle);

  const taxes = document.createElement("p");
  taxes.classList.add("invoice-text");
  taxes.textContent = `$${calculateInvoiceTax(invoiceDetails).toFixed(2)}`;
  invoiceInfoContent.appendChild(taxes);

  // total amount
  const totalTitle = document.createElement("h4");
  totalTitle.classList.add("invoice-titles");
  totalTitle.textContent = "Invoice Total:";
  invoiceInfoContent.appendChild(totalTitle);

  const total = document.createElement("p");
  total.classList.add("invoice-total-text");
  total.textContent = `$${invoiceDetails.invoices[0].invoice_total.toFixed(2)}`;
  invoiceInfoContent.appendChild(total);
}

function calculateInvoiceTax(invoiceDetails) {
  // tax rate is 7%
  const taxRate = 0.07;
  const invoiceAllSubtotal =
    invoiceDetails.invoices[0].invoice_subtotal -
    invoiceDetails.invoices[0].discount +
    invoiceDetails.invoices[0].shipping_cost;

  return invoiceAllSubtotal * taxRate;
}
