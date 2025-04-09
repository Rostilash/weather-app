import { useEffect, useState } from "react";
import axios from "axios";

export const handleSearchTheCity = async (city) => {
  if (!city) return null;

  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&accept-language=en`);
  const data = await response.json();
  console.log(data);

  if (data && data.length > 0) {
    const { lat, lon, address } = data[0]; // отримуємо адрес
    return { lat: parseFloat(lat), lon: parseFloat(lon), address }; // повертаємо координати і адресу
  } else {
    console.log("Error: city not found");
    return null;
  }
};

export const fetchWeatherByCoords = async ({ lat, lon }) => {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?...&latitude=${lat}&longitude=${lon}`);
  console.log(response);
  return response.json();
};

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
