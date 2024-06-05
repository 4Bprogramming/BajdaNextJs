"use client";
import React, {Suspense } from "react";

import Card from "@/Components/ProjectGallery/Card";
import GreenButton from "@/Components/Buttons/GreenButton";
import Loading from "./loading";

function page() {
  return (
    <section>
      <GreenButton href="/" text="Atrás" style="my-3 ml-1 lg:ml-60" />
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

      <Suspense fallback={<p>Loading feed...</p>}>
        <Card />
      </Suspense>
    </section>
  );
}

export default page;
