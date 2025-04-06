import React, { useState, useEffect } from "react";
import style from "./WeatherMain.module.css";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { getWeatherCity } from "./../../../services/weatherServices";
import { filterTheWeather, filterWindDirection, filterIsDay } from "./weatherUtils";
import { loadingInfoGif } from "./../utils/loadingInfoGif";

export const WeatherMain = ({ weatherData }) => {
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

  return (
    <div className={style.weather__body}>
      <div>
        <div className={style.weather__info}>
          <div className={style.today__weather}>
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

            <div className={style.today_weather_visibility}>
              <div className={style.visibility_context}>
                <img src="../../../public/weather-icons/eye.png" alt="" />
                <div className={style.visibility_context_text}>
                  <span>Visibility</span> <span>{visibility} km</span>
                </div>
              </div>

              <span className={style.divider}>|</span>

              <div className={style.visibility_context}>
                <img src="../../../public/weather-icons/temperature.png" alt="" />
                <div className={style.visibility_context_text}>
                  <span style={{ marginLeft: "-5px" }}>Feels like</span> <span>{apparent_temperature} °C</span>
                </div>
              </div>
            </div>

            <div className={style.today_weather_visibility}>
              <div className={style.visibility_context}>
                <img src="../../../public/weather-icons/humidity.png" alt="" />
                <div className={style.visibility_context_text}>
                  <span>Humidity</span> <span>{humidity}%</span>
                </div>
              </div>

              <div className={style.divider}>|</div>

              <div className={style.visibility_context}>
                <img src="../../../public/weather-icons/wind.png" alt="" />
                <div className={style.visibility_context_text}>
                  <span>Wind</span> <span>{windspeed} km/h</span>
                </div>
              </div>
            </div>
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
      </div>
    </div>
  );
};
