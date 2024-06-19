import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function SignOut() {
  const { data: session } = useSession();
  return (
    <div className="flex w-full items-center  justify-end border border-spacing-1 border-custom-green ">
      <p className="text-custom-green">
        {session?.user.name}
      </p>
      <Image
        src={`${session.user.image}`}
        width={100}
        height={100}
        alt={`Muestra la imagen del usuario ${session.user.name}`}
      />
      <button onClick={async () => await signOut({ callbackUrl: "/" })}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default SignOut;
