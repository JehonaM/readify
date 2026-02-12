import { getEntries } from "./client";

export async function getHomePageData() {
  const query = `
    query {
      homePageCollection(limit: 1) {
        items {
          heroTitle
          heroImage { url }
          sectionsCollection {
            items {
              ... on ImageWithText {
                title
                description { json }
                image { url }
              }
            }
          }
        }
      }
    }
  `;

  const data = await getEntries(query);
  const home = data.homePageCollection.items[0];

  if (!home) {
    throw new Error("Home Page data not found in Contentful");
  }

  return {
    heroTitle: home.heroTitle,
    heroImage: home.heroImage,
    sections: home.sectionsCollection.items,
  };
}
