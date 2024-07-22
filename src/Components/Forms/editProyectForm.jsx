"use client"
import { useEffect, useState } from "react";
import { deleteImageCloudinary } from "@/Utils/cloudinary-crud";
import { usePathname, useRouter } from "next/navigation";
import { getProjectById, updateProject } from "@/Utils/project-crud";
import SecondaryButton from "../Buttons/SecondaryButton";
import FormImages from "./formImages";
import CubeLoader from "../Loaders/CubeLoader";
import PreloadImages from "../Loaders/PreloadImages";
import SignOut from "../Auth/SignOut";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import OnlyConfirmationModal from "../Confirmation modal/onlyConfirmationModal";

const EditProjectForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if(!session){
    redirect("/proyectos")
  }
  
  const projectId = usePathname().split("/").at(3);
  const [project, setProject] = useState(null);
  
  const initialFormState = {
    place: "",
    title: "",
    area: 0,
    bathrooms: 0,
    description: "",
    garage: 0,
    image: "",
    images: [],
    rooms: 0,
    type: "",
    year: 0
  };
  const [formData, setFormData] = useState(initialFormState);
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const [deleteImageDB, setDeleteImageDB] = useState([]);
  const [loader, setLoader] = useState(false);
  const [projectEdited, setProjectEdited] = useState(false);
  const [projectNotEdited, setProjectNotEdited] = useState(false);
  useEffect(() => {
    // Simula la obtención de datos del proyecto
    async function getProject(projectId) {
      const response = await getProjectById(projectId);
      setProject(response);
    }
    getProject(projectId);
  }, [projectId]);
  /* usar dos useEffect separados permite manejar de manera clara y efectiva la obtención de datos y la sincronización del estado del formulario, mejorando la claridad y la mantenibilidad del código.*/
  useEffect(() => {
    if (project) {
      setFormData({ ...project });
      const mainImages = project.images.filter((image) => image.main === true);
      const nonMainImages = project.images.filter(
        (image) => image.main === false
      );
      setImageFile(mainImages[0]);
      setImages(nonMainImages);
    }
  }, [project]);
  const reDirectOK= ()=>{
    router.push(`/proyectos/${projectId}`);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = project.id;
    let updatedProject = {
      ...formData,
      images: []
    };
    const mainImage = [];
    setProjectEdited(false);
    setProjectNotEdited(false);
    try {
      setLoader(true);
      if (imageFile[0]) {
        imageFile[0].main = true;
        mainImage.push(imageFile[0]);
      }
      const otherImages = images.filter((image) => image.secure_url);
      if (mainImage.length > 0) {
        updatedProject.images.push(...mainImage);
      }
      if (otherImages.length > 0) {
        updatedProject.images.push(...otherImages);
      }
      const response = await updateProject(updatedProject, id);
      if (response) {
        setProjectEdited(true);
        setLoader(false);
        setFormData(initialFormState);
        setImageFile({});
        setImages([]);
      } else {
        setLoader(false);
        setProjectNotEdited(true);
      }
      if (imageFile.secure_url) {
        deleteImageDB.push(imageFile[0]);
      }
      if (deleteImageDB.length > 0) {
        const cloudinaryImageIds = deleteImageDB
          .map((imageIdDelete) => imageIdDelete.cloudinaryID)
          .flat();
        await deleteImageCloudinary(cloudinaryImageIds, id);
      }
      // ('Project updated successfully', response);
    } catch (error) {
      console.error("Error updating project", error);
    }
  };
  return (
    <>
    <SignOut/>
    {
      project && <PreloadImages imageUrls={project?.images}/> 
    }
    
      <h1 className="mt-4 mb-6 pl-1 text-2xl text-custom-green sm:pl-24 lg:text-3xl">
        Edita el proyecto
      </h1>
      {!project ? (
        <CubeLoader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-around m-auto border-4 h-fit p-2 border-custom-green sm:w-3/4 lg:w-1/2 lg:mb-6"
        >
          {/* Form fields */}
          <div>
            <label className="block text-xl font-medium text-custom-green ">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded  focus:outline-custom-green py-1 pl-1 h-12"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-custom-green">
              Ubicación
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full border rounded  focus:outline-custom-green py-1 pl-1 h-12"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-custom-green">
              Cant. mts<sup>2</sup>
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12"
              required
            />
          </div>
          <FormImages
            images={images}
            imageFile={imageFile}
            setImages={setImages}
            setImageFile={setImageFile}
            setDeleteImageDB={setDeleteImageDB}
            deleteImageDB={deleteImageDB}
          />
          <div>
            <label className="block text-xl font-medium text-custom-green mt-4">
              Cant. de Habitaciones
            </label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-custom-green">
              Año de Construcción
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-custom-green">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded-md  min-h-[150px] resize-none 
          focus:outline-custom-green"
            required
            />
          </div>
          <button
            type="submit"
            className="bg-custom-green text-white px-4 py-2 rounded w-fit m-auto outline hover:outline-2 hover:outline-custom-green hover:bg-transparent hover:text-custom-green transition-all duration-700 "
          >
            {!loader ? "Editar Proyecto" : "Editando..."}
          </button>
          {projectEdited && (
            // <article className="flex flex-col items-center w-full">
            //   <p className="text-xl mt-2 py-2 text-custom-green text-center">
            //     Genial, tu protecto se ha editado con Exito!
            //   </p>
            //   <SecondaryButton href="/proyectos" text="Ir a Galeria" style="" />
            // </article>
            <OnlyConfirmationModal message='El proyecto fue editado correctamente'  onCloseReDirect={reDirectOK}/>
          )}
          {projectNotEdited && (
            <article className="flex flex-col items-center w-full">
              <p className="text-xl mt-2 py-2 text-red-600 text-center">
                Hubo un problema al editar el Proyecto!
              </p>
              <SecondaryButton href="/" text="Ir a home" style="" />
            </article>
          )}
        </form>
      )}
    </>
  );
};
export default EditProjectForm;
