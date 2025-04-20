import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { handleSearchTheCity, fetchCityDate } from "../../../../services/weatherServices.js";
import { handleSetCoordinates } from "../../utils/storage";
import style from "./AddingCity.module.css";
import { loadingInfoGif } from "./../../utils/loadingInfoGif";
import { Loading } from "../../../Loading/Loading.jsx";

export const AddCitySearchBlock = ({ setShowAddingBlock, onCityAdded, addCityToHistory, loading }) => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadCities = async () => {
      const citiesData = await fetchCityDate();
      const cityNames = citiesData.map((city) => (typeof city === "object" && city.name ? city.name : null)).filter(Boolean);
      setAllCities(cityNames);
    };
    loadCities();
  }, []);

  const filtered = allCities.filter((c) => inputSearchValue.length > 0 && c.toLowerCase().startsWith(inputSearchValue.toLowerCase()));
  const exactMatch = allCities.some((c) => c.toLowerCase() === inputSearchValue.toLowerCase());

  const listRef = useRef(null);

  const searchCity = async () => {
    if (!inputSearchValue.trim()) {
      setErrorMassage("Please enter a city name.");
      setMessageType("error");
      return;
    }

    setIsSearching(true);
    setErrorMassage("");

    try {
      const position = await handleSearchTheCity(inputSearchValue);
      if (position && position.lat && position.lon) {
        const { lat, lon, address } = position;
        handleSetCoordinates(lat, lon);
        await saveCityToHistory(inputSearchValue, lat, lon, address);
      } else {
        setErrorMassage("City not found.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Search error:", error);
      setErrorMassage("Something went wrong.");
      setMessageType("error");
    } finally {
      setIsSearching(false);
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
      setMessageType("error");
      return;
    }

    setErrorMassage("City Added");
    setMessageType("success");

    setErrorMassage("City Added");
    const newCity = { inputName: inputSearchValue, lat, lon, address };
    const updated = [newCity, ...cityHistory];

    localStorage.setItem("cityHistory", JSON.stringify(updated));
    addCityToHistory(newCity);
    onCityAdded();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filtered.length > 0) {
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filtered.length > 0) {
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && filtered.length > 0) {
        setInputSearchValue(filtered[activeIndex]);
        setActiveIndex(-1);
      } else {
        searchCity(); // Always call search on Enter, regardless of exactMatch
      }
    }
  };

  if (loading) {
    return loadingInfoGif();
  }

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

      <div style={{ position: "relative", width: "90%" }}>
        {loading && loadingInfoGif()}
        {!loading && (
          <>
            <input
              type="text"
              placeholder="Enter city name"
              value={inputSearchValue}
              onChange={(e) => {
                setInputSearchValue(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className={style.input_style}
              style={{ paddingLeft: "4rem", color: "white" }}
            />

            <span className={style.input_icon}>
              <i className="fa-solid fa-magnifying-glass fa-bounce fa-2x" style={{ color: "#dadada" }}></i>
            </span>
          </>
        )}
        {isSearching && (
          <div className={style.loader_container}>
            <Loading />
          </div>
        )}
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
      </div>
      {/* <button onClick={searchCity} className="your-button-style">
        Search
      </button> */}

      <p className={`${style.error_massage} ${messageType === "error" ? style.error : messageType === "success" ? style.success : ""}`}>
        {errorMassage}
      </p>
      <span className={style.close_button} onClick={() => setShowAddingBlock(true)}>
        +
      </span>
    </motion.div>
  );
};
