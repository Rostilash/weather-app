import React from "react";
import style from "./WeatherFooter.module.css";

export const WeatherFooter = () => {
  return (
    <div className={style.weather__footer}>
      <div className={style.footer__content}>
        Made with <img src="../../../public/weather-icons/heart.png" /> by Rostislav Lashin
      </div>
    </div>
  );
};
