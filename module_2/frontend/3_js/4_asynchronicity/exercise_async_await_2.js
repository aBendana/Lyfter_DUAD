async function getUsers(userId) {
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
      throw new Error(`No data found for user ${userId}`);
    }

    console.log(userData.data);
  } catch (error) {
    console.log("Error accessing data", error.message);
  }
}

getUsers(23);
