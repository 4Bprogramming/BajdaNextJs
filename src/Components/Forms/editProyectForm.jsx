import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
  deleteImageCloudinary,
  getImageCloudinaryObject
} from "@/Utils/cloudinary-crud";
import { usePathname } from "next/navigation";
import { getProjectById, updateProject } from "@/Utils/project-crud";

const EditProjectForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const imageURLs = await getImageCloudinaryObject(e.target.files[0]);
    setImageFile(imageURLs);
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = await getImageCloudinaryObject(0, files);
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const deleteToImage = images.filter((_, i) => i === index)[0];
    const otherImages = images.filter((_, i) => i === index).flat();
    if (deleteToImage.main === false) {
      setDeleteImageDB([...deleteImageDB, deleteToImage]);
      return setImages(images.filter((_, i) => i !== index));
    } else {
      deleteImageCloudinary(deleteToImage.public_id);
      setImages(otherImages);
    }
  };

  const handleRemoveMainImage = () => {
    if (imageFile.cloudinaryID) {
      setDeleteImageDB([...deleteImageDB, imageFile]);
      setImageFile("");
    } else {
      deleteImageCloudinary(imageFile[0].public_id);
      setImageFile("");
    }
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
        setFormData(formDataInitialValue);
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

  if (!project) {
    return <div>SKELETON DE EDIT</div>;
  }

  return (
    <>
     <h1 className="mt-4 mb-6 pl-1 text-2xl text-custom-green sm:pl-24 lg:text-3xl">
        Edita el proyecto
      </h1>
    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-around m-auto border-4 h-fit p-2 border-custom-green border-t-transparent sm:w-3/4 lg:w-1/2 lg:mb-6">
      {/* Form fields */}
      <div>
        <label className="block text-xl font-medium text-custom-green ">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-1 h-12"
          />
      </div>
      <div>
        <label className="block text-xl font-medium text-custom-green">Ubicación</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-1 h-12"
          />
      </div>

      <div>
        <label className="block text-xl font-medium text-custom-green">Cant. mts<sup>2</sup></label>
        <input
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12"
          />
      </div>
      <div>
        <label className="block text-xl font-medium text-custom-green">
          Cant. De Baños
        </label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12 "
          />
      </div>

      <div>
        <label className="block text-xl font-medium text-custom-green">
          Cant. de Garages
        </label>
        <input
          type="number"
          name="garage"
          value={formData.garage}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12"
          />
      </div>
      <div>
        <label className="block text-xl font-medium text-custom-green my-2">
          Imagen Principal
        </label>
        <div className=" flex ">
          {imageFile ? (
            <div className="relative">
              <img
                src={
                  typeof imageFile === "object" && imageFile.main
                  ? imageFile.url
                  : (Array.isArray(imageFile) &&
                  imageFile[0] &&
                  imageFile[0].secure_url) ||
                  null
                }
                alt="Project Image"
                className="object-cover h-36 w-full md:h-52"
                />
              <button
                type="button"
                onClick={handleRemoveMainImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                <FaTrash />
              </button>
            </div>
          ) : (
            <input
            type="file"
            accept="image/*"
            name="image"
            placeholder="Portada"
            onChange={handleImageChange}
            />
          )}
        </div>
      </div>
      <div>
        <label className="block text-xl font-medium text-custom-green mt-8 mb-2">
          Imagenes 
        </label>
        <div className="mt-2 flex items-center">
          <label className="cursor-pointer">
            <FaPlus className="text-blue-500 mb-2 hover:text-custom-green" size={30} />
            <input
              type="file"
              multiple
              name="images"
              onChange={handleImagesChange}
              className="hidden"
              />
          </label>
        </div>
        <div className=" grid grid-cols-2 gap-1 row md:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={
                  typeof image === "object" && image.secure_url
                  ? image.secure_url
                  : image.url
                }
                alt={`Imagen del proyecto`}
                className="object-cover h-36 w-full md:h-48"
                />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xl font-medium text-custom-green mt-4">Cant. de Habitaciones</label>
        <input
          type="number"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12"
          />
      </div>
      <div>
        <label className="block text-xl font-medium text-custom-green">Tipo de Vivienda</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-1 h-12"
          />
      </div>
      <div>
        <label className="block text-xl font-medium text-custom-green">Año de Construcción</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full border rounded  focus:outline-custom-green py-1 pl-5 h-12"
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
          />
      </div>
      <button
        type="submit"
        className="bg-custom-green text-white px-4 py-2 rounded w-fit m-auto outline hover:outline-2 hover:outline-custom-green hover:bg-transparent hover:text-custom-green transition-all duration-700 "
        >
       {!loader ? "Editar Proyecto" : "Editando..."}
      </button>
      {projectEdited && (
          <article className="flex flex-col items-center w-full">
            <p className="text-xl mt-2 py-2 text-custom-green text-center">
              Genial, tu protecto se ha editado con Exito!
            </p>
            <SecondaryButton href="/proyectos" text="Ir a Galeria" style="" />
          </article>
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
    </>
  );
};

export default EditProjectForm;
