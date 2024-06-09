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
export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updatedProject = await prisma.project.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}