/* this module is used for admin dashboard and customer dashboard, 
as both have the same change password functionality */

import { validatePassword } from "./password-logic-admin.js";

export async function changePasswordAdmin() {
  try {
    const changePasswordButton = document.getElementById(
      "dashboard-change-password",
    );
    changePasswordButton.addEventListener("click", () => {
      const changePasswordContent =
        document.getElementById("dashboard-content");
      changePasswordContent.innerHTML = ""; // clear previous content
      changePasswordContent.className = "";
      changePasswordContent.classList.add("change-password-content");

      // create form title
      const formTitle = document.createElement("h3");
      formTitle.classList.add("container-title");
      formTitle.textContent = "Change your Password";
      changePasswordContent.appendChild(formTitle);

      // create form
      const changePasswordForm = document.createElement("form");
      changePasswordForm.classList.add("change-password-form");
      changePasswordContent.appendChild(changePasswordForm);

      // current password input
      const currentPasswordLabel = document.createElement("label");
      currentPasswordLabel.textContent = "Current Password:";
      changePasswordForm.appendChild(currentPasswordLabel);
      const currentPasswordInput = document.createElement("input");
      currentPasswordInput.type = "password";
      changePasswordForm.appendChild(currentPasswordInput);

      // new password input
      const newPasswordLabel = document.createElement("label");
      newPasswordLabel.textContent = "New Password:";
      changePasswordForm.appendChild(newPasswordLabel);
      const newPasswordInput = document.createElement("input");
      newPasswordInput.type = "password";
      changePasswordForm.appendChild(newPasswordInput);

      // confirm new password input
      const confirmNewPasswordLabel = document.createElement("label");
      confirmNewPasswordLabel.textContent = "Confirm New Password:";
      changePasswordForm.appendChild(confirmNewPasswordLabel);
      const confirmNewPasswordInput = document.createElement("input");
      confirmNewPasswordInput.type = "password";
      changePasswordForm.appendChild(confirmNewPasswordInput);

      // buttons container
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("change-password-buttons-container");
      changePasswordForm.appendChild(buttonsContainer);

      // submit button
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Save";
      buttonsContainer.appendChild(submitButton);

      // back button
      const backButton = document.createElement("button");
      backButton.type = "button";
      backButton.textContent = "Back";
      buttonsContainer.appendChild(backButton);
      backButton.addEventListener("click", () => {
        document.getElementById("dashboard-personal-data").click();
      });

      // success message
      const successMessage = document.createElement("h2");
      successMessage.classList.add("success-message");
      changePasswordForm.appendChild(successMessage);

      // error message
      const errorMessage = document.createElement("h2");
      errorMessage.classList.add("error-message");
      changePasswordForm.appendChild(errorMessage);

      // handle form submission
      changePasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // capture input values
        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmNewPassword = confirmNewPasswordInput.value.trim();

        // call updatePassword function
        await validatePassword(
          currentPassword,
          newPassword,
          confirmNewPassword,
          currentPasswordInput,
          newPasswordInput,
          confirmNewPasswordInput,
          errorMessage,
          successMessage,
        );
      });
    });
  } catch (error) {
    console.error("Error creating password change request:", error);
  }
}
