import React from "react";
import style from "./WeatherHeader.module.css";
import { useNavigate } from "react-router-dom";
export const WeatherHeader = () => {
  const navigate = useNavigate();

  const handleClick = (direction) => {
    navigate(direction);
  };

  return (
    <div className={style.header}>
      <div className={style.head__logo} onClick={() => handleClick("/weather-app/")}>
        <img src="weather-icons/sunny.png" alt="sunny" />
        <p>
          Weather by Ros<b>Dev</b>
        </p>
      </div>
      <div className={style.head__nav}>
        <a href="https://github.com/Rostilash/weather-app">GitHub</a>
        <a onClick={() => handleClick("/weather-app/about")}>About</a>
      </div>
    </div>
  );
};
