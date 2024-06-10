export function extractPublicId(url) {
    // Asumiendo que la URL sigue el formato estándar de Cloudinary
    console.log('url en ectract===>',url);
    
    if(!Array.isArray(url)){
    const parts = url[0].split('/');
    const lastPart = parts[parts.length - 1];
    const publicIdWithExtension = lastPart.split('.')[0]; 
    }else{
      const parts = url[0].split('/');
      const lastPart = parts[parts.length - 1];
      const publicIdWithExtension = lastPart.split('.')[0]; // Elimina la extensión del archivo  
    }   
    return publicIdWithExtension;
  }