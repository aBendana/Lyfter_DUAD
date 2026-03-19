function getSession() {
  const sessionUserData = localStorage.getItem("lyfterUserSession");
  if (!sessionUserData) return null;

  try {
    const session = JSON.parse(sessionUserData);
    return session;
  } catch (error) {
    console.error("Invalid session data:", error.message);
    localStorage.removeItem("lyfterUserSession");
    return null;
  }
}

function isSessionExpired(session) {
  if (!session || !session.expiresAt) return true;
  return Date.now() > session.expiresAt;
}

function logout() {
  localStorage.removeItem("lyfterUserSession");
  window.location.href = "3_page_login.html";
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
    if (isSessionExpired(sessionUser)) {
      logout();
      return;
    }
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
    window.location.href = "3_page_login.html";
  }

  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    logout();
  });
}

// go to change password page, doesn't work for this exercise
// but we can use it to test session expiration by trying
// to access change password page after session expires
// !but actually we add setInterval to check session expiration every 30 seconds,
// !so it will automatically log out when session expires
const changePasswordButton = document.getElementById("change-password-button");
changePasswordButton.addEventListener("click", () => {
  // we can also check session expiration here before redirecting
  const sessionUser = getSession();
  if (isSessionExpired(sessionUser)) {
    logout();
    return;
  }

  window.location.href = "4_page_change_password.html";
});

// timer to automatically check for session expiration every 30 seconds
let showWarning = false;
setInterval(() => {
  const sessionUser = getSession();
  if (!sessionUser) return;

  const timeLeft = sessionUser.expiresAt - Date.now();
  if (timeLeft <= 0) {
    logout();
    return;
  }

  if (timeLeft < 60000 && !showWarning) {
    alert("Session will expire in less than 1 minute.");
    showWarning = true;
  }
}, 30000); // check every 30 seconds

loadSession();
