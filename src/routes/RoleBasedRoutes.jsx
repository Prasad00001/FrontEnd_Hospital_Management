import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleBasedRoutes = ({ allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="p-10 text-center">Checking permissions...</div>;
  }

  // 1. If not logged in, send to Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. If Role is not allowed, show Access Denied
  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-10">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied 🚫</h1>
        <p className="text-gray-600 text-lg">
          You do not have permission to view this page.
        </p>
        <p className="text-gray-500 mt-2">
          Current Role: <span className="font-bold uppercase">{currentUser.role}</span>
        </p>
      </div>
    );
  }

  // 3. Authorized
  return <Outlet />;
};

// THIS LINE WAS LIKELY MISSING OR BROKEN:
export default RoleBasedRoutes;