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
