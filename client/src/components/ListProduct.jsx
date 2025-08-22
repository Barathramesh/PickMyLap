import React from "react";
import Card from "./Card";

export default function ListProduct({ laptops }) {
  if (!laptops.length) {
    return (
      <div className="w-full p-10 text-center text-gray-600">
        No products match your filters.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 p-4">
      {laptops.map((laptop) => (
        <Card
          key={laptop.id}
          name={laptop.name}
          rating={laptop.rating.toFixed(1)}
          price={laptop.price}
          image={laptop.image}
        />
      ))}
    </div>
  );
}
