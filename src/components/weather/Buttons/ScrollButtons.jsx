import style from "./ScrollButtons.module.css";

export const ScrollButtons = ({ onScrollLeft, onScrollRight }) => {
  return (
    <div className={style.scroll_buttons_containerЇ}>
      <button onClick={onScrollLeft} className={style.button_left}>
        ←
      </button>
      <button onClick={onScrollRight} className={style.button_right}>
        →
      </button>
    </div>
  );
};
