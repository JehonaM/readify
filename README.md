# Readify - CMS Book Management System

A complete Contentful-based CMS solution for managing book content with REST API, GraphQL, image optimization, and live preview capabilities.

## 📋 Project Overview

This project fulfills all CMS requirements:

### ✅ A. Content Modeling

- **3 Page Content Types Created:**
  - Home Page (hero banner + image-with-text sections)
  - Library Page (PLP - paginated book listings)
  - Book Page (PDP - single book details)
  - Image with Text (reusable component)

### ✅ B. Book Entry Fields

- Title (required)
- Short Description (Rich Text)
- Cover Image (file/asset)
- Number of Pages (integer)
- Authors (text array)
- External Resource Link (URL)
- Taxonomy (genre/audience array)
- Goodreads Rating (0-5 number)
- Goodreads ID (identifier)
- Review Count (integer)

### ✅ C. APIs

- **REST API** (`src/api/rest.js`) - For PLP with pagination
- **GraphQL API** (`src/api/graphql.js`) - For PDP with rich text support

### ✅ D. Media

- Image transformations using Contentful Images API
- Multiple image sizes and qualities
- Blur-up placeholders for progressive loading
- Responsive image sets for different breakpoints

### ✅ E. Migrations

- Migration scripts for all content types
- Goodreads rating field migration
- Easy to modify and extend

### ✅ F. Seeding

- 12+ unique books in `seeds/books.json`
- Automated seeding script with error handling
- Entry publishing included

### ✅ G. Custom Extension

- Goodreads rating widget (`src/extensions/goodreads-widget.js`)
- Contentful App Framework integration (`src/extensions/app-config.js`)
- Data sync utilities

### ✅ H. Live Preview

- Preview configuration in `src/preview.js`
- Ready-to-use preview URLs for all content types
- Can be enabled in Contentful space settings

## 📁 Project Structure

```
Readify/
├── migrations/                 # Content type migrations
│   ├── book.js                # Book content type
│   ├── home-page.js           # Home page content type
│   ├── library-page.js        # Library page content type
│   ├── image-with-text.js     # Reusable section component
│   └── goodreads-rating.js    # Goodreads fields
├── seeds/
│   ├── books.json             # 12+ sample books
│   └── seed.js                # Seeding script
├── scripts/
│   ├── verify-migrations.js   # Verify content types setup
│   └── seed-books.js          # Alternative seeding script
├── src/
│   ├── api/
│   │   ├── rest.js            # REST API endpoints (PLP)
│   │   └── graphql.js         # GraphQL queries (PDP)
│   ├── extensions/
│   │   ├── goodreads-widget.js    # Goodreads integration
│   │   └── app-config.js          # App Framework setup
│   ├── images.js              # Image transformation utilities
│   ├── preview.js             # Live preview configuration
│   └── ...
├── check-entries.js           # Entry verification utility
├── package.json               # npm scripts and dependencies
├── SETUP_GUIDE.js            # Setup documentation
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 14+
- Contentful account and space
- Management and Delivery tokens

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENV=master
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token

# Optional - for Goodreads integration
GOODREADS_API_KEY=your_api_key

# Optional - for preview URLs
PREVIEW_URL_HOME=http://localhost:3000/preview/home
PREVIEW_URL_BOOK=http://localhost:3000/preview/book
PREVIEW_URL_LIBRARY=http://localhost:3000/preview/library
```

### 3. Run Migrations

```bash
npm run migrate:all
```

Creates all content types in Contentful:

- Book (with all fields)
- Home Page
- Library Page
- Image with Text
- Goodreads rating fields

### 4. Seed Sample Data

```bash
npm run seed
```

Imports 12 sample books into your space.

### 5. Verify Setup

```bash
npm run verify
```

Checks that all content types and fields are properly configured.

## 📚 Content Type Specifications

### Book

**Content Type ID:** `book`

| Field            | Type     | Required | Description                    |
| ---------------- | -------- | -------- | ------------------------------ |
| title            | Symbol   | Yes      | Book title                     |
| shortDescription | RichText | No       | Rich text description          |
| coverImage       | Asset    | No       | Book cover image               |
| numberOfPages    | Integer  | No       | Page count                     |
| authors          | Array    | No       | Array of author names          |
| externalLink     | Symbol   | No       | External URL (e.g., Goodreads) |
| taxonomy         | Array    | No       | Genres and categories          |
| goodreadsRating  | Number   | No       | 0-5 rating                     |
| goodreadsId      | Symbol   | No       | Goodreads book ID              |
| reviewCount      | Integer  | No       | Number of reviews              |

### Home Page

**Content Type ID:** `homePage`

| Field     | Type   | Description             |
| --------- | ------ | ----------------------- |
| title     | Symbol | Page title              |
| heroTitle | Symbol | Hero section title      |
| heroImage | Asset  | Hero banner image       |
| sections  | Array  | Image with Text entries |

### Library Page

**Content Type ID:** `libraryPage`

| Field    | Type    | Description                 |
| -------- | ------- | --------------------------- |
| title    | Symbol  | Page title                  |
| pageSize | Integer | Books per page (pagination) |

### Image with Text

**Content Type ID:** `imageWithText`

| Field          | Type     | Description           |
| -------------- | -------- | --------------------- |
| title          | Symbol   | Section title         |
| description    | RichText | Section content       |
| image          | Asset    | Section image         |
| imageAlignment | Symbol   | left/right/top/bottom |

## 🔌 API Usage

### REST API (for PLP - Library Page)

