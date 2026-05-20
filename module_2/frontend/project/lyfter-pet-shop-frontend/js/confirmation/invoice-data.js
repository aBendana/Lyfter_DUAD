import { getInvoiceById } from "../requests/get-invoice.js";

export async function setInvoiceData() {
  const customerInfoSection = document.getElementById("customer-info-section");

  try {
    const invoiceId = sessionStorage.getItem("lyfterPetShopInvoiceId");

    const invoiceData = await getInvoiceById(invoiceId);
    if (!invoiceData) {
      customerInfoSection.innerHTML = `<p class="error-message-generic">Order information could not be loaded. Please contact support.</p>`;
      return;
    }

    sessionStorage.setItem(
      "lyfterPetShopInvoiceData",
      JSON.stringify(invoiceData),
    );
  } catch (error) {
    customerInfoSection.innerHTML = `<p class="error-message-generic">Failed to load order details: ${error}. Please contact support.</p>`;
  }
}
