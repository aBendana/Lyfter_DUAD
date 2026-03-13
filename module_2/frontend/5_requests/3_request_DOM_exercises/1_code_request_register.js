async function createUser(
  firstName,
  lastName,
  username,
  address,
  email,
  password,
) {
  const url = "https://dummyjson.com/users/add";
  const data = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
    // address is a object with more properties,
    // but we only send the address property,
    // just for this testing purpose
    address: {
      address: address,
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newUser = response.data;
    return newUser;
  } catch (error) {
    console.error("Error:", error.message);
    return { error: error.message };
  }
}

function saveSession(user) {
  const lyfterUserSession = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    address: user.address,
    isLoggedIn: true,
    loginAt: new Date().toISOString(),
  };

  localStorage.setItem("lyfterUserSession", JSON.stringify(lyfterUserSession));
}

const submitForm = document.getElementById("button-submit");
const registerMessage = document.getElementById("register-message");
const registerName = document.getElementById("register-name");

submitForm.addEventListener("click", async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('input[name="first_name"]').value;
  const lastName = document.querySelector('input[name="last_name"]').value;
  const address = document.querySelector('input[name="address"]').value;
  const username = document.querySelector('input[name="username"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (!firstName || !lastName || !address || !username || !email || !password) {
    registerMessage.textContent = "Fullfil all fields.";
    return;
  }

  const newUser = await createUser(
    firstName,
    lastName,
    username,
    address,
    email,
    password,
  );

  if (newUser.id) {
    saveSession(newUser);

    registerMessage.textContent = "Successfully registered!";
    registerName.textContent = `${firstName} ${lastName} your user ID is ${newUser.id}`;

    window.location.href = "./3_page_profile.html";
  } else {
    registerMessage.textContent =
      "Registration failed. Error: " + newUser.error;
  }
});
