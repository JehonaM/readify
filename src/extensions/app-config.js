/**
 * Contentful App Framework Boilerplate
 * Goodreads Integration App
 *
 * To use this app:
 * 1. Initialize with: npx create-contentful-app
 * 2. Install dependencies: npm install
 * 3. Configure environment variables
 * 4. Deploy to Contentful
 *
 * App Framework Docs: https://www.contentful.com/developers/docs/extensibility/app-framework/
 */

// This would be the main App component using Contentful's App Framework
export const AppConfig = {
  name: "Goodreads Book Integration",
  description: "Sync and display Goodreads ratings for your books",
  version: "1.0.0",

  // Configuration for this app
  installation: {
    target: ["space"],
    hostnames: [
      "https://goodreads-integration.example.com",
      "localhost:3000", // For local development
    ],
  },

  // Parameters the app needs from the space
  parameters: {
    installation: [
      {
        id: "goodreadsApiKey",
        name: "Goodreads API Key",
        description: "Your Goodreads API key for fetching book data",
        type: "Symbol",
        required: true,
      },
      {
        id: "goodreadsUserId",
        name: "Goodreads User ID",
        description: "Your Goodreads user ID (optional, for shelf sync)",
        type: "Symbol",
        required: false,
      },
      {
        id: "autoSync",
        name: "Auto-sync Goodreads Data",
        description: "Automatically fetch Goodreads ratings when ID is added",
        type: "Boolean",
        required: false,
        default: true,
      },
      {
        id: "updateInterval",
        name: "Update Interval (days)",
        description:
          "How often to update ratings from Goodreads (0 = never auto-update)",
        type: "Integer",
        required: false,
        default: 30,
      },
    ],
  },

  // Widget registration for field rendering
  widgets: {
    goodreadsId: {
      id: "goodreads-id-widget",
      name: "Goodreads ID Input",
      srcdoc: "./goodreads-widget.html",
    },
  },
};

/**
 * Installation parameters structure for Space settings
 */
export const spaceInstallationParameters = {
  goodreadsApiKey: null,
  goodreadsUserId: null,
  autoSync: true,
  updateInterval: 30,
};

/**
 * Helper: Initialize the app with Contentful SDK
 * This would be called in your app's main setup
 */
export const initializeContentfulApp = (contentfulConfig) => {
  // Initialize Contentful App SDK
  // const sdk = window.contentfulExtension.init();

  return {
    // App initialization logic would go here
    // Subscribe to field changes
    // Set up sync handlers
    // etc.
  };
};

/**
 * Helper: Handle field entry update with Goodreads sync
 */
export const handleGoodreadsIdFieldChange = async (
  goodreadsId,
  contentfulEntry,
  parameters
) => {
  if (!parameters.autoSync) {
    return;
  }

  // Fetch from Goodreads
  // const goodreadsData = await fetchGoodreadsData(goodreadsId);

  // Update Contentful entry fields
  // This would update rating, review count, etc.
};

/**
 * Manifest configuration for Contentful
 * Place this in your contentful.json or configure in space settings
 */
export const contentfulManifest = {
  modules: [
    {
      location: "entry-sidebar",
      source: "https://goodreads-integration.example.com/sidebar.html",
    },
  ],
  locations: [
    {
      location: "entry-field",
      source: "https://goodreads-integration.example.com/field-widget.html",
    },
  ],
};

/**
 * Example usage in a Contentful migration
 * To add this widget to your field
 */
export const migrationWithWidget = `
module.exports = function (migration) {
  const book = migration.editContentType("book");

  book.editField("goodreadsId").widgetId("goodreads-id-widget");
};
`;

export default AppConfig;
