async function updateUser(id, address, city) {
  const url = `https://dummyjson.com/users/${id}`;

  const requestOptions = {
    method: "PATCH",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: {
        address: address,
        city: city,
      },
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error updating user");
    }

    const updatedUserData = await response.json();
    //console.log(updatedUserData);
    console.log("New address:", updatedUserData.address);

    return updatedUserData;
  } catch (error) {
    console.error("Error:", error);
  }
}

updateUser(1, "Street 1500", "Alajuela");
