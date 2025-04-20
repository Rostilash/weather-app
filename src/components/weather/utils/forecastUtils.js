import { weatherIcons } from "./weatherFilterData";

// Cut for 24 hours a day and get info from hourlyData for it
export const getForecastForDate = (date, hourlyData) => {
  if (!hourlyData?.time) return [];

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return hourlyData.time
    .map((time, index) => {
      const forecastTime = new Date(time);

      if (forecastTime < start || forecastTime > end) return null;

      const weatherCode = hourlyData.weathercode?.[index];

      return {
        time,
        temperature: hourlyData.temperature_2m[index],
        apparent_temperature: Math.round(hourlyData.apparent_temperature[index]),
        humidity: Math.floor(hourlyData.relative_humidity_2m[index]),
        visibility: hourlyData.visibility[index].toFixed(1),
        weatherCode,
        icon: weatherIcons[weatherCode] || "❓",
      };
    })
    .filter(Boolean);
};
