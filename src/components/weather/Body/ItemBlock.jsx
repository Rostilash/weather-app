import { WeatherInfo } from "./WeatherInfo";
import { infoPropsData } from "./infoPropsData";
import { filterWindDirection, filterIsDay, weatherDescriptions, weatherBackgroundGiphs } from "../utils/weatherUtils";
import { weatherIcons } from "./../utils/weatherUtils";
import { getFormattedDate } from "../utils/dateHelper";
import { useNavigate } from "react-router-dom";
import style from "./WeatherContent.module.css";
import { useDropdown } from "./../hooks/useDropdown";

export const ItemBlock = ({ item, index }) => {
  const { city, country_code, state, country } = item.address;
  const { is_day, temperature, time, winddirection, weathercode } = item.data.current_weather;
  const weatherCodeIcon = weatherIcons[weathercode];
  const weatherDescription = weatherDescriptions[weathercode];
  const weahterGifs = weatherBackgroundGiphs[weathercode];
  //Drop down function
  const { activeDropdownIndex, handleDotsClick, dropdownRef } = useDropdown();
  const { weatherInfoProps, weatherInfoProps2 } = infoPropsData(item);

  // function deleting the city
  const handleClickDelete = async (city) => {
    const cityFromLocal = JSON.parse(localStorage.getItem("cityHistory")) || [];

    const updatedCity = cityFromLocal.filter((localStorageCity) => {
      const storageCity = localStorageCity.address.city;
      return city !== storageCity;
    });
    localStorage.setItem("cityHistory", JSON.stringify(updatedCity));
    // Need to change it later
    window.location.reload();
  };

  // Formatted Date
  const formattedDate = getFormattedDate(time);
  // Filter
  const isDay = filterIsDay(is_day);
  const windInfo = filterWindDirection(winddirection);
  // Navigate
  const navigate = useNavigate();
  const handleNavigationClick = (direction, cityName) => {
    navigate(`/weather/${direction}/${cityName}`);
  };

  return (
    <div className={style.today__weather} onClick={() => handleNavigationClick("weekly", item.address.city.toLowerCase())}>
      <div className={style.backgroundGif}>
        <img src={`${weahterGifs}`} />
      </div>
      <span className={style.dots} onClick={(e) => handleDotsClick(e, index)}>
        ...
      </span>
      {/* //dots option */}
      {activeDropdownIndex === index && (
        <div className={style.dropdown} ref={dropdownRef}>
          <ul>
            {/* <li>Option 1</li> */}
            {/* <li onClick={() => useDirectionClick("map-city", "")}>Find Map</li> */}
            <li onClick={() => handleClickDelete(city)}>Видалити</li>
          </ul>
        </div>
      )}
      <div className={style.today_weather_town}>
        <img src={`${isDay}`} alt="Weather" />
        <div>
          <h3>
            {city.toUpperCase()} / {country_code.toUpperCase()}
          </h3>
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className={style.today_weather_temperature}>
        <span className={style.temperature}>{Math.round(temperature)}</span>
        <span className={style.celsius}>°C</span>
        <span className={style.cloudy}>
          {weatherCodeIcon}
          {weatherDescription}
        </span>
      </div>

      <WeatherInfo data={weatherInfoProps} />
      <WeatherInfo data={weatherInfoProps2} />

      <div className={style.wind_direction}>
        <span>{windInfo.arrow}</span>

        {windInfo.direction}
      </div>
    </div>
  );
};
