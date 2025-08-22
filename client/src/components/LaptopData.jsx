// LaptopData.jsx
// A self-contained React component that defines:
// 1) A Set of laptop attribute names
// 2) An array of laptop objects with rich specs
// 3) A small demo UI to render them (you can also just import the data elsewhere)

import React from "react";

/**
 * A Set of attribute names you might care about across laptops.
 * Use this to drive filters, table columns, etc.
 */
export const laptopAttributes = new Set([
  "id",
  "name",
  "brand",
  "series",
  "price",
  "rating",
  "processor",
  "ram",
  "storage",
  "graphics",
  "display",
  "battery",
  "weightKg",
  "os",
  "ports",
  "connectivity",
  "warrantyYears",
]);

/**
 * @typedef {Object} Processor
 * @property {string} brand        // e.g., Intel, AMD, Apple
 * @property {string} model        // e.g., Core i5-1240P, Ryzen 7 7840U
 * @property {number} [cores]
 * @property {number} [threads]
 * @property {string} [baseClock]  // e.g., "2.0 GHz"
 * @property {string} [boostClock] // e.g., "4.7 GHz"
 *
 * @typedef {Object} RAM
 * @property {number} sizeGB
 * @property {string} type         // DDR4, DDR5, LPDDR5, etc.
 * @property {number} [speedMHz]
 * @property {number} [upgradableToGB]
 *
 * @typedef {Object} StorageItem
 * @property {string} type         // SSD/HDD/NVMe
 * @property {number} sizeGB
 *
 * @typedef {Object} Graphics
 * @property {"integrated"|"dedicated"} type
 * @property {string} model
 * @property {number} [vramGB]
 *
 * @typedef {Object} Display
 * @property {number} sizeInches   // 13.3, 14, 15.6, etc.
 * @property {string} resolution   // "1920x1080", "2560x1600"
 * @property {number} [refreshHz]  // 60, 120, 144...
 * @property {string} [panel]      // IPS, OLED, TN, VA
 * @property {string} [aspect]     // 16:9, 16:10, 3:2
 *
 * @typedef {Object} Battery
 * @property {number} capacityWh
 * @property {string} [claimedHours] // vendor-claimed battery life
 * @property {boolean} [fastCharge]
 *
 * @typedef {Object} Connectivity
 * @property {string} wifi         // e.g., Wi‑Fi 6E
 * @property {string} bluetooth    // e.g., 5.3
 *
 * @typedef {Object} Laptop
 * @property {string} id
 * @property {string} name
 * @property {string} brand
 * @property {string} [series]
 * @property {number} price        // in your preferred currency
 * @property {number} rating       // 0–5
 * @property {Processor} processor
 * @property {RAM} ram
 * @property {StorageItem[]} storage
 * @property {Graphics} graphics
 * @property {Display} display
 * @property {Battery} battery
 * @property {number} weightKg
 * @property {string} os
 * @property {string[]} ports
 * @property {Connectivity} connectivity
 * @property {number} [warrantyYears]
 */

