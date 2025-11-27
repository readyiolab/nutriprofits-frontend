import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

export const usePaginatedFetch = (baseUrl, options = {}) => {
  const {
    pageSize = 10,
    showToast = false,
    onSuccess = null,
    onError = null,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [customPageSize, setCustomPageSize] = useState(pageSize);
  const cacheRef = useRef({});

  const fetchPage = useCallback(async (page = 1) => {
    if (cacheRef.current[page]) {
      setData(cacheRef.current[page].data);
      setCurrentPage(page);
      setTotalPages(cacheRef.current[page].totalPages);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Cookies are automatically sent with requests, no manual token handling needed
      const headers = {
        'Content-Type': 'application/json',
      };

      const url = new URL(baseUrl, window.location.origin);
      url.searchParams.append('page', page);
      url.searchParams.append('limit', customPageSize);

      const response = await fetch(url.toString(), { 
        headers,
        credentials: 'include', // Include cookies in request
      });
      const result = await response.json();

      if (result.success || response.ok) {
        const pageData = result.data || [];
        const total = result.totalPages || Math.ceil((result.total || 0) / customPageSize);

        setData(pageData);
        setCurrentPage(page);
        setTotalPages(total);

        cacheRef.current[page] = { data: pageData, totalPages: total };

        if (onSuccess) {
          onSuccess(pageData);
        }
      } else {
        const errorMessage = result.message || 'Failed to fetch data';
        setError(errorMessage);
        if (showToast) {
          toast.error(errorMessage);
        }
        if (onError) {
          onError(errorMessage);
        }
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
  }, [baseUrl, customPageSize, showToast, onSuccess, onError]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      fetchPage(page);
    }
  }, [totalPages, fetchPage]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      fetchPage(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      fetchPage(currentPage - 1);
    }
  }, [currentPage, fetchPage]);

  const refetch = useCallback(() => {
    cacheRef.current = {};
    fetchPage(1);
  }, [fetchPage]);

  const handlePageSizeChange = useCallback((newSize) => {
    setCustomPageSize(newSize);
    cacheRef.current = {};
    fetchPage(1);
  }, [fetchPage]);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    refetch,
    pageSize: customPageSize,
    setPageSize: handlePageSizeChange,
  };
};

export default usePaginatedFetch;
