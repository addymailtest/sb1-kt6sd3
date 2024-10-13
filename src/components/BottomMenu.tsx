import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BottomMenu: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:hidden">
      <ul className="flex justify-around items-center">
        <li>
          <Link
            to="/"
            className={`flex flex-col items-center ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={`flex flex-col items-center ${
              location.pathname === '/dashboard'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <BarChart2 size={24} />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
        </li>
        <li>
          <a
            onClick={() => logout()}
            className={`flex flex-col items-center ${
              location.pathname === '/profile'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default BottomMenu;
