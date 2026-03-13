import axios from "axios";

async function getMobiles() {
  const url = "https://api.restful-api.dev/objects";

  try {
    const response = await axios.get(url);

    const mobilesJson = response.data;
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
    console.error("Error:", error.message);
  }
}

getMobiles();
