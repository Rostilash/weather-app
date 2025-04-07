import React from "react";

export const infoPropsData = ({ weatherData }) => {
  const { windspeed } = weatherData.current_weather;
  const { humidity, apparent_temperature, visibility } = weatherData;
  // To wind speed km/h
  const windSpeedKmh = Math.round(windspeed * 3.6);

  const weatherInfoProps = {
    img1: "eye.png",
    name1: "Visibility",
    element1: visibility,
    unit1: "km",

    img2: "temperature.png",
    name2: "Feels like",
    element2: apparent_temperature,
    unit2: "°C",
  };

  const weatherInfoProps2 = {
    img1: "humidity.png",
    name1: "Humidity",
    element1: humidity,
    unit1: "%",

    img2: "wind.png",
    name2: "Wind",
    element2: windSpeedKmh,
    unit2: "km/h",
  };
  return { weatherInfoProps, weatherInfoProps2 };
};
