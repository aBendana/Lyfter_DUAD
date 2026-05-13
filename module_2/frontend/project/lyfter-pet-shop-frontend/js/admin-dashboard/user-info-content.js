export function userInfoContent(userInfo) {
  const personalInfoContent = document.getElementById("dashboard-content");
  personalInfoContent.innerHTML = ""; // clear previous content
  personalInfoContent.className = ""; // clear previous classes
  personalInfoContent.classList.add("personal-info-content");

  // title
  const userInfoTitle = document.createElement("h2");
  userInfoTitle.classList.add("personal-info-title");

  //put the right title according to the user role
  if (userInfo.role === "administrator") {
    userInfoTitle.textContent = "Admin Information";
  } else if (userInfo[0].role === "client") {
    userInfoTitle.textContent = "Client Information";
  } else if (userInfo[0].role === "administrator") {
    userInfoTitle.textContent = "Administrator Information";
  }
  personalInfoContent.appendChild(userInfoTitle);

  // full name
  const nameTitle = document.createElement("h3");
  nameTitle.classList.add("personal-title");
  nameTitle.textContent = "Name";
  personalInfoContent.appendChild(nameTitle);

  const name = document.createElement("p");
  name.id = "full-name";
  name.classList.add("personal-text");
  name.textContent = userInfo.name || userInfo[0].name;
  personalInfoContent.appendChild(name);

  // email
  const emailTitle = document.createElement("h3");
  emailTitle.classList.add("personal-title");
  emailTitle.textContent = "Email";
  personalInfoContent.appendChild(emailTitle);

  const email = document.createElement("p");
  email.id = "email";
  email.classList.add("personal-text");
  email.textContent = userInfo.email || userInfo[0].email;
  personalInfoContent.appendChild(email);

  // phone number
  const phoneTitle = document.createElement("h3");
  phoneTitle.classList.add("personal-title");
  phoneTitle.textContent = "Phone";
  personalInfoContent.appendChild(phoneTitle);

  const phone = document.createElement("p");
  phone.id = "phone-number";
  phone.classList.add("personal-text");
  phone.textContent = userInfo.phone_number || userInfo[0].phone_number;
  personalInfoContent.appendChild(phone);

  // edit profile button
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("update-buttons-container");

  const editInfoButton = document.createElement("button");
  editInfoButton.id = "edit-info-button";
  editInfoButton.classList.add("update-info-button");
  editInfoButton.textContent = "Edit Profile";
  buttonsContainer.appendChild(editInfoButton);
  personalInfoContent.appendChild(buttonsContainer);

  personalInfoContent.scrollIntoView({ behavior: "smooth" });
}
