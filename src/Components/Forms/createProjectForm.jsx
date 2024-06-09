"use client";
import { createProject } from "@/Utils/project-crud";
import React, { useState } from "react";
import { getImageUrls } from "@/Utils/getImageUrls";

const CreateProjectForm = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    place: "",
    title: "",
    area: "",
    bathrooms: "",
    description: "",
    garage: "",
    image: "",
    images: [],
    rooms: "",
    type: "",
    year: ""
  });

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
    try {
      const imageURLs = await getImageUrls(file, files);
      const updatedFormData = { ...formData };

      if (imageURLs) {
        updatedFormData.image = imageURLs.shift(); 
        updatedFormData.images = imageURLs; 
        setFormData(updatedFormData);
      }
      const result = await createProject(JSON.stringify(updatedFormData));
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="place"
        value={formData.place}
        onChange={handleChange}
        placeholder="Place"
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="number"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Area"
      />
      <input
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        placeholder="Bathrooms"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="garage"
        value={formData.garage}
        onChange={handleChange}
        placeholder="Garage"
      />
      <label>PORTADA</label>
      <input
        type="file"
        accept="image/*"
        name="image"
        placeholder="Portada"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <label>IMAGENES</label>
      <input
        type="file"
        name="images"
        accept="image/*"
        placeholder="Imagenes"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
      />
      <input
        type="number"
        name="rooms"
        value={formData.rooms}
        onChange={handleChange}
        placeholder="Rooms"
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
      />
      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateProjectForm;
