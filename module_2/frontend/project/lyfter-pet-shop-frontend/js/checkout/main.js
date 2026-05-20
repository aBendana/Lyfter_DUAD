//import { loginRegisterLinks } from "../utils/header-login-register-links.js";
import { infoLinks } from "../utils/header-info-links.js";
import { updateHeaderForLoggedUser } from "../utils/header-logged-user.js";
import { initLoggedUserLinks } from "../utils/header-logged-user-links.js";
import { getCart } from "../requests/get-cart.js";
import { populateCheckoutInfo } from "./purchase-info.js";
import { populateProductSummary } from "./purchase-summary.js";
import { purchaseEvent } from "./purchase-event.js";
import { initSocialMediaLinks } from "../utils/social-media-links.js";

//loginRegisterLinks();
infoLinks();
updateHeaderForLoggedUser();
initLoggedUserLinks();

// flow to avoid users accessing checkout without an active cart,
// and to re-check cart if user navigates
// back to checkout page with back button (bfcache)
async function checkActiveCart() {
  try {
    const cartInfo = await getCart();
    if (!cartInfo || !cartInfo.cart_details?.length) {
      window.location.replace("../pages/cart.html");
      return false;
    }
    return true;
  } catch {
    // API returns error when user has no active cart
    window.location.replace("../pages/cart.html");
    return false;
  }
}

// if browser restores page from bfcache (back button), re-check cart
window.addEventListener("pageshow", async (event) => {
  if (event.persisted) {
    await checkActiveCart();
  }
});

// initial cart check on page load
const hasActiveCart = await checkActiveCart();
if (hasActiveCart) {
  await populateCheckoutInfo();
  await populateProductSummary();
  purchaseEvent();
  initSocialMediaLinks();
}
