"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BurgerMenuButton from "../BurgeMenuButon/BurgerMenuButton";
import logo from "../../../public/resources/logo.png";

function NavBar() {
  const [isVisible, SetIsVisible] = React.useState(false);
  const showOptions = () => {
    SetIsVisible(!isVisible);
  };

  return (
    <header class=" bg-white fixed z-10 w-full shadow-lg box-shadow:1px 2px 15px rgba(100,100,100,0.3)">
      <nav class="flex flex-row-reverse relative h-32 justify-between items-center px-7 py-4  sm:flex-row md:max-w-5xl md:m-auto  ">
        <Image
          src={logo}
          alt="Bajda Logo"
          style={{ width: "70px", height: "70px" }}
        />

        <ul
          className={`opacity-${
            isVisible ? "100" : "0"
          }  bg-white border-b-2 w-40 border-x-2 border-custom-green rounded flex flex-col absolute z-20 top-[126px] left-0 sm:w-auto sm:flex-row sm:static sm:border-t-2 sm:border-none  sm:opacity-100 md:mr-16 md:text-lg font-semibold	
            `}
        >
          <li class="py-0.5 pl-9 sm:pl-0 text-[1.12rem] mr-2 md:mr-6 xl:mr-10">
            <a href={"#home"} className="relative group">
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform origin-right transition-all duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left"></span>
            </a>
          </li>
          <li class="py-0.5 pl-9 sm:pl-0 text-[1.12rem] mr-2 md:mr-6 xl:mr-10">
            <a href={"#nosotros"} className="relative group">
              Nosotros
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform origin-right transition-all duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left"></span>
            </a>
          </li>
          <li class="py-0.5 pl-9 sm:pl-0 text-[1.12rem] mr-2 md:mr-6 xl:mr-10">
            <a href={"#contacto"} className="relative group">
              Contacto
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform origin-right transition-all duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left"></span>
            </a>
          </li>
        </ul>
        <BurgerMenuButton style={""} showOptions={showOptions} />
      </nav>
    </header>
  );
}

export default NavBar;
