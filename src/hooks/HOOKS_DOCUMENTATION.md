# Custom Hooks Documentation

This document provides comprehensive documentation for the custom hooks created to make your codebase more modular and maintainable.

## Overview

Three powerful custom hooks have been created to handle the most common patterns in your BackOffice components:

1. **`useFetch`** - For API data fetching
2. **`useForm`** - For form state management
3. **`usePaginatedFetch`** - For paginated API requests

Plus a new **`apiConfig.js`** utility for centralized API endpoint management.

---

## 1. useFetch Hook

### Purpose
Handles all API fetching logic with built-in loading, error, and success states. Automatically manages authentication tokens and provides options for success/error callbacks.

### Import
```javascript
import { useFetch } from '@/hooks';
```

### Basic Usage
```javascript
const AboutPage = () => {
  const backofficeId = localStorage.getItem('backofficeId');
  
  const { data, loading, error, refetch } = useFetch(
    `http://localhost:3000/api/about-page-content/${backofficeId}/content`,
    { immediate: true }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{/* Render data */}</div>;
};
```

### Parameters
```javascript
useFetch(url, options)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | The API endpoint URL |
| `options.method` | string | HTTP method (GET, POST, PUT, DELETE) - default: 'GET' |
| `options.headers` | object | Additional headers to send |
| `options.body` | object | Request body for POST/PUT/PATCH |
| `options.immediate` | boolean | Fetch on mount - default: true |
| `options.showToast` | boolean | Show success/error toasts - default: true |
| `options.onSuccess` | function | Callback on success |
| `options.onError` | function | Callback on error |

### Return Values
```javascript
{
  data,              // Fetched data
  loading,           // Boolean - true while fetching
  error,             // Error message string or null
  fetch,             // Manual fetch function
  refetch,           // Refetch current URL
  setData,           // Manually set data
}
```

### Advanced Example
```javascript
const { data, loading, fetch } = useFetch(
  null, // Don't fetch immediately
  {
    method: 'POST',
    immediate: false,
    showToast: true,
    onSuccess: (result) => {
      console.log('Data fetched:', result);
      // Do something with data
    },
    onError: (error) => {
      console.error('Fetch failed:', error);
    },
  }
);

// Later, trigger the fetch with custom URL and body
const handleClick = async () => {
  await fetch('http://api.example.com/endpoint', {
    title: 'New Title',
    description: 'New Description'
  });
};
```

---

## 2. useForm Hook

### Purpose
Manages form state, validation, and submission. Handles loading states during submission and automatically shows success/error toasts.

### Import
```javascript
import { useForm } from '@/hooks';
```

### Basic Usage
```javascript
const MyForm = () => {
  const initialState = {
    name: '',
    email: '',
    message: '',
  };

  const { formData, handleChange, handleSubmit, loading } = useForm(
    initialState,
    async (data) => {
      // Your submit logic
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    },
    { showToast: true }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        placeholder="Message"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

### Parameters
```javascript
useForm(initialState, onSubmit, options)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `initialState` | object | Initial form data |
| `onSubmit` | function | Function called with formData on submit |
| `options.showToast` | boolean | Show success/error toasts - default: true |
| `options.onSuccess` | function | Callback after successful submit |
| `options.onError` | function | Callback on submit error |

### Return Values
```javascript
{
  formData,       // Current form state object
  setFormData,    // Manually set entire form state
  handleChange,   // Update single field: handleChange(fieldName, value)
  handleSubmit,   // Submit form: handleSubmit(event)
  loading,        // Boolean - true while submitting
  error,          // Error message or null
  reset,          // Reset form to initial state
}
```

### Advanced Example
```javascript
const { formData, handleChange, handleSubmit, loading, error, reset } = useForm(
  {
    title: 'About Page',
    description: '',
    hero_image: null,
  },
  async (data) => {
    const response = await fetch(`/api/content/${backofficeId}/upsert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Save failed');
    return response.json();
  },
  {
    showToast: true,
    onSuccess: () => {
      console.log('Saved successfully!');
      // Redirect or do something
    },
    onError: (err) => {
      console.error('Save error:', err);
    },
  }
);

