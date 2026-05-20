import { getAllInvoices } from "../requests/get-invoices-admin.js";
import { pageData, createPaginationControls } from "./page-data.js";
import { handleViewInvoice } from "./invoice-info.js";

export async function showInvoices() {
  try {
    const showInvoicesButton = document.getElementById(
      "dashboard-users-orders",
    );
    showInvoicesButton.addEventListener("click", async () => {
      const invoices = await getAllInvoices();
      invoices.sort((a, b) => a.id - b.id);
      constructInvoicesTable(invoices, 1, invoices);
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    const invoicesContainer = document.getElementById("dashboard-content");
    invoicesContainer.innerHTML = `<p class="error-message-generic">Failed to load invoices: ${error}. Please try again later.</p>`;
  }
}

function constructInvoicesTable(invoices, page = 1, allInvoices = invoices) {
  // get the invoices to display on the current page
  const { elementsToDisplay, totalPages } = pageData(invoices, page);

  // clean container
  const invoicesContainer = document.getElementById("dashboard-content");
  invoicesContainer.innerHTML = "";
  invoicesContainer.className = "";
  invoicesContainer.classList.add("invoices-container");

  // create title
  const invoicesTitle = document.createElement("h3");
  invoicesTitle.classList.add("container-title");
  invoicesTitle.textContent = "All Invoices";
  invoicesContainer.appendChild(invoicesTitle);

  // create container for search and total summary
  const searchTotalContainer = document.createElement("div");
  searchTotalContainer.classList.add("search-total-container");
  invoicesContainer.appendChild(searchTotalContainer);

  // create search input
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search by Invoice #";
  searchInput.classList.add("search-input");
  searchTotalContainer.appendChild(searchInput);

  // add event listener for search input (trigger on Enter key)
  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const searchTerm = parseInt(searchInput.value.trim());
    if (isNaN(searchTerm)) {
      constructInvoicesTable(allInvoices, 1, allInvoices);
    } else {
      const filteredInvoices = allInvoices.filter(
        (invoice) =>
          invoice.id === searchTerm ||
          invoice.id.toString().includes(searchTerm), // partial search
      );
      constructInvoicesTable(filteredInvoices, 1, allInvoices);
    }
  });

  // total sales summary
  const totalSales = allInvoices.reduce(
    (total, invoice) => total + invoice.invoice_total,
    0,
  );
  // create total sales title
  const totalTitle = document.createElement("h3");
  totalTitle.classList.add("total-sales-title");
  totalTitle.textContent = `Total Sales: $${totalSales.toFixed(2)}`;
  searchTotalContainer.appendChild(totalTitle);

  // create table for invoices
  const invoicesTable = document.createElement("table");
  invoicesTable.classList.add("invoices-table");
  invoicesContainer.appendChild(invoicesTable);

  // create the content of the table
  // create table header
  const tableThead = document.createElement("thead");
  const tableHeader = document.createElement("tr");
  const headers = [
    "Invoice #",
    "Customer Id",
    "Date Placed",
    "Payment Method",
    "Total Amount",
  ];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    tableHeader.appendChild(th);
  });
  tableThead.appendChild(tableHeader);
  invoicesTable.appendChild(tableThead);

  // create table rows for each invoice
  const tableTbody = document.createElement("tbody");
  elementsToDisplay.forEach((invoice) => {
    const tableRow = document.createElement("tr");
    const invoiceData = [
      invoice.id,
      invoice.user_id,
      formatDate(invoice.date_placed),
      invoice.payment_method,
      `$${invoice.invoice_total.toFixed(2)}`,
    ];

    invoiceData.forEach((data) => {
      const td = document.createElement("td");
      td.textContent = data;
      tableRow.appendChild(td);
    });

    // create view button for each invoice
    const viewInvoiceButton = document.createElement("button");
    viewInvoiceButton.dataset.invoiceId = invoice.id;
    viewInvoiceButton.textContent = "View";
    viewInvoiceButton.classList.add("view-invoice-button");

    // add event listener to the view button
    viewInvoiceButton.addEventListener("click", () => {
      const invoiceId = parseInt(viewInvoiceButton.dataset.invoiceId);
      handleViewInvoice(invoiceId);
    });
    // add the button to the row
    tableRow.appendChild(viewInvoiceButton);

    tableTbody.appendChild(tableRow);
  });
  invoicesTable.appendChild(tableTbody);

  // create pagination controls
  createPaginationControls("dashboard-content", page, totalPages, (newPage) => {
    constructInvoicesTable(invoices, newPage, allInvoices);
  });
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
