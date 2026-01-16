/**
 * Live Preview Configuration for Contentful
 * Enables editors to see real-time changes while editing content
 */

export const previewConfig = {
  // Home Page Preview
  homePage: {
    contentType: "homePage",
    previewUrl:
      process.env.PREVIEW_URL_HOME || "http://localhost:3000/preview/home",
    slug: null, // Home page doesn't need slug
  },

  // Book Page (PDP) Preview
  book: {
    contentType: "book",
    previewUrl:
      process.env.PREVIEW_URL_BOOK || "http://localhost:3000/preview/book",
    slug: "slug", // Book entries should have a slug field
  },

  // Library Page Preview
  libraryPage: {
    contentType: "libraryPage",
    previewUrl:
      process.env.PREVIEW_URL_LIBRARY ||
      "http://localhost:3000/preview/library",
    slug: null,
  },

  // Image with Text Section Preview
  imageWithText: {
    contentType: "imageWithText",
    previewUrl:
      process.env.PREVIEW_URL_SECTION ||
      "http://localhost:3000/preview/section",
    slug: null,
  },
};

/**
 * Generate preview URL for a content entry
 */
export const generatePreviewUrl = (contentType, entry) => {
  const config = previewConfig[contentType];

  if (!config) {
    console.warn(`No preview config for content type: ${contentType}`);
    return null;
  }

  const baseUrl = config.previewUrl;

  // For entries with slug, use slug as identifier
  if (config.slug && entry.fields[config.slug]) {
    return `${baseUrl}/${entry.fields[config.slug]["en-US"]}?preview=true`;
  }

  // For entries without slug, use entry ID
  return `${baseUrl}/${entry.sys.id}?preview=true`;
};

/**
 * Preview URL builders for different content types
 */
export const previewUrls = {
  /**
   * Build home page preview URL
   */
  home: () => {
    return `${
      process.env.PREVIEW_URL_HOME || "http://localhost:3000"
    }/preview/home?preview=true`;
  },

  /**
   * Build book page preview URL
   */
  book: (slug) => {
    return `${
      process.env.PREVIEW_URL_BOOK || "http://localhost:3000"
    }/books/${slug}?preview=true`;
  },

  /**
   * Build library page preview URL
   */
  library: () => {
    return `${
      process.env.PREVIEW_URL_LIBRARY || "http://localhost:3000"
    }/library?preview=true`;
  },

  /**
   * Build section preview URL
   */
  section: (sectionId) => {
    return `${
      process.env.PREVIEW_URL_SECTION || "http://localhost:3000"
    }/preview/section/${sectionId}?preview=true`;
  },
};

/**
 * Example integration with Contentful Content Preview API
 * This configuration should be applied in your Contentful Space Settings
 *
 * Steps to enable:
 * 1. Go to your Contentful Space Settings
 * 2. Click on "Content Preview"
 * 3. Add preview URLs for each content type:
 *
 * Content Model | URL Pattern
 * --------------|------------------
 * Book          | http://localhost:3000/preview/book/{entry.fields.slug}?preview=true
 * Home Page     | http://localhost:3000/preview/home?preview=true
 * Library Page  | http://localhost:3000/preview/library?preview=true
 * Image w/ Text | http://localhost:3000/preview/section/{entry.sys.id}?preview=true
 */

export default previewConfig;
