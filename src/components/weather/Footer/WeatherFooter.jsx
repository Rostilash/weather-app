import React from "react";
import style from "./WeatherFooter.module.css";
import heart from "../../../../public/weather-icons/heart.png";

export const WeatherFooter = () => {
  return (
    <div className={style.weather__footer}>
      <div className={style.footer__content}>
        Made with <img src={heart} /> by Rostislav Lashin
      </div>
    </div>
  );
};
