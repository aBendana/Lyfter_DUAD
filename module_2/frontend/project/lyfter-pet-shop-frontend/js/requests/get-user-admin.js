import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function getUserByAdmin(userId) {
  const url = `http://127.0.0.1:5000/admin/users?id=${userId}`;

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    const userInfo = response.data;
    return userInfo;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("User info fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}

export async function getAllUsers() {
  const url = "http://127.0.0.1:5000/admin/users";

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    const allUsers = response.data;
    return allUsers;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("User info fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}
