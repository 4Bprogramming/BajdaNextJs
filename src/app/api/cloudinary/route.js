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

  if (!image && imagesArray.length === 0) {
    return NextResponse.json();
  }
  const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            reject(err);
          }
        
          resolve(result);
          
        })
        .end(fileBuffer);
    });
  };
  const cloudinaryObjectArray = [];
  if (image) {
    const imageBytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);
    const imageUrl = await uploadToCloudinary(imageBuffer);
    cloudinaryObjectArray.push(imageUrl);
  }

  for (const file of imagesArray) {
    const fileBytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileUrl = await uploadToCloudinary(fileBuffer);
    cloudinaryObjectArray.push(fileUrl);
  }

  return NextResponse.json(cloudinaryObjectArray);
}

export async function DELETE(req) {
  try {
    const body = await req.text();
    const { imageId, projectId } = JSON.parse(body);
    if (!imageId && !projectId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }
    if (imageId) {
      const publicId = extractPublicId(imageId);
      const response = await cloudinary.uploader.destroy(publicId);
      if (response === "not found") {
        return NextResponse.json({ message: "Not found" }, { status: 400 });
      }
    }

    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: {
          images: {
            disconnect: { id: imageId }
          }
        }
      });
    }
    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
