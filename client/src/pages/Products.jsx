
import React, { useMemo, useState } from "react";
import { laptops } from "../components/LaptopData";
import Filter from "../components/Filter";
import ListProduct from "../components/ListProduct";
import Footer from "../components/Footer";
import LongCard from "../components/LongCard";
import Searchbar from "../components/Searchbar";
import ChatbotSpace from "../components/ChatbotSpace";

export default function ProductsPage() {
  // ✅ one state object for all filters
  const [filters, setFilters] = useState({
    name: "",
    maxPrice: "",
    minRating: "",
  });

  // ✅ filtering logic
  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      if (
        filters.name &&
        !laptop.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }
      if (filters.maxPrice && laptop.price > Number(filters.maxPrice)) {
        return false;
      }
      if (filters.minRating && laptop.rating < Number(filters.minRating)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content area */}
      <div className="flex flex-1">
        <div className="w-1/4 border-r border-gray-400 p-4">
          <Filter filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex-1">
          <div className="mt-5"><Searchbar/></div>
          
          <ListProduct laptops={filteredLaptops} />
        </div>
      </div>
      <ChatbotSpace/>
      <Footer />
    </div>
  );
}
