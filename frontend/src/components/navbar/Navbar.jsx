import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

const Navbar = ({ authUser, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-primary text-text py-4 px-8 w-full z-10 top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex space-x-2">
          <img src="/icon.png" alt="NebulaNet Logo" className="h-10 w-auto" />
          <Link to="/" className="text-text">NebulaNet</Link>
        </div>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center bg-secondary rounded-full w-1/3 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border-none outline-none bg-background text-text focus:ring-2 focus:ring-accent"
          />
          <button type="submit" className="px-4 py-2 text-accent">
            <BiSearch className="w-5 h-5" />
          </button>
        </form>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-text text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-accent flex items-center space-x-2">
            <FaHome className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {authUser && (
            <div className="relative">
              {/* Button to toggle the dropdown */}
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={authUser.profileImg || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-borderColor"
                />
                <span className="text-text font-semibold">{authUser.username}</span>
                <IoMdArrowDropdown className="w-5 h-5 text-text" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg transition-all duration-300">
                  <Link
                    to={`/profile/${authUser.username}`}
                    className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg transition-colors duration-200 font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-b-lg transition-colors duration-200 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-20 flex flex-col items-center p-6">
            <button
              onClick={toggleMobileMenu}
              className="self-end text-2xl text-text mb-4 focus:outline-none"
            >
              ×
            </button>
            {/* <form onSubmit={handleSearchSubmit} className="flex items-center bg-secondary rounded-full w-full max-w-md mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border-none outline-none bg-background text-text focus:ring-2 focus:ring-accent"
              />
              <button type="submit" className="px-4 py-2 text-accent">
                <BiSearch className="w-5 h-5" />
              </button>
            </form> */}
            <Link to="/" className="hover:text-accent flex items-center space-x-2 text-xl mb-4">
              <FaHome className="w-5 h-5" />
              <span>Home</span>
            </Link>



            {authUser && (
              <>
                <Link to={`/profile/${authUser.username}`} className="hover:text-accent flex items-center space-x-2 text-xl mb-4">
                  <img src={authUser.profileImg || "https://via.placeholder.com/40"} alt="User Profile" className="w-10 h-10 rounded-full border-2 border-borderColor" />
                  <span>{authUser.username}</span>
                </Link>
                <button className="text-accent text-xl mb-4" onClick={() => { setMobileMenuOpen(false); onLogout(); }}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
