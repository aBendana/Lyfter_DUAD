function getSession() {
  const sessionUserData = localStorage.getItem("lyfterUserSession");
  if (!sessionUserData) return null;

  try {
    return JSON.parse(sessionUserData);
  } catch (error) {
    console.error("Invalid session data:", error.message);
    localStorage.removeItem("lyfterUserSession");
    return null;
  }
}

function logout() {
  localStorage.removeItem("lyfterUserSession");
  window.location.href = "2_page_login.html";
}

// adress has two possible formats, string or object with address property,
// this function normalizes it to string
function getAddressText(addressValue) {
  if (!addressValue) return "";
  if (typeof addressValue === "string") return addressValue;
  if (typeof addressValue === "object" && addressValue.address) {
    return addressValue.address;
  }
  return "";
}

function loadSession() {
  const sessionUser = getSession();
  if (sessionUser?.isLoggedIn) {
    const profileImage = document.getElementById("profile-image");
    profileImage.src = sessionUser.image;

    document.getElementById("profile-session-id").textContent =
      sessionUser.id || "";
    document.getElementById("profile-first-name").textContent =
      sessionUser.firstName || "";
    document.getElementById("profile-last-name").textContent =
      sessionUser.lastName || "";
    document.getElementById("profile-username").textContent =
      sessionUser.username || "";
    document.getElementById("profile-address").textContent = getAddressText(
      sessionUser.address,
    );
    document.getElementById("profile-email").textContent =
      sessionUser.email || "";
  }
  //if theres no session redirect to login page
  else {
    window.location.href = "2_page_login.html";
  }

  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    logout();
  });
}

// go to change password page
const changePasswordButton = document.getElementById("change-password-button");
changePasswordButton.addEventListener("click", () => {
  window.location.href = "4_page_change_password.html";
});

loadSession();
