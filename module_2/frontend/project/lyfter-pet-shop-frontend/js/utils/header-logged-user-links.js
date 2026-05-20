import { clearRefreshToken } from "./token-manager.js";

export function initLoggedUserLinks() {
  const sessionData = localStorage.getItem("lyfterPetShopSession");
  // if no session data, do nothing
  if (!sessionData) return;
  const userRole = JSON.parse(sessionData).role;

  const accountButton = document.getElementById("account-button");
  const cartButton = document.getElementById("cart-button");
  const logoutButton = document.getElementById("logout-button");

  // determine the base path for navigation depend on current location page
  const isLanding = !window.location.pathname.includes("/pages/");
  const base = isLanding ? "pages/" : "";

  accountButton.addEventListener("click", () => {
    if (userRole === "administrator") {
      window.location.href = `${base}admin-dashboard.html`;
    } else if (userRole === "client") {
      window.location.href = `${base}customer-dashboard.html`;
    }
  });

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      window.location.href = `${base}cart.html`;
    });
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("lyfterPetShopSession");
    localStorage.removeItem("lyfterPetShopCartItems");
    clearRefreshToken();
    window.location.href = "../index.html";
  });
}
