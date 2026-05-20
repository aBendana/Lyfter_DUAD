/* this module doesn't have any action,
1st we don't real payment system in this project,
2nd for orders the api for client don't have any
endpoiont for orders history */

function showMessage() {
  const paymentOrdersContainer = document.getElementById("dashboard-content");
  paymentOrdersContainer.innerHTML = "";

  const figureLogo = document.createElement("figure");
  figureLogo.classList.add("construction-figure");
  paymentOrdersContainer.appendChild(figureLogo);
  const logoImage = document.createElement("img");
  logoImage.src = "../assets/images/logo.png";
  logoImage.alt = "Under Construction";
  logoImage.classList.add("construction-logo");
  figureLogo.appendChild(logoImage);

  const constructionMessage = document.createElement("h2");
  constructionMessage.classList.add("construction-message");
  constructionMessage.textContent = "This section is under construction.";
  paymentOrdersContainer.appendChild(constructionMessage);
}

export function showPaymentMethods() {
  const paymentButton = document.getElementById("dashboard-payment");
  paymentButton.addEventListener("click", () => {
    showMessage();
  });
}

export function showOrdersHistory() {
  const ordersHistoryButton = document.getElementById("dashboard-orders");
  ordersHistoryButton.addEventListener("click", () => {
    showMessage();
  });
}
