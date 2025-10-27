import React from "react";
import { Link } from "react-router-dom";
import LongCard from "./LongCard";

export default function ListProduct({ laptops }) {
  if (!laptops.length) {
    return (
      <div className="w-full p-10 text-center text-gray-600">
        No products match your filters.
      </div>
    );
  }

  return (
    <div className="w-full gap-4 bg-gray-100 p-4">
      {laptops.map((laptop) => (
       <Link
  to={`/product/${laptop.id}`}   // ✅ pass laptop id
  key={laptop.id}
  className="block hover:opacity-90 transition"
>

          <LongCard
            name={laptop.name}
            rating={laptop.rating.toFixed(1)}
            price={laptop.price}
            image={laptop.image}
            processor={laptop.processor}
            ram={laptop.ram}
            storage={laptop.storage}
            display={laptop.display}
            os={laptop.os}
            warrantyYears={laptop.warrantyYears}
            mrp={laptop.mrp}
          />
        </Link>
      ))}
    </div>
  );
}
  