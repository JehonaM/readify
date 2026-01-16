const contentful = require("contentful-management");
const fs = require("fs");
require("dotenv").config();

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function seedBooks() {
  try {
    // Get the space and environment
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master"
    );

    // Read books from seed file
    const booksData = JSON.parse(fs.readFileSync("./seeds/books.json", "utf8"));

    // Get all existing Book entries
    const entries = await environment.getEntries({ content_type: "book" });

    console.log(`Found ${entries.items.length} existing book entries`);
    console.log(`Ready to populate with ${booksData.length} books from seed`);

    // Update each entry with book data
    for (let i = 0; i < entries.items.length && i < booksData.length; i++) {
      const entry = entries.items[i];
      const bookData = booksData[i];

      // Update entry fields
      entry.fields.title = { "en-US": bookData.title };
      entry.fields.numberOfPages = { "en-US": bookData.numberOfPages };
      entry.fields.authors = { "en-US": bookData.authors };
      entry.fields.taxonomy = { "en-US": bookData.taxonomy };
      entry.fields.externalLink = { "en-US": bookData.externalLink };

      if (bookData.shortDescription) {
        entry.fields.shortDescription = { "en-US": bookData.shortDescription };
      }

      // Save the updated entry
      await entry.update();
      console.log(`✓ Updated: ${bookData.title}`);
    }

    console.log("\n✅ All books seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding books:", error);
    process.exit(1);
  }
}

seedBooks();
