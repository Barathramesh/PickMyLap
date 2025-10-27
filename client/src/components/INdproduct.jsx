import React from "react";
import { useParams } from "react-router-dom";
import { laptops } from "./LaptopData"; // ✅ adjust path if needed
import Footer from "./Footer";

const INdproduct = () => {
  const { id } = useParams(); // Get the product id from URL
  const laptop = laptops.find((item) => item.id === id); // Find the matching laptop

  if (!laptop) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <div className="flex flex-grow w-full bg-white py-10 px-16">
        {/* Left Section: Images */}
        <div className="flex flex-col gap-10">
          <div className="flex">
            <div className="flex flex-col items-center gap-3 w-[90px] mr-5">
              {Array(6)
                .fill(laptop.image)
                .map((src, i) => (
                  <div
                    key={i}
                    className="w-[70px] h-[70px] flex items-center justify-center overflow-hidden rounded-md border border-gray-300 cursor-pointer hover:border-blue-500 transition"
                  >
                    <img src={src} alt="Thumbnail" className="w-full h-13 object-cover" />
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-center w-[500px] h-[550px] border border-gray-300">
              <img
                src={laptop.image}
                alt={laptop.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Price Check Section */}
          <div className="primary flex flex-col gap-4 p-4 bg-gray-50 rounded-2xl shadow-md w-xl mx-auto">
            <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition gap-20">
              <div className="flex items-center gap-3">
                <img
                  src="https://img.icons8.com/?size=100&id=UU2im0hihoyi&format=png&color=000000"
                  alt="Flipkart"
                  className="w-10 h-10"
                />
                <span className="text-gray-800 font-medium">Flipkart</span>
              </div>
              <span className="text-green-600 font-semibold">₹95999</span>
            </div>

            <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://img.icons8.com/?size=100&id=67j6ReSm130J&format=png&color=000000"
                  alt="Amazon"
                  className="w-10 h-10"
                />
                <span className="text-gray-800 font-medium">Amazon</span>
              </div>
              <span className="text-green-600 font-semibold">₹94999</span>
            </div>

            <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/5/54/JioMart_logo.svg"
                  alt="JioMart"
                  className="w-9 h-9 object-contain"
                />
                <span className="text-gray-800 font-medium">JioMart</span>
              </div>
              <span className="text-green-600 font-semibold">₹94990</span>
            </div>
          </div>

          <div className="flex gap-10 items-center justify-center">
            <button className="mt-5 primary text-white h-12 w-56 px-4 rounded active:scale-95 transition cursor-pointer">
              Compare Product
            </button>
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="flex-1 ml-10 text-gray-800">
          <h1 className="text-3xl font-bold">{laptop.name}</h1>
          <p className="text-gray-500 text-base mb-2">
            {laptop.series} Series | {laptop.os}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="primary text-white text-base px-3 py-1 rounded-md">
              {laptop.rating} ★
            </div>
            <p className="text-gray-500 text-sm">(1,245 Ratings & 210 Reviews)</p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex gap-5">
              <h2 className="text-4xl font-semibold text-gray-800">
                ₹{laptop.price.toLocaleString()}
              </h2>
            </div>
            <p className="text-gray-500 text-base mt-1">
              <span className="line-through mr-2 text-gray-400">
                ₹{(laptop.price * 1.25).toLocaleString()}
              </span>
              <span className="text-green-600 font-semibold">20% off</span>
            </p>
          </div>

          {/* Highlights */}
          <div className="border-t border-b border-gray-200 py-3 mb-6">
            <h3 className="font-semibold mb-2 text-xl">Key Highlights</h3>
            <ul className="list-disc ml-5 text-base space-y-1">
              <li className="text-green-600">{laptop.processor.model} Processor</li>
              <li className="text-green-600">{laptop.display.panel} Display</li>
              <li>Ultra lightweight design — only {laptop.weightKg} kg</li>
              <li className="text-green-600">High-speed {laptop.ram.type} RAM</li>
              <li className="text-green-600">
                {laptop.connectivity.wifi} & Bluetooth {laptop.connectivity.bluetooth}
              </li>
            </ul>
          </div>

          {/* Detailed Specs */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl">Display</h3>
              <ul className="list-none text-base mt-2 space-y-1">
                <li>Size: {laptop.display.sizeInches}"</li>
                <li className="text-green-600">Panel: {laptop.display.panel}</li>
                <li>Resolution: {laptop.display.resolution}</li>
                <li>Aspect Ratio: {laptop.display.aspect}</li>
                <li>Refresh Rate: {laptop.display.refreshHz}Hz</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Processor</h3>
              <ul className="list-none text-base mt-2 space-y-1">
                <li>Brand: {laptop.processor.brand}</li>
                <li>Model: {laptop.processor.model}</li>
                <li>Cores: {laptop.processor.cores}</li>
                <li>Threads: {laptop.processor.threads}</li>
                <li>Base Clock: {laptop.processor.baseClock}</li>
                <li className="text-green-600">Boost Clock: {laptop.processor.boostClock}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Memory & Storage</h3>
              <ul className="list-none text-base mt-2 space-y-1">
                <li className="text-green-600">
                  RAM: {laptop.ram.sizeGB}GB {laptop.ram.type}
                </li>
                <li>Speed: {laptop.ram.speedMHz}MHz</li>
                <li>
                  Storage: {laptop.storage[0].sizeGB}GB {laptop.storage[0].type}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Graphics</h3>
              <ul className="list-none text-base mt-2 space-y-1">
                <li>Type: {laptop.graphics.type}</li>
                <li className="text-green-600">Model: {laptop.graphics.model}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Battery</h3>
              <ul className="list-none text-base mt-2 space-y-1">
                <li>Capacity: {laptop.battery.capacityWh}Wh</li>
                <li>Backup: {laptop.battery.claimedHours}</li>
                {laptop.battery.fastCharge && <li className="text-green-600">⚡ Fast Charging Supported</li>}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Connectivity & Ports</h3>
              <ul className="list-none text-base mt-2 space-y-1">
                <li>Wi-Fi: {laptop.connectivity.wifi}</li>
                <li>Bluetooth: {laptop.connectivity.bluetooth}</li>
                {laptop.ports.map((port, i) => (
                  <li key={i}>{port}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Additional Info</h3>
              <ul className="list-none text-base mt-2 space-y-1">
                <li>OS: {laptop.os}</li>
                <li>Weight: {laptop.weightKg} kg</li>
                <li>Warranty: {laptop.warrantyYears} Year</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default INdproduct;
