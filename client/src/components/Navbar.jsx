import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
  { name: "Partners", path: "/partners" }
];

const Navbar = () => { // <-- ✅ Function component starts here
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <nav
      className={`fixed top-0 left-0 bg-gray-950 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "shadow-md text-white-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={"navlogo.png"}
          alt="logo"
          className={`h-9 filter grayscale`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={i}
                to={link.path}
                className={`group flex flex-col gap-0.5 ${
                  isScrolled ? "text-white" : "text-white"
                } ${isActive ? "font-semibold" : ""}`}
              >
                {link.name}
                <div
                  className={`${
                    isScrolled ? "bg-white" : "bg-white"
                  } h-0.5 ${isActive ? "w-full" : "w-0 group-hover:w-full"} transition-all duration-300`}
                />
              </Link>
            );
          })}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <svg
          className="h-6 w-6 text-white transition-all duration-500 cursor-pointer"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Wishlist" labelIcon={'♡'} onClick={() => navigate('/wishlist')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`cursor-pointer px-8 py-2.5 rounded-full ml-4 transition-all duration-500 
                        ${isScrolled 
                          ? "text-black bg-gradient-to-tl from-gray-300 via-gray-200 to-gray-100" 
                          : "bg-gradient-to-br from-gray-500 via-gray-300 to-white text-black"}`}
          >
            Login
          </button>

        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-6 w-6 cursor-pointer"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-blue-500"
          >
            {link.name}
          </Link>
        ))}

        <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
          New Launch
        </button>

        <button
          onClick={openSignIn}
          className="cursor-pointer bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar; // ✅ End of component
