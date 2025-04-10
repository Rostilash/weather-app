import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { handleSearchTheCity } from "./../../../../services/weatherServices";
import { handleSetCoordinates } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export function MapWithGeocoding({ getWeatherData }) {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);

  const searchCity = async () => {
    const position = await handleSearchTheCity(inputSearchValue);

    if (position && position.lat && position.lon) {
      setMarkerPosition([position.lat, position.lon]);
      const { lat, lon, address } = position;

      handleSetCoordinates(lat, lon);

      getWeatherData({ lat, lon });

      await saveCityToHistory(inputSearchValue, lat, lon, address); // 💾 We save the city
    } else {
      console.error("Error: Coordinates not found.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (markerPosition) {
      const timer = setTimeout(() => {
        navigate("/weather");
        // Need to change with useContext
        window.location.reload();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [markerPosition, navigate]);

  const saveCityToHistory = async (inputSearchValue, lat, lon, address) => {
    console.log(inputSearchValue);

    const cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

    const tolerance = 0.0001;

    const exists = cityHistory.find((c) => {
      const latMatches = Math.abs(c.lat - lat) < tolerance;
      const lonMatches = Math.abs(c.lon - lon) < tolerance;

      return latMatches && lonMatches;
    });

    if (exists) {
      console.log("City already exists in history based on coordinates");
      return;
    }

    const updated = [{ inputName: inputSearchValue, lat, lon, address }, ...cityHistory];
    // const limited = updated.slice(0, 3); // maximum 3 cities
    console.log(updated);
    localStorage.setItem("cityHistory", JSON.stringify(updated));

    console.log("City added to history:", { name: inputSearchValue, lat, lon, address: address });
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Find the City</h1>

        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={inputSearchValue}
            onChange={(e) => setInputSearchValue(e.target.value)}
            style={{ fontSize: "40px", width: "500px" }}
          />
          <button onClick={searchCity} style={{ fontSize: "24px" }}>
            Search
          </button>
        </div>
      </div>

      {markerPosition && (
        <MapContainer center={markerPosition} zoom={13} style={{ height: "400px", width: "500px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={markerPosition}>
            <Popup>{inputSearchValue}</Popup>
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
