import { weatherDescriptions, weatherIcons } from "../../utils/weatherFilterData.js";
import style from "./WeatherWeekly.module.css";
import { getWeekdayNameUS } from "./../../utils/dateHelper";

export default function WeeklyContent({ day }) {
  const icon = weatherIcons[day.weatherCode] || "❓";
  const description = weatherDescriptions[day.weatherCode] || "Unknown";
  const weekDayShort = getWeekdayNameUS(day.date);

  return (
    <div className={style.list_items}>
      <h3>{weekDayShort}</h3>

      <p>
        <span className={style.icons}>{icon}</span>
        {description}
      </p>

      <p>
        <span>🌡 max {Math.round(day.maxTemp)}°C</span>
        <span>🌡 min {Math.round(day.minTemp)}°C</span>
      </p>
      <p>💧 {day.precipitation} mm</p>
      <p>💨 {day.windspeed} km/h</p>
    </div>
  );
}
