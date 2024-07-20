"use client";
import React, { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EmblaCarousel from "../Carousel/EmblaCarousel";
import "../Carousel/embla.css";
import { getProjectById } from "@/Utils/project-crud";
import EmblaCarouselSkeleton from "../Skeletons/EmblaCarouselSkeleton";
import SecondaryButton from "../Buttons/SecondaryButton";
import DeleteButton from "../Buttons/DeleteButton";
import ConfirmationModal from "../Confirmation modal/confirmationModal";
import { useRouter } from "next/navigation";
import { deleteProjectId } from "@/Utils/project-crud";
import PreloadImages from "../Loaders/PreloadImages";
import { useSession } from "next-auth/react";

function Project() {
  const router = useRouter();
  const projectId = usePathname().split("/").at(2);
  const [project, setProject] = useState({});
  const OPTIONS = { dragFree: true };
  const [modal, setModal] = useState(false);
  const { data: session } = useSession();

  const changeModalStatus = () => {
    setModal((prevModal) => !prevModal);
  };

  const message = "¿Esta seguro de borrar el proyecto completo?";
  const handleDelete = async () => {
    const numberProjectId = Number(projectId);
    const response = await deleteProjectId(null, numberProjectId);
  };
  const onCloseReDirect = () => {
    router.push("/proyectos");
  };
  const okMessage = "El proyecto fue Eliminado";

  async function getProject(projectId) {
    const response = await getProjectById(projectId);
    setProject(response);
  }
  useEffect(() => {
    getProject(projectId);
  }, []);

  return (
    <>
    {
      project && <PreloadImages imageUrls={project?.images}/> 
    }
      
      <section>
        <article className="flex my-4 w-[90%] m-auto">
          <div className="flex w-full gap-3">
            <SecondaryButton href={"/proyectos"} text="Atrás" />
            {session?.user && (
              <SecondaryButton
                href={`/admin/edit/${projectId}`}
                text="Editar"
              />
            )}
          </div>
          <div className="flex w-full justify-end">
            {session?.user && (
              <DeleteButton onClick={changeModalStatus} text="Eliminar" />
            )}
          </div>
        </article>
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
        <article className="w-full pl-3  mb-4 md:max-w-[45rem] md:m-auto md:mb-4 md:pl-0">
          <div className="w-full p-4 border-l-[3px] border-l-custom-green">
            <h2 className="text-xl">Detalles</h2>
            <p className="mb-2 md:mb-1">
              <span className="font-bold">Ubicación:</span>{" "}
              <span className="capitalize">{project.place}</span>
            </p>
            <p className="mb-2 md:mb-1">
              <span className="font-bold">Área:</span> {project.area}m
              <sup>2</sup>
            </p>
            <p className="mb-2 md:mb-1">
              <span className="font-bold">Habitaciones:</span> {project.rooms}
            </p>
            <p className=" max-w-[700px] text-justify">
              <span className="font-bold">Descripción:</span>{" "}
              {project.description}
            </p>
          </div>
          {modal && (
            <ConfirmationModal
              message={message}
              okMessage={okMessage}
              onAccept={handleDelete}
              onCloseReDirect={onCloseReDirect}
              id={projectId}
              modal={changeModalStatus}
            />
          )}
        </article>
      </section>
    </>
  );
}

export default Project;
