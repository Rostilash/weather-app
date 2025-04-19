import { weatherDescriptions, weatherIcons } from "../../utils/weatherFilterData.js";
import style from "./WeatherWeekly.module.css";
import { getWeekdayNameUS } from "./../../utils/dateHelper";

export default function WeeklyContent({ day, setSelectedDate }) {
  const icon = weatherIcons[day.weatherCode] || "❓";
  const description = weatherDescriptions[day.weatherCode] || "Unknown";
  const weekDayShort = getWeekdayNameUS(day.date);

  return (
    <div className={style.list_items} onClick={() => setSelectedDate(day.date)}>
      <p>{weekDayShort}</p>

      <span className={style.icons}>{icon}</span>
      <p>{description}</p>

      <p>
        {Math.round(day.maxTemp)}°C / {Math.round(day.minTemp)}°C
      </p>

      {/* <p>💧 {day.precipitation} mm</p> */}
      {/* <p>💨 {day.windspeed} km/h</p> */}
    </div>
  );
}
