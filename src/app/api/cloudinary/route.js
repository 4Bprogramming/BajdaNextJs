import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "./extractPublicId";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_APIKEY,
  api_secret: process.env.NEXT_PUBLIC_SECRET
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");
  const imagesArray = data.getAll("imagesArray");

  if (!image && imagesArray.length === 0) {
    return NextResponse.json();
  }
  const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            reject(err);
          }
        
          resolve(result);
          
        })
        .end(fileBuffer);
    });
  };
  const cloudinaryObjectArray = [];
  if (image) {
    const imageBytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);
    const imageUrl = await uploadToCloudinary(imageBuffer);
    cloudinaryObjectArray.push(imageUrl);
  }

  for (const file of imagesArray) {
    const fileBytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileUrl = await uploadToCloudinary(fileBuffer);
    cloudinaryObjectArray.push(fileUrl);
  }

  return NextResponse.json(cloudinaryObjectArray);
}

export async function DELETE(req) {
  try {
    const body = await req.text();
    const { publicId, projectId } = JSON.parse(body);
   

    if (!publicId && !projectId) {
      return NextResponse.json(
        { error: "Image ID and Project ID are required" },
        { status: 400 }
      );
    }

    if (Array.isArray(publicId) && projectId) {
     // Si publicId es un array, manejamos cada id individualmente
      await Promise.all(
        publicId.map(async (id) => {
          const response = await cloudinary.uploader.destroy(id);
          if (response.result !== "ok") {
      
            throw new Error(`Failed to delete image with ID ${id}: ${response.result}`);
          }
        })
      );


      // Desconectar las imágenes del proyecto en la base de datos
      await Promise.all(
        publicId.map(async (cloudinaryID) => {
          await prisma.image.delete({
            where: { cloudinaryID: cloudinaryID }
          });
        })
        

      )
    } else if (publicId && !Array.isArray(publicId) && projectId) {
      // Si publicId es un solo ID y projectId está presente
      const response = await cloudinary.uploader.destroy(publicId);
      if (response.result !== "ok") {
        throw new Error(`Failed to delete image with ID ${publicId}: ${response.result}`);
      }

      // Desconectar la imagen del proyecto en la base de datos
      await prisma.project.update({
        where: { id: projectId },
        data: {
          images: {
            disconnect: { projectId: publicId },
          },
        },
      });

      // Eliminar la imagen de la tabla 'image' en la base de datos
      await prisma.image.delete({
        where: { id: publicId },
      });
    } else if (publicId && !projectId) {
      // Si solo publicId está presente
      
      const response = await cloudinary.uploader.destroy(publicId);
      if (response.result !== "ok") {
        throw new Error(`Failed to delete image with ID ${publicId}: ${response.result}`);
      }
    }

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: `Failed to delete image: ${error.message}` },
      { status: 500 }
    );
  }
}