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

// separate the update of the endpoint and the local storage,
// for an easier maintainance and handle
// only can update username and gender in the endpoint
async function updateProfile(newUsername, newGender) {
  const sessionUser = getSession();
  if (!sessionUser) return;
  const id = sessionUser.id;
  const url = `https://dummyjson.com/users/${id}`;
  const data = {
    username: newUsername,
    gender: newGender,
  };

  try {
    const response = await axios.patch(url, data);
    const updatedUser = response.data;
    // to check if the response really worked
    console.log("Profile updated:");
    console.log("ID:", updatedUser.id);
    console.log("Username:", updatedUser.username);
    console.log("Gender:", updatedUser.gender);

    //return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
}

// only update username and gender in local storage
function updateLocalStorage(newUsername, newGender) {
  const sessionUser = getSession();
  if (!sessionUser) return;
  sessionUser.username = newUsername;
  sessionUser.gender = newGender;
  localStorage.setItem("lyfterUserSession", JSON.stringify(sessionUser));
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
    document.getElementById("profile-gender").textContent =
      sessionUser.gender || "";
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

// this part is not working because this was for other exercise,
// but we can leave it here for future reference
// go to change password page
const changePasswordButton = document.getElementById("change-password-button");
changePasswordButton.addEventListener("click", () => {
  window.location.href = "4_page_change_password.html";
});

// this only changes username and gender
function changeProfile() {
  const actionsButtonsContainer = document.getElementById(
    "actions-buttons-container",
  );
  const changeProfileButton = document.getElementById("change-profile-button");
  const changePasswordButton = document.getElementById(
    "change-password-button",
  );
  const profileUsername = document.getElementById("profile-username");
  const profileGender = document.getElementById("profile-gender");
  let originalUsername = "";
  let originalGender = "";

  const cleanupEditMode = (saveButton, cancelButton) => {
    profileUsername.contentEditable = "false";
    profileUsername.style.backgroundColor = "";
    profileGender.contentEditable = "false";
    profileGender.style.backgroundColor = "";
    changeProfileButton.disabled = false;
    changePasswordButton.disabled = false;
    if (saveButton) saveButton.remove();
    if (cancelButton) cancelButton.remove();
  };

  changeProfileButton.addEventListener("click", () => {
    originalUsername = profileUsername.textContent;
    originalGender = profileGender.textContent;

    changeProfileButton.disabled = true;
    changePasswordButton.disabled = true;

    //enable editing for username and gender
    profileUsername.contentEditable = "true";
    profileUsername.style.backgroundColor = "lightyellow";
    profileGender.contentEditable = "true";
    profileGender.style.backgroundColor = "lightyellow";
    profileUsername.focus();

    //add save button and fucntionality
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    saveButton.classList.add("action-button");
    actionsButtonsContainer.appendChild(saveButton);

    saveButton.addEventListener("click", async () => {
      const newUsername = profileUsername.textContent.trim();
      const newGender = profileGender.textContent.trim();

      if (newUsername === "" || newGender === "") {
        alert("Username and gender cannot be empty.");
        return;
      }

      await updateProfile(newUsername, newGender);
      updateLocalStorage(newUsername, newGender);
      cleanupEditMode(saveButton, cancelButton);
    });

    //add cancel button and functionality
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("action-button");
    actionsButtonsContainer.appendChild(cancelButton);

    cancelButton.addEventListener("click", () => {
      profileUsername.textContent = originalUsername;
      profileGender.textContent = originalGender;
      cleanupEditMode(saveButton, cancelButton);
    });
  });
}

loadSession();
changeProfile();
