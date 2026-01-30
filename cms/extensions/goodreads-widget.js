export const fetchGoodreadsData = async (goodreadsId) => {
  const goodreadsApiKey = process.env.GOODREADS_API_KEY;

  if (!goodreadsApiKey || !goodreadsId) {
    return null;
  }

  try {
    const response = await fetch(
      `https://www.goodreads.com/book/show/${goodreadsId}.json?key=${goodreadsApiKey}`,
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

export const syncGoodreadsToContentful = async (
  entry,
  goodreadsId,
  managementClient,
) => {
  const goodreadsData = await fetchGoodreadsData(goodreadsId);

  if (!goodreadsData) {
    throw new Error("Failed to fetch Goodreads data");
  }

  entry.fields.goodreadsRating = {
    "en-US": goodreadsData.rating,
  };

  entry.fields.reviewCount = {
    "en-US": goodreadsData.reviewCount,
  };

  if (!entry.fields.numberOfPages["en-US"]) {
    entry.fields.numberOfPages = {
      "en-US": goodreadsData.pageCount,
    };
  }

  await entry.update();
  await entry.publish();

  return entry;
};

export const formatRating = (rating, showStars = true) => {
  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return "N/A";
  }

  const stars = showStars ? "★".repeat(Math.round(rating)) : "";
  return `${rating.toFixed(1)} ${stars}`.trim();
};

export const getRatingColor = (rating) => {
  if (rating >= 4.5) return "#2ecc71";
  if (rating >= 4) return "#27ae60";
  if (rating >= 3) return "#f39c12";
  if (rating >= 2) return "#e74c3c";
  return "#c0392b";
};

export const renderStarRating = (rating, maxRating = 5) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - Math.ceil(rating);

  let html = "";

  for (let i = 0; i < fullStars; i++) {
    html += '<span class="star full">★</span>';
  }

  if (hasHalfStar) {
    html += '<span class="star half">★</span>';
  }

  for (let i = 0; i < emptyStars; i++) {
    html += '<span class="star empty">☆</span>';
  }

  return html;
};

export const widgetConfig = {
  id: "goodreads-rating-widget",
  name: "Goodreads Rating Widget",
  description: "Fetch and display Goodreads ratings for books",
  categories: ["annotation"],
  locations: [{ location: "entry-field" }],

  fieldTypes: ["Symbol"],
};

export const GoodreadsRatingWidgetComponent = {
  id: "goodreads-rating-widget",
};

export const goodreadsUtils = {
  fetchGoodreadsData,
  syncGoodreadsToContentful,
  formatRating,
  getRatingColor,
  renderStarRating,
};

export default goodreadsUtils;
