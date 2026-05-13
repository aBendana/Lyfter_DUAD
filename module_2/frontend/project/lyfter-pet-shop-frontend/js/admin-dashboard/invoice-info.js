import { getInvoiceDetailsByAdmin } from "../requests/get-invoices-admin.js";
import { invoiceInfoContent } from "./invoice-info-content.js";

export async function handleViewInvoice(invoiceId) {
  try {
    const invoiceDetails = await getInvoiceDetailsByAdmin(invoiceId);
    console.log("Invoice details:", invoiceDetails);
    invoiceInfoContent(invoiceDetails);
  } catch (error) {
    console.error("Failed to load invoice details:", error);
    const invoiceInfoContainer = document.getElementById("dashboard-content");
    invoiceInfoContainer.innerHTML = `<p class="error-message-generic">Failed to load invoice details: ${error}. Please try again later.</p>`;
  }
}
