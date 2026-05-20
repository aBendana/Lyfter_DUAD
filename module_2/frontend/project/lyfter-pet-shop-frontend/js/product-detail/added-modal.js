const continueShopping = document.getElementById("continue-shopping-button");
const goToCart = document.getElementById("go-to-cart-button");

continueShopping.addEventListener("click", () => {
  window.location.href = "products.html";
  document.getElementById("modal").classList.remove("show");
});

goToCart.addEventListener("click", () => {
  window.location.href = "cart.html";
  document.getElementById("modal").classList.remove("show");
});

export function showModal(message) {
  document.getElementById("modal-message").textContent = message;
  document.getElementById("modal").classList.add("show");
}
