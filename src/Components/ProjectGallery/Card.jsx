"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {getProjects} from "@/Utils/project-crud";
import CardSkeleton from "../Skeletons/CardSkeleton";
import PlusCard from "./PlusCard";
import PreloadImages from "../Loaders/PreloadImages";
import { useSession } from "next-auth/react";
function Card() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log('proeyectos==>', projects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <CardSkeleton />;
  }
  
  return (
    <>
    {
      projects && <PreloadImages imageUrls={projects.images?.Filter((image)=>image.main===true)} /> 
    }
    
    <div className="grid grid-cols-1 m-auto max-w-5xl gap-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 ">

      {session?.user && <PlusCard/>}
      {
        projects?.map((project) => (
          <article
            key={project.id}
            className={` flex flex-col w-[98%] justify-evenly border-4 items-center mx-1 max-w-[350px]`}
          >
            <header className="block relative w-full h-64">
              
              <Image
                src={project.images?.find(image => image.main)?.url}
                fill
                alt="Imagen de una casa"
                className="object-cover"
                sizes="100%"
                
                
              />
            </header>
            <main className="w-full">
              <h1 className=" text-xl text-center capitalize">
                {project.title}
              </h1>
              <Link
                href={`/proyectos/${project.id}`}
                className=" block p-1 ml-3 w-fit after:content-['>'] after:align-middle hover:underline hover:underline-offset-2"
              >
                Ver
              </Link>
            </main>
            <footer className="flex place-content-evenly w-full ">
              <div className="w-1/3 flex flex-col justify-center bg-custom-green text-black text-center">
                <h4 className=" text-[20px]">Area</h4>
                <p>{project.area}m<sup>2</sup></p>
              </div>
              <div className="w-1/3 flex flex-col justify-center bg-custom-green text-black text-center">
                <h4 className=" text-[20px]">Año</h4>
                <p>{project.year}</p>
              </div>
              <div className="w-2/3 flex flex-col justify-center bg-custom-green text-black text-center">
                <h4 className=" text-[20px]">Ubicación</h4>
                <p className="capitalize pr-1">{project.place}</p>
              </div>
            </footer>
          </article>
        ))}
    </div>
    </>
  );
}

export default Card;
