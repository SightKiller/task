
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="bg-gray-800 text-white">
    <div className="container mx-auto flex justify-between items-center p-4">
      <div className="text-lg font-semibold">
        <a href="/" className="hover:text-gray-300"></a>
      </div>
      <nav>
        <ul className="flex space-x-20">
          <li><Link to="/admin" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/employee_list" className="hover:text-gray-300">Employee List</Link></li>
          <li><Link to="#" className="hover:text-gray-300">Hukum Gupta</Link></li>
          <li><Link to="/" className="hover:text-gray-300">Logout</Link></li>
        </ul>
      </nav>
    </div>
  </header>
  );
};

export default Header;
