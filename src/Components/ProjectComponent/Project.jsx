"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EmblaCarousel from "../Carousel/EmblaCarousel";
import '../Carousel/embla.css'
import { getProjectById } from "@/Utils/project-crud";
import EmblaCarouselSkeleton from "../Skeletons/EmblaCarouselSkeleton";
import SecondaryButton from "../Buttons/SecondaryButton";

function Project() {
  const projectId = usePathname().split("/").at(2);
  const [project, setProject] = useState({});
  const OPTIONS = { dragFree: true }

  async function  getProject(projectId){
    const response = await getProjectById(projectId)
    setProject(response)
    
  }
  useEffect(() => {
   
    getProject(projectId)
  }, []);
  
  return (
    <section>
      <div className="w-full p-8 border-l-[3px] border-l-custom-green ml-4 mt-4">
        <h1 className="text-2xl">{project.title}</h1>
        <p className=" capitalize">{project.place}</p>
      </div>
      {/* carousel */}
      {project?.images?.length > 0 ? 
       <EmblaCarousel slides={project.images} options={OPTIONS} /> : <EmblaCarouselSkeleton/>}
       <SecondaryButton href={`/admin/edit/${projectId}` }text="Editar" style="my-3 ml-1 lg:ml-60" />

    </section>
  );
}

export default Project;
