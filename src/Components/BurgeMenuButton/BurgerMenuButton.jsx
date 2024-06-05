"use client";
import React, { useState } from "react";

const BurgerMenuButton = ({ style, showOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    showOptions();
    toggleMenu();
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col justify-center h-8 w-8 p-1 bg-transparent border border-transparent rounded-md focus:outline-none sm:hidden ${style}`}
    >
      <span
        className={`w-full h-1 bg-black rounded-md transition-all duration-300 ${
          isOpen ? "transform rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`w-full h-1 bg-black rounded-md my-1 transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`w-full h-1 bg-black rounded-md transition-all duration-300 ${
          isOpen ? "transform -rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  );
};

export default BurgerMenuButton;
