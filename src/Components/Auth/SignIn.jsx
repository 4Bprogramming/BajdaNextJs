"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/resources/logo.png"
function SignIn() {
  const { data: session } = useSession();

  return (
    <>  
        {session?.user && redirect("/proyectos")}
        <div className="flex flex-col items-center mt-28 sm:mt-20 md:mt-36">
        <div className=" flex flex-col items-center  mb-4 "><Image src={Logo} alt="Logo de la empresa" className="w-32 "  /></div>
          <button
            onClick={async () =>
              await signIn("google", { callbackUrl: "/proyectos" })
            }
            className="bg-transparent outline outline-2 outline-custom-green cursor-pointer shadow-buttonShadow px-3 py-3 text-3xl text-custom-green rounded-2xl w-fit relative after:content-['»'] after:absolute after:opacity-0 after:right-2 hover:after:transition-all duration-700 hover:after:opacity-100 hover:after:right-4 hover:pr-12 hover:text-white hover:bg-custom-green md:text-4xl "
          >
            Iniciar Sesión
          </button>
        </div>
      
    </>
  );
}

export default SignIn;
