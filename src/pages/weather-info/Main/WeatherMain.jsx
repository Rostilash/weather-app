import React from "react";
import style from "./WeatherMain.module.css";

export const WeatherMain = () => {
  return (
    <div className={style.weather__body}>
      <div className={style.weather__info}>
        <div className={style.today__weather}>
          <span className={style.dots}>...</span>
          <div className={style.today_weather_town}>
            <img src="../../../public/weather-icons/sun.png" alt="Weather" />
            <div>
              <h2>Valle de Angeles,HN</h2>
              <p>Monday 01/17/2022</p>
            </div>
          </div>

          <div className={style.today_weather_temperature}>
            <span className={style.temperature}>15</span>
            <span className={style.celsius}>°C</span>
            <span className={style.cloudy}>Monsly cloudy</span>
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
                <span>Wind</span> <span>10KM</span>
              </div>
            </div>
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
  );
};
