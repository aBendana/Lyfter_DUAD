export function loginRegisterLinks() {
  // reference to login and register links
  const loginLink = document.getElementById("login");
  const registerLink = document.getElementById("register");

  // event listeners for login and register links
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "login.html";
  });

  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "register.html";
  });
}
