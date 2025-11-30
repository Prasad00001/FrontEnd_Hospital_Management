import apiClient from './axios.config';

const register = async (hospitalData) => {
  try {
    // Backend expects specific fields. We map them here if needed.
    const payload = {
      hospitalName: hospitalData.hospitalName,
      // Create a URL-friendly ID (e.g., "Apollo Hospital" -> "apollo-hospital-123")
      tenantId: hospitalData.hospitalName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000),
      adminEmail: hospitalData.adminEmail,
      adminPassword: hospitalData.adminPassword,
      contactNumber: hospitalData.contactNumber,
      address: hospitalData.addressLine1 + ', ' + hospitalData.city
    };

    const response = await apiClient.post('/master/register', payload);
    return response.data;
  } catch (error) {
    // Throw the error message from backend so the form can display it
    throw error.response && error.response.data 
      ? error.response.data 
      : { message: error.message };
  }
};

export default {
  register
};