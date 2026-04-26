/**
 * Utility functions for domain detection and management
 */

/**
 * Get current domain information
 * @returns {Object} Domain info with hostname and isMain flag
 */
export const getDomainInfo = () => {
  const hostname = window.location.hostname.toLowerCase();
  const baseDomain = import.meta.env.VITE_BASE_DOMAIN || "igrowbig.com";

  const isMain =
    hostname === baseDomain ||
    hostname === `www.${baseDomain}` ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith('.vercel.app') ||
    // Identify common LAN IP patterns
    /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

  return {
    hostname,
    isMain,
    baseDomain,
    isSubdomain: hostname.endsWith(`.${baseDomain}`) && !isMain,
    isCustomDomain: !isMain && !hostname.endsWith(`.${baseDomain}`),
  };
};

/**
 * Extract subdomain from hostname
 * @param {string} hostname - Full hostname
 * @returns {string|null} Subdomain name
 */
export const getSubdomain = (hostname = window.location.hostname) => {
  const baseDomain = import.meta.env.VITE_BASE_DOMAIN || "igrowbig.com";

  if (hostname.endsWith(`.${baseDomain}`)) {
    return hostname.replace(`.${baseDomain}`, "");
  }

  return null;
};

/**
 * Get full domain including base domain
 * @param {string} subdomain - Subdomain name
 * @returns {string} Full domain
 */
export const getFullDomain = (subdomain) => {
  const baseDomain = import.meta.env.VITE_BASE_DOMAIN || "igrowbig.com";
  return `${subdomain}.${baseDomain}`;
};

/**
 * Check if current domain is main domain
 * @returns {boolean}
 */
export const isMainDomain = () => {
  return getDomainInfo().isMain;
};

/**
 * Check if current domain is a subdomain
 * @returns {boolean}
 */
export const isSubdomainAccess = () => {
  return getDomainInfo().isSubdomain;
};

/**
 * Check if current domain is a custom domain
 * @returns {boolean}
 */
export const isCustomDomainAccess = () => {
  return getDomainInfo().isCustomDomain;
};

/**
 * Get API base URL — uses the same env var as apiConfig.js
 * @returns {string} API base URL
 */
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || "http://localhost:3001/api";
};

/**
 * Make API call with proper domain headers.
 * For most cases, prefer using the `useFetch` hook or `api` instance from apiConfig.
 * This is for cases where you need custom Host headers (e.g., tenant resolution).
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} API response
 */
export const apiCall = async (endpoint, options = {}) => {
  const { hostname } = getDomainInfo();
  const baseUrl = getApiBaseUrl();

  const headers = {
    "Content-Type": "application/json",
    "X-Tenant-Domain": hostname,
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default {
  getDomainInfo,
  getSubdomain,
  getFullDomain,
  isMainDomain,
  isSubdomainAccess,
  isCustomDomainAccess,
  getApiBaseUrl,
  apiCall,
};