async function loginUser(username, password) {
  const url = "https://dummyjson.com/auth/login";
  const data = {
    username: username,
    password: password,
    expiresInMins: 5, // session expires time in minutes
  };

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    const user = response.data;
    console.log(user);
    const loginMessage = document.getElementById("login-message");

    if (user && user.accessToken) {
      // Save session data to localStorage
      const expiresTime = Date.now() + data.expiresInMins * 60 * 1000; // 5 minutes in ms
      // we save with the parameter expiresAt
      localStorage.setItem(
        "lyfterUserSession",
        JSON.stringify({
          ...user,
          isLoggedIn: true,
          loginAt: new Date().toISOString(),
          expiresAt: expiresTime,
        }),
      );

      loginMessage.textContent = `Successfully logged! Welcome back, ${user.firstName} ${user.lastName}.`;

      // Redirect to profile page
      window.location.href = "3_page_profile_expires.html";
    }
  } catch (error) {
    // errors from API and errors from network
    const apiMessage = error?.response?.data?.message || error.message;
    console.error("Login failed:", apiMessage, error?.response?.data);
    const loginMessage = document.getElementById("login-message");
    loginMessage.textContent = `Login failed: ${apiMessage}`;
  }
}

// valid use for testing:
// username: michaelw, jacksone, mateon
// password: michaelwpass, jacksonepass, mateonpass
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("login-message").textContent =
      "Please enter username and password.";
    return;
  }

  loginUser(username, password);
});
