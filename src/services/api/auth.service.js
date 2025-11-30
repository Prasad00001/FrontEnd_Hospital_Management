import apiClient from './axios.config';

const login = async (email, password, tenantId) => {
  // 1. Store Tenant ID temporarily so axios interceptor can pick it up
  if (tenantId) {
    localStorage.setItem('tenantId', tenantId);
  }

  try {
    // 2. Make the API Call
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data; 
  } catch (error) {
    // If login fails, remove the potentially wrong tenantId
    localStorage.removeItem('tenantId');
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('tenantId');
  window.location.href = '/login';
};

export default {
  login,
  logout,
};