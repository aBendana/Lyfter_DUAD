import { getUserByAdmin } from "../requests/get-user-admin.js";
import { userInfoContent } from "./user-info-content.js";
import { editUserInfo } from "./edit-user.js";

export async function handleViewUser(userId) {
  try {
    const userInfo = await getUserByAdmin(userId);

    userInfoContent(userInfo);
    editUserInfo(userInfo[0].id, userInfo[0].role);
  } catch (error) {
    console.error("Failed to load user info:", error);
    const userInfoContainer = document.getElementById("dashboard-content");
    userInfoContainer.innerHTML = `<p class="error-message-generic">Failed to load user info: ${error}. Please try again later.</p>`;
  }
}
