/**
 * Generate optimized image URLs for book covers with various sizes and qualities
 * Uses Contentful's Images API for on-the-fly transformations
 */
export const getCoverImage = (url) => ({
  main: `${url}?w=400&h=600&q=80&fm=webp`,
  blur: `${url}?w=20&h=30&blur=100&q=10`,
});

/**
 * Generate responsive image set for different breakpoints
 */
export const getResponsiveCoverImages = (url) => ({
  mobile: `${url}?w=200&h=300&q=70&fm=webp`,
  tablet: `${url}?w=300&h=450&q=75&fm=webp`,
  desktop: `${url}?w=400&h=600&q=80&fm=webp`,
  hd: `${url}?w=600&h=900&q=85&fm=webp`,
});

/**
 * Generate hero image URLs with different sizes
 */
export const getHeroImage = (url) => ({
  mobile: `${url}?w=375&h=500&q=70&fm=webp&fit=fill`,
  tablet: `${url}?w=768&h=600&q=75&fm=webp&fit=fill`,
  desktop: `${url}?w=1920&h=600&q=80&fm=webp&fit=fill`,
});

/**
 * Generate image with text section images
 */
export const getSectionImage = (url, alignment = "left") => {
  const baseParams = `q=75&fm=webp`;

  // Aspect ratio varies based on alignment
  const dimensions = {
    left: "w=500&h=400", // Landscape
    right: "w=500&h=400", // Landscape
    top: "w=800&h=400", // Wide landscape for top alignment
    bottom: "w=800&h=400", // Wide landscape for bottom alignment
  };

  return {
    main: `${url}?${dimensions[alignment]}&${baseParams}`,
    blur: `${url}?${dimensions[alignment]}&blur=100&q=10`,
  };
};

/**
 * Generate thumbnail for library listings
 */
export const getThumbnailImage = (url, size = "small") => {
  const sizes = {
    small: "w=150&h=225", // Standard book thumbnail
    medium: "w=250&h=375", // Grid view
    large: "w=350&h=525", // Featured section
  };

  return `${url}?${sizes[size]}&q=70&fm=webp`;
};

/**
 * Generate srcset for responsive images
 */
export const getResponsiveSrcSet = (url, type = "cover") => {
  const baseUrl = url.split("?")[0];

  const sets = {
    cover: [
      { size: 200, scale: "1x" },
      { size: 300, scale: "1.5x" },
      { size: 400, scale: "2x" },
    ],
    hero: [
      { size: 375, scale: "1x" },
      { size: 768, scale: "1.5x" },
      { size: 1920, scale: "2x" },
    ],
    thumbnail: [
      { size: 150, scale: "1x" },
      { size: 250, scale: "1.5x" },
      { size: 350, scale: "2x" },
    ],
  };

  return sets[type]
    .map(({ size, scale }) => `${baseUrl}?w=${size}&q=75&fm=webp ${scale}`)
    .join(", ");
};

/**
 * Get image with LQIP (Low Quality Image Placeholder) for progressive loading
 */
export const getImageWithLQIP = (url) => ({
  lqip: `${url}?w=20&h=30&blur=100&q=10&fm=webp`, // Blur-up placeholder
  full: `${url}?w=400&h=600&q=80&fm=webp`,
  srcSet: getResponsiveSrcSet(url, "cover"),
});

/**
 * Transform any image URL with custom parameters
 */
export const transformImage = (url, options = {}) => {
  const {
    width,
    height,
    quality = 75,
    format = "webp",
    blur = 0,
    fit = "fill",
    radius = 0,
  } = options;

  let params = `q=${quality}&fm=${format}`;

  if (width) params += `&w=${width}`;
  if (height) params += `&h=${height}`;
  if (blur) params += `&blur=${blur}`;
  if (fit) params += `&fit=${fit}`;
  if (radius) params += `&r=${radius}`;

  return `${url}?${params}`;
};

/**
 * Get image URL with rounded corners for modern design
 */
export const getRoundedImage = (url, radius = 8) => ({
  main: `${url}?w=400&h=600&q=80&fm=webp&r=${radius}`,
  blur: `${url}?w=20&h=30&blur=100&q=10&r=${radius}`,
  thumbnail: `${url}?w=150&h=225&q=70&fm=webp&r=${radius}`,
});

/**
 * Get image URL with specific aspect ratio cropping
 */
export const getImageWithAspectRatio = (url, aspectRatio = "4:6") => {
  const aspectMap = {
    "4:6": { width: 400, height: 600 },
    "1:1": { width: 400, height: 400 },
    "16:9": { width: 800, height: 450 },
    "3:2": { width: 600, height: 400 },
  };

  const { width, height } = aspectMap[aspectRatio] || aspectMap["4:6"];

  return {
    main: `${url}?w=${width}&h=${height}&q=80&fm=webp&fit=fill`,
    thumb: `${url}?w=${Math.floor(width / 2)}&h=${Math.floor(
      height / 2
    )}&q=70&fm=webp&fit=fill`,
  };
};
