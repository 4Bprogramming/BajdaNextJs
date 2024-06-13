"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EmblaCarousel from "../Carousel/EmblaCarousel";
import "../Carousel/embla.css";
import { getProjectById } from "@/Utils/project-crud";
import EmblaCarouselSkeleton from "../Skeletons/EmblaCarouselSkeleton";
import SecondaryButton from "../Buttons/SecondaryButton";

function Project() {
  const projectId = usePathname().split("/").at(2);
  const [project, setProject] = useState({});
  const OPTIONS = { dragFree: true };

  async function getProject(projectId) {
    const response = await getProjectById(projectId);
    setProject(response);
  }
  useEffect(() => {
    getProject(projectId);
  }, []);

  return (
    <section>
      <SecondaryButton
        href={"/proyectos"}
        text="Atrás"
        style="my-3 ml-1 lg:ml-12"
      />
      <SecondaryButton
        href={`/admin/edit/${projectId}`}
        text="Editar"
        style="my-3 ml-1"
      />
       <article className="w-full pl-3  lg:pl-12  lg:mt-4">

      <div className="w-full p-8 border-l-[3px] border-l-custom-green">
        <h1 className="text-2xl">{project.title}</h1>
        <p className=" capitalize">{project.place}</p>
      </div>
       </article>
      {/* carousel */}
      {project?.images?.length > 0 ? (
        <EmblaCarousel slides={project.images} options={OPTIONS} />
      ) : (
        <EmblaCarouselSkeleton />
      )}
      <article className="w-full pl-3  mb-4 lg:pl-12">
        <div className="w-full p-4 border-l-[3px] border-l-custom-green">
          <h2 className="text-xl">Detalles</h2>
          <p>
            <span className="font-bold">Ubicación:</span>{" "}
            <span className="capitalize">{project.place}</span>
          </p>
          <p>
            <span className="font-bold">Tipo:</span>{" "}
            <span className="capitalize">{project.type}</span>
          </p>
          <p>
            <span className="font-bold">Área:</span> {project.area}m<sup>2</sup>
          </p>
          <p>
            <span className="font-bold">Habitaciones:</span> {project.rooms}
          </p>
          <p>
            <span className="font-bold">Cant. Baños:</span> {project.bathrooms}
          </p>
          <p>
            <span className="font-bold">Garage:</span> {project.garage}
          </p>
          <p>
            <span className="font-bold">Descripción:</span>{" "}
            {project.description}
          </p>
        </div>
      </article>
    </section>
  );
}

export default Project;
