import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function MapWithGeocoding() {
  const [city, setCity] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleSearch = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1`);
    const data = await response.json();
    console.log(data);
    const { lat, lon } = data[0]; // Отримуємо координати першого результату
    console.log(lat, lon);
    setMarkerPosition([lat, lon]);
  };

  return (
    <div>
      <input type="text" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {markerPosition && (
        <MapContainer center={markerPosition} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={markerPosition}>
            <Popup>{city}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default MapWithGeocoding;
