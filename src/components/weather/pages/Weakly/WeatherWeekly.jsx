import React from "react";
import style from "./WeatherWeekly.module.css";
import { motion } from "framer-motion";

export const WeatherWeekly = () => {
  const pageVariants = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={style.body}
    >
      <div className={style.about}>WeatherWeekly</div>
    </motion.div>
  );
};
