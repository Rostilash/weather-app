import React from "react";
import { motion } from "framer-motion";
import style from "./About.module.css";

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100vw", opacity: 0 },
};
export const About = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={style.body}
    >
      <div>About</div>
    </motion.div>
  );
};
