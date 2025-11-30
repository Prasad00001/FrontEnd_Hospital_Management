import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/api/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for saved user on load with Safety Check
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedUser !== "undefined") {
      try {
        const user = JSON.parse(storedUser);
        if (user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("Corrupt user data found in storage. Clearing...", err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password, tenantId) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Call Backend
      const response = await authService.login(email, password, tenantId);
      
      // 2. Extract Data 
      // Backend response structure: { success: true, data: { name, role, token... } }
      const userData = response.data;

      // 3. Save to Local Storage (Safe check)
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        setCurrentUser(userData);
        return userData;
      } else {
        throw new Error("Invalid response from server");
      }

    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tenantId');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};