import { postInvoice } from "../requests/post-invoice.js";

export async function purchaseEvent() {
  const placeOrderButton = document.getElementById("place-order-button");
  placeOrderButton.addEventListener("click", async () => {
    // gather checkout data
    const shippingAddressId = document.getElementById("shipping-address").value;
    const shippingMethod = document.getElementById("shipping-method").value;
    const paymentMethod = document.getElementById("payment-method").value;

    // validate required selects
    const selects = ["shipping-address", "shipping-method", "payment-method"];
    for (const id of selects) {
      const element = document.getElementById(id);
      if (!element.value) {
        element.reportValidity();
        return;
      }
    }

    const discountVoucher = document.getElementById("discount-code").value;
    console.log("Entered discount code:", discountVoucher);
    const discountsArray =
      JSON.parse(sessionStorage.getItem("lyfterPetShopDiscounts")) || [];
    const discount = discountsArray.find(
      (dis) => dis.voucher === discountVoucher,
    );
    const discountAmount = discount ? discount.amount : 0;
    console.log("Applied discount amount:", discountAmount);

    // populate invoice data
    const invoiceData = {
      shipping_address_id: shippingAddressId,
      shipping_method: shippingMethod,
      payment_method: paymentMethod,
      discount: discountAmount,
    };

    try {
      const purchaseInvoice = await postInvoice(invoiceData);
      console.log("Invoice posted successfully:", purchaseInvoice);

      // store order completion status for confirmation page
      if (purchaseInvoice) localStorage.setItem("orderCompleted", true);
      // clean cart count
      localStorage.setItem("lyfterPetShopCartItems", JSON.stringify(0));

      // store invoice id for confirmation page
      sessionStorage.setItem(
        "lyfterPetShopInvoiceId",
        JSON.stringify(purchaseInvoice.invoice.id),
      );

      window.location.href = "confirmation.html";
    } catch (error) {
      console.error("Error posting invoice:", error);
    }
  });
}
