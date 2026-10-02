import { useState, useEffect } from "react";
import style from "./Weather.module.css";
import axios from "axios";
import { WeatherHeader } from "./Header/WeatherHeader";
import WeatherRoutes from "./WeatherRoutes";
import { WeatherFooter } from "./Footer/WeatherFooter";
import { handleSetCoordinates } from "./utils/storage";
import { ErrorPage } from "./pages/ErrorPage";
import { PreLoading } from "./pages/PreLoading";

export const Weather = () => {
  const saved = JSON.parse(localStorage.getItem("coordinates"));

  const savedCoordinates = saved
    ? {
        lat: Number(saved.lat),
        lon: Number(saved.lon ?? saved.lng),
      }
    : {
        lat: 48.6208,
        lon: 22.2879,
      };

  const [coordinates, setCoordinates] = useState(savedCoordinates);
  const [weatherData, setWeatherData] = useState(null);
  const [multiWeatherData, setMultiWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cityHistory, setCityHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("cityHistory")) || [];
  });

  const addCityToHistory = (city) => {
    const updated = [city, ...cityHistory];
    localStorage.setItem("cityHistory", JSON.stringify(updated));
    setCityHistory(updated);
  };

  const deleteCityFromHistory = (cityName) => {
    const updated = cityHistory.filter((c) => c.address.city !== cityName);
    localStorage.setItem("cityHistory", JSON.stringify(updated));
    setCityHistory(updated);
  };

  // Weather data retrieval function
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (
        !coordinates ||
        !Number.isFinite(Number(coordinates.lat)) ||
        !Number.isFinite(Number(coordinates.lon))
      ) {
        console.error("Invalid coordinates:", coordinates);
        setError("Invalid coordinates");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: Number(coordinates.lat),
            longitude: Number(coordinates.lon),

            current_weather: true,

            hourly:
              "temperature_2m,weathercode,relative_humidity_2m,apparent_temperature,visibility,windspeed_10m",

            daily:
              "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,precipitation_probability_mean,uv_index_max,sunrise,sunset",

            timezone: "auto",
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
        console.error("Weather error:", error.response?.data);
        console.error("Request params:", error.config?.params);

        setError(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [coordinates]);

  useEffect(() => {
    const fetchAllCitiesWeather = async () => {
      const weatherPromises = cityHistory.map(async (city) => {
        try {
          const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
              latitude: city.lat,
              longitude: city.lon,
              current_weather: true,
              hourly:
                "temperature_2m,weathercode,relative_humidity_2m,apparent_temperature,visibility,windspeed_10m",
              daily:
                "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,precipitation_probability_mean,uv_index_max,sunrise,sunset",
              timezone: "auto",
            },
          });

          return {
            city: city.inputName,
            address: city.address,
            lat: city.lat,
            lon: city.lon,
            data: response.data,
          };
        } catch (err) {
          console.error(`Помилка при отриманні погоди для ${city.name}`, err);
          return null;
        }
      });

      const allWeather = await Promise.all(weatherPromises);
      setMultiWeatherData(allWeather.filter(Boolean));
    };

    fetchAllCitiesWeather();
  }, [cityHistory]);

  const updateCoordinates = (newCoords) => {
    const normalizedCoords = {
      lat: Number(newCoords.lat),
      lon: Number(newCoords.lon ?? newCoords.lng),
    };

    console.log("Normalized coordinates:", normalizedCoords);

    handleSetCoordinates(normalizedCoords.lat, normalizedCoords.lon);

    setCoordinates(normalizedCoords);
  };

  return (
    <>
      <div className={style.weather__main}>
        <WeatherHeader />

        {error && <ErrorPage />}

        {!loading && weatherData ? (
          <WeatherRoutes
            loading={loading}
            weatherData={weatherData}
            getWeatherData={updateCoordinates}
            multiWeatherData={multiWeatherData}
            addCityToHistory={addCityToHistory}
            deleteCityFromHistory={deleteCityFromHistory}
          />
        ) : (
          <PreLoading />
        )}

        <WeatherFooter />
      </div>
    </>
  );
};
