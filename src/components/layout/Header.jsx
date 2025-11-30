import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, Bell, Menu, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6 sticky top-0 z-10">
      <button className="p-2 rounded-md hover:bg-gray-100 lg:hidden text-gray-600">
        <Menu size={24} />
      </button>

      <div className="flex items-center space-x-4 ml-auto">
        <button className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <div className="flex items-center gap-3">
          {/* Connected Profile Link */}
          <Link to="/dashboard/profile" className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors">
            <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
               <User size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {currentUser?.name || 'User'}
            </span>
          </Link>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;