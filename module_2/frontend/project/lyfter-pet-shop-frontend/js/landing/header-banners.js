export function initBanners() {
  const banners = document.querySelectorAll(".banner-section .banner");

  if (banners.length === 0) {
    console.warn("No banners found in the page");
    return;
  }

  let current = 0;
  function showBanner(index) {
    banners.forEach((banner, i) => {
      banner.classList.toggle("active", i === index);
    });
  }

  // show first banner immediately
  showBanner(current);

  // nothing to rotate if there's only one banner
  if (banners.length === 1) return;

  // change banner every 3 seconds
  setInterval(() => {
    current = (current + 1) % banners.length;
    showBanner(current);
  }, 3000);
}
