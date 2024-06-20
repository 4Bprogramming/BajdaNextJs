import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function SignOut() {
  const { data: session } = useSession();
  
  return (
    <div className="flex w-full items-center  justify-end border border-spacing-1 border-custom-green shadow-md">
      <div className=" flex flex-col w-fit my-2 mr-1 gap-y-2 lg:mr-6">
        <div className="flex flex-row items-center">
          <p className="text-custom-green mr-1">{session?.user.name}</p>
          <Image
            src={`${session?.user.image}`}
            width={50}
            height={50}
            className="rounded-full"
            alt={`Muestra la imagen del usuario ${session?.user.name}`}
          />
        </div>
        <div className="flex flex-col items-end">
          <button
            className="bg-transparent outline outline-2 transition-all duration-500 outline-red-400 cursor-pointer px-2 text-sm text-red-400 rounded-2xl w-fit hover:shadow-buttonShadow hover:bg-red-400 hover:text-white"
            onClick={async () => await signOut({ callbackUrl: "/" })}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignOut;
