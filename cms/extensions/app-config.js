export const AppConfig = {
  name: "Goodreads Book Integration",
  description: "Sync and display Goodreads ratings for your books",
  version: "1.0.0",

  installation: {
    target: ["space"],
    hostnames: ["https://goodreads-integration.example.com", "localhost:3000"],
  },

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

  widgets: {
    goodreadsId: {
      id: "goodreads-id-widget",
      name: "Goodreads ID Input",
      srcdoc: "./goodreads-widget.html",
    },
  },
};

export const spaceInstallationParameters = {
  goodreadsApiKey: null,
  goodreadsUserId: null,
  autoSync: true,
  updateInterval: 30,
};

export const handleGoodreadsIdFieldChange = async (
  goodreadsId,
  contentfulEntry,
  parameters,
) => {
  if (!parameters.autoSync) {
    return;
  }
};

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

export const migrationWithWidget = `
module.exports = function (migration) {
  const book = migration.editContentType("book");

  book.editField("goodreadsId").widgetId("goodreads-id-widget");
};
`;

export default AppConfig;
