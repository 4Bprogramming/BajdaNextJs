"use client";
import React, { useEffect, useState } from "react";
import { getProjectById } from "@/app/proyectos/firebaseEndpoints/getProjectId";
import { usePathname } from "next/navigation";

function Project() {
  const projectId = usePathname().split("/").at(2);
  const [project, setProject] = useState({});
  useEffect(() => {
    async function getProject() {
      const response = await getProjectById(projectId);
      setProject(response);
    }
    getProject();
  }, []);

  return (
    <section>
      <div className="w-full p-8 border-l-[3px] border-l-custom-green ml-4 mt-4">
        <h1 className="text-2xl">{project.title}</h1>
        <p className=" capitalize">{project.place}</p>
      </div>
      







    </section>
  );
}

export default Project;
