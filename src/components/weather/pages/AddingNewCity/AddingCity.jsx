import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { handleSearchTheCity, fetchCityDate } from "../../../../services/weatherServices.js";
import { handleSetCoordinates } from "../../utils/storage";
import style from "./AddingCity.module.css";

export const AddCitySearchBlock = ({ setShowAddingBlock, onCityAdded, addCityToHistory }) => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const filtered = allCities.filter((c) => inputSearchValue.length > 0 && c.toLowerCase().startsWith(inputSearchValue.toLowerCase()));
  const exactMatch = allCities.some((c) => c.toLowerCase() === inputSearchValue.toLowerCase());

  const listRef = useRef(null);

  useEffect(() => {
    const loadCities = async () => {
      const citiesData = await fetchCityDate();
      const cityNames = citiesData.map((city) => (typeof city === "object" && city.name ? city.name : null)).filter(Boolean);
      setAllCities(cityNames);
    };
    loadCities();
  }, []);

  const searchCity = async () => {
    const position = await handleSearchTheCity(inputSearchValue);
    if (position && position.lat && position.lon) {
      const { lat, lon, address } = position;
      handleSetCoordinates(lat, lon);
      await saveCityToHistory(inputSearchValue, lat, lon, address);
    } else {
      console.error("Error: Coordinates not found.");
    }
  };

  const saveCityToHistory = async (inputSearchValue, lat, lon, address) => {
    const cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    const tolerance = 0.0001;
    const exists = cityHistory.find((c) => {
      const latMatches = Math.abs(c.lat - lat) < tolerance;
      const lonMatches = Math.abs(c.lon - lon) < tolerance;
      return latMatches && lonMatches;
    });

    if (exists) {
      setErrorMassage("City already exists in history.");
      return;
    }

    setErrorMassage("City Added");
    const newCity = { inputName: inputSearchValue, lat, lon, address };
    const updated = [newCity, ...cityHistory];

    localStorage.setItem("cityHistory", JSON.stringify(updated));
    addCityToHistory(newCity);
    onCityAdded();
  };

  const handleKeyDown = (e) => {
    if (filtered.length === 0 || exactMatch) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        // Якщо вибрано елемент, встановлюємо його значення в input
        setInputSearchValue(filtered[activeIndex]);
        setActiveIndex(-1);
      } else {
        // Якщо елемент не вибраний, викликаємо searchCity
        searchCity();
      }
    }
  };

  return (
    <motion.div
      key="newContent"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={style.adding__location}
    >
      <h1>Find City</h1>
      <p className={style.error_massage}>{errorMassage}</p>

      <div style={{ position: "relative", width: "100%" }}>
        <input
          type="text"
          placeholder="🔍Enter city name"
          value={inputSearchValue}
          onChange={(e) => {
            setInputSearchValue(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className={style.input_style}
        />

        {filtered.length > 0 && !exactMatch && (
          <motion.ul className={style.autocomplete_list} ref={listRef}>
            {filtered.slice(0, 7).map((cityName, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setInputSearchValue(cityName);
                  setActiveIndex(-1);
                }}
                className={`${style.autocomplete_item} ${idx === activeIndex ? style.active : ""}`}
              >
                {cityName}
              </li>
            ))}
          </motion.ul>
        )}

        <button onClick={searchCity} className="your-button-style">
          Search
        </button>
      </div>

      <span className={style.close_button} onClick={() => setShowAddingBlock(true)}>
        X
      </span>
    </motion.div>
  );
};
