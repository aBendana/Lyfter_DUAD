async function getMobiles() {
  const url = "https://api.restful-api.dev/objects";

  // requestOptions for GET method is not really neccesary, because method GET
  // is the default for fetch
  const requestOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Error accesing data");
    }

    const mobilesJson = await response.json();
    for (const mobile of mobilesJson) {
      const mobileName = mobile.name;
      const mobileInfo = mobile.data;
      console.log("");
      console.log(`Mobile: ${mobileName}`);

      // avoid null or no existing mobile info
      // check the mobile info exists
      if (mobileInfo && typeof mobileInfo === "object") {
        for (const [mobileFeature, valueFeature] of Object.entries(
          mobileInfo,
        )) {
          // check the key has a value
          if (valueFeature != null) {
            console.log(`  ${mobileFeature}:`, valueFeature);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getMobiles();
