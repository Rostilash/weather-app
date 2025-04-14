import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const handleDotsClick = (e, index) => {
    e.stopPropagation();
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const closeDropdown = () => {
    setActiveDropdownIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return { activeDropdownIndex, handleDotsClick, dropdownRef, closeDropdown };
};