/** @type {Laptop[]} */
export const laptops = [
  {
    id: "lap-001",
    name: "AeroBook 14",
    brand: "Aerion",
    series: "Ultralight",
    price: 64990,
    rating: 4.3,
    processor: {
      brand: "Intel",
      model: "Core i5-1240P",
      cores: 12,
      threads: 16,
      baseClock: "1.7 GHz",
      boostClock: "4.4 GHz",
    },
    ram: { sizeGB: 16, type: "LPDDR5", speedMHz: 5200 },
    storage: [
      { type: "NVMe", sizeGB: 512 }
    ],
    graphics: { type: "integrated", model: "Iris Xe" },
    display: {
      sizeInches: 14,
      resolution: "1920x1200",
      refreshHz: 60,
      panel: "IPS",
      aspect: "16:10",
    },
    battery: { capacityWh: 56, claimedHours: "Up to 10 hrs", fastCharge: true },
    weightKg: 1.28,
    os: "Windows 11 Home",
    ports: ["USB-C (PD)", "USB-A", "HDMI 2.0", "3.5mm"],
    connectivity: { wifi: "Wi‑Fi 6", bluetooth: "5.2" },
    warrantyYears: 1,
  },
  {
    id: "lap-002",
    name: "Creator 15 OLED",
    brand: "Nextron",
    series: "Creator",
    price: 119990,
    rating: 4.6,
    processor: {
      brand: "AMD",
      model: "Ryzen 7 7840HS",
      cores: 8,
      threads: 16,
      baseClock: "3.8 GHz",
      boostClock: "5.1 GHz",
    },
    ram: { sizeGB: 32, type: "DDR5", speedMHz: 5600, upgradableToGB: 64 },
    storage: [
      { type: "NVMe", sizeGB: 1000 }
    ],
    graphics: { type: "dedicated", model: "GeForce RTX 4060", vramGB: 8 },
    display: {
      sizeInches: 15.6,
      resolution: "2880x1800",
      refreshHz: 120,
      panel: "OLED",
      aspect: "16:10",
    },
    battery: { capacityWh: 71, claimedHours: "Up to 8 hrs", fastCharge: true },
    weightKg: 1.79,
    os: "Windows 11 Pro",
    ports: ["Thunderbolt 4", "USB-A", "HDMI 2.1", "SD UHS-II", "3.5mm"],
    connectivity: { wifi: "Wi‑Fi 6E", bluetooth: "5.3" },
    warrantyYears: 2,
  },
  {
    id: "lap-003",
    name: "StudyMate 13",
    brand: "EduTech",
    series: "Student",
    price: 42990,
    rating: 4.1,
    processor: {
      brand: "Intel",
      model: "Core i3-1215U",
      cores: 6,
      threads: 8,
      baseClock: "1.2 GHz",
      boostClock: "4.4 GHz",
    },
    ram: { sizeGB: 8, type: "DDR4", speedMHz: 3200, upgradableToGB: 32 },
    storage: [
      { type: "NVMe", sizeGB: 256 }
    ],
    graphics: { type: "integrated", model: "UHD Graphics" },
    display: {
      sizeInches: 13.3,
      resolution: "1920x1080",
      refreshHz: 60,
      panel: "IPS",
      aspect: "16:9",
    },
    battery: { capacityWh: 45, claimedHours: "Up to 12 hrs" },
    weightKg: 1.2,
    os: "Windows 11 Home",
    ports: ["USB-C", "USB-A", "HDMI 1.4", "3.5mm"],
    connectivity: { wifi: "Wi‑Fi 6", bluetooth: "5.1" },
    warrantyYears: 1,
  },
  {
    id: "lap-004",
    name: "GameForge 16",
    brand: "Forge",
    series: "Gaming",
    price: 149990,
    rating: 4.7,
    processor: {
      brand: "Intel",
      model: "Core i7-13700H",
      cores: 14,
      threads: 20,
      baseClock: "2.4 GHz",
      boostClock: "5.0 GHz",
    },
    ram: { sizeGB: 32, type: "DDR5", speedMHz: 5200, upgradableToGB: 64 },
    storage: [
      { type: "NVMe", sizeGB: 1000 },
      { type: "NVMe", sizeGB: 1000 },
    ],
    graphics: { type: "dedicated", model: "GeForce RTX 4070", vramGB: 8 },
    display: {
      sizeInches: 16,
      resolution: "2560x1600",
      refreshHz: 165,
      panel: "IPS",
      aspect: "16:10",
    },
    battery: { capacityWh: 80, claimedHours: "Up to 6 hrs", fastCharge: true },
    weightKg: 2.25,
    os: "Windows 11 Home",
    ports: ["Thunderbolt 4", "USB-A", "HDMI 2.1", "RJ45", "3.5mm"],
    connectivity: { wifi: "Wi‑Fi 6E", bluetooth: "5.3" },
    warrantyYears: 2,
  },
    {
    id: "lap-005",
    name: "HP Pavilion Aero",
    brand: "HP",
    series: "Pavilion",
    price: 67990,
    rating: 4.5,
    processor: { brand: "AMD", model: "Ryzen 7 5800U", cores: 8, threads: 16, baseClock: "1.9 GHz", boostClock: "4.4 GHz" },
    ram: { sizeGB: 16, type: "DDR4", speedMHz: 3200 },
    storage: [{ type: "NVMe", sizeGB: 512 }],
    graphics: { type: "integrated", model: "Radeon Graphics" },
    display: { sizeInches: 13.3, resolution: "1920x1200", refreshHz: 60, panel: "IPS", aspect: "16:10" },
    battery: { capacityWh: 45, claimedHours: "Up to 10 hrs", fastCharge: true },
    weightKg: 0.97,
    os: "Windows 11 Home",
    ports: ["USB-C", "USB-A", "HDMI", "3.5mm"],
    connectivity: { wifi: "Wi-Fi 6", bluetooth: "5.2" },
    warrantyYears: 1,
  },
  {
    id: "lap-006",
    name: "Lenovo IdeaPad Gaming 3",
    brand: "Lenovo",
    series: "IdeaPad",
    price: 72990,
    rating: 4.2,
    processor: { brand: "Intel", model: "Core i5-12450H", cores: 8, threads: 12, baseClock: "2.0 GHz", boostClock: "4.4 GHz" },
    ram: { sizeGB: 16, type: "DDR5", speedMHz: 4800 },
    storage: [{ type: "NVMe", sizeGB: 512 }],
    graphics: { type: "dedicated", model: "RTX 3050" },
    display: { sizeInches: 15.6, resolution: "1920x1080", refreshHz: 120, panel: "IPS", aspect: "16:9" },
    battery: { capacityWh: 60, claimedHours: "Up to 6 hrs", fastCharge: true },
    weightKg: 2.3,
    os: "Windows 11 Home",
    ports: ["USB-C", "USB-A", "HDMI", "Ethernet", "3.5mm"],
    connectivity: { wifi: "Wi-Fi 6", bluetooth: "5.1" },
    warrantyYears: 1,
  },
  {
    id: "lap-007",
    name: "Apple MacBook Air M2",
    brand: "Apple",
    series: "MacBook Air",
    price: 114900,
    rating: 4.8,
    processor: { brand: "Apple", model: "M2", cores: 8, threads: 8, baseClock: "3.5 GHz", boostClock: "N/A" },
    ram: { sizeGB: 8, type: "Unified", speedMHz: 6400 },
    storage: [{ type: "NVMe", sizeGB: 256 }],
    graphics: { type: "integrated", model: "M2 GPU (8-core)" },
    display: { sizeInches: 13.6, resolution: "2560x1664", refreshHz: 60, panel: "Liquid Retina", aspect: "16:10" },
    battery: { capacityWh: 52, claimedHours: "Up to 15 hrs", fastCharge: true },
    weightKg: 1.24,
    os: "macOS Ventura",
    ports: ["MagSafe 3", "USB-C Thunderbolt 4", "3.5mm"],
    connectivity: { wifi: "Wi-Fi 6", bluetooth: "5.0" },
    warrantyYears: 1,
  },

  // ---- 20 new laptops ----
  {
    id: "lap-008",
    name: "Dell Inspiron 15",
    brand: "Dell",
    series: "Inspiron",
    price: 58990,
    rating: 4.1,
    processor: { brand: "Intel", model: "Core i5-1135G7", cores: 4, threads: 8, baseClock: "2.4 GHz", boostClock: "4.2 GHz" },
    ram: { sizeGB: 8, type: "DDR4", speedMHz: 3200 },
    storage: [{ type: "NVMe", sizeGB: 512 }],
    graphics: { type: "integrated", model: "Iris Xe" },
    display: { sizeInches: 15.6, resolution: "1920x1080", refreshHz: 60, panel: "WVA", aspect: "16:9" },
    battery: { capacityWh: 54, claimedHours: "Up to 8 hrs", fastCharge: true },
    weightKg: 1.85,
    os: "Windows 11 Home",
    ports: ["USB-C", "USB-A", "HDMI", "3.5mm"],
    connectivity: { wifi: "Wi-Fi 6", bluetooth: "5.0" },
    warrantyYears: 1,
  },
  {
    id: "lap-009",
    name: "ASUS TUF Gaming F15",
    brand: "ASUS",
    series: "TUF",
    price: 84990,
    rating: 4.6,
    processor: { brand: "Intel", model: "Core i7-12700H", cores: 14, threads: 20, baseClock: "2.3 GHz", boostClock: "4.7 GHz" },
    ram: { sizeGB: 16, type: "DDR5", speedMHz: 4800 },
    storage: [{ type: "NVMe", sizeGB: 1_024 }],
    graphics: { type: "dedicated", model: "RTX 3060" },
    display: { sizeInches: 15.6, resolution: "1920x1080", refreshHz: 144, panel: "IPS", aspect: "16:9" },
    battery: { capacityWh: 90, claimedHours: "Up to 7 hrs", fastCharge: true },
    weightKg: 2.3,
    os: "Windows 11 Home",
    ports: ["USB-C", "USB-A", "HDMI", "Ethernet", "3.5mm"],
    connectivity: { wifi: "Wi-Fi 6", bluetooth: "5.2" },
    warrantyYears: 1,
  },
  {
    id: "lap-0010",
    name: "MSI Katana GF66",
    brand: "MSI",
    series: "Katana",
    price: 92990,
    rating: 4.4,
    processor: { brand: "Intel", model: "Core i7-11800H", cores: 8, threads: 16, baseClock: "2.3 GHz", boostClock: "4.6 GHz" },
    ram: { sizeGB: 16, type: "DDR4", speedMHz: 3200 },
    storage: [{ type: "NVMe", sizeGB: 512 }],
    graphics: { type: "dedicated", model: "RTX 3050 Ti" },
    display: { sizeInches: 15.6, resolution: "1920x1080", refreshHz: 144, panel: "IPS", aspect: "16:9" },
    battery: { capacityWh: 53, claimedHours: "Up to 5 hrs", fastCharge: false },
    weightKg: 2.25,
    os: "Windows 11 Home",
    ports: ["USB-C", "USB-A", "HDMI", "Ethernet"],
    connectivity: { wifi: "Wi-Fi 6", bluetooth: "5.2" },
    warrantyYears: 2,
  },
  {
    id: "lap-0011",
    name: "Samsung Galaxy Book2 Pro",
    brand: "Samsung",
    series: "Galaxy Book",
    price: 94990,
    rating: 4.7,
    processor: { brand: "Intel", model: "Core i7-1260P", cores: 12, threads: 16, baseClock: "2.1 GHz", boostClock: "4.7 GHz" },
    ram: { sizeGB: 16, type: "LPDDR5", speedMHz: 5200 },
    storage: [{ type: "NVMe", sizeGB: 512 }],
    graphics: { type: "integrated", model: "Iris Xe" },
    display: { sizeInches: 15.6, resolution: "1920x1080", refreshHz: 60, panel: "AMOLED", aspect: "16:9" },
    battery: { capacityWh: 63, claimedHours: "Up to 15 hrs", fastCharge: true },
    weightKg: 1.1,
    os: "Windows 11 Home",
    ports: ["USB-C", "USB-A", "HDMI", "3.5mm"],
    connectivity: { wifi: "Wi-Fi 6E", bluetooth: "5.1" },
    warrantyYears: 1,
  },
];

