export function setupLinksWithinPage() {
  // reference to login and register links
  const loginLink = document.getElementById("login");
  const registerLink = document.getElementById("register");

  // reference within the same landing page sections
  const productsLink = document.getElementById("products");
  const aboutLink = document.getElementById("about");
  const locationsLink = document.getElementById("locations");
  const contactLink = document.getElementById("contact");

  // event listeners for login and register links
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "./pages/login.html";
  });

  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "./pages/register.html";
  });

  // event listeners for within same landingpage sections
  productsLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "./pages/products.html";
  });

  aboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    const aboutSection = document.getElementById("section-about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });

  locationsLink.addEventListener("click", (event) => {
    event.preventDefault();
    const locationsSection = document.getElementById("section-locations");
    locationsSection.scrollIntoView({ behavior: "smooth" });
  });

  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    const contactSection = document.getElementById("section-contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
}
