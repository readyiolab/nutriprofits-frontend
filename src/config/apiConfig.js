/**
 * API Configuration and utilities
 * Centralized place for API endpoints and helper functions
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // About Page
  ABOUT_CONTENT: (backofficeId) => `${API_BASE_URL}/about-page-content/${backofficeId}/content`,
  ABOUT_CONTENT_UPSERT: (backofficeId) => `${API_BASE_URL}/about-page-content/${backofficeId}/content/upsert`,

  // Categories
  CATEGORIES: `${API_BASE_URL}/categories`,
  CATEGORY: (id) => `${API_BASE_URL}/categories/${id}`,
  CATEGORY_PRODUCTS: (categoryId) => `${API_BASE_URL}/categories/${categoryId}/products`,

  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT: (id) => `${API_BASE_URL}/products/${id}`,

  // Contact Page
  CONTACT_CONTENT: (backofficeId) => `${API_BASE_URL}/contact-page-content/${backofficeId}/content`,
  CONTACT_CONTENT_UPSERT: (backofficeId) => `${API_BASE_URL}/contact-page-content/${backofficeId}/content/upsert`,
  CONTACT_SUBMISSIONS: `${API_BASE_URL}/contact-submissions`,

  // FAQ
  FAQS: `${API_BASE_URL}/faqs`,
  FAQ: (id) => `${API_BASE_URL}/faqs/${id}`,
  FAQ_PAGE_CONTENT: (backofficeId) => `${API_BASE_URL}/faq-page-content/${backofficeId}/content`,
  FAQ_PAGE_CONTENT_UPSERT: (backofficeId) => `${API_BASE_URL}/faq-page-content/${backofficeId}/content/upsert`,

  // Category Page
  CATEGORY_PAGE_CONTENT: (backofficeId) => `${API_BASE_URL}/category-page-content/${backofficeId}/content`,
  CATEGORY_PAGE_CONTENT_UPSERT: (backofficeId) => `${API_BASE_URL}/category-page-content/${backofficeId}/content/upsert`,

  // Product Page
  PRODUCT_PAGE_CONTENT: (backofficeId) => `${API_BASE_URL}/product-page-content/${backofficeId}/content`,
  PRODUCT_PAGE_CONTENT_UPSERT: (backofficeId) => `${API_BASE_URL}/product-page-content/${backofficeId}/content/upsert`,

  // Settings
  SETTINGS: (backofficeId) => `${API_BASE_URL}/backoffice/${backofficeId}/settings`,
  DOMAIN_STATUS: (backofficeId) => `${API_BASE_URL}/backoffice/${backofficeId}/domain-status`,
  SETUP_DOMAIN: (backofficeId) => `${API_BASE_URL}/backoffice/${backofficeId}/setup-domain`,
  REMOVE_DOMAIN: (backofficeId) => `${API_BASE_URL}/backoffice/${backofficeId}/remove-domain`,
};

/**
 * Get the authentication token from localStorage
 * @returns {string|null} - The auth token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('token') || null;
};

/**
 * Get the backoffice ID from localStorage
 * @returns {string|null} - The backoffice ID or null
 */
export const getBackofficeId = () => {
  return localStorage.getItem('backofficeId') || '1';
};

/**
 * Create authorization headers with token
 * @returns {Object} - Headers object with Authorization if token exists
 */
export const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Handle API response and extract data or throw error
 * @param {Response} response - Fetch response object
 * @returns {Promise<any>} - Parsed JSON or error
 */
export const handleApiResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP Error: ${response.status}`);
  }

  if (!data.success && data.message) {
    throw new Error(data.message);
  }

  return data.data || data;
};

export default API_ENDPOINTS;
