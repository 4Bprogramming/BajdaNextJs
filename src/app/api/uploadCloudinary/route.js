import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "./extractPublicId";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_APIKEY,
  api_secret: process.env.NEXT_PUBLIC_SECRET
});

export async function POST(request) {
  const data = await request.formData();
  
  const image = data.get("image");
  const imagesArray = data.getAll("imagesArray");

  // console.log(imagesArray);

  if (!image && imagesArray.length === 0) {
    return NextResponse.json();
  }
  //convertir el archivo en buffer, para que lo almacene en la memoria RAM.


    const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.secure_url);
      }).end(fileBuffer);
    });
  };
  const urls = [];//esta array con imagenes es devuelto, posicion 0 pertenece a la main image. 
  if (image) {
    console.log('image==>', image);
    const imageBytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);
    const imageUrl = await uploadToCloudinary(imageBuffer);
    urls.push(imageUrl);
  }

  for (const file of imagesArray) {
    const fileBytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileUrl = await uploadToCloudinary(fileBuffer);
    urls.push(fileUrl);
  }
  
  // return NextResponse.json(response.secure_url);
   return NextResponse.json(urls);
}

// export async function DELETE(req) {
//   const { imageUrl, projectId } = await req.json();
//   console.log('Received imageId:', imageUrl);
//   console.log('Received projectId:', projectId);
//   console.log('req==>', req);
//   console.log('imagenId a eliminar==>', imageUrl)

//   try {
//     // Verifica si imageUrl está presente y elimina la imagen de Cloudinary
//     if (imageUrl) {
//       const publicId= extractPublicId(imageUrl)
//       await cloudinary.uploader.destroy(publicId);
//     }

//     // Verifica si projectId está presente y actualiza la base de datos usando Prisma
//     if (projectId) {
//       await prisma.project.update({
//         where: { id: projectId },
//         data: {
//           imageUrl: null, // O el campo que utilices para almacenar la URL de la imagen
//         },
//       });
//     }

//     return NextResponse.json({ message: 'Operation completed successfully' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to complete operation' }, { status: 500 });
//   }
// }
export async function DELETE(req) {
  try {
    const body = await req.text();
    const { imageId, projectId } = JSON.parse(body);

    console.log('Received imageId:', imageId);
    console.log('Received projectId:', projectId);

    if (!imageId && !projectId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }
    if(imageId){
      const publicId = extractPublicId(imageId);
     const responseClou=await cloudinary.uploader.destroy(publicId);
     console.log('response cloudinary para delete', responseClou.result);
      if (responseClou==='not found') {
        return NextResponse.json({ message: 'Not found' }, { status: 400 })
      }

    }

    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: {
          images: {
            disconnect: { id: imageId },
          },
        },
      });
    }
    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}