const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";
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
      await prisma.project.update({
        where: { id: projectId },
        data: {
          images: {
            disconnect: true
          }
        }
      });

      // Eliminar imágenes que ya no están relacionadas con ningún proyecto
      await prisma.image.deleteMany({
        where: {
          projects: {
            none: {
              id: projectId
            }
          }
        }
      });

      // Eliminar el proyecto
      await prisma.project.delete({
        where: { id: projectId }
      });
    }

    return NextResponse.json(
      { message: "Images and/or project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting images and/or project:", error);
    return NextResponse.json(
      { error: "Failed to delete images and/or project" },
      { status: 500 }
    );
  }
}

