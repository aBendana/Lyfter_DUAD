const buttonGetUser = document.getElementById("button-get-user");
const containerUserInfo = document.getElementById("container-user-info");

async function getUser(userId) {
  try {
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      headers: {
        "x-api-key":
          "pro_b79e53ead425bf9d0f528f136c6a712139665e8376be626cdeb9b10a87e42fce",
        "X-Reqres-Env": "prod",
      },
    });

    const userData = await response.json();
    if (
      userData === null ||
      userData === undefined ||
      Object.keys(userData).length === 0
    ) {
      containerUserInfo.innerHTML = `<p style="color:red;">Not data found for user</p>`;
    }

    const userInfoHTML = `
      <h3>User Information:</h3>
      <p><strong>ID:</strong> ${userData.data.id}</p>
      <p><strong>Email:</strong> ${userData.data.email}</p>
      <p><strong>First name:</strong> ${userData.data.first_name}</p> 
      <p><strong>Last name:</strong> ${userData.data.last_name}</p>
      <img src="${userData.data.avatar}" alt="User Avatar" />
    `;

    containerUserInfo.innerHTML = userInfoHTML;
  } catch (error) {
    containerUserInfo.innerHTML = `<p style="color:red;">Error accessing user data:${error.message}</p>`;
  }
}

function handleGetUser(getUser) {
  const userIdInput = document.getElementById("user-id");
  const userId = userIdInput.value.trim();
  getUser(userId);
}

buttonGetUser.addEventListener("click", () => handleGetUser(getUser));
