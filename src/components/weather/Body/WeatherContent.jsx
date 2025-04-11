import { useRef, useState } from "react";
import style from "./WeatherContent.module.css";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { WeatherInfo } from "./WeatherInfo";
import { infoPropsData } from "./infoPropsData";
import { filterTheWeather, filterWindDirection, filterIsDay } from "../utils/weatherUtils";
import { getFormattedDate } from "../utils/dateHelper";
import { ScrollButtons } from "./../Buttons/ScrollButtons";
import { AddCitySearchBlock } from "../pages/AddingNewCity/AddingCity";

export const WeatherContent = ({ multiWeatherData }) => {
  if (!multiWeatherData) return;
  const [showAddingBlock, setShowAddingBlock] = useState(true);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  // const [closeAllWindows, setCloseAllWindows] = useState(null);

  const handleAddClick = () => {
    setShowAddingBlock(false);
  };

  const navigate = useNavigate();
  const useDirectionClick = (direction, cityName) => {
    navigate(`/weather/${direction}/${cityName}`);
  };

  const pageTransition = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  const wrapperRef = useRef(null);
  const handleDotsClick = (e, index) => {
    // Preventing transition when clicking on span
    e.stopPropagation();
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const scrollAmount = 760; // block width + 20px gap
  const handleScrollLeft = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25 }}
        className={`${style.wrapper} ${multiWeatherData.length > 3 ? style.wrapper_start : style.wrapper_center}`}
        ref={wrapperRef}
      >
        {multiWeatherData.length > 2 && <ScrollButtons onScrollLeft={handleScrollLeft} onScrollRight={handleScrollRight} />}

        <div className={style.weather__info}>
          {/* Blocks */}
          {multiWeatherData.map((item, index) => {
            {
              /* getting data from our fetch array */
            }
            const { weatherInfoProps, weatherInfoProps2 } = infoPropsData(item);
            const { city, country, country_code, state } = item.address;
            const { is_day, temperature, time, winddirection } = item.data.current_weather;

            // function deleting the city
            const handleDelete = async (city) => {
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
            const windCode = filterTheWeather({ item });
            const isDay = filterIsDay(is_day);
            const windInfo = filterWindDirection(winddirection);
            console.log(index);
            return (
              <div key={index} className={style.today__weather} onClick={() => useDirectionClick("weekly", item.address.city.toLowerCase())}>
                <span className={style.dots} onClick={(e) => handleDotsClick(e, index)}>
                  ...
                </span>
                {/* //dots option */}
                {activeDropdownIndex === index && (
                  <div className={style.dropdown}>
                    <ul>
                      <li>Option 1</li>
                      {/* <li onClick={() => useDirectionClick("map-city", "")}>Find Map</li> */}
                      <li onClick={() => handleDelete(city)}>Видалити</li>
                    </ul>
                  </div>
                )}
                <div className={style.today_weather_town}>
                  <img src={`../../../public/weather-icons/${isDay}`} alt="Weather" />
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
                  <span className={style.cloudy}>{windCode}</span>
                </div>

                <WeatherInfo data={weatherInfoProps} />
                <WeatherInfo data={weatherInfoProps2} />

                <div className={style.wind_direction}>
                  <span>{windInfo.arrow}</span>

                  {windInfo.direction}
                </div>
              </div>
            );
          })}

          {/* Adding Block */}
          <AnimatePresence mode="wait">
            {showAddingBlock ? (
              <motion.div
                key="addLocation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={style.adding__location}
              >
                <div className={style.add_button} onClick={handleAddClick}>
                  <span className={style.plus__sign}>+</span>
                </div>
                <p>Add new location</p>
              </motion.div>
            ) : (
              <AddCitySearchBlock setShowAddingBlock={setShowAddingBlock} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};
