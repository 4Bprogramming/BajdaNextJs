"use client";
import React, { useState, useEffect } from "react";
import { getProjects } from "./firebaseEndpoints/getProjects";


function page() {
  const [projects, setProjects] = useState([]);
  

  useEffect(() => {
    getProjects(projectsData => {setProjects(projectsData);});
  }, []);

  return <div>Soy Proyectos</div>;
}

export default page;
