//import { loginRegisterLinks } from "../utils/header-login-register-links.js";
import { infoLinks } from "../utils/header-info-links.js";
import { updateHeaderForLoggedUser } from "../utils/header-logged-user.js";
import { initLoggedUserLinks } from "../utils/header-logged-user-links.js";
import { setInvoiceData } from "./invoice-data.js";
import { displayCustomerInfo } from "./main-customer-info.js";
import { populateProductList } from "./main-products-list.js";
import { invoiceSummaryData } from "./main-purchase-summary.js";
import { initSocialMediaLinks } from "../utils/social-media-links.js";

// prevent direct access to confirmation page without completing an order
document.addEventListener("DOMContentLoaded", async () => {
  const orderCompleted = JSON.parse(localStorage.getItem("orderCompleted"));

  if (!orderCompleted) {
    window.location.replace("../index.html");
    return;
  }

  localStorage.removeItem("orderCompleted");

  //loginRegisterLinks();
  infoLinks();
  updateHeaderForLoggedUser();
  initLoggedUserLinks();
  await setInvoiceData();
  displayCustomerInfo();
  populateProductList();
  invoiceSummaryData();
  initSocialMediaLinks();
});
