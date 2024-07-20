import Link from "next/link";
import React from "react";

function PlusCard() {
  return (
    <article title="Crear un Proyecto" className="flex flex-col w-[98%] h-[379px] justify-evenly border-4 items-center mx-1 max-w-[350px] group cursor-pointer">
      <Link href={"/admin/create"}>
        <div className="text-9xl text-[#aaaaac] transform transition-transform duration-300 group-hover:scale-150">
          +
        </div>
      </Link>
    </article>
  );
}

export default PlusCard;
