'use client'

import { postProject } from "./project-crud";
import { uid } from "uid";

const proyecto={
     error:"",
     title:'',
     description:"",
     image:"",
     place:"",
     type:"",
     area:"",
     rooms:"",
     bathrooms:"",
     garage:"",
     images:[],
     year:"",
     uuid : uid()
}
     
export const handleTitle = (e) => {
   return proyecto.title(e.target.value);
  };

  export const handleDescription = (e) => {
    return proyecto.description(e.target.value);
  };

  export const handleImg = async (e) => {
    try {
      let url = await uploadFile(e.target.files[0]);
      return proyecto.image(url);
    } catch (error) {
      console.log("Error image");
    }
    // setImage(e.target.value);
    console.log("imagenes==>",image);
  };
  export const handlePlace = (e) => {
    return proyecto.place(e.target.value);
  };

  export const handleType = (e) => {
    return proyecto.type(e.target.value);
  };

  export const handleArea = (e) => {
    return proyecto.area(e.target.value);
  };

  export const handleRooms = (e) => {
    return proyecto.rooms(e.target.value);
  };

  export const handleBath = (e) => {
    return proyecto.bathrooms(e.target.value);
  };

  export const handleGara = (e) => {
    return proyecto.garage(e.target.value);
  };

  // const handleImgs = async (e) => {
  //   try {
  //     console.log("e==>",e);
  //     let urls = await uploadFile(e);
  //     setImages(urls);
  //   } catch (error) {
  //     console.log("Error image");
  //   }
  // };
  // console.log('varias imagenes==>', images);

 export const handleImgs = async (e) => {
    try {
      console.log("e==>",e);
      const arrayImages=Object.entries(e.target.files)
      console.log('ARRAY IMAGENES==>', typeof arrayImages);
      console.log('ARRAY IMAGENES==>', arrayImages);
      let urls =  await Promise.all(arrayImages.map(async e=>{
        // console.log("cada imagen==>",e[1]);
        return await uploadFile(e[1]) ;

      }))
      console.log(urls, "URLSSSSSSSSSS");
      return proyecto.images(urls);
    } catch (error) {
      console.log("Error image");
    }
  };
 



   export const handleYear = (e) => {
    return proyecto.year(e.target.value);
  };

  export const resetFields = () => {
    proyecto.area("");
    proyecto.bathrooms("");
    proyecto.description("");
    proyecto.garage("");
    proyecto.image("");
    proyecto.images([]);
    proyecto.place("");
    proyecto.rooms("");
    proyecto.title("");
    proyecto.type("");
    proyecto.year("");
  };

 export function isValidate() {
    if (
      area === "" ||
      bathrooms === "" ||
      description === "" ||
      garage === "" ||
      image === "" ||
      images === "" ||
      place === "" ||
      rooms === "" ||
      title === "" ||
      type === "" ||
      year === ""
    ) {
      return alert("FALTAN DATOS");
    } else {
      return true;
    }
  }


 export const handleProject = async() => {
    ;
    if (isValidate()) {
    const projectSend=  await postProject(proyecto)

      resetFields();
      console.log('project subido con exito==>', projectSend);
      return project
    } else {
      proyecto.showError("Introduzca sus datos");
      console.log("validation error");
    }
  };

 export const fetchUser = () => {
    console.log("Fetching all Users");
}