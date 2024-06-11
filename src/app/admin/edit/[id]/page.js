'use client'

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { getProjectById } from '@/Utils/project-crud';
import EditProjectForm from '@/Components/Forms/editProyectForm';

const EditProjectPage = () => {
  const projectId = usePathname().split("/").at(3);
  const [project, setProject] = useState(null);
  

  async function  getProject(projectId){
    const response = await getProjectById(projectId)
    setProject(response)
    
  }
  useEffect(() => {
    //hacer un fetch al endpoint
    getProject(projectId)
  }, []);

  
  const handleSubmit = async (updatedProject) => {
    const id = router.query.id;

    try {
      const formData = new FormData();
      for (const key in updatedProject) {
        if (Array.isArray(updatedProject[key])) {
          updatedProject[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, updatedProject[key]);
        }
      }

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        router.push(`/projects/${id}`);
      } else {
        console.error('Error updating project');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <EditProjectForm project={project} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditProjectPage;
