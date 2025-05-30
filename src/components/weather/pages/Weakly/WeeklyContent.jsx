import { weatherDescriptions, weatherIcons } from "../../utils/weatherFilterData.js";
import style from "./WeatherWeekly.module.css";
import { getWeekdayNameUS } from "./../../utils/dateHelper";

export default function WeeklyContent({ day, setSelectedDate, selectedDate }) {
  const icon = weatherIcons[day.weatherCode] || "❓";
  const description = weatherDescriptions[day.weatherCode] || "Unknown";
  const weekDayShort = getWeekdayNameUS(day.date);

  const isActive = day.date === selectedDate;

  return (
    <div
      className={`${style.list_items} ${isActive ? style.active : ""}`} // 🔥 додаємо клас
      onClick={() => setSelectedDate(day.date)}
    >
      <p>{weekDayShort}</p>

      <span className={style.icons}>
        <img src={icon} alt="icon" />
      </span>
      <p className={style.description}>{description}</p>

      <p>
        <span style={{ color: "#abab00" }}>{Math.round(day.maxTemp)}°C</span> /<span style={{ color: "#9393f5" }}> {Math.round(day.minTemp)}°C</span>
      </p>

      {/* <p>💧 {day .precipitation} mm</p> */}
      {/* <p>💨 {day.windspeed} km/h</p> */}
    </div>
  );
}
