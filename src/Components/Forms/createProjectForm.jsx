"use client";
import { createProject } from "@/Utils/project-crud";
import React, { useState } from "react";
import SecondaryButton from "../Buttons/SecondaryButton";
import FormImages from "./formImages";
import SignOut from "../Auth/SignOut";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


const CreateProjectForm = () => {
  const { data: session } = useSession();
  if(!session){
    redirect("/proyectos")
  }
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const [loader, setLoader] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [projectNotCreated, setProjectNotCreated] = useState(false);
  const [formData, setFormData] = useState({
    place: "",
    title: "",
    area: "",
    bathrooms: "",
    description: "",
    garage: "",
    images: [],
    rooms: "",
    type: "",
    year: ""
  });

  const formDataInitialValue = {
    place: "",
    title: "",
    area: "",
    bathrooms: "",
    description: "",
    garage: "",
    images: [],
    rooms: "",
    type: "",
    year: ""
  };
  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador del envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    const mainImage = [];
    try {
      setProjectCreated(false);
      setProjectNotCreated(false);
      setLoader(true);

      const updatedFormData = { ...formData, images: [] };
      if (imageFile[0]) {
        imageFile[0].main = true;
        mainImage.push(imageFile[0]);
      }

      const otherImages = images.filter((image) => image.secure_url);

      if (mainImage.length > 0) {
        updatedFormData.images.push(...mainImage);
      }

      if (otherImages.length > 0) {
        updatedFormData.images.push(...otherImages);
      }

      const response = await createProject(updatedFormData);

      if (response) {
        setProjectCreated(true);
        setLoader(false);
        setFormData(formDataInitialValue);
        setImageFile({});
        setImages([]);
      } else {
        setLoader(false);
        setProjectNotCreated(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
      <SignOut/>
      <h1 className="mt-4 mb-6 pl-1 text-2xl text-custom-green sm:pl-24 lg:text-3xl">
        Crea el Proyecto
      </h1>
      <form
        className=" w-full flex flex-col justify-around m-auto border-4 h-fit p-2 border-custom-green sm:w-3/4 lg:w-1/2 lg:mb-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título del Proyecto"
          className=" border rounded  focus:outline-custom-green py-1 pl-1 h-12"
          required
        />
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          placeholder="Lugar: Pvcia, Ciudad"
          className="border rounded  focus:outline-custom-green py-1 pl-1 h-10 mt-1"
          required
        />
        <input
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Tamaño en mts cuadrados"
          className="border rounded  focus:outline-custom-green py-1 pl-1 h-10 mt-1"
          required
        />
        <FormImages
          images={images}
          imageFile={imageFile}
          setImages={setImages}
          setImageFile={setImageFile}
        />
        <input
          type="number"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          placeholder="Cant. Habitaciones"
          className="border rounded  focus:outline-custom-green py-1 pl-1 h-10 mt-1"
          required
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Año de Construcción"
          className="border rounded  focus:outline-custom-green py-1 pl-1 h-10 mt-1"
          required
        />
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe la Propiedad"
          className="mt-2 p-2 border rounded-md w-full min-h-[150px] resize-none 
        focus:outline-custom-green"
          required
        />
        <button
          className="bg-custom-green w-fit m-auto mt-1 py-1 px-2 border rounded text-white outline transition-all duration-700 hover:text-custom-green hover:bg-transparent hover:outline-2 hover:outline-custom-green "
          type="submit"
        >
          {!loader ? "Crear Proyecto" : "Creando..."}
        </button>
        {projectCreated && (
          <article className="flex flex-col items-center w-full">
            <p className="text-xl mt-2 py-2 text-custom-green text-center">
              Genial, tu protecto de ha creado con Exito!
            </p>
            <SecondaryButton href="/proyectos" text="Ir a Galeria" style="" />
          </article>
        )}

        {projectNotCreated && (
          <article className="flex flex-col items-center w-full">
            <p className="text-xl mt-2 py-2 text-red-600 text-center">
              Hubo un problema al crear el Proyecto!
            </p>
            <SecondaryButton href="/" text="Ir a home" style="" />
          </article>
        )}
      </form>
    </>
  );
};

export default CreateProjectForm;
