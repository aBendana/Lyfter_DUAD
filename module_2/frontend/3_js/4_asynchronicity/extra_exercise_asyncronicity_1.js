usersId = [2, 3, 4];
async function getUsers(usersId) {
  try {
    for (const user of usersId) {
      //console.log(user);
      const response = await fetch(`https://reqres.in/api/users/${user}`, {
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
        throw new Error(`No data found for user ${user}`);
      }
      console.log(userData.data);
    }
  } catch (error) {
    console.log("Error accessing data", error.message);
  }
}

getUsers(usersId);

// I decide to use a for with async and await to make every promise finish before
// start the next one, not use Promise.all() because works in parallel and can
// return any of the promise before the others.
// Note: Promise.all() is faster but in this case we need a specific order of results.
