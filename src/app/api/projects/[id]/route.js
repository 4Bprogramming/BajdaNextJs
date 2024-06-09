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

  try {
    const body = await req.json(); // Parse the JSON body from the request
    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}


