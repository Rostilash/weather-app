import { useState, useEffect } from "react";
import style from "./Weather.module.css";
import axios from "axios";
import { WeatherHeader } from "./Header/WeatherHeader";
import WeatherRoutes from "./WeatherRoutes";
import { WeatherFooter } from "./Footer/WeatherFooter";
import { handleSetCoordinates } from "./utils/storage";
import { address } from "framer-motion/client";

export const Weather = () => {
  const savedCoordinates = JSON.parse(localStorage.getItem("coordinates")) || { lat: 48.6208, lon: 22.2879 };

  const [coordinates, setCoordinates] = useState(savedCoordinates);
  const [weatherData, setWeatherData] = useState(null);
  const [multiWeatherData, setMultiWeatherData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Weather data retrieval function
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            current_weather: true,
            hourly: "temperature_2m,weathercode,relative_humidity_2m,apparent_temperature,visibility,windspeed_10m",
            daily:
              "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,precipitation_probability_mean,uv_index_max,sunrise,sunset",
            timezone: "auto",
            language: "en",
          },
        });

        const hourly = response.data.hourly;
        const fullWeatherData = {
          ...response.data,
          temperature: hourly.temperature_2m[0],
          weatherCode: hourly.weathercode[0],
          humidity: hourly.relative_humidity_2m[0],
          apparent_temperature: hourly.apparent_temperature[0],
          visibility: hourly.visibility[0] / 1000,
          windSpeed: hourly.windspeed_10m[0],
        };

        setWeatherData(fullWeatherData);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [coordinates]);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("cityHistory")) || [];

    const fetchAllCitiesWeather = async () => {
      const weatherPromises = savedCities.map(async (city) => {
        try {
          const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
              latitude: city.lat,
              longitude: city.lon,
              current_weather: true,
              hourly: "temperature_2m,weathercode,relative_humidity_2m,apparent_temperature,visibility,windspeed_10m",
              daily:
                "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,precipitation_probability_mean,uv_index_max,sunrise,sunset",
              timezone: "auto",
            },
          });
          // console.log(response.data);

          return {
            city: city.inputName,
            address: city.address,
            lat: city.lat,
            lon: city.lon,
            data: response.data,
            timezone: "auto",
            language: "en",
          };
        } catch (err) {
          console.error(`Помилка при отриманні погоди для ${city.name}`, err);
          return null;
        }
      });

      const allWeather = await Promise.all(weatherPromises);

      setMultiWeatherData(allWeather.filter(Boolean)); // Прибрати null
    };
    fetchAllCitiesWeather();
  }, []);

  // console.log(JSON.stringify(multiWeatherData, null, 2));
  // console.log(multiWeatherData);

  const updateCoordinates = (newCoords) => {
    handleSetCoordinates(newCoords.lat, newCoords.lon);
    setCoordinates(newCoords);
  };

  return (
    <>
      <div className={style.weather__main}>
        <WeatherHeader />
        {error && <div className={style.error}>{error}</div>}
        {!loading && weatherData ? (
          <WeatherRoutes loading={loading} weatherData={weatherData} getWeatherData={updateCoordinates} multiWeatherData={multiWeatherData} />
        ) : (
          <div className={style.loading}>Завантаження...</div>
        )}
        <WeatherFooter />
      </div>
    </>
  );
};
