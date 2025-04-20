import { useState } from "react";
import style from "./WeatherContent.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollButtons } from "./../Buttons/ScrollButtons";
import { AddCitySearchBlock } from "../pages/AddingNewCity/AddingCity";
import { ItemBlock } from "./ItemBlock";
import { useScroll } from "../hooks/useScroll.js";
import { useEscapeKey } from "./../hooks/useEscapeKey";

export const WeatherContent = ({ multiWeatherData, addCityToHistory, deleteCityFromHistory, loading }) => {
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
        <div className="sun"></div>
        <div className="clouds cloud-1">
          <div className="cloud big"></div>
          <div className="cloud big-2"></div>
          <div className="cloud small-1"></div>
          <div className="cloud small-2"></div>
        </div>
        <div className="clouds cloud-2">
          <div className="cloud big"></div>
          <div className="cloud small-1"></div>
          <div className="cloud small-2"></div>
        </div>
        <div className="clouds cloud-3">
          <div className="cloud big"></div>
          <div className="cloud small-1"></div>
          <div className="cloud small-2"></div>
        </div>

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
                  <span className={style.plus__sign}>
                    <i className="fa-solid fa-xmark fa-beat"></i>
                  </span>
                </div>
                <p style={{ color: "color:rgb(187, 187, 187)" }}>Add your city...</p>
              </motion.div>
            ) : (
              <AddCitySearchBlock
                setShowAddingBlock={setShowAddingBlock}
                onCityAdded={handleCityAdded}
                addCityToHistory={addCityToHistory}
                loading={loading}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};
