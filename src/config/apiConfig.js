import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Utility to get a cookie value by name
 */
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include CSRF token for state-changing methods
api.interceptors.request.use(
  (config) => {
    // Methods that require CSRF protection
    const stateChangingMethods = ['post', 'put', 'delete', 'patch'];
    
    if (stateChangingMethods.includes(config.method?.toLowerCase())) {
      const csrfToken = getCookie('csrf_token');
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || "";
      const isBackofficeLogin = requestUrl.includes("/backoffice/login");
      const isOnBackofficeLogin = window.location.pathname.startsWith("/backoffice/login");

      // Avoid redirect loops and allow login page to show invalid credentials message.
      if (!isBackofficeLogin && !isOnBackofficeLogin) {
        window.location.href = "/backoffice/login";
      }
    } else if (error.response?.status === 429) {
      // Handle rate limiting - show a friendly message
      alert("Too many requests. Please wait a moment before trying again.");
    }
    return Promise.reject(error);
  }
);

export default api;
