import React from 'react';
import { Link } from 'react-router-dom'; // For routing

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">Svee UI</Link>
        </div>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </nav>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
