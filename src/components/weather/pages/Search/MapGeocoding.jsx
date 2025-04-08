import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { handleSearchTheCity } from "./../../../../services/weatherServices";
import { handleSetCoordinates } from "../../utils/storage";

export function MapWithGeocoding({ getWeatherData }) {
  const [city, setCity] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);

  const searchCity = async () => {
    const position = await handleSearchTheCity(city); // Get coordinates for the city

    if (position && position.length > 0) {
      setMarkerPosition(position); // Show marker on the map
      const [lat, lon] = position;

      // Update coordinates in local storage and pass them to the parent component
      handleSetCoordinates(lat, lon);

      // Important: pass the coordinates to getWeatherData to update the weather
      getWeatherData({ lat, lon }); // Call getWeatherData with the new coordinates
    } else {
      console.error("Error: Coordinates not found.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ fontSize: "40px", width: "500px" }}
        />
        <button onClick={searchCity} style={{ fontSize: "24px" }}>
          Search
        </button>
      </div>

      {markerPosition && (
        <MapContainer center={markerPosition} zoom={13} style={{ height: "400px", width: "500px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={markerPosition}>
            <Popup>{city}</Popup>
            <Polyline
              positions={[
                [51.505, -0.09],
                [51.51, -0.1],
              ]}
            />
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default MapWithGeocoding;
