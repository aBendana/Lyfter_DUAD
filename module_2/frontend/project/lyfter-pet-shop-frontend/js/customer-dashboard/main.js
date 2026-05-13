import { infoLinks } from "../utils/header-info-links.js";
import { updateHeaderForLoggedUser } from "../utils/header-logged-user.js";
import { initLoggedUserLinks } from "../utils/header-logged-user-links.js";
import { loadPersonalInfo } from "./load-personal-info.js";
import { loadShippingAddresses } from "./load-shipping-addresses.js";
import { changePassword } from "./change-password.js";
import { showPaymentMethods, showOrdersHistory } from "./payment-orders.js";
import { initSocialMediaLinks } from "../utils/social-media-links.js";

infoLinks();
updateHeaderForLoggedUser();
initLoggedUserLinks();
loadPersonalInfo();
loadShippingAddresses();
changePassword();
showPaymentMethods();
showOrdersHistory();
initSocialMediaLinks();
