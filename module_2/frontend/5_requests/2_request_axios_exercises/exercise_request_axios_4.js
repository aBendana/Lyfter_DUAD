import axios from "axios";

async function updateUser(id, address, city) {
  const url = `https://dummyjson.com/users/${id}`;
  const data = {
    address: {
      address: address,
      city: city,
    },
  };

  try {
    const response = await axios.patch(url, data);

    const updatedUserData = response.data;
    console.log("New address:", updatedUserData.address);

    return updatedUserData;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

updateUser(1, "Street 1500", "Alajuela");
