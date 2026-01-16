xcode-select --resetconst contentful = require("contentful-management");
require("dotenv").config();

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function checkEntries() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master"
    );
    const entries = await env.getEntries({ content_type: "book", limit: 3 });

    entries.items.forEach((e, i) => {
      console.log(`Entry ${i + 1}:`);
      console.log("  ID:", e.sys.id);
      console.log("  Title:", e.fields.title);
      console.log("");
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkEntries();
