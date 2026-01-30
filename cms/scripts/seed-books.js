const contentful = require("contentful-management");
const fs = require("fs");
require("dotenv").config();

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function seedBooks() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master",
    );

    const booksData = JSON.parse(fs.readFileSync("./seeds/books.json", "utf8"));

    const entries = await environment.getEntries({ content_type: "book" });

    for (let i = 0; i < entries.items.length && i < booksData.length; i++) {
      const entry = entries.items[i];
      const bookData = booksData[i];

      entry.fields.title = { "en-US": bookData.title };
      entry.fields.numberOfPages = { "en-US": bookData.numberOfPages };
      entry.fields.authors = { "en-US": bookData.authors };
      entry.fields.taxonomy = { "en-US": bookData.taxonomy };
      entry.fields.externalLink = { "en-US": bookData.externalLink };

      if (bookData.shortDescription) {
        entry.fields.shortDescription = { "en-US": bookData.shortDescription };
      }

      await entry.update();
    }
  } catch (error) {
    process.exit(1);
  }
}

seedBooks();