return (
  <div>
    {error && <div className="alert-error">{error}</div>}
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={loading} type="submit">
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
    <button onClick={reset}>Reset Form</button>
  </div>
);
```

---

## 3. usePaginatedFetch Hook

### Purpose
Handles paginated API requests with automatic caching, page navigation, and dynamic page size management.

### Import
```javascript
import { usePaginatedFetch } from '@/hooks';
```

### Basic Usage
```javascript
const ProductsList = () => {
  const {
    data: products,
    loading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePaginatedFetch('http://localhost:3000/api/products', {
    pageSize: 10,
  });

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
```

### Parameters
```javascript
usePaginatedFetch(baseUrl, options)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `baseUrl` | string | The base API endpoint URL |
| `options.pageSize` | number | Items per page - default: 10 |
| `options.showToast` | boolean | Show error toasts - default: false |
| `options.onSuccess` | function | Callback on fetch success |
| `options.onError` | function | Callback on fetch error |

### Return Values
```javascript
{
  data,             // Array of current page items
  loading,          // Boolean - true while fetching
  error,            // Error message or null
  currentPage,      // Current page number
  totalPages,       // Total number of pages
  goToPage,         // Go to specific page: goToPage(pageNumber)
  nextPage,         // Go to next page
  prevPage,         // Go to previous page
  refetch,          // Refetch current page
  pageSize,         // Current page size
  setPageSize,      // Change page size: setPageSize(newSize)
}
```

---

## 4. API Configuration

### Purpose
Centralized API endpoint management and helper functions for consistent API handling.

### Import
```javascript
import { API_ENDPOINTS, getAuthToken, getBackofficeId, getAuthHeaders } from '@/config/apiConfig';
```

### API Endpoints
```javascript
import { API_ENDPOINTS } from '@/config/apiConfig';

// Usage examples:
const aboutUrl = API_ENDPOINTS.ABOUT_CONTENT(backofficeId);
const productsUrl = API_ENDPOINTS.PRODUCTS;
const categoryUrl = API_ENDPOINTS.CATEGORY(id);
```

### Available Endpoints
```javascript
// About Page
API_ENDPOINTS.ABOUT_CONTENT(backofficeId)
API_ENDPOINTS.ABOUT_CONTENT_UPSERT(backofficeId)

// Categories
API_ENDPOINTS.CATEGORIES
API_ENDPOINTS.CATEGORY(id)
API_ENDPOINTS.CATEGORY_PRODUCTS(categoryId)

// Products
API_ENDPOINTS.PRODUCTS
API_ENDPOINTS.PRODUCT(id)

// Contact
API_ENDPOINTS.CONTACT_CONTENT(backofficeId)
API_ENDPOINTS.CONTACT_SUBMISSIONS

// FAQ
API_ENDPOINTS.FAQS
API_ENDPOINTS.FAQ_PAGE_CONTENT(backofficeId)

// And more...
```

### Helper Functions

#### `getAuthToken()`
Returns the authentication token from localStorage.

```javascript
const token = getAuthToken();
```

#### `getBackofficeId()`
Returns the backoffice ID from localStorage.

```javascript
const backofficeId = getBackofficeId();
```

#### `getAuthHeaders()`
Returns headers object with Authorization if token exists.

```javascript
const headers = getAuthHeaders();
// Returns: { 'Content-Type': 'application/json', 'Authorization': 'Bearer <token>' }
```

---

## Refactoring Guide

### Before (Without Hooks)
```javascript
const About = () => {
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [formData, setFormData] = React.useState({...});

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/about-page-content/${backofficeId}/content`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const result = await response.json();
        if (result.success && result.data) {
          setFormData(result.data);
        }
      } catch (error) {
        toast.error('Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [backofficeId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/about-page-content/${backofficeId}/content/upsert`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success('Saved!');
      }
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ... 400+ lines of JSX
};
```

### After (With Hooks)
```javascript
const About = () => {
  const backofficeId = localStorage.getItem('backofficeId') || '1';

  const { data: fetchedContent, loading } = useFetch(
    `http://localhost:3000/api/about-page-content/${backofficeId}/content`,
    { immediate: true }
  );

  const { formData, handleChange, handleSubmit, loading: saving } = useForm(
    fetchedContent || {},
    async (data) => {
      const response = await fetch(
        `http://localhost:3000/api/about-page-content/${backofficeId}/content/upsert`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result;
    }
  );

  if (loading) return <LoadingSpinner />;

  // ... 250+ lines of JSX (150+ lines saved!)
};
```

---

## Best Practices

### 1. Use API_ENDPOINTS for all URLs
```javascript
// ❌ Bad
const url = `http://localhost:3000/api/products/${id}`;

// ✅ Good
import { API_ENDPOINTS } from '@/config/apiConfig';
const url = API_ENDPOINTS.PRODUCT(id);
```

### 2. Combine hooks for complex forms
```javascript
// ✅ Good - Form with fetched initial data
const { data: initialData } = useFetch(url);
const { formData, handleChange, handleSubmit } = useForm(
  initialData || defaultState,
  submitHandler
);
```

### 3. Always provide error UI
```javascript
// ✅ Good
const { data, loading, error } = useFetch(url);

if (error) return <ErrorMessage message={error} />;
```

### 4. Use callbacks for side effects
```javascript
// ✅ Good
const { data, loading } = useFetch(url, {
  onSuccess: (data) => {
    // Do something after successful fetch
  },
  onError: (error) => {
    // Handle error
  },
});
```

---

## File Structure
```
src/
├── hooks/
│   ├── index.js                 (exports all hooks)
│   ├── useFetch.js             (API fetching)
│   ├── useForm.js              (Form management)
│   ├── usePaginatedFetch.js    (Paginated requests)
│   ├── use-mobile.js           (existing)
│   └── REFACTORING_EXAMPLE.md  (usage examples)
├── config/
│   ├── apiConfig.js            (API endpoints & helpers)
│   └── ...
└── pages/
    └── BackOffice/
        ├── About.jsx
        ├── Products.jsx
        ├── Categories.jsx
        └── ... (to be refactored)
```

---

## Migration Checklist

To refactor your existing components:

- [ ] Import needed hooks: `import { useFetch, useForm } from '@/hooks';`
- [ ] Replace `fetch()` calls with `useFetch()` hook
- [ ] Replace form state with `useForm()` hook
- [ ] Remove manual token retrieval (hooks handle it)
- [ ] Remove manual toast handling (hooks handle it)
- [ ] Test all functionality
- [ ] Remove old state management code

---

## FAQ

**Q: Do the hooks handle authentication?**
A: Yes, `useFetch` and `usePaginatedFetch` automatically add the `Authorization` header using the token from localStorage.

**Q: Can I use multiple hooks in one component?**
A: Absolutely! Many components will use both `useFetch` and `useForm` together.

**Q: What if I need custom headers?**
A: Pass them in the options: `useFetch(url, { headers: { 'X-Custom': 'value' } })`

**Q: How do I handle errors?**
A: Use the `error` return value or the `onError` callback in options.

**Q: Can I disable automatic toasts?**
A: Yes, pass `{ showToast: false }` in options.

**Q: How do I refetch data manually?**
A: Use the `refetch()` function returned by the hook.

---

For more examples, see `REFACTORING_EXAMPLE.md` in the hooks folder.
