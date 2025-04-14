import React, { useState, useEffect } from "react";
import style from "./WeatherWeekly.module.css";
import { motion } from "framer-motion";
import WeeklyContent from "./WeeklyContent";
import { weatherBackgroundGiphs, weatherIcons } from "./../../utils/weatherFilterData.js";
import { useParams } from "react-router-dom";

export const WeatherWeekly = ({ weatherData, multiWeatherData }) => {
  const { cityName } = useParams();
  const ourCity = multiWeatherData.find((object) => object.address.city.toLowerCase() === cityName?.toLowerCase());

  // Перевіряємо, чи є дані
  const dailyWeather = ourCity?.data?.daily;

  if (!dailyWeather) {
    console.log("Дані про погоду не знайдені для цього міста");
  } else {
    console.log(dailyWeather);
  }

  const [cityInfo, setCityInfo] = useState(null);
  const [dailyData, setDailyData] = useState(weatherData.daily); // fallback
  const [hourlyData, setHourlyData] = useState(weatherData.hourly); // fallback
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split("T")[0]);

  useEffect(() => {
    if (!multiWeatherData || multiWeatherData.length === 0) return;

    // console.log("🔁 Checking for city:", cityName);

    // Перекладаємо ім'я міста з URL, якщо є в мапі, або використовуємо як є
    const translatedName = cityName[cityName.toLowerCase()] || cityName.toLowerCase();

    // console.log("📌 Comparing:", translatedName);

    // Перебираємо масив multiWeatherData і шукаємо місто
    const cityFromUrl = multiWeatherData.find((cityObj) => cityObj.address.city.toLowerCase().trim() === translatedName);

    // console.log("📍 Found cityFromUrl:", cityFromUrl);

    if (cityFromUrl && cityFromUrl.data) {
      setCityInfo(cityFromUrl);
      setDailyData(cityFromUrl.data.daily);
      setHourlyData(cityFromUrl.data.hourly);
    }
  }, [cityName, multiWeatherData]);

  // Adding from Data info for 7 days
  const getForecastForDate = (date) => {
    const currentTime = now.getTime();
    const timeIn7Hours = currentTime + 7 * 60 * 60 * 1000; // +7 hours

    return hourlyData.time
      .map((time, index) => {
        const forecastTime = new Date(time).getTime();

        // "now" and "+7 hours"
        if (forecastTime < currentTime || forecastTime > timeIn7Hours) return null;

        const weatherCode = hourlyData.weathercode?.[index];

        return {
          time,
          temperature: hourlyData.temperature_2m[index],
          humidity: Math.round(hourlyData.relative_humidity_2m[index]),
          visibility: hourlyData.visibility[index].toFixed(1),
          weatherCode,
          icon: weatherIcons[weatherCode] || "❓",
        };
      })
      .filter(Boolean);
  };

  // Отримуємо прогноз для вибраного дня
  const forecastForSelectedDay = getForecastForDate();
  const weatherCodeHourly = forecastForSelectedDay[0].weatherCode;
  const weatherGif = weatherBackgroundGiphs[weatherCodeHourly];

  // Форматування дати для заголовка
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  // Maping Dayly array
  const weekForecast = dailyData.time.map((date, index) => ({
    date,
    maxTemp: dailyData.temperature_2m_max[index],
    minTemp: dailyData.temperature_2m_min[index],
    precipitation: dailyData.precipitation_sum[index],
    windspeed: dailyData.windspeed_10m_max[index],
    weatherCode: dailyData.weathercode[index],
  }));

  const pageVariants = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  const city = cityInfo?.address.city;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={style.body}
    >
      <div className={style.first_body_block}>
        {/* Displaying the forecast for the selected day */}
        <div className={style.forecast}>
          {forecastForSelectedDay.map((forecast, index) => (
            <div key={forecast.time} className={style.hour_card}>
              <div>{index === 0 ? "Now" : new Date(forecast.time).getHours()}</div>
              <span>{forecast.icon}</span>
              <div>{Math.round(forecast.temperature)}°C</div>
            </div>
          ))}
        </div>

        {/* Weakly weather block */}
        <div className={style.weekly_block}>
          <h3 style={{ marginBottom: "20px" }}>WEEKLY WEATHER</h3>
          <div className={style.weather_list}>
            {weekForecast.map((day, i) => (
              <WeeklyContent key={i} day={day} />
            ))}
          </div>
        </div>
      </div>

      {/* Поточний день */}
      <div className={style.second_body_block}>
        <div className={style.backgroundGif}>
          <img src={`${weatherGif}`} />
        </div>

        <h1>{city}</h1>
        <h2>{formatDate(selectedDate)}</h2>
      </div>
    </motion.div>
  );
};
