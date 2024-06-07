const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET() {
    try {
      const projects = await prisma.project.findMany();
      return NextResponse.json(projects, { status: 200 });
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