// ---------- Example usage UI ----------

const SpecRow = ({ label, value }) => (
  <div className="flex gap-3 text-sm">
    <span className="w-28 shrink-0 text-gray-500">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default function LaptopCatalog() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Laptop Catalog</h1>
      <p className="text-gray-600 mb-6">
        This file exports <code>laptopAttributes</code> (a <code>Set</code> of field names) and
        <code> laptops</code> (sample data). You can import them in any component, or use this demo list below.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {laptops.map((l) => (
          <article key={l.id} className="rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <header className="mb-3">
              <div className="text-xs text-gray-500">{l.brand} {l.series ? `• ${l.series}` : ""}</div>
              <h2 className="text-lg font-semibold leading-tight">{l.name}</h2>
              <div className="flex items-center justify-between mt-1">
                <div className="text-sm">⭐ {l.rating.toFixed(1)}</div>
                <div className="text-base font-bold">₹{l.price.toLocaleString()}</div>
              </div>
            </header>

            <div className="space-y-1.5">
              <SpecRow label="Processor" value={`${l.processor.brand} ${l.processor.model}`} />
              <SpecRow label="RAM" value={`${l.ram.sizeGB}GB ${l.ram.type}${l.ram.speedMHz ? ` ${l.ram.speedMHz}MHz` : ""}`} />
              <SpecRow label="Storage" value={l.storage.map((s) => `${s.sizeGB}GB ${s.type}`).join(", ")} />
              <SpecRow label="Graphics" value={`${l.graphics.model} (${l.graphics.type})${l.graphics.vramGB ? `, ${l.graphics.vramGB}GB VRAM` : ""}`} />
              <SpecRow label="Display" value={`${l.display.sizeInches}" ${l.display.resolution} ${l.display.refreshHz ? `${l.display.refreshHz}Hz` : ""} ${l.display.panel}`} />
              <SpecRow label="Battery" value={`${l.battery.capacityWh}Wh${l.battery.claimedHours ? `, ${l.battery.claimedHours}` : ""}`} />
              <SpecRow label="Weight" value={`${l.weightKg} kg`} />
              <SpecRow label="OS" value={l.os} />
            </div>

            <footer className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-600">Ports: {l.ports.join(", ")}</div>
              <div className="text-xs text-gray-600 mt-1">Conn: {l.connectivity.wifi}, BT {l.connectivity.bluetooth}</div>
            </footer>
          </article>
        ))}
      </div>

      <details className="mt-8">
        <summary className="cursor-pointer select-none text-sm text-gray-700">Show attribute Set</summary>
        <pre className="mt-2 p-3 bg-gray-50 rounded-xl text-xs overflow-auto">{JSON.stringify(Array.from(laptopAttributes), null, 2)}</pre>
      </details>
    </div>
  );
}
