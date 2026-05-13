// this module only functions if already logged in and his data in is localStorage, otherwise it will just do nothing and not break the page
export async function updateHeaderForLoggedUser() {
  const sessionData = localStorage.getItem("lyfterPetShopSession");
  // if no session data, do nothing
  if (!sessionData) return;

  // clean login and register links
  const loginRegisterContainer = document.getElementById(
    "login-register-container",
  );
  if (loginRegisterContainer) {
    loginRegisterContainer.innerHTML = "";
    const navInfo = document.getElementById("nav-info");
    if (navInfo) navInfo.classList.add("nav-info-logged-user");
  }

  // update header for logged user
  const navLoggedUser = document.getElementById("nav-logged-user");
  navLoggedUser.classList.add("nav-logged-user");

  // welcome message
  const user = JSON.parse(sessionData);
  const headerUserName = document.createElement("span");
  if (headerUserName) {
    headerUserName.textContent = `Welcome back!  ${user.name}`;
    headerUserName.classList.add("welcome-logged-user");
    navLoggedUser.appendChild(headerUserName);
  }

  // buttons with links
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("nav-buttons-container");

  const userButton = document.createElement("button");
  userButton.classList.add("nav-button");
  const userIcon = document.createElement("img");
  userIcon.src = "../assets/icons/account.png";
  userIcon.alt = "account";
  userIcon.id = "account-button";
  userIcon.classList.add("nav-icon");
  userButton.appendChild(userIcon);
  buttonsContainer.appendChild(userButton);

  // if user is admin, doesn't create cart button
  if (user.role === "client") {
    const cartButton = document.createElement("button");
    cartButton.classList.add("nav-button");
    const cartIcon = document.createElement("img");
    cartIcon.src = "../assets/icons/cart.png";
    cartIcon.alt = "cart";
    cartIcon.id = "cart-button";
    cartIcon.classList.add("nav-icon");
    cartButton.appendChild(cartIcon);
    buttonsContainer.appendChild(cartButton);

    // adding badge with quantity of items in cart, if any
    const cartCount = localStorage.getItem("lyfterPetShopCartItems");
    // console.log("Cart count from localStorage:", cartCount);
    if (cartCount && parseInt(cartCount) > 0) {
      const badge = document.createElement("span");
      badge.classList.add("cart-badge");
      badge.textContent = cartCount > 99 ? "99+" : cartCount;
      cartButton.appendChild(badge);
    }
  }

  const logoutButton = document.createElement("button");
  logoutButton.classList.add("nav-button");
  const logoutIcon = document.createElement("img");
  logoutIcon.src = "../assets/icons/sign-out.png";
  logoutIcon.alt = "logout";
  logoutIcon.id = "logout-button";
  logoutIcon.classList.add("nav-icon");
  logoutButton.appendChild(logoutIcon);
  buttonsContainer.appendChild(logoutButton);

  navLoggedUser.appendChild(buttonsContainer);
}
