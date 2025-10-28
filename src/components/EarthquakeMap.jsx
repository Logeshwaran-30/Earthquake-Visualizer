import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        setEarthquakes(data.features);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getColor = (mag) => {
    if (mag >= 6) return "#ef4444"; 
    if (mag >= 4) return "#f97316"; 
    if (mag >= 2) return "#eab308"; 
    return "#22c55e"; 
  };

  const filteredData =
    filter === "all"
      ? earthquakes
      : earthquakes.filter((eq) => eq.properties.mag >= parseFloat(filter));

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading earthquakes...
      </div>
    );

  return (
    <div className="flex-1 relative">
      {/* 🔹 Filter Panel */}
      <div className="absolute top-4 left-4 z-[1000] bg-white shadow-lg p-3 rounded-xl border border-gray-300 ml-10">
        <label className="text-sm font-medium text-gray-700">
          Filter by Magnitude:
        </label>
        <select
          className="block mt-1 w-full border-gray-300 rounded-md shadow-sm text-sm "
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="2">≥ 2.0</option>
          <option value="4">≥ 4.0</option>
          <option value="6">≥ 6.0</option>
        </select>
      </div>

      {/* 🔹 Map */}
      <MapContainer center={[20, 0]} zoom={2} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredData.map((eq, index) => {
          const [lng, lat] = eq.geometry.coordinates;
          const mag = eq.properties.mag;

          return (
            <CircleMarker
              key={index}
              center={[lat, lng]}
              pathOptions={{
                color: getColor(mag),
                fillColor: getColor(mag),
                fillOpacity: 0.6,
              }}
              radius={mag * 2 || 2}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{eq.properties.place}</p>
                  <p>Magnitude: {mag}</p>
                  <p>
                    Time: {new Date(eq.properties.time).toLocaleString()}
                  </p>
                  <a
                    href={eq.properties.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-xs"
                  >
                    More Info
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* 🔹 Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white shadow-lg p-3 rounded-xl border border-gray-300 text-sm">
        <h3 className="font-semibold mb-1">Magnitude Legend</h3>
        <div className="flex flex-col space-y-1">
          <div><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>Below 2</div>
          <div><span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>2 - 3.9</div>
          <div><span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>4 - 5.9</div>
          <div><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>6+</div>
        </div>
      </div>
    </div>
  );
}
