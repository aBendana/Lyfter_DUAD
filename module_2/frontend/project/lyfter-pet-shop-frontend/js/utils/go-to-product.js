export function goToProduct() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");

    if (card) {
      const productId = card.dataset.id;
      window.location.href = `../pages/product-detail.html?id=${productId}`;
    }
  });
}
