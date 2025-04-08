import React, { useState } from "react";
import style from "./WeatherWeekly.module.css";
import { motion } from "framer-motion";
import WeeklyContent from "./WeeklyContent";
import { weatherIcons } from "./../../utils/weatherUtils";
import { getWeatherCity } from "../../../../services/weatherServices.js";
import { loadingInfoGif } from "./../../utils/loadingInfoGif";

export const WeatherWeekly = ({ weatherData }) => {
  const cityInfo = getWeatherCity({ weatherData });
  const dailyData = weatherData.daily;
  const hourlyData = weatherData.hourly;

  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split("T")[0]);

  // Adding from Data info for 7 days
  const getForecastForDate = (date) => {
    const currentTime = now.getTime();
    const timeIn7Hours = currentTime + 7 * 60 * 60 * 1000; // +7 hours

    return hourlyData.time
      .map((time, index) => {
        const forecastTime = new Date(time).getTime();

        // Показуємо лише ті години, що між "зараз" і "+7 годин"
        if (forecastTime < currentTime || forecastTime > timeIn7Hours) return null;

        const weatherCode = hourlyData.weathercode?.[index];

        return {
          time,
          temperature: hourlyData.temperature_2m[index],
          humidity: hourlyData.relative_humidity_2m[index],
          visibility: hourlyData.visibility[index],
          weatherCode,
          icon: weatherIcons[weatherCode] || "❓",
        };
      })
      .filter(Boolean);
  };

  // Отримуємо прогноз для вибраного дня
  const forecastForSelectedDay = getForecastForDate();

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

  // Switching between days
  // const handleChangeDay = (direction) => {
  //   const newDate = new Date(selectedDate);
  //   newDate.setDate(newDate.getDate() + direction); // Changing day +1 або -1
  //   setSelectedDate(newDate.toISOString().split("T")[0]); // Refresh current day
  // };

  // buttons filter
  // const isToday = selectedDate === now.toISOString().split("T")[0];
  // const lastAvailableDate = dailyData.time[dailyData.time.length - 1];
  // const isLastDay = selectedDate === lastAvailableDate;
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={style.body}
    >
      {/* Поточний день */}
      <div className={style.first_body_block}>
        {!cityInfo && loadingInfoGif()}
        {cityInfo && (
          <h1>
            {cityInfo.city}, {cityInfo.country_code.toUpperCase()}
          </h1>
        )}
        <h2>{formatDate(selectedDate)}</h2>

        {/* Buttons for switching by day */}
        {/* <div className={style.day_switcher}>
          <button
            onClick={() => handleChangeDay(-1)}
            disabled={isToday}
            title={isToday ? "You can't view the past beyond today" : "View previous day"}
            className={isToday ? style.disabledButton : ""}
          >
            Previous Day
          </button>

          {!isLastDay && <button onClick={() => handleChangeDay(1)}>Next Day</button>}
        </div> */}
      </div>

      <div className={style.second_body_block}>
        {/* Displaying the forecast for the selected day */}
        <div className={style.forecast}>
          {forecastForSelectedDay.map((forecast, index) => (
            <div key={forecast.time} className={style.hour_card}>
              <div>{index === 0 ? "Now" : new Date(forecast.time).getHours()}</div>
              <span>{forecast.icon}</span>
              <div>{Math.round(forecast.temperature)}°C</div>
              {/* <div>{forecast.humidity}% 💧</div> */}
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
    </motion.div>
  );
};
