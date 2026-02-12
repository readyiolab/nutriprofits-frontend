/**
 * Generate a URL-friendly slug from a string.
 * @param {string} text - The text to slugify
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // Replace spaces with -
    .replace(/[^\w\-]+/g, "")   // Remove non-word chars (except -)
    .replace(/\-\-+/g, "-")     // Replace multiple - with single -
    .replace(/^-+/, "")         // Trim - from start
    .replace(/-+$/, "");        // Trim - from end
};

/**
 * Find a product by slug from an array of products.
 * First tries product_slug field, then generates slug from product_name.
 * @param {Array} products - Array of product objects
 * @param {string} slug - The slug to search for
 * @returns {Object|undefined} - The matched product or undefined
 */
export const findProductBySlug = (products, slug) => {
  if (!products || !slug) return undefined;
  return products.find(
    (p) =>
      p.product_slug === slug ||
      generateSlug(p.product_name) === slug ||
      generateSlug(p.name) === slug
  );
};

/**
 * Find a category by slug from an array of categories.
 * First tries category_slug field, then generates slug from category_name.
 * @param {Array} categories - Array of category objects
 * @param {string} slug - The slug to search for
 * @returns {Object|undefined} - The matched category or undefined
 */
export const findCategoryBySlug = (categories, slug) => {
  if (!categories || !slug) return undefined;
  return categories.find(
    (c) =>
      c.category_slug === slug ||
      generateSlug(c.category_name) === slug ||
      generateSlug(c.name) === slug
  );
};

/**
 * Get the slug for a product (prefer DB slug, fallback to generated).
 * @param {Object} product - Product object
 * @returns {string} - The slug
 */
export const getProductSlug = (product) => {
  if (!product) return "";
  return product.product_slug || generateSlug(product.product_name || product.name);
};

/**
 * Get the slug for a category (prefer DB slug, fallback to generated).
 * @param {Object} category - Category object
 * @returns {string} - The slug
 */
export const getCategorySlug = (category) => {
  if (!category) return "";
  return category.category_slug || generateSlug(category.category_name || category.name);
};
