'use client'

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { getProjectById } from '@/Utils/project-crud';
import EditProjectForm from '@/Components/Forms/editProyectForm';

const EditProjectPage = () => {


  
  

  return (
      
      <EditProjectForm  />
 
  );
};

export default EditProjectPage;
