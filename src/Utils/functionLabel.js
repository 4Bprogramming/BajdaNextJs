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
  //     
  //     let urls = await uploadFile(e);
  //     setImages(urls);
  //   } catch (error) {
  //     
  //   }
  // };
  // 

 export const handleImgs = async (e) => {
    try {
      
      const arrayImages=Object.entries(e.target.files)
      
      
      let urls =  await Promise.all(arrayImages.map(async e=>{
        // 
        return await uploadFile(e[1]) ;

      }))
      
      return proyecto.images(urls);
    } catch (error) {
      
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
      
      return project
    } else {
      proyecto.showError("Introduzca sus datos");
      
    }
  };

 export const fetchUser = () => {
    
}