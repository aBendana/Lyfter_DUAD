/*
 * Bad practice note:
 * Storing passwords in localStorage is insecure and only used here for simulation.
 * In real apps, password changes must be done through backend API with auth + validation.
 */

// get session data from localStorage and verify data integrity
function getSession() {
  const sessionUserData = localStorage.getItem("lyfterUserSession");
  if (!sessionUserData) {
    localStorage.removeItem("lyfterUserSession");
    return null;
  }
  try {
    return JSON.parse(sessionUserData);
  } catch (error) {
    localStorage.removeItem("lyfterUserSession");
    console.error("Invalid session data:", error.message);
    return null;
  }
}

async function getApiUser(id) {
  const url = `https://dummyjson.com/users/${id}`;

  try {
    const response = await axios.get(url);
    const user = response.data;
    return user;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// This function validates that the current session user exists in the DummyJSON API,
// it works reliably with users coming from login (real API users).
// Users created with "https://dummyjson.com/users/add" are simulated and not persisted,
// so they may not be found later when this page is opened.
// If the user does not exist in the API, an error message is shown immediately.
async function compareUserId() {
  const sessionUser = getSession();
  const sessionUserId = sessionUser?.id;
  const apiUser = await getApiUser(sessionUserId);
  const changePasswordMessage = document.getElementById(
    "change-password-message",
  );
  const changePasswordTitle = document.getElementById("change-password-title");

  if (!apiUser) {
    changePasswordMessage.textContent = "User not found in API";
    changePasswordMessage.style.color = "red";
    return;
  } else if (apiUser.id !== sessionUserId) {
    changePasswordMessage.textContent =
      "User ID mismatch between session and API";
    changePasswordMessage.style.color = "red";
    return;
  } else {
    changePasswordTitle.textContent = `Change your password user ${sessionUser.firstName} ${sessionUser.lastName}`;
  }
}

function getPasswordFromSession() {
  const sessionUser = getSession();
  return sessionUser?.password || null;
}

function changePassword() {
  const currentPasswordInput = document.getElementById("current-password");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const changePasswordMessage = document.getElementById(
    "change-password-message",
  );

  const form = document.getElementById("change-password-form");
  // password can't not be really changed in dummyjson API,
  // so we will just simulate the change and show a message
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentPassword = currentPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      changePasswordMessage.textContent = "Please fill in all fields.";
      changePasswordMessage.style.color = "red";
      return;
    }

    /** 
    const sessionPassword = getPasswordFromSession();
    // simulate current password verification with session data
    if (currentPassword !== sessionPassword) {
      changePasswordMessage.textContent = "Current password is incorrect.";
      changePasswordMessage.style.color = "red";
      return;
    }
    */

    if (currentPassword === newPassword) {
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";
      changePasswordMessage.textContent =
        "New password must be different from current password.";
      changePasswordMessage.style.color = "red";
      return;
    }

    if (newPassword !== confirmPassword) {
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";
      changePasswordMessage.textContent = "New passwords do not match.";
      changePasswordMessage.style.color = "red";
      return;
    }

    // other validations length, number and symbol
    if (
      newPassword.length < 8 ||
      !/\d/.test(newPassword) ||
      !/[^a-zA-Z0-9]/.test(newPassword)
    ) {
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";
      changePasswordMessage.textContent =
        "New password must be at least 8 characters long, include a number and a symbol.";
      changePasswordMessage.style.color = "red";
      return;
    }

    // if we had real API we could update the password in the backend here,
    // after successful change, for now we can redirect to profile page
    // or just show the message (we just show the message***)
    changePasswordMessage.textContent = "Password changed successfully!";
    changePasswordMessage.style.color = "green";

    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";

    // window.location.href = "3_page_profile.html";
  });
}

compareUserId();
changePassword();