```javascript
import {
  getBooks,
  getLibraryPage,
  getBooksByGenre,
  getPaginatedBooks,
} from "./src/api/rest.js";

// Get books with pagination
const booksData = await getPaginatedBooks((page = 1), (limit = 10));
// Returns: { items, total, page, totalPages, hasNextPage, hasPrevPage }

// Get by genre
const scienceBooks = await getBooksByGenre("Science");

// Get library page config
const config = await getLibraryPage();
```

### GraphQL API (for PDP - Book Page)

```javascript
import {
  getBookBySlug,
  getAllBooks,
  getHomePage,
  getBooksByGenre,
} from "./src/api/graphql.js";

// Get single book with full details
const book = await getBookBySlug("clean-code");

// Get home page with hero and sections
const home = await getHomePage();

// Get featured books
const featured = await getFeaturedBooks((limit = 6));
```

## 🖼️ Image Transformations

The Images API automatically optimizes images for different use cases:

```javascript
import {
  getCoverImage,
  getResponsiveCoverImages,
  getHeroImage,
  getImageWithLQIP,
  transformImage,
} from "./src/images.js";

// Get optimized cover with blur placeholder
const cover = getCoverImage("https://images.ctfassets.net/...");
// Returns: { main, blur }

// Get responsive images for different breakpoints
const responsive = getResponsiveCoverImages(url);
// Returns: { mobile, tablet, desktop, hd }

// Get hero image with multiple sizes
const hero = getHeroImage(url);
// Returns: { mobile, tablet, desktop }

// Get LQIP (Low Quality Image Placeholder)
const lqip = getImageWithLQIP(url);
// Returns: { lqip, full, srcSet }

// Custom transformation
const custom = transformImage(url, {
  width: 500,
  height: 400,
  quality: 80,
  format: "webp",
  blur: 20,
  radius: 8,
});
```

## 🎨 Live Preview Configuration

Preview URLs are configured in `src/preview.js`:

```javascript
import { generatePreviewUrl, previewUrls } from "./src/preview.js";

// Generate preview URL for entry
const previewUrl = generatePreviewUrl("book", bookEntry);

// Or use convenience functions
const bookPreview = previewUrls.book("clean-code");
const homePreview = previewUrls.home();
```

**To enable in Contentful:**

1. Go to Space Settings > Content Preview
2. Add preview URLs for each content type
3. Editors will see "Open Preview" button in the editor

## 🔌 Goodreads Integration

Custom widget for syncing Goodreads ratings:

```javascript
import {
  fetchGoodreadsData,
  syncGoodreadsToContentful,
  formatRating,
  renderStarRating,
} from "./src/extensions/goodreads-widget.js";

// Fetch book data from Goodreads
const goodreadsData = await fetchGoodreadsData("goodreads_book_id");

// Sync to Contentful entry
await syncGoodreadsToContentful(entry, goodreadsId, client);

// Format for display
const ratingText = formatRating(4.5, (showStars = true)); // "4.5 ★★★★"

// Render HTML stars
const starHtml = renderStarRating(4.5);
```

## 📝 Npm Scripts

```bash
# Migrations
npm run migrate:book        # Run book migration
npm run migrate:home        # Run home page migration
npm run migrate:library     # Run library page migration
npm run migrate:section     # Run image with text migration
npm run migrate:goodreads   # Run goodreads rating migration
npm run migrate:all         # Run all migrations in order

# Seeding
npm run seed                # Seed all sample books
npm run seed:books          # Alternative seed command

# Verification
npm run verify              # Verify setup and content types
npm run check:entries       # Check existing entries

# Combined
npm run setup               # Run migrations, seed, and verify
npm run setup:fresh         # Run migrations and seed
```

## 🏗️ Extending the Project

### Add a New Content Type

1. Create migration file: `migrations/my-content-type.js`

```javascript
module.exports = function (migration) {
  const myType = migration.createContentType("myType").name("My Content Type");

  myType.createField("title").name("Title").type("Symbol");
};
```

2. Run migration:

```bash
npx contentful-migration --space-id $CONTENTFUL_SPACE_ID migrations/my-content-type.js
```

### Add New REST Endpoints

Edit `src/api/rest.js`:

```javascript
export const getMyType = (limit = 10) => {
  return client.getEntries({
    content_type: "myType",
    limit,
  });
};
```

### Add New GraphQL Queries

Edit `src/api/graphql.js`:

```javascript
export const getMyTypes = async () => {
  const query = `
    query {
      myTypeCollection(limit: 50) {
        items {
          sys { id }
          title
        }
      }
    }
  `;

  const response = await graphqlClient.post("", { query });
  return response.data.data.myTypeCollection.items;
};
```

### Update Image Sizes

Edit `src/images.js` to adjust image dimensions, quality, or add new transformation functions.

## 🐛 Troubleshooting

**Migration fails with "Content type already exists"**

- The content type is already in your space
- Delete it in Contentful settings or skip the migration

**Seeding fails with duplicate entries**

- Clear existing entries or use different book titles in `seeds/books.json`

**API calls returning empty results**

- Ensure entries are published in Contentful
- Check that delivery token has access to the content type

**Images not loading**

- Verify image URLs are correct and publicly accessible
- Check image transformation parameters

**Preview not working**

- Ensure preview URL is accessible from your machine
- Check that tokens are valid in `.env` file

## 📚 Additional Resources

- [Contentful Documentation](https://www.contentful.com/developers/documentation/)
- [Contentful Migrations](https://www.contentful.com/developers/docs/tutorials/cli/migrations/)
- [GraphQL API](https://www.contentful.com/developers/docs/references/graphql-api/)
- [Images API](https://www.contentful.com/developers/docs/apis/images/)
- [App Framework](https://www.contentful.com/developers/docs/extensibility/app-framework/)

## 📄 License

ISC

## 👥 Support

For issues or questions, refer to the `SETUP_GUIDE.js` file for detailed setup instructions.
