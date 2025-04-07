import React from "react";
import style from "./../Weather.module.css";

export const PreLoading = () => {
  return (
    <div className={style.loading}>
      <img src="/public/gif/preloader.webp" alt="Loading..." />
    </div>
  );
};
