import React from "react";
import Image from "next/image";
import mainBanner from "../../../public/resources/mainImage.jpg";
import nuestroEstudio from "../../../public/resources/nuestroEstudio.jpg";
import GreenButton from "../Buttons/GreenButton";
import SendEmail from "../Services/SendEmail";
import whatsapp from "@/assets/whatsapp.svg"
import '../../styles/globals.css'

function Main() {
  return (
    <>
      <main className="pt-32" id="home">
    
        <section className="relative">
          <div className="w-full h-44  overflow-hidden sm:h-56 md:h-72 lg:h-96 xl:h-[30rem]">
            <Image
              src={mainBanner}
              alt="main banner "
              // style={{ width: "100%", height: "auto", opacity: "85%" }}
              
            />
          </div>
          <article className="absolute top-6 left-2 sm:top-9 md:top-20 lg:left-6 ">
            <p className="text-white md:text-4xl lg:text-5xl">Arquitecto</p>
            <h1 className="text-white max-320:text-3xl text-4xl md:text-7xl lg:text-8xl ">
              <span className="text-custom-green max-320:text-3xl text-5xl md:text-7xl lg:text-9xl">
                Arq.
              </span>{" "}
              Martín Bajda
            </h1>
            <p className="text-white md:text-4xl lg:text-4xl">
              Estudio de Arquitectura
            </p>
          </article>
        </section>
        <section className="flex flex-col items-center" id="nosotros">
          <GreenButton  href="/proyectos" text="Proyectos" style="mt-10 mb-10" />
         
          <h2 className=" text-5xl text-custom-green" >Nosotros</h2>
        </section>
        <a href="https://api.whatsapp.com/send?phone=51991341292">
      <Image src={whatsapp} className="btnFlotante" />
      </a>
        <section>
          <article className="grid grid-cols-1  md:grid-cols-2 md:mb-14 md:mt-8 md:mr-32">
            <nuestro-estudio-left class="block p-2 md:p-6">
              <Image src={nuestroEstudio} alt="nuestro estudio" />
            </nuestro-estudio-left>
            <nuestro-estudio-right class="block relative p-2 md:p-6">
              <h3 className="text-3xl font-semibold uppercase mb-2">
                Nuestro
                <span className=" text-grey-2 after:content-[''] after:absolute after:bg-custom-green after:h-1 after:w-16 after:top-10 after:left-2 md:after:top-[60px] md:after:left-[26px]">
                  Estudio
                </span>
              </h3>
              <p className="text-grey-1">
                Partiendo de la premisa de que la presencia humana da
                significado a la arquitectura, acompañamos a nuestros clientes
                en cada etapa del proyecto, dando respuestas a cada una de las
                necesidades planteadas.
              </p>
              <p className="text-grey-1">
                A través del contacto constante con nuestros clientes,
                intentamos encontrar los sentimientos, sensaciones y anhelosque
                definen y completan las expectativas puestas en cada idea
                personal.
              </p>
              <h4 className=" my-1 font-semibold text-grey-1">TRAYECTORIA</h4>
              <p className="text-grey-1">
                A partir del año 1998 y desde la ciudad de Bariloche, en Rio
                Negro, Argentina, Martín Bajda y Asociados trabaja para hacer
                realidad los proyectos de sus clientes locales y extranjeros,
                acompañándolos y comprometiendo todo su conocimiento profesional
                y voluntad personal en cada nuevo planteo arquitectónico.
              </p>
            </nuestro-estudio-right>
          </article>
        </section >
      </main>

      <h2 className="text-5xl text-custom-green text-center  bg-custom-contact md:pb-8 md:pt-8" id="contacto">Contacto</h2>
      <SendEmail/>
    </>
  );
}

export default Main;  
