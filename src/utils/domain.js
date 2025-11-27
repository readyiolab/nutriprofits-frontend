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
    hostname === "localhost";

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
 * @returns {string} Subdomain name
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
 * Get API base URL for current domain
 * @returns {string} API base URL
 */
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
};

/**
 * Make API call with proper domain headers
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} API response
 */
export const apiCall = async (endpoint, options = {}) => {
  const { hostname } = getDomainInfo();
  const baseUrl = getApiBaseUrl();

  const headers = {
    "Content-Type": "application/json",
    "Host": hostname,
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
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