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

    // print the user data as object
    console.log(userData.data);

    // print the user data to a JSON string
    console.log(`User info: ${JSON.stringify(userData.data, null, 2)}`);
  } catch (error) {
    console.log("Error accessing data", error.message);
  }
}

getUser(2);
