const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, {params}){
    const id = parseInt(params.id)
    console.log('params===>', id);
    try {
        const project = await prisma.project.findUnique({
            where: {
              id: id
            },
          })

        if (!project) { return NextResponse ('no esta el proyecto', {status:404})
            
        }
        return NextResponse.json(project, { status: 200 })
    } catch (error) {
        console.log('error de traer por id===>', error)
    }
}