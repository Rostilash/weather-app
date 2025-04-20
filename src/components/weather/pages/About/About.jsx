import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./About.module.css";

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100vw", opacity: 0 },
};
export const About = () => {
  const users = [
    { name: "Anna", age: 22 },
    { name: "Max", age: 28 },
    { name: "John", age: 35 },
  ];

  // Знайти користувача за ім'ям і видалити його з масиву
  const userIndex = users.findIndex((user) => user.name === "Max");

  if (userIndex !== -1) {
    users.splice(userIndex, 1); // Видаляємо елемент
  }

  console.log(users);
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={style.body}
    >
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          This website provides up-to-date weather forecasts for regions around the world. I use advanced meteorological data and algorithms to ensure
          the accuracy of our forecasts for the next few days. Whether you're planning a trip or wondering if you should take an umbrella, we provide
          all the information you need.
        </p>
        <p>
          Our forecasts are based on data from international meteorological agencies, satellite imagery, and modern weather models. We are always
          striving to deliver the freshest and most accurate weather updates.
        </p>
        <p>Stay with us and stay informed about weather changes with our constantly updated forecasts!</p>
      </div>
    </motion.div>
  );
};
