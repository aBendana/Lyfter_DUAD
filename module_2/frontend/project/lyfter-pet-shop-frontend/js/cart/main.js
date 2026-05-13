//import { loginRegisterLinks } from "../utils/header-login-register-links.js";
import { infoLinks } from "../utils/header-info-links.js";
import { updateHeaderForLoggedUser } from "../utils/header-logged-user.js";
import { initLoggedUserLinks } from "../utils/header-logged-user-links.js";
import { displayCartItems } from "./cart-items-display.js";
import { changeQuantity, goToCheckout } from "./cart-events.js";
import { initSocialMediaLinks } from "../utils/social-media-links.js";

infoLinks();
updateHeaderForLoggedUser();
initLoggedUserLinks();
await displayCartItems();
changeQuantity();
goToCheckout();
initSocialMediaLinks();
