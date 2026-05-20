import { userInfoContent } from "./user-info-content.js";
import { editUserInfo } from "./edit-user.js";

export function loadAdminInfo() {
  try {
    const adminInfo = JSON.parse(localStorage.getItem("lyfterPetShopSession"));

    // create admin info
    const adminInfoButton = document.getElementById("dashboard-personal-info");
    adminInfoButton.addEventListener("click", () => {
      userInfoContent(adminInfo);
      editUserInfo(adminInfo.id);
    });
  } catch (error) {
    console.error("Admin info load failed:", error);
    const adminInfoContainer = document.getElementById("dashboard-content");
    adminInfoContainer.innerHTML = `<p class="error-message-generic">Failed to load admin info: ${error.message}. Please try again later.</p>`;
  }
}
