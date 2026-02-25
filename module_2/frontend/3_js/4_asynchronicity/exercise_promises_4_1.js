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
      console.log(userData.data);
    })
    .catch((error) => {
      console.log("Error accessing data", error.message);
    });

  // in this case finally() is not necessary is used for example
  // re-enable a button
  /*.finally(() => {
      console.log("Request finished");
    });*/
}

reqresPromiseFetch(2);
