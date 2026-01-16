require("dotenv").config();
const contentful = require("contentful-management");
const books = require("./books.json");

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function seed() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master"
    );

    console.log(`Starting seed for ${books.length} books...`);

    for (const book of books) {
      try {
        const entry = await env.createEntry("book", {
          fields: {
            title: { "en-US": book.title },
            authors: { "en-US": book.authors },
            numberOfPages: { "en-US": book.numberOfPages },
            shortDescription: { "en-US": book.shortDescription },
            taxonomy: { "en-US": book.taxonomy },
            externalLink: { "en-US": book.externalLink },
          },
        });

        // Publish the entry
        await entry.publish();
        console.log(`✓ Created and published: "${book.title}"`);
      } catch (entryError) {
        console.error(
          `✗ Failed to create "${book.title}":`,
          entryError.message
        );
      }
    }

    console.log("Books seeding complete!");
  } catch (error) {
    console.error("Error during seeding:", error.message);
    process.exit(1);
  }
}

seed();
