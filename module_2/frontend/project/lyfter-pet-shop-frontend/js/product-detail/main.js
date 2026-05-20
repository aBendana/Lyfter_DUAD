import { loginRegisterLinks } from "../utils/header-login-register-links.js";
import { infoLinks } from "../utils/header-info-links.js";
import { updateHeaderForLoggedUser } from "../utils/header-logged-user.js";
import { initLoggedUserLinks } from "../utils/header-logged-user-links.js";
import { loadProductDetails } from "./display-product-details.js";
import { addToCart } from "./add-to-cart.js";
import { displaySearchProducts } from "./search-product.js";
import { displayFeaturedProducts } from "../utils/section-featured-products-load.js";
import { goToProduct } from "../utils/go-to-product.js";
import { initSocialMediaLinks } from "../utils/social-media-links.js";

// initialize all modules
loginRegisterLinks();
infoLinks();
updateHeaderForLoggedUser();
initLoggedUserLinks();
await loadProductDetails();
addToCart();
displaySearchProducts();
displayFeaturedProducts();
goToProduct();
initSocialMediaLinks();
