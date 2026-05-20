import { setTaxTotalPrice } from "./set-tax-total.js";

export function setDiscount(calculatedSubtotal) {
  const discountApplyButton = document.getElementById("apply-discount-button");
  discountApplyButton.addEventListener("click", () => {
    // prepare discount amount element in summary
    const discountAmountText = document.getElementById("discount-amount");
    const discountMessage = document.getElementById("discount-message");
    discountAmountText.textContent = "";
    discountMessage.textContent = "";
    discountMessage.classList.remove(
      "discount-message-success",
      "discount-message-error",
    );

    // get discount voucher from disconunt input field
    const discountUserVoucher = document.getElementById("discount-code").value;
    if (!discountUserVoucher) {
      discountAmountText.textContent = `Discount: $0.00`;
    } else {
      // get discounts from local session and compare with user input
      const discounts =
        JSON.parse(sessionStorage.getItem("lyfterPetShopDiscounts")) || [];
      const matchedDiscount = discounts.find(
        (discount) => discountUserVoucher === discount.voucher,
      );

      if (matchedDiscount) {
        const discountAmount = (
          (calculatedSubtotal * matchedDiscount.amount) /
          100
        ).toFixed(2);

        discountAmountText.textContent = `Discount: -$${discountAmount}`;
        discountMessage.classList.add("discount-message-success");
        discountMessage.textContent = "Discount applied successfully";
      } else {
        discountMessage.classList.add("discount-message-error");
        discountMessage.textContent = "Invalid discount code";
        discountAmountText.textContent = `Discount: $0.00`;
      }
    }
    setTaxTotalPrice();
  });
}
