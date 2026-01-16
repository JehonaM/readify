#!/usr/bin/env node

/**
 * Migration Verification Script
 * Verifies all migrations are in place and content types exist
 */

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
  console.log("\n📋 Verifying Contentful Setup...\n");

  try {
    // Check environment variables
    console.log("1️⃣  Checking environment variables...");
    const requiredEnvVars = [
      "CONTENTFUL_SPACE_ID",
      "CONTENTFUL_MANAGEMENT_TOKEN",
      "CONTENTFUL_DELIVERY_TOKEN",
    ];

    const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

    if (missingVars.length > 0) {
      console.error(`   ❌ Missing env vars: ${missingVars.join(", ")}`);
      process.exit(1);
    }
    console.log("   ✅ All required environment variables are set\n");

    // Check migration files
    console.log("2️⃣  Checking migration files...");
    for (const file of migrationFiles) {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.warn(`   ⚠️  Missing: ${file}`);
      }
    }
    console.log();

    // Check seed files
    console.log("3️⃣  Checking seed files...");
    if (fs.existsSync("seeds/books.json")) {
      const books = require("./seeds/books.json");
      console.log(`   ✅ seeds/books.json (${books.length} books)`);
    } else {
      console.warn("   ⚠️  Missing: seeds/books.json");
    }
    if (fs.existsSync("seeds/seed.js")) {
      console.log("   ✅ seeds/seed.js");
    } else {
      console.warn("   ⚠️  Missing: seeds/seed.js");
    }
    console.log();

    // Check API files
    console.log("4️⃣  Checking API files...");
    const apiFiles = [
      "src/api/rest.js",
      "src/api/graphql.js",
      "src/images.js",
      "src/preview.js",
    ];
    for (const file of apiFiles) {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.warn(`   ⚠️  Missing: ${file}`);
      }
    }
    console.log();

    // Check extensions
    console.log("5️⃣  Checking extensions...");
    const extensionFiles = [
      "src/extensions/goodreads-widget.js",
      "src/extensions/app-config.js",
    ];
    for (const file of extensionFiles) {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.warn(`   ⚠️  Missing: ${file}`);
      }
    }
    console.log();

    // Verify Contentful content types
    console.log("6️⃣  Verifying Contentful content types...");
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master"
    );

    const contentTypes = await env.getContentTypes();

    for (const expected of expectedContentTypes) {
      const found = contentTypes.items.find((ct) => ct.sys.id === expected.id);

      if (found) {
        console.log(`   ✅ Content Type: ${expected.name} (${expected.id})`);

        // Check fields
        const fields = found.fields.map((f) => f.id);
        const missingFields = expected.requiredFields.filter(
          (f) => !fields.includes(f)
        );

        if (missingFields.length > 0) {
          console.warn(`      ⚠️  Missing fields: ${missingFields.join(", ")}`);
        } else {
          console.log(
            `      • All ${expected.requiredFields.length} expected fields present`
          );
        }
      } else {
        console.error(
          `   ❌ Content Type not found: ${expected.name} (${expected.id})`
        );
      }
    }
    console.log();

    // Check for entries
    console.log("7️⃣  Checking entries...");
    try {
      const bookEntries = await env.getEntries({
        content_type: "book",
      });
      console.log(`   • Book entries: ${bookEntries.total} found`);

      const homePages = await env.getEntries({
        content_type: "homePage",
      });
      console.log(`   • Home page entries: ${homePages.total} found`);

      const libraryPages = await env.getEntries({
        content_type: "libraryPage",
      });
      console.log(`   • Library page entries: ${libraryPages.total} found`);

      const sections = await env.getEntries({
        content_type: "imageWithText",
      });
      console.log(`   • Image with text sections: ${sections.total} found`);
    } catch (error) {
      console.warn(`   ⚠️  Error checking entries: ${error.message}`);
    }
    console.log();

    console.log("✅ Verification complete!\n");
    console.log("📝 Next steps:");
    console.log("1. Run migrations: npm run migrate:all");
    console.log("2. Seed books: npm run seed");
    console.log("3. Create home page entry in Contentful UI");
    console.log("4. Enable preview URLs in space settings");
    console.log();
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
    process.exit(1);
  }
}

verifyMigrations();
