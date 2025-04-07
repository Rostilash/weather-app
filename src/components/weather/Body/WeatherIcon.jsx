import React from "react";

const WeatherIcon = ({ isDay }) => <img src={`../../../public/weather-icons/${isDay}`} alt="Weather" />;

export default WeatherIcon;
