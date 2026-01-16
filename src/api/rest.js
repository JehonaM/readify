import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

/**
 * Get books for Library Page (PLP) with pagination
 */
export const getBooks = (page = 1, limit = 10) => {
  return client.getEntries({
    content_type: "book",
    skip: (page - 1) * limit,
    limit,
    order: "-sys.createdAt",
  });
};

/**
 * Get a single book by ID for Book Page (PDP)
 */
export const getBookById = (bookId) => {
  return client.getEntry(bookId);
};

/**
 * Get books by taxonomy/genre
 */
export const getBooksByGenre = (genre, page = 1, limit = 10) => {
  return client.getEntries({
    content_type: "book",
    "fields.taxonomy[in]": genre,
    skip: (page - 1) * limit,
    limit,
    order: "-sys.createdAt",
  });
};

/**
 * Get home page content
 */
export const getHomePage = () => {
  return client.getEntries({
    content_type: "homePage",
    limit: 1,
  });
};

/**
 * Get library page configuration
 */
export const getLibraryPage = () => {
  return client.getEntries({
    content_type: "libraryPage",
    limit: 1,
  });
};

/**
 * Get featured books (for hero section)
 */
export const getFeaturedBooks = (limit = 6) => {
  return client.getEntries({
    content_type: "book",
    limit,
    order: "-sys.createdAt",
  });
};

/**
 * Search books by title or author
 */
export const searchBooks = (query, limit = 10) => {
  return client.getEntries({
    content_type: "book",
    query,
    limit,
  });
};

/**
 * Get image with text section (reusable component)
 */
export const getImageWithTextSection = (sectionId) => {
  return client.getEntry(sectionId);
};

/**
 * Get paginated books with metadata
 */
export const getPaginatedBooks = async (page = 1, limit = 10) => {
  try {
    const response = await client.getEntries({
      content_type: "book",
      skip: (page - 1) * limit,
      limit,
      order: "-sys.createdAt",
    });

    return {
      items: response.items,
      total: response.total,
      page,
      limit,
      totalPages: Math.ceil(response.total / limit),
      hasNextPage: (page - 1) * limit + limit < response.total,
      hasPrevPage: page > 1,
    };
  } catch (error) {
    console.error("Error fetching paginated books:", error.message);
    throw error;
  }
};
