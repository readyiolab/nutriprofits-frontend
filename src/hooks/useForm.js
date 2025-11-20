import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for managing form state and form submission
 * @param {Object} initialState - Initial form state
 * @param {function} onSubmit - Function to call on form submission
 * @param {Object} options - Configuration options
 * @param {boolean} options.showToast - Whether to show success/error toasts (default: true)
 * @param {function} options.onSuccess - Callback on successful submission
 * @param {function} options.onError - Callback on submission error
 * @returns {Object} - { formData, setFormData, handleChange, handleSubmit, loading, error, reset }
 */
export const useForm = (initialState, onSubmit, options = {}) => {
  const {
    showToast = true,
    onSuccess = null,
    onError = null,
  } = options;

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync form data when initialState changes
  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      const result = await onSubmit(formData);

      if (showToast) {
        toast.success('Changes saved successfully!');
      }
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Failed to submit form';
      setError(errorMessage);
      if (showToast) {
        toast.error(errorMessage);
      }
      if (onError) {
        onError(errorMessage);
      }
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  }, [formData, onSubmit, showToast, onSuccess, onError]);

  const reset = useCallback(() => {
    setFormData(initialState);
    setError(null);
  }, [initialState]);

  const updateField = useCallback((field, value) => {
    handleChange(field, value);
  }, [handleChange]);

  return {
    formData,
    setFormData,
    handleChange: updateField,
    handleSubmit,
    loading,
    error,
    reset,
  };
};

export default useForm;
