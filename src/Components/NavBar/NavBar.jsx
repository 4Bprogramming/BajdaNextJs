"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BurgerMenuButton from "../BurgeMenuButon/BurgerMenuButton";
import logo from "../../../public/resources/logo.png"

function NavBar() {
  
  const [isVisible, SetIsVisible] = React.useState(window.innerWidth >= 640);
  const showOptions = () => {
    SetIsVisible(!isVisible);
  };
  React.useEffect(() => {
    const handleResize = () => {
      SetIsVisible(window.innerWidth >= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header class="w-full">
      <nav class="flex flex-row-reverse relative h-28 justify-between items-center px-7 py-4 shadow-lg box-shadow:1px 2px 15px rgba(100,100,100,0.3">
        <Image
          src= {logo}
          alt="Bajda Logo"
          style={{ width:"60px",height:"60px"}}
        />

        <ul
          className={`${isVisible
            ? "bg-white border-b-2 border-x-2 border-custom-green rounded flex flex-col absolute top-full left-1 sm:flex-row sm:static sm:border-t-2 md:mr-24 md:text-lg"
            :"opacity-0"}`}>
          <li class="py-0.5 px-1 text-xl">
            <Link href={"/"}>Home</Link>
          </li>
          <li class="py-0.5 px-1 text-xl">
            <Link href={"/"}>Nosotros</Link>
          </li>
          <li class="py-0.5 px-1 text-xl">
            <Link href={"/"}>Servicios</Link>
          </li>
          <li class="py-0.5 px-1 text-xl">
            <Link href={"/"}>Contacto</Link>
          </li>
        
        </ul>
        <BurgerMenuButton style={""} showOptions={showOptions} />
      </nav>
    </header>
  );
}

export default NavBar;
