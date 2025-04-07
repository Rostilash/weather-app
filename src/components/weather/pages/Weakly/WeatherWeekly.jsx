import React from "react";
import style from "./WeatherWeekly.module.css";
import { motion } from "framer-motion";
import WeeklyContent from "./WeeklyContent";

export const WeatherWeekly = ({ weatherData }) => {
  const dailyData = weatherData.daily;
  const hourlyData = weatherData.hourly;
  const now = new Date(); // поточний момент часу

  const hourlyForecast = hourlyData.time
    .map((timeStr, index) => ({
      time: timeStr,
      apparentTemperature: hourlyData.apparent_temperature[index],
      humidity: hourlyData.relative_humidity_2m[index],
      visibility: hourlyData.visibility[index],
      date: new Date(timeStr),
    }))
    .filter((entry) => new Date(entry.time) > now);

  // console.log(hourlyForecast);

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
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={style.body}
    >
      {/* <div className={style.daily}>
        <h1> Daily weather</h1>
        {hourlyForecast.map((time, i) => (
          <div key={i} className={style.daily_list}>
            <p>{time.apparentTemperature}</p>
            <p>{time.humidity}</p>
            <p>{time.visibility}</p>
          </div>
        ))}
      </div> */}

      <div className={style.weekly_block}>
        <h1 style={{ marginBottom: "20px" }}>Weekly weather</h1>
        <div className={style.weather_list}>
          {weekForecast.map((day, i) => (
            <WeeklyContent key={i} day={day} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
