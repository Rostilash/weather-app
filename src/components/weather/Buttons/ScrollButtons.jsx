import style from "./ScrollButtons.module.css";

export const ScrollButtons = ({ onScrollLeft, onScrollRight }) => {
  return (
    <div className={style.scroll_buttons_container}>
      <button onClick={onScrollLeft} className={style.button_left}>
        ←
      </button>
      <button onClick={onScrollRight} className={style.button_right}>
        →
      </button>
    </div>
  );
};
