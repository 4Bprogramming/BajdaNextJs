import React from "react";
import Link from "next/link";
import Image from "next/image";

function Card(props) {
  return (
    <article className={` flex flex-col h-72 w-60 border-4 `}>
       <Image
        src={props.img}
        width={200}
        height={200}
        alt="Imagen de fondo"
       
      />

      <header>
        <h1>{props.title}</h1>
      </header>
      <main>
      <Link href={props.link} passHref legacyBehavior >Ver</Link>
      </main>
      <footer>
        <h4>Area</h4>
        <p>{props.area}</p>
        <h4>Año</h4>
        <p>{props.year}</p>
        <h4>Ubicación</h4>
        <p>{props.place}</p>
      </footer>
    </article>
  );
}

export default Card;
