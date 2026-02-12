const contentful = require("contentful-management");
require("dotenv").config({ path: "../.env" });

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function checkEntries() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master",
    );
    const entries = await env.getEntries({ content_type: "book", limit: 3 });

    entries.items.forEach((e, i) => {

    });
  } catch (error) {
    console.error("Error checking entries:", error);
  }
}

checkEntries();
