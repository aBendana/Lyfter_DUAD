import axios from "axios";

async function createUser(
  firstName,
  lastName,
  email,
  password,
  phone,
  address,
) {
  const url = "https://dummyjson.com/users/add";
  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
    address: {
      address: address,
    },
  };

  try {
    const response = await axios.post(url, data);

    const newUser = response.data;
    console.log("User created:");
    console.log("ID:", newUser.id);
    console.log("Name:", newUser.firstName, newUser.lastName);
    console.log("Email:", newUser.email);
    console.log("Phone:", newUser.phone);
    console.log("Address:", newUser.address?.address);

    return newUser;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

createUser(
  "Andres",
  "Bendana",
  "ab@email.com",
  "132456",
  "1234567890",
  "San Jose",
);
