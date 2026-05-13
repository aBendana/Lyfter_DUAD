import { getPersonalInfo } from "../requests/get-personal-info.js";
import { checkPasswordStrength } from "../register/password-restrictions.js";
import { updatePersonalInfo } from "../requests/patch-personal-info.js";

export async function validatePassword(
  currentPassword,
  newPassword,
  confirmNewPassword,
  currentPasswordInput,
  newPasswordInput,
  confirmNewPasswordInput,
  errorMessage,
  successMessage,
) {
  let originalPassword = "";
  try {
    const personalInfo = await getPersonalInfo();
    originalPassword = personalInfo[0].password;
  } catch (error) {
    console.error("Error fetching personal info:", error);
  }

  if (currentPassword !== originalPassword) {
    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmNewPasswordInput.value = "";
    errorMessage.textContent = "Current password is incorrect";
    successMessage.textContent = "";

    console.log("Current password is incorrect");
  } else if (!checkPasswordStrength(newPassword)) {
    newPasswordInput.value = "";
    confirmNewPasswordInput.value = "";
    errorMessage.textContent = "New password does not meet the requirements";
    successMessage.textContent = "";

    console.log("New password does not meet the requirements");
  } else if (newPassword === originalPassword) {
    newPasswordInput.value = "";
    confirmNewPasswordInput.value = "";
    errorMessage.textContent =
      "New password cannot be the same as the current password";
    successMessage.textContent = "";

    console.log("New password cannot be the same as the current password");
  } else if (newPassword !== confirmNewPassword) {
    newPasswordInput.value = "";
    confirmNewPasswordInput.value = "";
    errorMessage.textContent = "New passwords do not match";
    successMessage.textContent = "";

    console.log("New passwords do not match");
  } else {
    try {
      await updatePersonalInfo({ password: newPassword });
      successMessage.textContent = "Password updated successfully.";
      successMessage.textContent += " Please relogin to continue.";

      currentPasswordInput.value = "";
      newPasswordInput.value = "";
      confirmNewPasswordInput.value = "";
      errorMessage.textContent = "";

      console.log("Password updated successfully");
      //delay before redirecting to allow user to read the success message
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 2500);
    } catch (error) {
      console.error("Error updating password:", error);
      errorMessage.textContent = "Failed to update password. Please try again.";
    }
  }
}
