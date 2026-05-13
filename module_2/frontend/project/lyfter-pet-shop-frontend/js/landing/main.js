// call all the modules to initialize the application
import { setupLinksWithinPage } from "./links-within-landing.js";
import { updateHeaderForLoggedUser } from "../utils/header-logged-user.js";
import { initLoggedUserLinks } from "../utils/header-logged-user-links.js";
import { initTitleWelcome } from "./header-tittle-welcome.js";
import { initBanners } from "./header-banners.js";
import { displayFeaturedProducts } from "../utils/section-featured-products-load.js";
import { goToProduct } from "../utils/go-to-product.js";
import { initSocialMediaLinks } from "../utils/social-media-links.js";

console.log("Initializing Lyfter Pet Shop...");

// initialize all modules
setupLinksWithinPage();
updateHeaderForLoggedUser();
initLoggedUserLinks();
initTitleWelcome();
initBanners();
await displayFeaturedProducts();
goToProduct();
initSocialMediaLinks();
