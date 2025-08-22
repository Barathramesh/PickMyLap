// ProductsPage.jsx
import React, { useMemo, useState } from "react";
import { laptops } from "../components/LaptopData";
import Filter from "../components/Filter";
import ListProduct from "../components/ListProduct";
import Footer from "../components/Footer";


export default function ProductsPage() {
  const [maxPrice, setMaxPrice] = useState("");

  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      if (maxPrice && laptop.price > maxPrice) return false;
      return true;
    });
  }, [maxPrice]);

  return (
    <div className="flex flex-col min-h-screen"> {/* ✅ make page full height */}
      
      {/* Content area */}
      <div className="flex flex-1">
        <div className="w-1/4 border-r border-gray-400 p-4">
          <Filter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
        </div>
        <div className="flex-1">
          <ListProduct laptops={filteredLaptops} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
