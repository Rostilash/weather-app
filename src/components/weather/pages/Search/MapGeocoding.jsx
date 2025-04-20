import React, { useState, useEffect } from "react";

import "./MapGeocoding.css";

export function MapWithGeocoding({ getWeatherData }) {
  const screenWidth = 1000; // можеш змінити на dynamic, якщо потрібно
  const rainDropSpacing = 20;
  const dropCount = Math.floor(screenWidth / rainDropSpacing);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Перевірка, чи підтримує браузер Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation не підтримується вашим браузером.");
    }
  }, []);

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  if (!location) {
    return <div>Завантаження місцезнаходження...</div>;
  }
  return (
    <>
      {/* <svg className="pl" viewBox="0 0 200 200">
        <circle className="pl__ring" cx="100" cy="100" r="80" strokeWidth="20" fill="none" />
        <circle className="pl__worm" cx="100" cy="100" r="80" strokeWidth="20" fill="none" />
      </svg> */}
      {/* <div className="slider-container">
        <div className="slider"></div>
      </div> */}
      <div className="sun"></div>

      <div className="clouds cloud-1">
        <div className="cloud big"></div>
        <div className="cloud small-1"></div>
        <div className="cloud small-2"></div>
      </div>
      <div className="clouds cloud-2">
        <div className="cloud big"></div>
        <div className="cloud small-1"></div>
        <div className="cloud small-2"></div>
      </div>
      <div className="clouds cloud-3">
        <div className="cloud big"></div>
        <div className="cloud small-1"></div>
        <div className="cloud small-2"></div>
      </div>

      {/* <div className="weather-container">
        {Array.from({ length: dropCount }).map((_, index) => {
          const delay = Math.random().toFixed(2); // випадкова затримка 0–1 сек
          return (
            <div
              key={index}
              className="raindrop"
              style={{
                left: `${index * rainDropSpacing}px`,
                animationDelay: `${delay}s`,
              }}
            ></div>
          );
        })}
      </div> */}
      <div>
        <h2>Ваше місцезнаходження:</h2>
        <p>Широта: {location.latitude}</p>
        <p>Довгота: {location.longitude}</p>
      </div>
    </>
  );
}
