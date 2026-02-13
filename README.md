📚 Readify – Modern E-Library (MACH Architecture)
Readify is a high-performance e-library platform built with a composable architecture (MACH). The project integrates a Headless CMS, a decoupled Next.js 14+ frontend, and third-party services like Algolia and a mock Pricing Microservice.

🏗️ Architecture & Engineering Decisions

1. MACH Principles
   The project strictly follows MACH principles (Microservices, API-first, Cloud-native, Headless):

Microservices: Pricing and book availability are handled by a dedicated Next.js Route Handler simulating an independent commerce service.

API-first: All content is delivered via Contentful’s Content Delivery APIs (REST & GraphQL).

Cloud-native: Automated CI/CD via GitHub Actions with production deployment on Vercel.

Headless: The frontend is entirely decoupled from the CMS provider.

2. Data Fetching Strategy
   I implemented a hybrid fetching strategy to optimize performance:

GraphQL (PDP): Used for the Book Detail Page to fetch Rich Text descriptions and linked references efficiently.

REST SDK (PLP): Used for the Library page to leverage native pagination and filtering parameters.

💻 CMS Implementation (Contentful)

✅ Content Modeling
Created 3 core page content types:

Home: Hero banner with "image-with-text" sections and alignment controls.

PLP (Library): Paginated list of books with taxonomy support.

PDP (Book): Detailed view utilizing Rich Text for long-form descriptions.

✅ Book Entry Fields
Each book entry includes: Title, Rich Text description, cover image, page count, authors, external links, and structured taxonomies (Genre, Audience, Language).

✅ Automation & Extensions
Migrations: Scripts to programmatically create content types and fields.

Seeding: Automated script importing 10+ books from JSON data.

Custom Extension: Integrated a custom Star-Rating field (1–5 stars) within the CMS UI.

🚀 Frontend Features (Next.js 14+ App Router)
⚡ Rendering Strategies
SSG (Static Site Generation): Applied to Home and PDP for sub-second load times and SEO.

CSR (Client-Side Rendering): Used for the /movies search page via Algolia hooks.

🔄 Dynamic Functionality
Pagination Toggle: A custom mechanism to switch between Infinite Scroll (default) and classic Prev/Next buttons (Max 5 books per page).

Taxonomy Facets: Advanced filtering by Genre, Audience, and Language, with state preserved via URL Query Params.

Pricing Integration: Real-time data fetching from a simulated pricing microservice on the PDP.

🛠️ CI/CD & Deployment
GitHub Actions:

lint-and-preview.yml: Runs ESLint and creates Vercel Previews on every Pull Request.

deploy-prod.yml: Automatically ships to production after successful linting on the main branch.

Live Demo: readify-git-main-jehonas-projects.vercel.app

🚀 Getting Started
To run this project locally, follow these steps:

1. Clone the repository
   Bash
   git clone https://github.com/JehonaM/readify
   cd Readify
2. Install Dependencies
   Navigate to the web directory where the Next.js application resides:

Bash
cd web
npm install

3. Environment Variables
   Create a .env.local file inside the web/ folder and add your credentials:

Code snippet
CONTENTFUL_SPACE_ID=your_id
CONTENTFUL_ACCESS_TOKEN=your_token
NEXT_PUBLIC_ALGOLIA_APP_ID=your_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_key

4. CMS Setup (Migrations & Seeding)
   Run the automated scripts to build the Contentful structure and populate it with books:

Bash
npm run migrate
npm run seed

5. Run the Development Server
   Bash
   npm run dev
   The app will be available at http://localhost:3000.
