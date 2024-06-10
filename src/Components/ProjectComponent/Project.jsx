"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EmblaCarousel from "../Carousel/EmblaCarousel";
import '../Carousel/embla.css'
import { getProjectById } from "@/Utils/project-crud";

function Project() {
  const projectId = usePathname().split("/").at(2);
  const [project, setProject] = useState({});
  const OPTIONS = { dragFree: true }

  async function  getProject(projectId){
    const response = await getProjectById(projectId)
    setProject(response)
    
  }
  useEffect(() => {
    //hacer un fetch al endpoint
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
       <EmblaCarousel slides={project.images} options={OPTIONS} /> : <p>Aca va un Skeleton</p>}

    </section>
  );
}

export default Project;
