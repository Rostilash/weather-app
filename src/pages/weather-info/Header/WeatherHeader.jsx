import React from "react";
import style from "./WeatherHeader.module.css";

export const WeatherHeader = () => {
  return (
    <div className={style.header}>
      <div className={style.head__logo}>
        <img src="../../../public/weather-icons/sunny.png" />{" "}
        <p>
          Weather by Ros<b>Dev</b>
        </p>
      </div>
      <div className={style.head__nav}>
        <a href="https://github.com/Rostilash/weather-app">GitHub</a>
        <a>About</a>
      </div>
    </div>
  );
};
