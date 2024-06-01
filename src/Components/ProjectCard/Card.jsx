"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

function Card(props) {
  return (
    <article
      className={` flex flex-col w-full justify-evenly border-4 items-center mx-1 max-w-[350px]`}
    >
      <header className="block relative w-full h-64">
        <Image
          src={props.img}
          fill 
          alt="Imagen de fondo"
          className="object-cover"
        />
      </header>
      <main className="w-full">
        <h1 className=" text-xl text-center capitalize">{props.title}</h1>
        <Link href={props.link} className=" block p-1 ml-3 w-fit after:content-['>'] after:align-middle hover:underline hover:underline-offset-2">
          Ver
        </Link>
        
      </main>
      <footer className="flex place-content-evenly w-full ">
        <div className="w-full bg-custom-green text-black text-center">
          <h4 className=" text-[20px]">Area</h4>
          <p className="capitalize">{props.area}</p>
        </div>
        <div className="w-full bg-custom-green text-black text-center">
          <h4 className=" text-[20px]">Año</h4>
          <p className="capitalize">{props.year}</p>
        </div>
        <div className="w-full bg-custom-green text-black text-center">
          <h4 className=" text-[20px]">Ubicación</h4>
          <p className="capitalize pr-1">{props.place}</p>
        </div>
      </footer>
    </article>
  );
}

export default Card;
