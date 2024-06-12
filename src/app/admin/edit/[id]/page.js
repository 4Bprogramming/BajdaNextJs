'use client'

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { getProjectById } from '@/Utils/project-crud';
import EditProjectForm from '@/Components/Forms/editProyectForm';

const EditProjectPage = () => {


  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <EditProjectForm  />
    </div>
  );
};

export default EditProjectPage;
