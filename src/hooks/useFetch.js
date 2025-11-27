import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';


export const useFetch = (url, options = {}) => {
  const {
    method = 'GET',
    headers = {},
    body = null,
    immediate = true,
    showToast = true,
    onSuccess = null,
    onError = null,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (customUrl = url, customBody = body) => {
    try {
      setLoading(true);
      setError(null);

      // Cookies are automatically sent with requests, no manual token handling needed
      const requestHeaders = {
        'Content-Type': 'application/json',
        ...headers,
      };

      const fetchOptions = {
        method,
        headers: requestHeaders,
        credentials: 'include', // Include cookies in request
      };

      if (customBody && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        fetchOptions.body = JSON.stringify(customBody);
      }

      const response = await fetch(customUrl, fetchOptions);
      const result = await response.json();

      if (result.success || response.ok) {
        setData(result.data || result);
        if (showToast && result.message) {
          toast.success(result.message);
        }
        if (onSuccess) {
          onSuccess(result.data || result);
        }
        return result.data || result;
      } else {
        const errorMessage = result.message || 'An error occurred';
        setError(errorMessage);
        if (showToast) {
          toast.error(errorMessage);
        }
        if (onError) {
          onError(errorMessage);
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch data';
      setError(errorMessage);
      if (showToast) {
        toast.error(errorMessage);
      }
      if (onError) {
        onError(errorMessage);
      }
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [method, headers, onSuccess, onError, showToast]);

  useEffect(() => {
    if (immediate && url) {
      fetchData(url, body);
    }
  }, [url, immediate, body]);

  const refetch = () => fetchData(url, body);

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
