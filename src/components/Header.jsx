import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white py-4 shadow-lg">
      <h1 className="text-3xl font-bold text-center tracking-wide">
        🌍 Earthquake Visualizer
      </h1>
      <p className="text-center text-sm opacity-80 mt-1">
        Real-time Global Earthquake Data (USGS API)
      </p>
    </header>
  );
}
