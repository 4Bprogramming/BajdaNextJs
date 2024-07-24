import React from 'react'
import Link from 'next/link'
import { FaInstagram } from "react-icons/fa";

function ContactMedia() {
  return (
    <media-container class=" flex flex-col gap-y-3 md:col-span-5 lg:col-span-4">
      <contact-us class="flex flex-col items-start ml-4 w-full ">
        <h4 class=" text-2xl font-semibold text-grey-1">Contáctanos</h4>
        <p>Correo: <Link href={"mailto:info@estudiomartinbajda.com.ar"}>estudiomartinbajda@gmail.com</Link></p>
        <p>Teléfono: <span class="text-grey-1">+5492944581548</span></p>
        <Link className='relative underline underline-offset-2 hover:text-custom-green transition-all duration-700 group hover:ml-2' href={"https://www.instagram.com/arq.martin_bajda/?igsh=YmhqdHNqdmxlZGJs"} target='blank'>
        Visitá Nuestro Instagram: 
        <FaInstagram className="text-green-500 h-6 w-6 cursor-pointer absolute top-0 -right-8 group-hover:text-black   transition-all duration-700" />
        </Link>
      </contact-us>
      <find-us class="flex flex-col items-start ml-4  w-full">
        <h4 class=" text-2xl font-semibold text-grey-1">Encuéntranos</h4>
        <p>Moreno 750. 3er piso 313</p>
        <p>Bariloche, Rio Negro, Argentina.</p>
        
      </find-us>
    </media-container>
  )
}

export default ContactMedia
