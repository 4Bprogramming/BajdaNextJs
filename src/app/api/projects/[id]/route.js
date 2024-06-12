const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, {params}){
    const id = parseInt(params.id)

    try {
        const project = await prisma.project.findUnique({
            where: {
              id: id
            },
            include: { images: true }
          })

        if (!project) { return NextResponse ('no esta el proyecto', {status:404})
            
        }
        return NextResponse.json(project, { status: 200 })
    } catch (error) {
        console.log('error de traer por id===>', error)
    }
}
export async function PUT(req, { params }) {
  const id = parseInt(params.id);

  console.log('Received PUT request for id:', id);
  

  try {
      let bodyText;
      try {
          bodyText = await req.text(); // Obtener el cuerpo como texto
          console.log('Request body as text:', bodyText);
          const body = JSON.parse(bodyText); // Intentar parsear el texto manualmente
          console.log('Parsed JSON body:', body);
          const updateData = {};

            if (body.place !== undefined) updateData.place = body.place;
            if (body.title !== undefined) updateData.title = body.title;
            if (body.area !== undefined) updateData.area = +body.area;
            if (body.bathrooms !== undefined) updateData.bathrooms = +body.bathrooms;
            if (body.description !== undefined) updateData.description = body.description;
            if (body.garage !== undefined) updateData.garage = +body.garage;
            if (body.rooms !== undefined) updateData.rooms = +body.rooms;
            if (body.type !== undefined) updateData.type = body.type;
            if (body.year !== undefined) updateData.year = +body.year;

            // Manejo de imágenes si están presentes en el body
            if (body.images) {
              console.log('body.images==>', body.images);
              const imagesUpdate= body.images.filter(image=>image.secure_url)
                updateData.images = {
                    create: imagesUpdate.map(image => ({ url: image.secure_url, main : image.main? image.main:false, cloudinaryID:image.public_id }))
                };
            }

          const updatedProject = await prisma.project.update({
              where: { id: id },
              data: updateData,
              include: {
                images: true // Incluir las imágenes en la respuesta
            }
          });

          console.log('Updated project:', updatedProject);
          return NextResponse.json(updatedProject, { status: 200 });
      } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
      }
  } catch (error) {
      console.error('Error updating project:', error);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

