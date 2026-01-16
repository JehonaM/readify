import axios from "axios";

const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

export const graphqlClient = axios.create({
  baseURL: CONTENTFUL_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`,
    "Content-Type": "application/json",
  },
});

/**
 * Get a single book (PDP) with full details including rich text description
 */
export const getBookBySlug = async (slug) => {
  const query = `
    query {
      bookCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          sys {
            id
          }
          title
          slug
          authors
          numberOfPages
          shortDescription {
            json
          }
          coverImage {
            url
            title
          }
          externalLink
          taxonomy
        }
      }
    }
  `;

  try {
    const response = await graphqlClient.post("", { query });
    return response.data.data.bookCollection.items[0] || null;
  } catch (error) {
    console.error("GraphQL Error:", error.message);
    throw error;
  }
};

/**
 * Get all books for PLP (Library Page)
 */
export const getAllBooks = async (limit = 50, skip = 0) => {
  const query = `
    query {
      bookCollection(limit: ${limit}, skip: ${skip}, order: sys_createdAt_DESC) {
        total
        items {
          sys {
            id
          }
          title
          slug
          authors
          numberOfPages
          shortDescription {
            json
          }
          coverImage {
            url
            title
          }
          taxonomy
        }
      }
    }
  `;

  try {
    const response = await graphqlClient.post("", { query });
    return response.data.data.bookCollection;
  } catch (error) {
    console.error("GraphQL Error:", error.message);
    throw error;
  }
};

/**
 * Get home page content with hero banner and image-with-text sections
 */
export const getHomePage = async () => {
  const query = `
    query {
      homePageCollection(limit: 1) {
        items {
          sys {
            id
          }
          title
          heroTitle
          heroImage {
            url
            title
          }
          sectionsCollection {
            items {
              __typename
              sys {
                id
              }
              ... on ImageWithText {
                title
                description {
                  json
                }
                image {
                  url
                  title
                }
                imageAlignment
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphqlClient.post("", { query });
    return response.data.data.homePageCollection.items[0] || null;
  } catch (error) {
    console.error("GraphQL Error:", error.message);
    throw error;
  }
};

/**
 * Get library page configuration
 */
export const getLibraryPageConfig = async () => {
  const query = `
    query {
      libraryPageCollection(limit: 1) {
        items {
          sys {
            id
          }
          title
          pageSize
        }
      }
    }
  `;

  try {
    const response = await graphqlClient.post("", { query });
    return response.data.data.libraryPageCollection.items[0] || null;
  } catch (error) {
    console.error("GraphQL Error:", error.message);
    throw error;
  }
};

/**
 * Get books by taxonomy/genre
 */
export const getBooksByGenre = async (genre, limit = 20, skip = 0) => {
  const query = `
    query {
      bookCollection(
        where: { taxonomy_contains_all: "${genre}" }
        limit: ${limit}
        skip: ${skip}
        order: sys_createdAt_DESC
      ) {
        total
        items {
          sys {
            id
          }
          title
          slug
          authors
          numberOfPages
          shortDescription {
            json
          }
          coverImage {
            url
            title
          }
          taxonomy
        }
      }
    }
  `;

  try {
    const response = await graphqlClient.post("", { query });
    return response.data.data.bookCollection;
  } catch (error) {
    console.error("GraphQL Error:", error.message);
    throw error;
  }
};

/**
 * Get featured books (can be used for hero carousel)
 */
export const getFeaturedBooks = async (limit = 6) => {
  const query = `
    query {
      bookCollection(limit: ${limit}, order: sys_createdAt_DESC) {
        items {
          sys {
            id
          }
          title
          slug
          authors
          coverImage {
            url
            title
          }
          externalLink
        }
      }
    }
  `;

  try {
    const response = await graphqlClient.post("", { query });
    return response.data.data.bookCollection.items;
  } catch (error) {
    console.error("GraphQL Error:", error.message);
    throw error;
  }
};
