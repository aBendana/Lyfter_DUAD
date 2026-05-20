import { getShippingAddresses } from "../requests/get-shipping-adresses.js";
import { createShippingAddress } from "./create-shipping-address.js";
import { editShippingAddress } from "./edit-shipping-address.js";

export async function loadShippingAddresses() {
  const dashboardContent = document.getElementById("dashboard-content");
  try {
    const shippingAddressesButton = document.getElementById(
      "dashboard-addresses",
    );
    shippingAddressesButton.addEventListener("click", async () => {
      const shippingAddressesContent =
        document.getElementById("dashboard-content");

      const shippingAddresses = await getShippingAddresses();
      if (!shippingAddresses) {
        dashboardContent.innerHTML = `<p class="error-message-generic">Failed to load shipping addresses. Please try again.</p>`;
        return;
      }
      shippingAddressesContent.innerHTML = ""; // clear previous content
      shippingAddressesContent.className = ""; // clear previous classes
      shippingAddressesContent.classList.add("shipping-addresses-content");

      const shippingAddressesTitle = document.createElement("h2");
      shippingAddressesTitle.classList.add("shipping-addresses-title");
      shippingAddressesTitle.textContent = "Shipping Addresses";
      shippingAddressesContent.appendChild(shippingAddressesTitle);

      // create add new address button
      const addNewAddressButton = document.createElement("button");
      addNewAddressButton.id = "add-new-address-button";
      addNewAddressButton.classList.add("address-button", "new-address-button");
      addNewAddressButton.textContent = "Add New Address";
      shippingAddressesContent.appendChild(addNewAddressButton);

      // create the shipping addresses list
      shippingAddresses.forEach((address, index) => {
        const addressText = document.createElement("p");
        addressText.dataset.addressId = address.id; // store address id
        addressText.classList.add("address-text");
        addressText.textContent = `${address.address}, ${address.canton}, ${address.province}, ${address.postal_code}`;
        shippingAddressesContent.appendChild(addressText);

        //create buttons container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("update-buttons-container");
        shippingAddressesContent.appendChild(buttonsContainer);

        // create edits buttons
        const editButton = document.createElement("button");
        editButton.classList.add("address-button", "edit-address-button");
        editButton.textContent = "Edit";
        buttonsContainer.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("address-button");
        deleteButton.textContent = "Delete";
        buttonsContainer.appendChild(deleteButton);
      });

      // initialize create shipping address functionality
      createShippingAddress();
      // initialize edit shipping address functionality
      editShippingAddress();

      shippingAddressesContent.scrollIntoView({ behavior: "smooth" });
    });
  } catch (error) {
    dashboardContent.innerHTML = `<p class="error-message-generic">Failed to load shipping addresses: ${error}. Please try again.</p>`;
  }
}

/* Note: Delete addresss is not implemented because despite the API having the endpoint,
is not well managed, if an address is deleted gonna afect the integrity of the orders,
SQLAlchemy returns an integrity error, it's needs to be manage with replacing with null 
or any other appropriate value, so for this reason, the delete functionality is not implemented. */
