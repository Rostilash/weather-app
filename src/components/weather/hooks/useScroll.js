import { useRef } from "react";

export const useScroll = () => {
  const wrapperRef = useRef(null);

  const handleScrollLeft = () => {
    const scrollAmount = window.innerWidth;
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    const scrollAmount = window.innerWidth;
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return { wrapperRef, handleScrollLeft, handleScrollRight };
};
