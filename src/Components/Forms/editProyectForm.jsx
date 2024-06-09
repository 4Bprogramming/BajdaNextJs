import { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const EditProjectForm = ({ project, onSubmit }) => {
  const [formData, setFormData] = useState({ ...project });
  const [imageFile, setImageFile] = useState(null);
  const [images, setImages] = useState(project.images.map(image => ({ file: null, url: image })));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({ file, url: URL.createObjectURL(file) }));
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...formData,
      image: imageFile,
      images: images.map(image => image.file || image.url),
    };
    onSubmit(updatedProject);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Place</label>
        <input type="text" name="place" value={formData.place} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Area</label>
        <input type="number" name="area" value={formData.area} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Garage</label>
        <input type="number" name="garage" value={formData.garage} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Main Image</label>
        <input type="file" name="image" onChange={handleImageChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-2 flex items-center">
          <label className="cursor-pointer">
            <FaPlus className="text-blue-500" size={24} />
            <input type="file" multiple name="images" onChange={handleImagesChange} className="hidden" />
          </label>
        </div>
        <div className="mt-2 flex flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="relative m-2">
              <img src={image.url} alt={`Project Image ${index}`} className="w-20 h-20 object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rooms</label>
        <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} className="mt-1 block w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Project</button>
    </form>
  );
};

export default EditProjectForm;
