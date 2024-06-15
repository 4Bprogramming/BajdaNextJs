import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
    deleteImageCloudinary,
    getImageCloudinaryObject
  } from "@/Utils/cloudinary-crud";

function FormImages({ imageFile, images, setImages, setImageFile, setDeleteImageDB, deleteImageDB }) {
 
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
        const otherImages = images.filter((_, i) => i !== index).flat();
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
  
    return (
      <>
         <div>
        <label className="block text-xl font-medium text-custom-green my-2">
          Imagen Principal
        </label>
        <div className=" flex ">
          {Object.keys(imageFile).length > 0 || imageFile.length>0? (
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
      </>
    );
  }
  
  export default FormImages;