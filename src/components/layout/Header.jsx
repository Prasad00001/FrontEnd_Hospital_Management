import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left side (Mobile toggle placeholder) */}
      <button className="p-2 rounded-md hover:bg-gray-100 lg:hidden text-gray-600">
        <Menu size={24} />
      </button>

      {/* Right side icons */}
      <div className="flex items-center space-x-4 ml-auto">
        <button className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {currentUser?.name || 'Dr. Deshmukh'}
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;