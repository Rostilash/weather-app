import { useRef } from "react";

export const useScroll = (scrollAmount = 360) => {
  const wrapperRef = useRef(null);

  const handleScrollLeft = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return { wrapperRef, handleScrollLeft, handleScrollRight };
};
