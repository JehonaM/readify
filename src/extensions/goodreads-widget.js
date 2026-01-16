/**
 * Goodreads Rating Widget Extension for Contentful
 * This module provides utilities to integrate Goodreads ratings with Contentful
 *
 * Installation:
 * 1. Create an App in Contentful using the Contentful App Framework
 * 2. Configure it to access the Goodreads API
 * 3. Use this module as the basis for your custom field widget
 */

/**
 * Fetch Goodreads book data using the book ID
 * Note: Goodreads API requires OAuth, so you'd need to:
 * 1. Set up OAuth credentials
 * 2. Exchange them for access tokens
 */
export const fetchGoodreadsData = async (goodreadsId) => {
  // Using XMLtoJSON conversion since Goodreads API returns XML
  const goodreadsApiKey = process.env.GOODREADS_API_KEY;

  if (!goodreadsApiKey || !goodreadsId) {
    return null;
  }

  try {
    const response = await fetch(
      `https://www.goodreads.com/book/show/${goodreadsId}.json?key=${goodreadsApiKey}`
    );

    if (!response.ok) {
      throw new Error(`Goodreads API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      title: data.title,
      authors: data.authors.map((a) => a.name),
      rating: parseFloat(data.average_rating),
      reviewCount: parseInt(data.reviews_count),
      imageUrl: data.image_url,
      description: data.description,
      isbn: data.isbn,
      publishedDate: data.published_at,
      pageCount: data.num_pages,
      genres: data.genres.map((g) => g.name),
    };
  } catch (error) {
    console.error("Error fetching Goodreads data:", error.message);
    return null;
  }
};

/**
 * Sync Goodreads data to a Contentful entry
 * This is useful for keeping book information up to date
 */
export const syncGoodreadsToContentful = async (
  entry,
  goodreadsId,
  managementClient
) => {
  const goodreadsData = await fetchGoodreadsData(goodreadsId);

  if (!goodreadsData) {
    throw new Error("Failed to fetch Goodreads data");
  }

  // Update the entry with Goodreads data
  entry.fields.goodreadsRating = {
    "en-US": goodreadsData.rating,
  };

  entry.fields.reviewCount = {
    "en-US": goodreadsData.reviewCount,
  };

  // Optionally update other fields
  if (!entry.fields.numberOfPages["en-US"]) {
    entry.fields.numberOfPages = {
      "en-US": goodreadsData.pageCount,
    };
  }

  await entry.update();
  await entry.publish();

  return entry;
};

/**
 * Format rating for display
 */
export const formatRating = (rating, showStars = true) => {
  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return "N/A";
  }

  const stars = showStars ? "★".repeat(Math.round(rating)) : "";
  return `${rating.toFixed(1)} ${stars}`.trim();
};

/**
 * Get rating color based on value (for UI)
 */
export const getRatingColor = (rating) => {
  if (rating >= 4.5) return "#2ecc71"; // Green - Excellent
  if (rating >= 4) return "#27ae60"; // Dark Green - Very Good
  if (rating >= 3) return "#f39c12"; // Orange - Good
  if (rating >= 2) return "#e74c3c"; // Red - Fair
  return "#c0392b"; // Dark Red - Poor
};

/**
 * Render star rating component (for frontend)
 */
export const renderStarRating = (rating, maxRating = 5) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - Math.ceil(rating);

  let html = "";

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    html += '<span class="star full">★</span>';
  }

  // Half star
  if (hasHalfStar) {
    html += '<span class="star half">★</span>';
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    html += '<span class="star empty">☆</span>';
  }

  return html;
};

/**
 * Widget configuration for Contentful App Framework
 * This is the configuration needed to register the custom widget
 */
export const widgetConfig = {
  id: "goodreads-rating-widget",
  name: "Goodreads Rating Widget",
  description: "Fetch and display Goodreads ratings for books",
  categories: ["annotation"],
  locations: [{ location: "entry-field" }],

  // Field types this widget can handle
  fieldTypes: ["Symbol"], // goodreadsId field
};

/**
 * Example implementation for a custom field widget
 * This would be the React component rendered in the Contentful UI
 */
export const GoodreadsRatingWidgetComponent = {
  id: "goodreads-rating-widget",

  // async componentDidMount() {
  //   This is where you'd:
  //   1. Initialize the widget
  //   2. Listen for value changes
  //   3. Fetch Goodreads data when ID is entered
  // },

  // Example methods:
  // onGoodreadsIdChange: async (goodreadsId) => {
  //   const data = await fetchGoodreadsData(goodreadsId);
  //   this.updateRelatedFields(data);
  // }
};

/**
 * Export utilities for backend scripts
 */
export const goodreadsUtils = {
  fetchGoodreadsData,
  syncGoodreadsToContentful,
  formatRating,
  getRatingColor,
  renderStarRating,
};

export default goodreadsUtils;
