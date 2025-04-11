import { useState } from "react";
import { motion } from "framer-motion";
import { handleSearchTheCity } from "../../../../services/weatherServices.js";
import { handleSetCoordinates } from "../../utils/storage";
import style from "./AddingCity.module.css";

export const AddCitySearchBlock = ({ setShowAddingBlock }) => {
  const [inputSearchValue, setInputSearchValue] = useState("");

  const searchCity = async () => {
    //Looking city from input value
    const position = await handleSearchTheCity(inputSearchValue);

    if (position && position.lat && position.lon) {
      const { lat, lon, address } = position;

      handleSetCoordinates(lat, lon);

      await saveCityToHistory(inputSearchValue, lat, lon, address);

      window.location.reload();
    } else {
      console.error("Error: Coordinates not found.");
    }
  };

  //Save it to LocalStorage
  const saveCityToHistory = async (inputSearchValue, lat, lon, address) => {
    const cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

    const tolerance = 0.0001;
    // if lat or lon is in our storage make return
    const exists = cityHistory.find((c) => {
      const latMatches = Math.abs(c.lat - lat) < tolerance;
      const lonMatches = Math.abs(c.lon - lon) < tolerance;
      return latMatches && lonMatches;
    });

    if (exists) {
      console.log("City already exists in history.");
      return;
    }

    const updated = [{ inputName: inputSearchValue, lat, lon, address }, ...cityHistory];
    localStorage.setItem("cityHistory", JSON.stringify(updated));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchCity();
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

      <input
        type="text"
        placeholder="Enter city name"
        value={inputSearchValue}
        onChange={(e) => setInputSearchValue(e.target.value)}
        onKeyPress={handleKeyPress} // Add this to handle Enter key
        className={style.input_style}
      />

      <div style={{ marginTop: "10px" }}>
        <span className={style.close_button} onClick={() => setShowAddingBlock(true)}>
          X
        </span>

        <button onClick={searchCity} className="your-button-style">
          Search
        </button>

        {/* <button onClick={() => setShowAddingBlock(true)} className="your-button-style" style={{ marginLeft: "10px" }}>
          Back
        </button> */}
      </div>
    </motion.div>
  );
};
