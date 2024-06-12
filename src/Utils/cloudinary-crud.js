import { CLOUDINARY } from "@/constants/constants";

export async function getImageCloudinaryObject(file, files = []) {
  const formData = new FormData();
  if (file) {
    formData.append("image", file);
  }

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("imagesArray", files[i]);
    }
  }

  const response = await fetch(CLOUDINARY, {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    const cloudinaryObjectArray = await response.json();
    return cloudinaryObjectArray;
  } else {
    console.log("Oops! ", response.statusText);
  }
}
// export async function deleteImageCloudinary(publicId, projectId) {
//   try {
//     const response = await fetch(CLOUDINARY, {
//       method: "DELETE",
  
//       body: JSON.stringify({ publicId, projectId })
//     });
    
//     if (response.result !== 'ok') {
//       throw new Error(`Failed to delete image: ${response.result}`);
//     }
//     return response;

//   } catch (error) {
//     console.error('Failed to delete image', error);
//     throw error;
//   }


//   if (response.ok) {
//     console.log("Image deleted successfully");
//     // Actualiza tu estado o realiza cualquier otra acción necesaria
//   } else {
//     console.error("Failed to delete image");
//   }
// }
export async function deleteImageCloudinary(publicId, projectId) {
  try {
    const response = await fetch(CLOUDINARY, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ publicId, projectId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to delete image: ${data}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to delete image', error);
    throw error;
  }
}