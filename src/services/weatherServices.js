import { useEffect, useState } from "react";
import axios from "axios";

export function getWeatherData() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: 48.6208,
            longitude: 22.2879,
            current_weather: true,
            hourly: "relative_humidity_2m,apparent_temperature,visibility",
            timezone: "auto",
            language: "en",
          },
        });

        const hourly = response.data.hourly;
        const currentHumidity = hourly.relative_humidity_2m[0];
        const currentApparentTemperature = hourly.apparent_temperature[0];
        const currentVisibility = response.data.hourly.visibility[0] / 1000;

        const fullWeatherData = {
          ...response.data,
          humidity: currentHumidity,
          apparent_temperature: currentApparentTemperature,
          visibility: currentVisibility,
        };

        setWeatherData(fullWeatherData);
        setLoading(false);
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
