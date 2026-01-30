require("dotenv").config();
const contentful = require("contentful-management");
const fs = require("fs");
const path = require("path");

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const expectedContentTypes = [
  {
    id: "book",
    name: "Book",
    description: "Single book page",
    requiredFields: [
      "title",
      "shortDescription",
      "coverImage",
      "numberOfPages",
      "authors",
      "externalLink",
      "taxonomy",
    ],
  },
  {
    id: "homePage",
    name: "Home Page",
    description: "Home page with hero banner and sections",
    requiredFields: ["title", "heroTitle", "heroImage", "sections"],
  },
  {
    id: "libraryPage",
    name: "Library Page",
    description: "Library page configuration",
    requiredFields: ["title", "pageSize"],
  },
  {
    id: "imageWithText",
    name: "Image With Text",
    description: "Reusable image with text section",
    requiredFields: ["title", "description", "image", "imageAlignment"],
  },
];

const migrationFiles = [
  "migrations/book.js",
  "migrations/home-page.js",
  "migrations/library-page.js",
  "migrations/image-with-text.js",
  "migrations/goodreads-rating.js",
];

async function verifyMigrations() {
  try {
    const requiredEnvVars = [
      "CONTENTFUL_SPACE_ID",
      "CONTENTFUL_MANAGEMENT_TOKEN",
      "CONTENTFUL_DELIVERY_TOKEN",
    ];

    const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

    if (missingVars.length > 0) {
      process.exit(1);
    }

    for (const file of migrationFiles) {
      if (fs.existsSync(file)) {
      } else {
      }
    }

    if (fs.existsSync("seeds/books.json")) {
      const books = require("./seeds/books.json");
    } else {
    }
    if (fs.existsSync("seeds/seed.js")) {
    } else {
    }

    const apiFiles = [
      "src/api/rest.js",
      "src/api/graphql.js",
      "src/images.js",
      "src/preview.js",
    ];
    for (const file of apiFiles) {
      if (fs.existsSync(file)) {
      } else {
      }
    }

    const extensionFiles = [
      "src/extensions/goodreads-widget.js",
      "src/extensions/app-config.js",
    ];
    for (const file of extensionFiles) {
      if (fs.existsSync(file)) {
      } else {
      }
    }

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master",
    );

    const contentTypes = await env.getContentTypes();

    for (const expected of expectedContentTypes) {
      const found = contentTypes.items.find((ct) => ct.sys.id === expected.id);

      if (found) {
        const fields = found.fields.map((f) => f.id);
        const missingFields = expected.requiredFields.filter(
          (f) => !fields.includes(f),
        );

        if (missingFields.length > 0) {
        } else {
        }
      } else {
      }
    }

    try {
      const bookEntries = await env.getEntries({
        content_type: "book",
      });

      const homePages = await env.getEntries({
        content_type: "homePage",
      });

      const libraryPages = await env.getEntries({
        content_type: "libraryPage",
      });

      const sections = await env.getEntries({
        content_type: "imageWithText",
      });

    } catch (error) {
      console.warn(`   ⚠️  Error checking entries: ${error.message}`);
    }

  } catch (error) {
    console.error("❌ Verification failed:", error.message);
    process.exit(1);
  }
}

verifyMigrations();
