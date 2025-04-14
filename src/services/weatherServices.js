import { useEffect, useState } from "react";
import axios from "axios";

//Search city by name
export const handleSearchTheCity = async (city) => {
  if (!city) return null;

  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&accept-language=en`);
  const data = await response.json();

  if (data && data.length > 0) {
    const { lat, lon, address } = data[0];

    return { lat: parseFloat(lat), lon: parseFloat(lon), address }; //
  } else {
    console.log("Error: city not found");
    return null;
  }
};

export const fetchWeatherByCoords = async ({ lat, lon }) => {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?...&latitude=${lat}&longitude=${lon}`);
  return response.json();
};

// export function getWeatherCity({ weatherData }) {
//   const [cityInfo, setCityInfo] = useState(null);
//   useEffect(() => {
//     const fetchCityData = async () => {
//       const latitude = weatherData.latitude;
//       const longitude = weatherData.longitude;
//       const findCityUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`;

//       try {
//         const response = await axios.get(findCityUrl);
//         const city = response.data.address && response.data.address.city ? response.data.address.city : "Unknown";
//         const countryCode = response.data.address && response.data.address.country_code ? response.data.address.country_code : "Unknown";

//         setCityInfo({ city, country_code: countryCode });
//       } catch (error) {
//         console.error("Error in the request:", error);
//       }
//     };

//     fetchCityData();
//   }, [weatherData.latitude, weatherData.longitude]);

//   return cityInfo;
// }

export const fetchCityDate = async () => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json");
    const data = await response.json();

    // Filter cities in Ukraine using the country code 'UA'
    const ukraineCities = data.filter((city) => city.country === "UA");

    // console.log("Filtered Ukraine cities:", ukraineCities);
    return ukraineCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
