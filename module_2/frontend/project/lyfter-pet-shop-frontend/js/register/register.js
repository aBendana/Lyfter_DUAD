import { registerUser } from "../requests/post-register.js";
import {
  nameFormatValidation,
  checkPasswordStrength,
  emailFormatValidation,
  phoneNumberFormatValidation,
} from "../utils/input-restrictions.js";

export async function register() {
  async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();

    //  element to display error or success messages
    const registerMessage = document.getElementById("login-register-message");
    registerMessage.classList.add("login-register-message-error");

    // manage restrictions for inputs
    // name restrictions
    if (!nameFormatValidation(name)) {
      registerMessage.textContent =
        "Full Name must have letters and spaces only, and be between 5 to 40 characters.";
      document.getElementById("name").value = "";
      return;
    }

    // email restrictions
    if (!emailFormatValidation(email)) {
      registerMessage.textContent = "Please enter a valid email address.";
      document.getElementById("email").value = "";
      return;
    }

    // phone number restrictions
    if (!phoneNumberFormatValidation(phoneNumber)) {
      registerMessage.textContent =
        "Phone number must be in the format XXXX-XXXX.";
      document.getElementById("phone-number").value = "";
      return;
    }

    // password restrictions
    if (password !== confirmPassword) {
      registerMessage.textContent = "Passwords do not match.";
      document.getElementById("password").value = "";
      document.getElementById("confirm-password").value = "";
      return;
    }

    if (!checkPasswordStrength(password)) {
      registerMessage.textContent =
        "Password does not meet the required criteria.";
      document.getElementById("password").value = "";
      document.getElementById("confirm-password").value = "";
      return;
    }

    try {
      const userData = await registerUser(name, email, password, phoneNumber);
      registerMessage.textContent =
        "Registration successful! Welcome, " + userData.name + ".";
      registerMessage.classList.remove("login-register-message-error");
      registerMessage.classList.add("login-register-message-welcome");

      setTimeout(() => {
        window.location.href = "./products.html";
      }, 1000);
    } catch (error) {
      const rawMessage = error.message || "";
      let message;
      if (
        rawMessage.includes("duplicate key") &&
        rawMessage.includes("email")
      ) {
        message =
          "This email is already registered. Please use a different email.";
        document.getElementById("email").value = "";
      } else if (rawMessage.includes("value too long")) {
        message = "One or more fields exceed the maximum allowed length.";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
        document.getElementById("phone-number").value = "";
      } else {
        message = "Registration failed. Please try again.";
      }
      registerMessage.textContent = message;
    }
  }

  document
    .getElementById("register-form")
    .addEventListener("submit", handleRegister);
}
