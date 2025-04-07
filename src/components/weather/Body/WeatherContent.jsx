import React, { useState, useEffect } from "react";
import style from "./WeatherContent.module.css";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { getWeatherCity } from "../../../services/weatherServices";
import { filterTheWeather, filterWindDirection, filterIsDay } from "../utils/weatherUtils";
import { loadingInfoGif } from "../utils/loadingInfoGif";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { WeatherInfo } from "./WeatherInfo";

export const WeatherContent = ({ weatherData }) => {
  if (!weatherData) return;
  const { is_day, temperature, time, winddirection, windspeed } = weatherData.current_weather;
  const { humidity, apparent_temperature, visibility } = weatherData;

  // To wind speed km/h
  const windSpeedKmh = Math.round(windspeed * 3.6);
  // Formatted Date
  const formattedDate = format(parseISO(time), "eeee dd/MM/yyyy", { locale: enUS });
  // Our city checker
  const cityInfo = getWeatherCity({ weatherData });

  // Filter
  const windCode = filterTheWeather({ weatherData });
  const windInfo = filterWindDirection(winddirection);
  const isDay = filterIsDay(is_day);

  const navigate = useNavigate();

  const handleClick = (direction) => {
    navigate("/weather/weekly");
  };

  const pageTransition = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  const weatherInfoProps = {
    img1: "eye.png",
    name1: "Visibility",
    element1: visibility,
    unit1: "km",

    img2: "temperature.png",
    name2: "Feels like",
    element2: apparent_temperature,
    unit2: "°C",
  };

  const weatherInfoProps2 = {
    img1: "humidity.png",
    name1: "Humidity",
    element1: humidity,
    unit1: "%",

    img2: "wind.png",
    name2: "Wind",
    element2: windspeed,
    unit2: "km/h",
  };

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
      <div className={style.weather__info}>
        <div className={style.today__weather} onClick={handleClick}>
          <span className={style.dots}>...</span>
          <div className={style.today_weather_town}>
            <img src={`../../../public/weather-icons/${isDay}`} alt="Weather" />
            <div>
              {!cityInfo && loadingInfoGif()}
              {cityInfo && (
                <>
                  {cityInfo.city}, {cityInfo.country_code.toUpperCase()}
                </>
              )}
              <h2></h2>
              <p>{formattedDate}</p>
            </div>
          </div>

          <div className={style.today_weather_temperature}>
            <span className={style.temperature}>{Math.round(temperature)}</span>
            <span className={style.celsius}>°C</span>
            <span className={style.cloudy}>{windCode}</span>
          </div>

          <WeatherInfo data={weatherInfoProps} />
          <WeatherInfo data={weatherInfoProps2} />

          <div className={style.wind_direction}>
            <span>{windInfo.arrow}</span>
            {windInfo.direction}
          </div>
        </div>

        <div className={style.adding__location}>
          <div className={style.add_button}>
            <span className={style.plus__sign}>+</span>
          </div>
          <p>Add new location</p>
        </div>
      </div>
    </motion.div>
  );
};
