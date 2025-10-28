import React from "react";
import Header from "../src/components/Header";
import EarthquakeMap from "../src/components/EarthquakeMap";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <EarthquakeMap />
    </div>
  );
}

