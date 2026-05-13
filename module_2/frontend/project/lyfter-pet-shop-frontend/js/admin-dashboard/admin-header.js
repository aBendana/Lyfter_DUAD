import { clearRefreshToken } from "../utils/token-manager.js";

export function welcomeMessage() {
  const adminTitle = document.getElementById("admin-title");
  const sessionData = localStorage.getItem("lyfterPetShopSession");
  if (sessionData && adminTitle) {
    const user = JSON.parse(sessionData);
    adminTitle.textContent = `Welcome to the Admin Dashboard,  ${user.name}!`;
  }
}

export function headerFunctionalityButtons() {
  const accountButton = document.getElementById("account-icon");
  const productButton = document.getElementById("products-icon");
  const singOutButton = document.getElementById("sign-out-icon");

  // determine the base path for navigation depend on current location page
  const isLanding = !window.location.pathname.includes("/pages/");
  const base = isLanding ? "pages/" : "";

  if (accountButton) {
    accountButton.addEventListener("click", () => {
      window.location.href = `${base}admin-dashboard.html`;
    });
  }

  if (productButton) {
    productButton.addEventListener("click", () => {
      window.location.href = `${base}products.html`;
    });
  }

  if (singOutButton) {
    singOutButton.addEventListener("click", () => {
      localStorage.removeItem("lyfterPetShopSession");
      clearRefreshToken();
      window.location.href = "../index.html";
    });
  }
}
