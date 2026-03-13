async function getUser(id) {
  const url = `https://dummyjson.com/users/${id}`;

  const requestOptions = {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const user = await response.json();

    //** this endpoint returns a message in the response body
    //** when the user is not found, but with not 404 code,
    //** so we cannot handle the error,
    //** we need to check the message in the response body
    //** to generate the User not found message
    if (user?.message === `User with id '${id}' not found`) {
      throw new Error(`User ${id} not found`);
    }

    console.log("User requested:");
    console.log("ID:", user.id);
    console.log("Name:", user.firstName, user.lastName);
    console.log("Email:", user.email);
    console.log("Phone:", user.phone);
    console.log("Address:", user.address?.address, user.address?.city);

    return user;

    //** normal error catching 404 */
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(`User ${id} not found`);
    }
    console.error(error);
  }
}

getUser(650);
