import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'; // Outlet renders the child route (Dashboard content)
import { AuthContext } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If not logged in, force redirect to Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Static width */}
      <Sidebar userRole={currentUser.role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default MainLayout;