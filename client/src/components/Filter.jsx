import React from "react";

const Filter = ({ maxPrice, setMaxPrice }) => {
  return (
    <div className="h-full w-80 flex flex-col gap-4 items-center border border-gray-400 rounded-md">
      <input
        type="number"
        placeholder="Max Price"
        className="m-5 w-60 h-8 p-2 border border-gray-400 rounded-lg"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={() => setMaxPrice(maxPrice)} // ✅ keeps current value
          className="px-4 py-1 bg-blue-500 text-white rounded-lg"
        >
          Apply Filter
        </button>

        <button
          onClick={() => setMaxPrice("")}
          className="px-4 py-1 bg-gray-500 text-white rounded-lg"
        >
          Clear
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Current Max: {maxPrice ? `₹${maxPrice}` : "—"}
      </p>
    </div>
  );
};

export default Filter;
