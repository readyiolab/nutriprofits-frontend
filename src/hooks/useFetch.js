import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import api from '@/config/apiConfig';

/**
 * Custom hook for data fetching using the shared axios instance.
 * Supports GET, POST, PUT, PATCH, DELETE with automatic error handling.
 *
 * @param {string} url - API endpoint (relative to base URL, e.g. "/backoffice/branding")
 * @param {Object} options - Hook configuration
 * @returns {Object} - { data, loading, error, fetchData, refetch, setData }
 */
export const useFetch = (url, options = {}) => {
  const {
    method = 'GET',
    body = null,
    immediate = true,
    showToast = true,
    onSuccess = null,
    onError = null,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  // Use refs for callbacks to avoid re-render loops
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const fetchData = useCallback(async (customUrl, customBody) => {
    const requestUrl = customUrl || url;
    const requestBody = customBody !== undefined ? customBody : body;

    if (!requestUrl) return;

    try {
      setLoading(true);
      setError(null);

      const config = { method, url: requestUrl };

      if (requestBody && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        config.data = requestBody;
      }

      const response = await api(config);
      const result = response.data;

      if (result.success !== false) {
        const responseData = result.data ?? result;
        setData(responseData);

        if (showToast && result.message) {
          toast.success(result.message);
        }
        if (onSuccessRef.current) {
          onSuccessRef.current(responseData);
        }
        return responseData;
      }

      // Server returned { success: false }
      const errorMessage = result.message || 'An error occurred';
      setError(errorMessage);
      if (showToast) {
        toast.error(errorMessage);
      }
      if (onErrorRef.current) {
        onErrorRef.current(errorMessage);
      }
      throw new Error(errorMessage);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
      setError(errorMessage);

      // Only show toast if not already shown above
      if (showToast && !err.response?.data?.message) {
        toast.error(errorMessage);
      }
      if (onErrorRef.current) {
        onErrorRef.current(errorMessage);
      }
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, showToast]);

  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }
  }, [url, immediate]);

  const refetch = () => fetchData();

  return {
    data,
    loading,
    error,
    fetchData,
    refetch,
    setData,
  };
};

export default useFetch;

