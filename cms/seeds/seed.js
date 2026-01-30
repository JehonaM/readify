require("dotenv").config({ path: "../.env" });
const contentful = require("contentful-management");
const books = require("./books.json");

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function runMasterSeed() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(
      process.env.CONTENTFUL_ENV || "master",
    );

    const taxonomyData = [
      { title: "Programming", slug: "programming", type: "genre" },
      { title: "Software Architecture", slug: "software-arch", type: "genre" },
      { title: "Algorithms", slug: "algorithms", type: "genre" },
      { title: "Adult", slug: "adult", type: "audience" },
      { title: "Professional", slug: "professional", type: "audience" },
      { title: "English", slug: "english", type: "language" },
    ];

    const taxMap = {};
    for (const t of taxonomyData) {
      const entry = await env.createEntry("taxonomyTerm", {
        fields: {
          title: { "en-US": t.title },
          slug: { "en-US": t.slug },
          type: { "en-US": t.type },
        },
      });
      await entry.publish();
      taxMap[t.title] = entry.sys.id;
    }

    for (const book of books) {
      const entry = await env.createEntry("book", {
        fields: {
          title: { "en-US": book.title },
          authors: { "en-US": book.authors },
          numberOfPages: { "en-US": book.numberOfPages },
          shortDescription: {
            "en-US": {
              nodeType: "document",
              data: {},
              content: [
                {
                  nodeType: "paragraph",
                  content: [
                    {
                      nodeType: "text",
                      value: book.shortDescription,
                      marks: [],
                      data: {},
                    },
                  ],
                },
              ],
            },
          },

          taxonomies: {
            "en-US": (book.taxonomy || [])
              .map((name) => ({
                sys: { type: "Link", linkType: "Entry", id: taxMap[name] },
              }))
              .filter((l) => l.sys.id),
          },
          externalLink: { "en-US": book.externalLink },
        },
      });
      await entry.publish();
    }
  } catch (e) {
    console.error(e);
  }
}

runMasterSeed();
