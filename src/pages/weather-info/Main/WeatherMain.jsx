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
  let arrowDirection = "";
  function getWindDirection(windDirection) {
    if ((windDirection >= 0 && windDirection < 22.5) || (windDirection >= 337.5 && windDirection <= 360)) {
      return { direction: "North wind", arrow: "↑" };
    } else if (windDirection >= 22.5 && windDirection < 67.5) {
      return { direction: "North-east wind", arrow: "↗" };
    } else if (windDirection >= 67.5 && windDirection < 112.5) {
      return { direction: "East wind", arrow: "→" };
    } else if (windDirection >= 112.5 && windDirection < 157.5) {
      return { direction: "South-east wind", arrow: "↘" };
    } else if (windDirection >= 157.5 && windDirection < 202.5) {
      return { direction: "South wind", arrow: "↓" };
    } else if (windDirection >= 202.5 && windDirection < 247.5) {
      return { direction: "South-west wind", arrow: "↙" };
    } else if (windDirection >= 247.5 && windDirection < 292.5) {
      return { direction: "West wind", arrow: "←" };
    } else if (windDirection >= 292.5 && windDirection < 337.5) {
      return { direction: "North-west wind", arrow: "↖" };
    } else {
      return { direction: "Invalid direction", arrow: "" };
    }
  }
  let windInfo = getWindDirection(weatherData.current_weather.winddirection);
  console.log(windInfo.direction); // Напрям вітру (наприклад: "South wind")
  console.log(windInfo.arrow); // Стрілка (наприклад: "↓")

  useEffect(() => {
    const fetchCityData = async () => {
      const latitude = weatherData.latitude;
      const longitude = weatherData.longitude;
      const findCityUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`;

      try {
        const response = await axios.get(findCityUrl);

        const city = response.data.address && response.data.address.city ? response.data.address.city : "Unknown";
        const countryCode = response.data.address && response.data.address.country_code ? response.data.address.country_code : "Unknown";

        // Оновлення стану з отриманими даними
        setSiting({ city, country_code: countryCode });
      } catch (error) {
        console.error("Error in the request:", error);
      }
    };

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
      )}
      {!siting && <h1> Loading...</h1>}
    </div>
  );
};
