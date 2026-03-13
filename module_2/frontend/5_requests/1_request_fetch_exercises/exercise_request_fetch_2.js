async function createUser(
  firstName,
  lastName,
  email,
  password,
  phone,
  address,
) {
  const url = "https://dummyjson.com/users/add";

  const requestOptions = {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      address: {
        address: address,
      },
    }),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Error creating the user");
    }

    const newUserData = await response.json();

    const id = newUserData.id;
    const firstName = newUserData.firstName;
    const lastName = newUserData.lastName;
    const userEmail = newUserData.email;
    const userPhone = newUserData.phone;
    const userAddress = newUserData.address?.address;

    console.log("User created:");
    console.log("ID:", id);
    console.log("Name:", firstName, lastName);
    console.log("Email:", userEmail);
    console.log("Phone:", userPhone);
    console.log("Address:", userAddress);

    return newUserData;
  } catch (error) {
    console.error("Error:", error);
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
