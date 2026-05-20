import { updateUserInfo } from "../requests/patch-user-admin.js";
import {
  emailFormatValidation,
  phoneNumberFormatValidation,
} from "../utils/input-restrictions.js";

export async function editUserInfo(userId, userRole) {
  const emailOriginalLabel = document.getElementById("email");
  const phoneOriginalLabel = document.getElementById("phone-number");
  const editInfoButton = document.getElementById("edit-info-button");
  const buttonsContainer = editInfoButton.parentElement;

  // replace <p> elements with <input> elements
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.classList.add("personal-text", "personal-input");
  emailInput.value = emailOriginalLabel.textContent;
  emailInput.disabled = true;
  emailOriginalLabel.replaceWith(emailInput);

  const phoneInput = document.createElement("input");
  phoneInput.type = "text";
  phoneInput.id = "phone-number";
  phoneInput.classList.add("personal-text", "personal-input");
  phoneInput.value = phoneOriginalLabel.textContent;
  phoneInput.disabled = true;
  phoneOriginalLabel.replaceWith(phoneInput);

  editInfoButton.addEventListener("click", () => {
    const lastEmailValue = emailInput.value;
    const lastPhoneValue = phoneInput.value;

    emailInput.disabled = false;
    phoneInput.disabled = false;
    emailInput.focus();

    // disable edit button while in edit mode
    editInfoButton.disabled = true;

    //add save and cancel buttons
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    saveButton.classList.add("update-info-button");
    buttonsContainer.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("update-info-button");
    buttonsContainer.appendChild(cancelButton);

    // save button functionality
    saveButton.addEventListener("click", async () => {
      const emailInputValue = emailInput.value.trim();
      const phoneInputValue = phoneInput.value.trim();

      if (emailInputValue === "" || phoneInputValue === "") {
        alert("Email or phone number cannot be empty.");
        return;
      }

      // validate email
      if (!emailFormatValidation(emailInputValue)) {
        emailInput.value = lastEmailValue;
        alert("Invalid email format.");
        return;
      }

      // validate phone number
      if (!phoneNumberFormatValidation(phoneInputValue)) {
        phoneInput.value = lastPhoneValue;
        alert("Invalid phone number format. Please use XXXX-XXXX format.");
        return;
      }

      const updatePaylod = {
        email: emailInputValue,
        phone_number: phoneInputValue,
      };

      try {
        await updateUserInfo(userId, updatePaylod);
        // update local storage session
        updatelocalStorageSession(emailInputValue, phoneInputValue, userRole);
        cleanupEditMode(saveButton, cancelButton);
      } catch (error) {
        console.error("Failed to update user info:", error);
        alert(
          "An error occurred while saving. Please try other email or phone number.",
        );
      }
    });

    // cancel button functionality
    cancelButton.addEventListener("click", () => {
      emailInput.value = lastEmailValue;
      phoneInput.value = lastPhoneValue;
      cleanupEditMode(saveButton, cancelButton);
    });
  });
}

// clean up the edit mode
function cleanupEditMode(saveButton, cancelButton) {
  //const nameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone-number");
  const editInfoButton = document.getElementById("edit-info-button");

  //nameInput.disabled = true;
  emailInput.disabled = true;
  phoneInput.disabled = true;
  editInfoButton.disabled = false;

  if (saveButton) saveButton.remove();
  if (cancelButton) cancelButton.remove();
}

// update local storage session
function updatelocalStorageSession(email, phone, userRole) {
  console.log(userRole);
  // functions continue only if the user is an administrator,
  // since only administrators can edit their own local storage
  if (userRole === "administrator") {
    try {
      const newEmail = email;
      const newPhone = phone;
      const sessionData = JSON.parse(
        localStorage.getItem("lyfterPetShopSession"),
      );

      if (!sessionData)
        throw new Error("Session data not found in localStorage.");

      sessionData.email = newEmail;
      sessionData.phone_number = newPhone;

      localStorage.setItem("lyfterPetShopSession", JSON.stringify(sessionData));
    } catch (error) {
      console.error("Failed to update localStorage session:", error);
    }
  } else return;
}
