
import { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { deleteImageCloudinary, getImageCloudinaryObject } from '@/Utils/cloudinary-crud';
import { usePathname } from 'next/navigation';
import { getProjectById, updateProject } from '@/Utils/project-crud';

const EditProjectForm = () => {
  const projectId = usePathname().split("/").at(3);
  const [project, setProject] = useState(null);
    // Define all possible fields in the initial state to prevent uncontrolled to controlled warning
  const initialFormState = {
    place: '',
    title: '',
    area: 0,
    bathrooms: 0,
    description: '',
    garage: 0,
    image: '',
    images: [],
    rooms: 0,
    type: '',
    year: 0,
  };
 // Verifica que project esté definido, si no, inicializa con un objeto vacío
 const safeProject = project || {};
 // Inicializa las imágenes con un array vacío si no están definidas
 const projectImages = safeProject.images || [];
 const [formData, setFormData] = useState(initialFormState);
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const [deleteImageDB, setDeleteImageDB]=useState([])

  console.log('images==>', images);


  useEffect(() => {
    // Simula la obtención de datos del proyecto
    async function  getProject(projectId){
      const response = await getProjectById(projectId)
      setProject(response)
    }
    getProject(projectId)
  }, [projectId]);

  /* usar dos useEffect separados permite manejar de manera clara y efectiva la obtención de datos y la sincronización del estado del formulario, mejorando la claridad y la mantenibilidad del código.*/
  useEffect(() => {
    if (project) {
      setFormData({ ...project })
      const mainImages = project.images.filter(image => image.main === true);
      const nonMainImages = project.images.filter(image => image.main === false);;
      setImageFile(mainImages[0])
      setImages(nonMainImages)
    }
  }, [project]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => { //esta ok
    console.log('target==>', e.target.files[0]);
    const imageURLs = await getImageCloudinaryObject(e.target.files[0]);
    console.log('imageURL', imageURLs);
    setImageFile(imageURLs);
  };

  const handleImagesChange = async(e) => {
    
    const files = Array.from(e.target.files);
  
    const newImages= await getImageCloudinaryObject(0,files) ;

    console.log('newImages',newImages);
    
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const deleteToImage=images.filter((_, i) => i === index)[0]
    const otherImages= images.filter((_, i) => i === index).flat()
    console.log("deletetoI,age en remove",deleteToImage);
    if(deleteToImage.main===false){
      setDeleteImageDB([...deleteImageDB, deleteToImage])
      return setImages(images.filter((_, i) => i !== index));

    }
    else{
      deleteImageCloudinary(deleteToImage.public_id)
      setImages(otherImages);

    }
  };
  
  const handleRemoveMainImage = () => { //Este esta ok
    console.log('imageFile', imageFile)
    if (imageFile.cloudinaryID) {
      setDeleteImageDB([...deleteImageDB,imageFile])
      setImageFile('');
    } else {
      deleteImageCloudinary(imageFile[0].public_id);
      setImageFile('');
    }
  };
  
  console.log('deleteImageDB', deleteImageDB);
    // onSubmit(updatedProject);
//  const handleSubmit = async (e) => {
//       e.preventDefault();
//       const id = project.id;
//       let updatedProject = {
//         ...formData,
//         images: [],
//       };
//       const mainImage=[]
//       try {
//         if(imageFile[0]){
//           console.log('imageFile[0]', imageFile[0]);
//           imageFile[0].main=true
//           mainImage.push(imageFile[0])
//         }
//         const otherImages=images.filter(image => image.secure_url) 
//         if (mainImage.length > 0) {
//           updatedProject.images.push(...mainImage);
//         }
       
        
//         if (otherImages.length > 0) {
//           updatedProject.images.push(...otherImages);
//         }
       
//         const response = await updateProject(updatedProject,id)
//         if(deleteImageDB.length>0){
//           const imagesDelete= deleteImageDB.map(imageIdDelete=>imageIdDelete.id)
//           const imageDeleteCloudinaryAndDb= await deleteImageCloudinary(imagesDelete,id)

//         }

//       } catch (error) {
        
//         console.log('error', error);
//       }
      
//   }
console.log('imageFile==>', imageFile);
const handleSubmit = async (e) => {
  e.preventDefault();
  const id = project.id;
  let updatedProject = {
    ...formData,
    images: [],
  };

  const mainImage = [];

  try {
    if (imageFile[0]) {
      imageFile[0].main = true;
      mainImage.push(imageFile[0]);
    }
 
    const otherImages = images.filter(image => image.secure_url);

    if (mainImage.length > 0) {

      updatedProject.images.push(...mainImage);
    
    }

    if (otherImages.length > 0) {
      updatedProject.images.push(...otherImages);
    }

    const response = await updateProject(updatedProject, id);
    if(imageFile.secure_url){
      deleteImageDB.push(imageFile[0])
    }
    if (deleteImageDB.length > 0) {
      console.log('DELETEIMAGE==>', deleteImageDB);
      const imagesDelete = deleteImageDB.map(imageIdDelete => imageIdDelete.cloudinaryID).flat();
      console.log('imagesDelete', imagesDelete);
      await deleteImageCloudinary(imagesDelete, id);
    }

    // console.log('Project updated successfully', response);
  } catch (error) {
    console.error('Error updating project', error);
  }
};
  
    if (!project) {
      return <div>SKELETON DE EDIT</div>;
    }
  

 
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Place</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Area</label>
        <input
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Garage</label>
        <input
          type="number"
          name="garage"
          value={formData.garage}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Main Image</label>
        <div className="mt-2 flex items-center">
          {imageFile ? (
            <div className="relative m-2">
              <img src={typeof imageFile === 'object' && imageFile.main
                    ? imageFile.url
                    : (Array.isArray(imageFile) && imageFile[0] && imageFile[0].secure_url) || null} alt="Project Image" className="w-20 h-20 object-cover" />
              <button
                type="button"
                onClick={handleRemoveMainImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
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
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-2 flex items-center">
          <label className="cursor-pointer">
            <FaPlus className="text-blue-500" size={24} />
            <input
              type="file"
              multiple
              name="images"
              onChange={handleImagesChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="mt-2 flex flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="relative m-2">
                  <img  src={typeof image === 'object' && image.secure_url? image.secure_url : image.url}
                alt={`Imagen del proyecto`}
                className="w-20 h-20 object-cover" />
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
        <input
          type="number"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Project</button>
    </form>
  );
};

export default EditProjectForm;
