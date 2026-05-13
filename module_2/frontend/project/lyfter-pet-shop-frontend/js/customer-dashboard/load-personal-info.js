import { getPersonalInfo } from "../requests/get-personal-info.js";
import { editPersonalInfo } from "./edit-personal-info.js";

export async function loadPersonalInfo() {
  const personalInfoSection = document.getElementById("dashboard-content");
  try {
    const personalInfo = await getPersonalInfo();
    if (!personalInfo) {
      console.log("No personal info available");
      personalInfoSection.innerHTML = `<p class="error-message-generic">Failed to load personal information. Please try again.</p>`;
      return;
    }

    const personalInfoButton = document.getElementById(
      "dashboard-personal-data",
    );
    personalInfoButton.addEventListener("click", async () => {
      //const personalInfoContent = document.getElementById("dashboard-content");
      personalInfoSection.innerHTML = ""; // clear previous content
      personalInfoSection.className = ""; // clear previous classes
      personalInfoSection.classList.add("personal-info-content");

      const personalInfoTitle = document.createElement("h2");
      personalInfoTitle.classList.add("personal-info-title");
      personalInfoTitle.textContent = "Personal Information";
      personalInfoSection.appendChild(personalInfoTitle);

      const nameTitle = document.createElement("h3");
      nameTitle.classList.add("personal-title");
      nameTitle.textContent = "Name";
      personalInfoSection.appendChild(nameTitle);

      const name = document.createElement("p");
      name.id = "full-name";
      name.classList.add("personal-text");
      name.textContent = personalInfo[0].name;
      personalInfoSection.appendChild(name);

      const emailTitle = document.createElement("h3");
      emailTitle.classList.add("personal-title");
      emailTitle.textContent = "Email";
      personalInfoSection.appendChild(emailTitle);

      const email = document.createElement("p");
      email.id = "email";
      email.classList.add("personal-text");
      email.textContent = personalInfo[0].email;
      personalInfoSection.appendChild(email);

      const phoneTitle = document.createElement("h3");
      phoneTitle.classList.add("personal-title");
      phoneTitle.textContent = "Phone";
      personalInfoSection.appendChild(phoneTitle);

      const phone = document.createElement("p");
      phone.id = "phone-number";
      phone.classList.add("personal-text");
      phone.textContent = personalInfo[0].phone_number || "N/A";
      personalInfoSection.appendChild(phone);

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("update-buttons-container");

      const editInfoButton = document.createElement("button");
      editInfoButton.id = "edit-info-button";
      editInfoButton.classList.add("update-info-button");
      editInfoButton.textContent = "Edit Profile";
      buttonsContainer.appendChild(editInfoButton);
      personalInfoSection.appendChild(buttonsContainer);

      personalInfoSection.scrollIntoView({ behavior: "smooth" });

      editPersonalInfo();
    });
  } catch (error) {
    console.error("Error populating personal info:", error);
    //const personalInfoSection = document.getElementById("dashboard-content");
    personalInfoSection.innerHTML = `<p class="error-message-generic">Failed to load personal information: ${error}. Please try again.</p>`;
  }
}
