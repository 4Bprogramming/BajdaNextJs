const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request) {
  try {    
      const projects = await prisma.project.findMany({include:{images: true}});
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
    const {
      place,  
      title,  
      area, 
      bathrooms, 
      description, 
      garage,
      image,    
      images,  
      rooms,  
      type,    
      year} = body;
      
      // console.log('body===>', body);
      // Crear un array de objetos par
const imageObjects = images.map(url => ({ url }));

    const newProject = await prisma.project.create({
      data: {
        place,
        title,
        images:{
          create:imageObjects,
        },
        area, 
        bathrooms, 
        description, 
        garage,
        image,   
        rooms,  
        type,    
        year
      },
      include: {
        images: true, // Incluir las imágenes en la respuesta
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
