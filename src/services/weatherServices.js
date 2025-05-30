//Search city by name
export const handleSearchTheCity = async (city) => {
  if (!city) return null;

  // Find Ukrain words
  const isUkrainian = /[а-яА-ЯіІїЇєЄґҐ]/.test(city);

  const language = isUkrainian ? "uk" : "en";

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1&accept-language=${language}`
    );

    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon, address } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon), address };
    } else {
      console.log("Місто не знайдено");
      return null;
    }
  } catch (error) {
    console.error("Помилка при пошуку міста:", error);
    return null;
  }
};

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

export const fetchUkrainianCities = async () => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/MarkovSergii/ukrainian-cities/refs/heads/master/cities_uk.js");
    const text = await response.text();

    // Витягуємо частину тексту, що починається з [ і закінчується ]
    const jsonArrayMatch = text.match(/\[.*\]/s);
    if (!jsonArrayMatch) throw new Error("JSON-масив не знайдений у файлі");

    const jsonArrayStr = jsonArrayMatch[0];
    const data = JSON.parse(jsonArrayStr);
    return data; // масив міст
  } catch (error) {
    console.error("Помилка при завантаженні українських міст:", error);
    return [];
  }
};
