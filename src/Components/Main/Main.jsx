import React from "react";
import Image from "next/image";
import mainBanner from "../../../public/resources/mainImage.jpg";
import nuestroEstudio from "../../../public/resources/nuestroEstudio.jpg";
import GreenButton from "../Buttons/greenButton";

function Main() {
  return (
    <main class="pt-32">
      <section class="relative">
        <div class="sm:max-h-44 md:max-h-none overflow-hidden">
          <Image
            src={mainBanner}
            alt="main banner "
            style={{ width: "100%", height: "auto", opacity: "85%" }}
          />
        </div>
        <article class="absolute top-2 left-2 sm:top-9 md:top-20 lg:top-32 lg:left-6 xl:top-44">
          <p class="text-white md:text-4xl lg:text-5xl">Arquitectos</p>
          <h1 class="text-white max-320:text-3xl text-4xl md:text-7xl lg:text-8xl ">
            <span class="text-custom-green max-320:text-3xl text-5xl md:text-7xl lg:text-9xl">
              Arq.
            </span>{" "}
            Martín Bajda
          </h1>
          <p class="text-white md:text-4xl lg:text-4xl">
            Estudio De Arquitectura
          </p>
        </article>
      </section>
      <section class="flex flex-col items-center">
        <GreenButton text="Proyectos" style="mt-10 mb-10" />
        <p class=" text-5xl text-custom-green">Nosotros</p>
      </section>
      <section>
        <article class="grid grid-cols-1  md:grid-cols-2 md:mb-14 md:mt-24 md:mr-32">
          <nuestro-estudio-left class="block p-2 md:p-6">
            <Image src={nuestroEstudio} />
          </nuestro-estudio-left>
          <nuestro-estudio-right class="block relative p-2 md:p-6">
            <h3 class="text-3xl font-semibold uppercase mb-2">
              Nuestro<span class=" text-grey-2 after:content-[''] after:absolute after:bg-custom-green after:h-1 after:w-16 after:top-10 after:left-2 md:after:top-[60px] md:after:left-[26px]">Estudio</span>
            </h3>
            <p class="text-grey-1">
              Partiendo de la premisa de que la presencia humana da significado
              a la arquitectura, acompañamos a nuestros clientes en cada etapa
              del proyecto, dando respuestas a cada una de las necesidades
              planteadas.
            </p>
            <p class="text-grey-1">
              A través del contacto constante con nuestros clientes, intentamos
              encontrar los sentimientos, sensaciones y anhelosque definen y
              completan las expectativas puestas en cada idea personal.
            </p>
            <h4 class=" my-1 font-semibold text-grey-1">TRAYECTORIA</h4>
            <p class="text-grey-1">
              A partir del año 1998 y desde la ciudad de Bariloche, en Rio
              Negro, Argentina, Martín Bajda y Asociados trabaja para hacer
              realidad los proyectos de sus clientes locales y extranjeros,
              acompañándolos y comprometiendo todo su conocimiento profesional y
              voluntad personal en cada nuevo planteo arquitectónico.
            </p>
          </nuestro-estudio-right>
        </article>
      </section>
    </main>
  );
}

export default Main;
