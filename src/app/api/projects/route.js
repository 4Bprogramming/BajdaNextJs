const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { id } = request.params;

    if (id) {
      const project = await prisma.project.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      return NextResponse.json(project, { status: 200 });
    } else {
      const projects = await prisma.project.findMany();
      return NextResponse.json(projects, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}


  export async function POST(request) {
    try {
      const body = await request.json();
      const { place, title } = body;
  
      const newProject = await prisma.project.create({
        data: {
          place,
          title,
        },
      });
      return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }