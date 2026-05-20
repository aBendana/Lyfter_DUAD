export function invoiceSummaryData() {
  const invoiceData = JSON.parse(
    sessionStorage.getItem("lyfterPetShopInvoiceData"),
  );

  const subtotal = invoiceData.invoice?.[0]?.invoice_subtotal || 0;
  const discount = invoiceData.invoice?.[0]?.discount || 0;
  const shippingCost = invoiceData.invoice?.[0]?.shipping_cost || 0;
  const total = invoiceData.invoice?.[0]?.invoice_total || 0;

  //calculate tax as 7%
  const totalTax = ((subtotal - discount + shippingCost) * 0.07).toFixed(2);

  // display data on page
  document.getElementById("order-subtotal").textContent =
    `Subtotal: $${subtotal}`;
  document.getElementById("discount").textContent = `Discount: $${discount}`;
  document.getElementById("shipping-cost").textContent =
    `Shipping: $${shippingCost}`;
  document.getElementById("order-tax").textContent = `Tax: $${totalTax}`;
  document.getElementById("order-total").textContent = `Total: $${total}`;
}
