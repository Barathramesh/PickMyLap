import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import NormalSearch from "./NormalSearch";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click for search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 bg-gray-950 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled ? "shadow-md py-3 md:py-4" : "py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={"navlogo.png"} alt="logo" className="h-9 filter grayscale" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={i}
                to={link.path}
                className={`group flex flex-col gap-0.5 text-lg ${
                  isActive
                    ? "font-semibold bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent"
                    : "text-white"
                } hover:bg-gradient-to-br hover:from-cyan-400 hover:via-violet-400 hover:to-pink-500 hover:bg-clip-text hover:text-transparent transition-all duration-300`}
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

        {/* Desktop Search + Login */}
        <div className="flex items-center gap-4">
          {/* Only show Search Icon if search bar is closed */}
          {!isSearchOpen && (
            <div className="hidden md:flex items-center mr-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-800 transition"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/ffffff/search.png"
                  alt="search"
                  className="h-5 w-5"
                />
              </button>
            </div>
          )}

          {/* NormalSearch only if search is open */}
          {isSearchOpen && (
            <div ref={searchRef}>
              <NormalSearch />
            </div>
          )}

          {/* Login button */}
          <div className="hidden md:flex">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="cursor-pointer px-8 py-2.5 rounded-full active:scale-95 transition-all duration-500 bg-gradient-to-br from-cyan-200 via-violet-500 to-pink-500 text-white"
            >
              Login
            </button>
          </div>
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
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
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
              className="font-semibold bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent"
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => setIsLoginOpen(true)}
            className="cursor-pointer px-8 py-2.5 rounded-full transition-all duration-500 bg-gradient-to-br from-cyan-200 via-violet-500 to-pink-500 text-white"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
