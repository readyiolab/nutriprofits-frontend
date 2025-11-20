import axios from 'axios';

// Get API base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/backoffice/login';
    }
    return Promise.reject(error);
  }
);

// ========== CATEGORY API CALLS ==========

export const categoryAPI = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/backoffice/product-categories/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (categoryId) => {
    try {
      const response = await apiClient.get(`/backoffice/product-categories/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  // Create new category
  createCategory: async (categoryData) => {
    try {
      const response = await apiClient.post('/backoffice/product-categories/categories', {
        category_name: categoryData.name,
        category_description: categoryData.description,
        category_image: categoryData.image,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update category
  updateCategory: async (categoryId, categoryData) => {
    try {     const response = await apiClient.put(`/backoffice/product-categories/categories/${categoryId}`, {
        category_name: categoryData.name,
        category_description: categoryData.description,
        category_image: categoryData.image,
        status: categoryData.status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (categoryId) => {
    try {
      const response = await apiClient.delete(`/backoffice/product-categories/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
};

// ========== PRODUCT API CALLS ==========

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/backoffice/product-categories/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await apiClient.get(`/backoffice/product-categories/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get(`/backoffice/product-categories/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post('/backoffice/product-categories/products', {
        product_name: productData.name,
        product_price: productData.price,
        category_id: productData.categoryId,
        product_description: productData.description,
        full_description: productData.fullDescription,
        highlights: productData.highlights,
        benefits: productData.benefits,
        ingredients: productData.ingredients,
        product_image: productData.image,
        logo_url: productData.logoUrl,
        stock_quantity: productData.stock,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      const response = await apiClient.put(`/backoffice/product-categories/products/${productId}`, {
        product_name: productData.name,
        product_price: productData.price,
        category_id: productData.categoryId,
        product_description: productData.description,
        full_description: productData.fullDescription,
        highlights: productData.highlights,
        benefits: productData.benefits,
        ingredients: productData.ingredients,
        product_image: productData.image,
        logo_url: productData.logoUrl,
        stock_quantity: productData.stock,
        status: productData.status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const response = await apiClient.delete(`/backoffice/product-categories/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

export default apiClient;
