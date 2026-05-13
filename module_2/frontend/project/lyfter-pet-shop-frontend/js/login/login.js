import { loginUser } from "../requests/post-login.js";
import { getTotalCartItems } from "../requests/get-cart.js";

export async function login() {
  async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginMessage = document.getElementById("login-register-message");

    if (!email || !password) {
      loginMessage.classList.add("login-register-message-error");
      loginMessage.textContent = "Please enter email and password.";
      return;
    }

    try {
      const user = await loginUser(email, password);

      // set total items in cart if customer has left pending cart from previous session,
      // this will ensure that the cart badge shows correct count immediately after login
      if (user.role === "client") {
        const totalItems = await getTotalCartItems();
        localStorage.setItem(
          "lyfterPetShopCartItems",
          JSON.stringify(totalItems),
        );
      }

      //const loginMessage = document.getElementById("login-register-message");
      loginMessage.classList.add("login-register-message-welcome");
      loginMessage.textContent = `Welcome Back to Lyfter Pet Shop, ${user.name}.`;

      setTimeout(() => {
        if (user.role === "administrator") {
          window.location.href = "./admin-dashboard.html";
        } else if (user.role === "client") {
          window.location.href = "./products.html";
        }
      }, 1000);
    } catch (error) {
      const loginMessage = document.getElementById("login-register-message");
      loginMessage.classList.add("login-register-message-error");
      loginMessage.textContent =
        error.message || "Login failed. Please try again.";
    }
  }

  document.getElementById("login-form").addEventListener("submit", handleLogin);
}
