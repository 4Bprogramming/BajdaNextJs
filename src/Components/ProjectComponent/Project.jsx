
'use client'
import React, { useEffect, useState } from 'react'
import { getProjectById } from '@/app/proyectos/firebaseEndpoints/getProjectId'
import { usePathname } from 'next/navigation'

function Project() {
  const projectId = usePathname().split("/").at(2);
  const [project, setProject] = useState({});
  useEffect(()=>{
    async function getProject (){
      const response = await getProjectById(projectId);
      setProject(response)
    } 
    getProject();
    
  },[]);
 
  return (
    <div>{project.title}</div>
  )
}

export default Project