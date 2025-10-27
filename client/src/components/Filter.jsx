// Filter.jsx
import React, { useState } from "react";
import Searchbar from "./Searchbar";

const Filter = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(localFilters); // ✅ send filters to parent
  };

  const clearFilters = () => {
    const cleared = { name: "", maxPrice: "", minRating: "" };
    setLocalFilters(cleared);
    setFilters(cleared);
  };

  return (
    <div className="h-full w-80 flex flex-col gap-4 items-center border border-gray-400 rounded-md p-4">

      {/* Name Filter */}
      <input
        type="text"
        placeholder="Search by Name"
        className="w-60 h-8 p-2 border border-gray-400 rounded-lg"
        value={localFilters.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      {/* Price Filter */}
      <input
        type="number"
        placeholder="Max Price"
        className="w-60 h-8 p-2 border border-gray-400 rounded-lg"
        value={localFilters.maxPrice}
        onChange={(e) => handleChange("maxPrice", e.target.value)}
      />

      {/* Rating Filter */}
      <input
        type="number"
        min="1"
        max="5"
        step="0.1"
        placeholder="Min Rating"
        className="w-60 h-8 p-2 border border-gray-400 rounded-lg"
        value={localFilters.minRating}
        onChange={(e) => handleChange("minRating", e.target.value)}
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={applyFilters}
          className="px-4 py-1 bg-blue-500 text-white rounded-lg"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-1 bg-gray-500 text-white rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* Show Current Filters */}
      <p className="text-sm text-gray-600 text-center">
        {localFilters.name && <>Name: <span className="font-medium">{localFilters.name}</span><br/></>}
        {localFilters.maxPrice && <>Max Price: ₹{localFilters.maxPrice}<br/></>}
        {localFilters.minRating && <>Min Rating: ⭐{localFilters.minRating}</>}
        {!(localFilters.name || localFilters.maxPrice || localFilters.minRating) && "No filters applied"}
      </p>
      
    </div>
  );
};

export default Filter;
