export function initSocialMediaLinks() {
  // reference social media links
  const facebookLink = document.getElementById("facebook-link");
  const instagramLink = document.getElementById("instagram-link");
  const pinterestLink = document.getElementById("pinterest-link");
  const youTubeLink = document.getElementById("youtube-link");

  // event listeners for social media links
  facebookLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://www.facebook.com/lyfterpetshop");
  });

  instagramLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://www.instagram.com/lyfterpetshop");
  });

  pinterestLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://www.pinterest.com/lyfterpetshop");
  });

  youTubeLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://www.youtube.com/lyfterpetshop");
  });
}
