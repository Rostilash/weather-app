import { useNavigate } from "react-router-dom";
import { WeatherInfo } from "./WeatherInfo";
import { infoPropsData } from "./infoPropsData";
import { filterWindDirection, filterIsDay, weatherDescriptions, weatherBackgroundGiphs, weatherIcons } from "../utils/weatherFilterData";
import { getFormattedDate } from "../utils/dateHelper";
import style from "./WeatherContent.module.css";
import { useDropdown } from "./../hooks/useDropdown";

export const ItemBlock = ({ item, index, onCityDelete }) => {
  const { city, country_code, village } = item.address;
  const { is_day, temperature, time, winddirection, weathercode } = item.data.current_weather;
  const weatherCodeIcon = weatherIcons[weathercode];
  const weatherDescription = weatherDescriptions[weathercode];
  const weahterGifs = weatherBackgroundGiphs[weathercode];

  //Drop down function
  const { activeDropdownIndex, handleDotsClick, dropdownRef, closeDropdown } = useDropdown();
  const { weatherInfoProps, weatherInfoProps2 } = infoPropsData(item);

  // function that deleting the city
  const handleClickDelete = async (city) => {
    //return dropdown to null
    closeDropdown();

    //rerender the page
    onCityDelete(city);
  };

  // Formatted Date
  const formattedDate = getFormattedDate(time);

  // Filter
  const isDay = filterIsDay(is_day);
  const windInfo = filterWindDirection(winddirection);

  // Navigate
  const navigate = useNavigate();
  const handleNavigationClick = (direction, cityName) => {
    navigate(`/weather-app/${direction}/${cityName}`);
  };

  return (
    <div className={style.today__weather} onClick={() => handleNavigationClick("weekly", item.address.city.toLowerCase())}>
      {/* <div className={style.backgroundGif}>
        <img src={`${weahterGifs}`} />
      </div> */}
      <span className={style.dots} onClick={(e) => handleDotsClick(e, index)}>
        ...
      </span>

      {/* dots option */}
      {/* 
      {activeDropdownIndex === index && (
        <div className={style.dropdown} ref={dropdownRef}>
          <ul>
             <li>Option 1</li> 
            <li
              onClick={(e) => {
                e.stopPropagation(); // Stopping the action with loading parent function navigation.
                handleClickDelete(city);
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      )} */}

      {/* delete city  */}
      <span
        className={style.deleting_city}
        onClick={(e) => {
          e.stopPropagation();
          handleClickDelete(city);
        }}
      >
        <img src="https://cdn-icons-png.flaticon.com/128/8695/8695043.png" alt="icon" />
      </span>

      <div className={style.today_weather_town}>
        <img src={`${isDay}`} alt="Weather" />
        <div>
          <h3>
            {city?.toUpperCase() || village?.toUpperCase()} / {country_code.toUpperCase()}
          </h3>
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className={style.today_weather_temperature}>
        <span className={style.temperature}>{Math.round(temperature)}</span>
        <span className={style.celsius}>°C</span>
        <span className={style.cloudy}>
          <img src={weatherCodeIcon} alt="icon" /> {weatherDescription}
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
