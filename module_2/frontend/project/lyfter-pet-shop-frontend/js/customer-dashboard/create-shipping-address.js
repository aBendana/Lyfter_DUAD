import { postShippingAddress } from "../requests/post-shipping-address.js";
import { validateShippingAddress } from "./edit-shipping-address.js";

export async function createShippingAddress() {
  const addNewAddressButton = document.getElementById("add-new-address-button");
  addNewAddressButton?.addEventListener("click", () => {
    try {
      const shippingAddressContent =
        document.getElementById("dashboard-content");
      shippingAddressContent.innerHTML = ""; // clear previous content
      shippingAddressContent.className = ""; // clear previous classes
      shippingAddressContent.classList.add("create-shipping-address-content");

      // create form title
      const formTitle = document.createElement("h3");
      formTitle.classList.add("container-title");
      formTitle.textContent = "Add new Shipping Address";
      shippingAddressContent.appendChild(formTitle);

      // create form
      const addressForm = document.createElement("form");
      addressForm.classList.add("create-shipping-address-form");

      // create address input
      const addressLabel = document.createElement("label");
      addressLabel.textContent = "Address:";
      addressForm.appendChild(addressLabel);
      const addressInput = document.createElement("input");
      addressInput.type = "text";
      addressForm.appendChild(addressInput);

      // create canton input
      const cantonLabel = document.createElement("label");
      cantonLabel.textContent = "Canton:";
      addressForm.appendChild(cantonLabel);
      const cantonInput = document.createElement("input");
      cantonInput.type = "text";
      addressForm.appendChild(cantonInput);

      // create a select for provinces
      const provinceLabel = document.createElement("label");
      provinceLabel.textContent = "Province:";
      addressForm.appendChild(provinceLabel);
      const provinceSelect = document.createElement("select");
      addressForm.appendChild(provinceSelect);
      const provinces = [
        { value: "alajuela", label: "Alajuela" },
        { value: "cartago", label: "Cartago" },
        { value: "guanacaste", label: "Guanacaste" },
        { value: "heredia", label: "Heredia" },
        { value: "limon", label: "Limon" },
        { value: "puntarenas", label: "Puntarenas" },
        { value: "san_jose", label: "San Jose" },
      ];
      provinces.forEach((province) => {
        const option = document.createElement("option");
        option.value = province.value;
        option.textContent = province.label;
        provinceSelect.appendChild(option);
      });

      // create postal code input
      const postalCodeLabel = document.createElement("label");
      postalCodeLabel.textContent = "Postal Code:";
      addressForm.appendChild(postalCodeLabel);
      const postalCodeInput = document.createElement("input");
      postalCodeInput.type = "text";
      addressForm.appendChild(postalCodeInput);

      // create success message element
      const successMessage = document.createElement("h2");
      successMessage.classList.add("success-message");
      addressForm.appendChild(successMessage);

      //buttons container
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("create-address-buttons-container");
      addressForm.appendChild(buttonsContainer);

      // create submit button
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.classList.add("create-address-button");
      submitButton.textContent = "Add Address";
      buttonsContainer.appendChild(submitButton);

      // create back button
      const backButton = document.createElement("button");
      backButton.type = "button";
      backButton.id = "back-button";
      backButton.classList.add("create-address-button", "back-button");
      backButton.textContent = "Back";
      buttonsContainer.appendChild(backButton);
      // handle back button click — re-render of addresses list
      backButton.addEventListener("click", () => {
        document.getElementById("dashboard-addresses").click();
      });

      // handle form submission
      addressForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // validate inputs before submitting the form
        if (
          !validateShippingAddress(
            addressInput.value,
            addressInput,
            cantonInput.value,
            cantonInput,
            postalCodeInput.value,
            postalCodeInput,
          )
        ) {
          return;
        }

        // gather info from form
        const newAddress = {
          address: addressInput.value,
          canton: cantonInput.value,
          province: provinceSelect.value,
          postal_code: postalCodeInput.value,
        };
        console.log("New address to submit:", newAddress);

        try {
          await postShippingAddress(newAddress);
          successMessage.textContent = "Your new address is ready for use!";
        } catch (error) {
          console.error("Error creating new address:", error);
          successMessage.textContent = `Failed to create new address: ${error}. Please try again.`;
        }
      });

      shippingAddressContent.appendChild(addressForm);
    } catch (error) {
      console.error("Error creating shipping address form:", error);
    }
  });
}
