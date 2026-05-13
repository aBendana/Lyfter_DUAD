import { welcomeMessage, headerFunctionalityButtons } from "./admin-header.js";
import { loadAdminInfo } from "./admin-info.js";
import { changePasswordAdmin } from "./change-password-admin.js";
import { showUsers } from "./show-users.js";
import { showInvoices } from "./show-invoices.js";
import { showProducts } from "./show-products.js";
import { createProduct } from "./create-product.js";

welcomeMessage();
headerFunctionalityButtons();
loadAdminInfo();
changePasswordAdmin();
await showUsers();
await showInvoices();
await showProducts();
createProduct();
