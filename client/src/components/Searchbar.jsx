import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '../assets/ai.png';

const Searchbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const inputvalues = ['Gaming', 'Business', 'Editing', 'Battery', 'Casual']; // static list
  const [searchText, setSearchText] = useState("");

  // Collapse when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="flex justify-center mt-20 px-4 py-6 mb-20 transition-all duration-500 relative"
      ref={wrapperRef}
    >
      <div
        className={`w-full max-w-2xl bg-white border border-gray-300 rounded-2xl flex flex-col px-4 shadow-md overflow-hidden transition-all duration-300 ${
          isFocused ? 'h-48' : 'h-12'
        }`}
        onClick={() => setIsFocused(true)}
      >
        <div className="flex items-center h-12">
          <input
            type="text"
            placeholder="Search for laptops, models, or specs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 px-2"
          />
          <img
            src={SearchIcon}
            alt="search"
            className="w-5 h-5 ml-2 opacity-100 cursor-pointer"
          />
        </div>

        {isFocused && (
          <div className="mt-2 px-1 text-gray-900 text-sm">
            <div className="flex flex-wrap gap-2 mt-20.5 align-end">
              {inputvalues.map((value, index) => (
                <div
                  key={index}
                  className="py-2 px-4 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
