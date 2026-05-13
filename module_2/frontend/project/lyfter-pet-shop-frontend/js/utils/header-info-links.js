export function infoLinks() {
  const productsLink = document.getElementById("products");
  const aboutUsLink = document.getElementById("about");
  const locationsLink = document.getElementById("locations");
  const contactLink = document.getElementById("contact");

  const ifProductsLinkExists = () => {
    if (productsLink) {
      productsLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "../pages/products.html";
      });
    }
  };

  ifProductsLinkExists();

  aboutUsLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../index.html#section-about";
  });

  locationsLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../index.html#section-locations";
  });

  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../index.html#section-contact";
  });
}
