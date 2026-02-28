function reqresPromiseFetch(userId) {
  fetch(`https://reqres.in/api/users/${userId}`, {
    headers: {
      "x-api-key":
        "pro_b79e53ead425bf9d0f528f136c6a712139665e8376be626cdeb9b10a87e42fce",
      "X-Reqres-Env": "prod",
    },
  })
    .then((response) => response.json())
    .then((userData) => {
      if (
        userData === null ||
        userData === undefined ||
        Object.keys(userData).length === 0
      ) {
        throw new Error(`No data found for user ${userId}`);
      }
      return userData;
    })
    .then((userData) => {
      console.log(userData.data);
    })
    .catch((error) => {
      console.log("Error accessing data", error.message);
    })

    // in this case finally() is not really necessary
    // finally() is used for example free up resources
    .finally(() => {
      console.log("Request finished");
    });
}

reqresPromiseFetch(23);
