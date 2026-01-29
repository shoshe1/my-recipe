import axios from 'axios';

// Base URL for API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// ============================================
// RECIPES API
// ============================================

export const recipesAPI = {
  // Get all user recipes
  getAll: async () => {
    const response = await api.get('/recipes');
    return response.data;
  },

  // Get single recipe
  getById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  // Create new recipe
  create: async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  },

  // Update recipe
  update: async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData);
    return response.data;
  },

  // Delete recipe
  delete: async (id) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  }
};

// ============================================
// FAVORITES API
// ============================================

export const favoritesAPI = {
  // Get all favorites
  getAll: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },

  // Toggle favorite
  toggle: async (recipe) => {
    const response = await api.post('/favorites/toggle', { recipe });
    return response.data;
  },

  // Check if favorited
  check: async (recipeId) => {
    const response = await api.get(`/favorites/check/${recipeId}`);
    return response.data;
  },

  // Remove favorite
  remove: async (recipeId) => {
    const response = await api.delete(`/favorites/${recipeId}`);
    return response.data;
  },

  // Clear all favorites
  clearAll: async () => {
    const response = await api.delete('/favorites');
    return response.data;
  }
};

export default api;