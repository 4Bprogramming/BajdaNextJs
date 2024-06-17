const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const projects = await prisma.project.findMany({
      include: { images: true }
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const imageObjects = body.images.map((object, index) => {
     return{
        url:object.secure_url,
        main: index == 0 ? true : false,
        cloudinaryID: object.public_id
      }
    });

    const newProject = await prisma.project.create({
      data: {
        place: body.place,
        title: body.title,
        images: {
          create: imageObjects
        },
        area: +body.area,
        description: body.description,
        rooms: +body.rooms,
        year: +body.year
      },
      include: {
        images: true // Incluir las imágenes en la respuesta
      }
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request) {
  try {
    const body = await request.text();
    const { imageIds, projectId } = JSON.parse(body);

    if (!imageIds && !projectId) {
      return NextResponse.json(
        { error: "Image IDs and/or Project ID are required" },
        { status: 400 }
      );
    }

    if (imageIds && imageIds.length > 0) {
      // Desconectar y eliminar imágenes
      await Promise.all(
        imageIds.map(async (idImage) => {
          // Desconecta la imagen del proyecto
          await prisma.image.update({
            where: { cloudinaryID: idImage },
            data: {
              projects: {
                disconnect: { id: projectId }
              }
            }
          });
          // Elimina la imagen de la tabla
          await prisma.image.delete({
            where: { id: idImage }
          });
        })
      );
    }

    if (projectId && (!imageIds || imageIds.length === 0)) {
      // Desconectar todas las imágenes del proyecto
      const images = await prisma.image.findMany({
        where: {
          projectId: projectId
        }
      });

      const publicId= images.map((image)=>image.cloudinaryID)
      console.log('imagenes al cloudinary=>', publicId);
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDNAME,
        api_key: process.env.NEXT_PUBLIC_APIKEY,
        api_secret: process.env.NEXT_PUBLIC_SECRET
      });
      await Promise.all(
        publicId.map(async (id) => {
          const response = await cloudinary.uploader.destroy(id);
          console.log('response cloudinary==>', response);
          if (response.result !== "ok") {
      
            throw new Error(`Failed to delete image with ID ${id}: ${response.result}`);
          } 
        })
      );
     

      // Eliminar imágenes que ya no están relacionadas con ningún proyecto
      
      await prisma.image.deleteMany({
        where: {
          projectId:projectId 
        }
      });


      // Eliminar el proyecto
      await prisma.project.delete({
        where: { id: projectId }
      });
    }

    return NextResponse.json(
      { message: "Images and/or project deleted successfully", status: 204  },

    );
  } catch (error) {
    console.error("Error deleting images and/or project:", error);
    return NextResponse.json(
      { error: "Failed to delete images and/or project" },
      { status: 500 }
    );
  }
}

