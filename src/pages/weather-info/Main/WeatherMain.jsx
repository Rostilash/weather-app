import React, { useState, useEffect } from "react";
import style from "./WeatherMain.module.css";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import axios from "axios";

export const WeatherMain = ({ weatherData }) => {
  if (!weatherData) return;
  const [siting, setSiting] = useState(null);

  const currentWeather = weatherData.current_weather;
  const currentWind = weatherData.current_weather.windspeed;
  const windSpeedKmh = Math.round(currentWind * 3.6);
  let windCode = weatherData.current_weather.weathercode;
  if (windCode === 0) {
    windCode = "Almost clear";
  } else if (windCode === 1) {
    windCode = "Partly cloudy";
  } else if (windCode === 2) {
    windCode = "Cloudy";
  } else if (windCode === 3) {
    windCode = "Rain";
  } else if (windCode === 4) {
    windCode = "Snow";
  } else if (windCode === 5) {
    windCode = "Fog";
  }
  let windDirection = weatherData.current_weather.winddirection;

  function getWindDirection() {
    if ((windDirection >= 0 && windDirection < 22.5) || (windDirection >= 337.5 && windDirection <= 360)) {
      return "North wind";
    } else if (windDirection >= 22.5 && windDirection < 67.5) {
      return "North-east wind";
    } else if (windDirection >= 67.5 && windDirection < 112.5) {
      return "East wind";
    } else if (windDirection >= 112.5 && windDirection < 157.5) {
      return "South-east wind";
    } else if (windDirection >= 157.5 && windDirection < 202.5) {
      return "South wind";
    } else if (windDirection >= 202.5 && windDirection < 247.5) {
      return "South-west wind";
    } else if (windDirection >= 247.5 && windDirection < 292.5) {
      return "West wind";
    } else if (windDirection >= 292.5 && windDirection < 337.5) {
      return "North-west wind";
    } else {
      return "Invalid direction";
    }
  }

  useEffect(() => {
    const fetchCityData = async () => {
      const latitude = weatherData.latitude;
      const longitude = weatherData.longitude;
      // Замінили lang на accept-language
      const findCityUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`;

      try {
        const response = await axios.get(findCityUrl);

        // Логування відповіді для перевірки, чи отримуємо дані англійською
        console.log("API Response:", response.data);

        // Перевірка на наявність міста та коду країни
        const city = response.data.address && response.data.address.city ? response.data.address.city : "Unknown";
        const countryCode = response.data.address && response.data.address.country_code ? response.data.address.country_code : "Unknown";

        // Логування для перевірки даних
        console.log("City:", city);
        console.log("Country Code:", countryCode);

        // Оновлення стану з отриманими даними
        setSiting({ city, country_code: countryCode });
      } catch (error) {
        // Обробка помилок, якщо вони виникають
        console.error("Error in the request:", error);
      }
    };

    // Викликаємо функцію для отримання даних
    fetchCityData();
  }, [weatherData.latitude, weatherData.longitude]);

  const curTime = currentWeather.time;
  const DateComponent = (curTime) => {
    const inputDate = currentWeather.time;
    const parsedDate = parseISO(inputDate);
    const formattedDate = format(parsedDate, "eeee dd/MM/yyyy");

    return formattedDate;
  };

  return (
    <div className={style.weather__body}>
      {siting && (
        <div>
          <div className={style.weather__info}>
            <div className={style.today__weather}>
              <span className={style.dots}>...</span>
              <div className={style.today_weather_town}>
                <img src="../../../public/weather-icons/sun.png" alt="Weather" />
                <div>
                  <h2>
                    {siting.city}, {siting.country_code.toUpperCase()}
                  </h2>
                  <p>{DateComponent()}</p>
                </div>
              </div>

              <div className={style.today_weather_temperature}>
                <span className={style.temperature}>{Math.round(currentWeather.temperature)}</span>
                <span className={style.celsius}>°C</span>
                <span className={style.cloudy}>{windCode}</span>
              </div>

              <div className={style.today_weather_visibility}>
                <div className={style.visibility_context}>
                  <img src="../../../public/weather-icons/eye.png" alt="" />
                  <div className={style.visibility_context_text}>
                    <span>Visibility</span> <span>10KM</span>
                  </div>
                </div>

                <span className={style.divider}>|</span>

                <div className={style.visibility_context}>
                  <img src="../../../public/weather-icons/temperature.png" alt="" />
                  <div className={style.visibility_context_text}>
                    <span style={{ marginLeft: "-5px" }}>Feels like</span> <span>10KM</span>
                  </div>
                </div>
              </div>

              <div className={style.today_weather_visibility}>
                <div className={style.visibility_context}>
                  <img src="../../../public/weather-icons/humidity.png" alt="" />
                  <div className={style.visibility_context_text}>
                    <span>Humidity</span> <span>10KM</span>
                  </div>
                </div>

                <div className={style.divider}>|</div>

                <div className={style.visibility_context}>
                  <img src="../../../public/weather-icons/wind.png" alt="" />
                  <div className={style.visibility_context_text}>
                    <span>Wind</span> <span>{currentWind}KM</span>
                  </div>
                </div>
              </div>
              <div>{getWindDirection(windDirection)}</div>
            </div>

            <div className={style.adding__location}>
              <div className={style.add_button}>
                <span className={style.plus__sign}>+</span>
              </div>
              <p>Add new location</p>
            </div>
          </div>
        </div>
      )}
      {!siting && <h1> Loading...</h1>}
    </div>
  );
};
