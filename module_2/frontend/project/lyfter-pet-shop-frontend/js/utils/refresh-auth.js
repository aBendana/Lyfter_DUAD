import {
  getRefreshToken,
  clearRefreshToken,
  setAccessToken,
} from "./token-manager.js";

const refresh_url = "http://127.0.0.1:5000/auth/refresh-token";

/*
 * silently restore the access token using the refresh token
 * stored in sessionStorage.
 * Should be called at the top of every protected page.
 */

export async function initAuth() {
  const refreshToken = getRefreshToken();

  // no refresh token means user is not logged in
  if (!refreshToken) {
    window.location.href = "../pages/login.html";
    return false;
  }

  try {
    const response = await axios.post(
      refresh_url,
      {}, // don't send payload
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        }, // the backend will verify the refresh token and return a new access token,
        // if it's valid, otherwise it will return an error
        // if we had a real domain, we would also need to add:  withCredentials: true
      },
    );

    const newAccessToken = response.data?.new_access_token;
    if (!newAccessToken) {
      throw new Error("No access token received from refresh endpoint.");
    }

    setAccessToken(newAccessToken);
    return true;
  } catch (error) {
    console.error("Silent refresh failed:", error);
    // clear invalid refresh token and redirect to login
    clearRefreshToken();
    window.location.href = "../pages/login.html";
    return false;
  }
}
