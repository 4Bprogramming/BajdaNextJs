
import { CLOUDINARY } from "@/constants/constants";

export async function getImageUrls(file, files = []) {
  const formData = new FormData();
  
  // Verifica si 'file' está presente y agrégalo al FormData
  
  if (file) {
    formData.append("image", file);
  }

  // Verifica si 'files' no está vacío y agrégalo al FormData
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("imagesArray", files[i]);
    }
  }
  console.log(formData);

  // Mando los archivos de imagen al backend para que me devuelva URLs
  const response = await fetch(CLOUDINARY, {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    const urls = await response.json();
    return urls;
  } else {
    console.log("Oops! ", response.statusText);
  }
}
export async function deleteImage(imageId, projectId) {
  console.log('imageId==>', imageId);
  const response = await fetch(CLOUDINARY, {
    method: 'DELETE',
    
    body: JSON.stringify({ imageId, projectId }),
  });

  if (response.ok) {
    console.log('Image deleted successfully');
    // Actualiza tu estado o realiza cualquier otra acción necesaria
  } else {
    console.error('Failed to delete image');
  }
}
