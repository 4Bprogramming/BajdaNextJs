"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/app/proyectos/firebaseEndpoints/getProjects";
import { suspend } from 'suspend-react'



async function getProjectsFromFB (){
  return new Promise((resolve)=>{
   const projects = getProjects();
   resolve(projects);
  })
}



function Card() {
  let projects = suspend(getProjectsFromFB)
  
  return (
    <gallery className="grid grid-cols-1 m-auto max-w-5xl gap-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 ">
      { projects && projects.map((project) => (
        <article
          key={project.id} 
          className={` flex flex-col w-full justify-evenly border-4 items-center mx-1 max-w-[350px]`}
        >
          <header className="block relative w-full h-64">
            <Image
              src={project.image}
              fill
              alt="Imagen de fondo"
              className="object-cover"
            />
          </header>
          <main className="w-full">
            <h1 className=" text-xl text-center capitalize">{project.title}</h1>
            <Link
              href={`/proyectos/${project.id}`} 
              className=" block p-1 ml-3 w-fit after:content-['>'] after:align-middle hover:underline hover:underline-offset-2"
            >
              Ver
            </Link>
          </main>
          <footer className="flex place-content-evenly w-full ">
            <div className="w-full bg-custom-green text-black text-center">
              <h4 className=" text-[20px]">Area</h4>
              <p className="capitalize">{project.area}</p>
            </div>
            <div className="w-full bg-custom-green text-black text-center">
              <h4 className=" text-[20px]">Año</h4>
              <p className="capitalize">{project.year}</p>
            </div>
            <div className="w-full bg-custom-green text-black text-center">
              <h4 className=" text-[20px]">Ubicación</h4>
              <p className="capitalize pr-1">{project.place}</p>
            </div>
          </footer>
        </article>
      ))}
    </gallery>
  );
}

export default Card;
