import axios from 'axios';

// Ensure this matches your backend URL
const MAIN_API_URL = 'http://localhost:5000/api'; 

const apiClient = axios.create({
  baseURL: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- REQUEST INTERCEPTOR ---
// This runs BEFORE every request is sent
apiClient.interceptors.request.use(
  (config) => {
    // 1. Attach JWT Token (for Authentication)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 2. Attach Tenant ID (for Database Selection)
    // This is the specific fix for your error
    const tenantId = localStorage.getItem('tenantId');
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
// This runs AFTER every response is received
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized (Token expired or invalid)
    if (error.response && error.response.status === 401) {
      localStorage.clear(); // Clear all data
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;