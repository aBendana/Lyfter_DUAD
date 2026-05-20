import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function updateUserInfo(userId, updatedInfo) {
  const url = `http://127.0.0.1:5000/admin/users/${userId}`;
  const payload = updatedInfo;

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error(
      "Failed to update personal info:",
      apiMessage,
      error?.response?.data,
    );
    throw new Error(apiMessage);
  }
}
