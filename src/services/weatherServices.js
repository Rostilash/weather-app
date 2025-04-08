import { useEffect, useState } from "react";
import axios from "axios";

export function getWeatherData() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: 48.6208,
            longitude: 22.2879,
            current_weather: true,
            hourly: "temperature_2m,weathercode,relative_humidity_2m,apparent_temperature,visibility,windspeed_10m",
            daily:
              "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,precipitation_probability_mean,uv_index_max,sunrise,sunset",
            timezone: "auto",
            language: "en",
          },
        });

        const hourly = response.data.hourly;
        const currentHumidity = hourly.relative_humidity_2m[0];
        const currentApparentTemperature = hourly.apparent_temperature[0];
        const currentVisibility = response.data.hourly.visibility[0] / 1000;
        const currentTemperature = hourly.temperature_2m[0]; // поточна температура
        const currentWeatherCode = hourly.weathercode[0]; // поточний код погоди
        const currentWindspeed = hourly.windspeed_10m[0]; // поточна швидкість

        const fullWeatherData = {
          ...response.data,
          temperature: currentTemperature,
          weathercode: currentWeatherCode,
          humidity: currentHumidity,
          apparent_temperature: currentApparentTemperature,
          visibility: currentVisibility,
          windspeed: currentWindspeed,
        };

        setWeatherData(fullWeatherData);
        setLoading(false);
        // }, 100000);
      } catch (error) {
        console.error("Error while fetching data:", error);
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);
  return { weatherData, loading };
}

export function getWeatherCity({ weatherData }) {
  const [cityInfo, setCityInfo] = useState(null);
  useEffect(() => {
    const fetchCityData = async () => {
      const latitude = weatherData.latitude;
      const longitude = weatherData.longitude;
      const findCityUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`;

      try {
        const response = await axios.get(findCityUrl);
        const city = response.data.address && response.data.address.city ? response.data.address.city : "Unknown";
        const countryCode = response.data.address && response.data.address.country_code ? response.data.address.country_code : "Unknown";

        setCityInfo({ city, country_code: countryCode });
      } catch (error) {
        console.error("Error in the request:", error);
      }
    };

    fetchCityData();
  }, [weatherData.latitude, weatherData.longitude]);

  return cityInfo;
}
