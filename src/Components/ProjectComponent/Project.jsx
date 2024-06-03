
'use client'
import React from 'react'
import { getProjectById } from '@/app/proyectos/firebaseEndpoints/getProjectId'
import { usePathname } from 'next/navigation'
import { suspend } from "suspend-react";


async function getProject() {
  try {
    const projectId = usePathname().split("/").at(2);
    const project = getProjectById(projectId);
    return project;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

function Project() {
    let project = suspend(getProject);
  return (
    <div>{project.title}</div>
  )
}

export default Project