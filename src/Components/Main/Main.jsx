import React from "react";
import Image from "next/image";
import mainBanner from "../../../public/resources/mainImage.jpg";

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
      <section class="bg-fuchsia-400 h-32">
        <p class="pt-10">Complete Second Section</p>
      </section>
    </main>
  );
}

export default Main;
