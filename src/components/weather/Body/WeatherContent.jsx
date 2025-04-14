import { useState } from "react";
import style from "./WeatherContent.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollButtons } from "./../Buttons/ScrollButtons";
import { AddCitySearchBlock } from "../pages/AddingNewCity/AddingCity";
import { ItemBlock } from "./ItemBlock";
import { useScroll } from "../hooks/useScroll.js";
import { useEscapeKey } from "./../hooks/useEscapeKey";

export const WeatherContent = ({ multiWeatherData, addCityToHistory, deleteCityFromHistory }) => {
  const [showAddingBlock, setShowAddingBlock] = useState(true);
  const { handleScrollLeft, handleScrollRight, wrapperRef } = useScroll();
  const [cityHistory, setCityHistory] = useState(() => {
    const saved = localStorage.getItem("cityHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddClick = () => {
    setShowAddingBlock(false);
  };

  const handleCityAdded = () => {
    const updated = localStorage.getItem("cityHistory");
    if (updated) {
      setCityHistory(JSON.parse(updated));
    }
    setShowAddingBlock(true);
  };

  const pageTransition = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  useEscapeKey(() => setShowAddingBlock(true));

  return (
    <>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25 }}
        className={`${style.wrapper} ${multiWeatherData.length > 2 ? style.wrapper_start : style.wrapper_center}`}
        ref={wrapperRef}
      >
        {multiWeatherData.length > 2 && <ScrollButtons onScrollLeft={handleScrollLeft} onScrollRight={handleScrollRight} />}

        <div className={style.weather__info}>
          {/*------Our Blocks -------*/}
          {multiWeatherData.map((item, index) => {
            return <ItemBlock key={index} item={item} index={index} onCityDelete={deleteCityFromHistory} />;
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
              <AddCitySearchBlock setShowAddingBlock={setShowAddingBlock} onCityAdded={handleCityAdded} addCityToHistory={addCityToHistory} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};
