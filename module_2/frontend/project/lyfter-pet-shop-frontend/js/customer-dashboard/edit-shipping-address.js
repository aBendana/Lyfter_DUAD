import { getShippingAddressById } from "../requests/get-shipping-adresses.js";
import { updateShippingAddress } from "../requests/patch-shipping-address.js";

export async function editShippingAddress() {
  const editButtons = document.querySelectorAll(".edit-address-button");

  editButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        // get the right address to edit BEFORE modifying the DOM
        const addressId = event.target.closest(".update-buttons-container")
          ?.previousElementSibling?.dataset?.addressId;

        if (!addressId) {
          console.error("Could not find address ID for the selected address.");
          return;
        }

        const addressEditContainer =
          document.getElementById("dashboard-content");
        addressEditContainer.innerHTML = ""; // clear previous content
        addressEditContainer.className = ""; // clear previous classes
        addressEditContainer.classList.add("edit-address-content");
        const shippingAddress = await getShippingAddressById(addressId);
        console.log("Shipping address to edit:", shippingAddress);

        // create form title
        const formTitle = document.createElement("h3");
        formTitle.classList.add("container-title");
        formTitle.textContent = "Edit your Shipping Address";
        addressEditContainer.appendChild(formTitle);

        // create edit form
        const editForm = document.createElement("form");
        editForm.classList.add("edit-address-form");

        //create input fields and pre-fill with current address info
        // address input
        const addressLabel = document.createElement("label");
        addressLabel.classList.add("edit-form-label");
        addressLabel.textContent = "Address:";
        editForm.appendChild(addressLabel);
        const addressInput = document.createElement("input");
        addressInput.type = "text";
        addressInput.value = shippingAddress[0].address;
        editForm.appendChild(addressInput);

        //canton input
        const cantonLabel = document.createElement("label");
        cantonLabel.classList.add("edit-form-label");
        cantonLabel.textContent = "Canton:";
        editForm.appendChild(cantonLabel);
        const cantonInput = document.createElement("input");
        cantonInput.type = "text";
        cantonInput.value = shippingAddress[0].canton;
        editForm.appendChild(cantonInput);

        // create a select for provinces
        const provinceLabel = document.createElement("label");
        provinceLabel.classList.add("edit-form-label");
        provinceLabel.textContent = "Province:";
        editForm.appendChild(provinceLabel);
        const provinceSelect = document.createElement("select");
        provinceSelect.name = "province";

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
          // set default value
          if (province.label === shippingAddress[0].province) {
            option.selected = true;
          }

          provinceSelect.appendChild(option);
        });

        editForm.appendChild(provinceSelect);

        // postal code input
        const postalCodeLabel = document.createElement("label");
        postalCodeLabel.classList.add("edit-form-label");
        postalCodeLabel.textContent = "Postal Code:";
        editForm.appendChild(postalCodeLabel);
        const postalCodeInput = document.createElement("input");
        postalCodeInput.type = "text";
        postalCodeInput.value = shippingAddress[0].postal_code;
        editForm.appendChild(postalCodeInput);

        // buttons container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("edit-buttons-container");
        editForm.appendChild(buttonsContainer);

        // create save button
        const saveButton = document.createElement("button");
        saveButton.type = "submit";
        saveButton.textContent = "Save";
        buttonsContainer.appendChild(saveButton);

        // create cancel button
        const backButton = document.createElement("button");
        backButton.type = "button";
        backButton.textContent = "Back";
        buttonsContainer.appendChild(backButton);
        // handle back button click — re-render of addresses list
        backButton.addEventListener("click", () => {
          document.getElementById("dashboard-addresses").click();
        });

        // create success message element
        const successMessage = document.createElement("h2");
        successMessage.classList.add("success-message");
        editForm.appendChild(successMessage);

        // handle form submission
        editForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          const updatedAddress = {
            address: addressInput.value,
            canton: cantonInput.value,
            province: provinceSelect.value,
            postal_code: postalCodeInput.value,
          };
          try {
            await updateShippingAddress(addressId, updatedAddress);
            successMessage.textContent =
              "Shipping address updated successfully!";

            console.log("Shipping address updated successfully");
          } catch (error) {
            console.error("Error updating shipping address:", error);
          }
        });

        addressEditContainer.appendChild(editForm);
      } catch (error) {
        console.error("Error editing shipping address:", error);
      }
    });
  });
}
