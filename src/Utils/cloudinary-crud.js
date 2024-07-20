import { CLOUDINARY } from "@/constants/constants";
import axios from "axios";
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
  // console.log('formData', formData);
  const response = await fetch(CLOUDINARY, {
    method: "POST",
    body: formData
  });
  // console.log('response', response);

  if (response.ok) {
    const cloudinaryObjectArray = await response.json();
    return cloudinaryObjectArray;
  } else {
    console.log("Oops! ", response.statusText);
  }
}

export async function deleteImageCloudinary(publicId, projectId) {
  try {
    // console.log('publicId', publicId);
    // console.log('projectId', projectId);
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