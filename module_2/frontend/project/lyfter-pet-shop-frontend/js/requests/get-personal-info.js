import { initAuth } from "../utils/refresh-auth.js";
import { getAccessToken } from "../utils/token-manager.js";

export async function getPersonalInfo() {
  const url = "http://127.0.0.1:5000/client/info/personal-data";

  try {
    const authenticated = await initAuth();
    if (!authenticated) return null;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    const personalInfo = response.data;
    return personalInfo;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error(
      "Personal info fetch failed:",
      apiMessage,
      error?.response?.data,
    );
    throw new Error(apiMessage);
  }
}
