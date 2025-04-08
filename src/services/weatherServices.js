import { useEffect, useState } from "react";
import axios from "axios";

export const handleSearchTheCity = async (city) => {
  if (!city) return null;

  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1`);
  const data = await response.json();

  if (data && data.length > 0) {
    const { lat, lon } = data[0];
    return [parseFloat(lat), parseFloat(lon)]; // Повертаємо координати у числовому вигляді
  } else {
    console.log("Error: city not found");
    return null;
  }
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
