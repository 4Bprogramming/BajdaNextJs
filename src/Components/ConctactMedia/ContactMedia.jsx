import React from 'react'
import Link from 'next/link'

function ContactMedia() {
  return (
    <media-container class=" flex flex-col gap-y-3 md:col-span-5 lg:col-span-4">
      <contact-us class="flex flex-col items-start ml-4 w-full ">
        <h4 class=" text-2xl font-semibold text-grey-1">Contáctanos</h4>
        <p>Correo: <Link href={"mailto:info@estudiomartinbajda.com.ar"}>info@estudiomartinbajda.com.ar</Link></p>
        <p>Teléfono: <span class="text-grey-1">0294-4521122</span></p>
      </contact-us>
      <find-us class="flex flex-col items-start ml-4  w-full">
        <h4 class=" text-2xl font-semibold text-grey-1">Encuéntranos</h4>
        <p>Moreno 750. 3º "313"</p>
        <p>Bariloche, Rio Negro, Argentina.</p>
        
      </find-us>
    </media-container>
  )
}

export default ContactMedia