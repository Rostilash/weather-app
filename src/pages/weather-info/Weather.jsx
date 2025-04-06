import style from "./Weather.module.css";
import { WeatherHeader } from "./Header/WeatherHeader";
import { WeatherMain } from "./Main/WeatherMain";
import { WeatherFooter } from "./Footer/WeatherFooter";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: 48.6208, // Ужгород
            longitude: 22.2879,
            current_weather: true,
            language: "en", // англійська мова
          },
        });

        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching data:", error);
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);
  if (loading) {
    return <div>Завантаження...</div>;
  }
  if (!weatherData) {
    return <div>Помилка при завантаженні погоди.</div>;
  }
  return (
    <div className={style.weather__main}>
      {loading && <div>Loading...</div>}
      {!weatherData && <div>False to load the weather try again...</div>}

      <WeatherHeader />
      {weatherData && <WeatherMain weatherData={weatherData} />}

      <WeatherFooter />
    </div>
  );
};
