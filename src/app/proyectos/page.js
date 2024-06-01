"use client";
import React, { useState, useEffect } from "react";
import { getProjects } from "./firebaseEndpoints/getProjects";
import Card from "@/Components/ProjectCard/card";
import GreenButton from "@/Components/Buttons/GreenButton"

function page() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects((projectsData) => {
      setProjects(projectsData);
    });
  }, []);

  return (
    <section>
      <GreenButton  href="/" text="Atrás" style="my-3 ml-1 lg:ml-60" />
      <article className=" my-4 ml-1 max-w-4xl m-auto border-l-[3px] border-custom-green px-3 py-4 sm:ml-5 lg:m-auto lg:max-w-5xl lg:my-2">
        <h1 className="text-4xl font-bold">Proyectos</h1>
        <p className=" text-justify pt-3">
          Cada proyecto se piensa como un desafío, en el cual se tiene en cuenta
          como eje principal las necesidades y deseos de cada cliente y su
          familia. De esta manera, se brinda en cada detalle la solución
          innovadora y creativa, sin descuidar el punto de vista humano.
        </p>
        <p className=" text-justify pt-3">
          Cada proyecto arquitectónico parte de la idea de que varias
          personasvan a habitar esa vivienda, cada una con sus características y
          necesidades particulares. De esta forma, se intenta realizar un
          planteo que no sólo tenga en cuenta aquello solicitado expresamente,
          sino también los deseos y anhelos inconscientes, y que van a conformar
          en conjunto la base para proyectar una vivienda que sea disfrutada en
          plenitud.
        </p>
      </article>
      <gallery className="grid grid-cols-1 m-auto max-w-5xl gap-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 ">
        {projects
          ? projects.map((project) => {
             
              return <Card
                key={project.id}
                img={project.image}
                link={`/proyectos/${project.id}`}
                title={project.title}
                area={project.area}
                place={project.place}
                year={project.year}
              />;
            })
          : "Loading..."}
      </gallery>
    </section>
  );
}

export default page;
