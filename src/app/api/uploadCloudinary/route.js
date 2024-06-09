import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "neleon10",
  api_key: "759833736964718",
  api_secret: "knPWwmzw6aEZIWVeE3yPY5NfhNA"
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");
  const imagesArray = data.getAll("imagesArray");



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
