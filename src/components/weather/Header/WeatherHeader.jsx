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
      <div className={style.head__logo} onClick={() => handleClick("/weather")}>
        <img src="../../../public/weather-icons/sunny.png" />
        <p>
          Weather by Ros<b>Dev</b>
        </p>
      </div>
      <div className={style.head__nav}>
        <a href="https://github.com/Rostilash/weather-app">GitHub</a>
        <a onClick={() => handleClick("/about")}>About</a>
      </div>
    </div>
  );
};
