import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-6 px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Svee UI. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="/privacy" className="hover:text-gray-300 mx-2">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-300 mx-2">Terms of Service</a>
          <a href="/contact" className="hover:text-gray-300 mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
