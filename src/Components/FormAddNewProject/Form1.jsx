'use client'
import { createProject } from '@/Utils/project-crud';
import React, { useState } from 'react';

const FormComponent = () => {
  // Define el estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    place: '',
    title: '',
    area: '',
    bathrooms: '',
    description: '',
    garage: '',
    image: '',
    images: [],
    rooms: '',
    type: '',
    year: ''
  });

  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const urls = files.map(file => URL.createObjectURL(file));
    if(e.target.name==="images"){
        setFormData({
          ...formData,
          images: urls, // Almacena las URLs de los archivos seleccionados
        });
    }
    else if(e.target.name==="image"){
        setFormData({
            ...formData,
            image: urls.join(), // Almacena las URLs de los archivos seleccionados
        });
        
    }
};
console.log("url image==>", formData.image);

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes enviar formData a tu endpoint
    try {
        
      const result = await createProject(formData);
      console.log(result);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error submitting form:', error);
      // Manejar el error
    }
  };

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
            className="controls"
            type="file"
            // value={image}
            accept="image/*"
            name="image"
            placeholder="Portada"
            onChange={handleFileChange}
          />
          <br />
          <label>IMAGENES</label>
          <input
            className="controls"
            type="file"
            // value={images}
            name="images"
            accept="image/*"
            placeholder="Imagenes"
            onChange={handleFileChange}
            multiple
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

export default FormComponent;