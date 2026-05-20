import { loginRegisterLinks } from "../utils/header-login-register-links.js";
import { infoLinks } from "../utils/header-info-links.js";
import { updateHeaderForLoggedUser } from "../utils/header-logged-user.js";
import { initLoggedUserLinks } from "../utils/header-logged-user-links.js";

import {
  displayProducts,
  displayProductsByPages,
  displayProductsBySpecies,
  displaySearchProducts,
} from "./display-products.js";

import { goToProduct } from "../utils/go-to-product.js";
import { initSocialMediaLinks } from "../utils/social-media-links.js";

// initialize all modules
loginRegisterLinks();
infoLinks();
updateHeaderForLoggedUser();
initLoggedUserLinks();
await displayProducts();
goToProduct();
displayProductsByPages();
displayProductsBySpecies();
displaySearchProducts();
initSocialMediaLinks();
