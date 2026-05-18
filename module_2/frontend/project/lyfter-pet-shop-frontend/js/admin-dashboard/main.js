import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

import { welcomeMessage, headerFunctionalityButtons } from "./admin-header.js";
import { loadAdminInfo } from "./admin-info.js";
import { changePasswordAdmin } from "./change-password-admin.js";
import { showUsers } from "./show-users.js";
import { showInvoices } from "./show-invoices.js";
import { showProducts } from "./show-products.js";
import { createProduct } from "./create-product.js";

// just administrator can have access to this page
let authenticated = false;
try {
  // if the admin is already authenticated, goes to admin panel
  // if not authenticated redirect to login page
  // the logic is handled inside initAuth,
  // which will also refresh the access token if the refresh token is valid
  authenticated = await initAuth();
} catch (error) {
  console.error("Authentication initialization failed:", error);
  alert("Authentication initialization failed. Redirecting to login...");
  window.location.href = "../pages/login.html";
}

if (!authenticated) {
  alert("Access denied. You must be logged in to view this page.");
  window.location.href = "../pages/login.html";
}

welcomeMessage();
headerFunctionalityButtons();
loadAdminInfo();
changePasswordAdmin();
await showUsers();
await showInvoices();
await showProducts();
createProduct();
