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
    const imageObjects = body.images.map((url) => ({ url }));
    const newProject = await prisma.project.create({
      data: {
        place: body.place,
        title: body.title,
        images: {
          create: imageObjects
        },
        area: +body.area,
        bathrooms: +body.bathrooms,
        description: body.description,
        garage: +body.garage,
        image: body.image,
        rooms: +body.rooms,
        type: body.type,
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
