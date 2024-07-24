"use client";
import React, { useRef,useState } from "react";
import { sendEmail } from "@/Utils/emailservice";

function ContactForm() {
  const form = useRef();
  const [emailStatus,setEmailStatus] = useState();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(form.current);
    const formParams = Object.fromEntries(formData.entries());
    const response = await sendEmail(formParams);
    if (response === 200) {
      setEmailStatus("El correo electrónico se envió correctamente.");
    } else {
      setEmailStatus("Hubo un problema al enviar el correo electrónico.");
    }
    form.current.reset();
  }
 

  return (
    <section class="bg-custom-contact pb-10 md:col-span-7 lg:col-span-8">
      <form
        ref={form}
        onSubmit={handleSubmit}
        class="flex flex-col items-center max-w-4xl m-auto lg:py-3 lg:border-2 lg:border-custom-green "
      >
        <hgroup class="flex flex-col w-full max-w-3xl md:flex-row">
          <div class="flex flex-col w-full max-w-3xl  md:w-1/2">
            <label htmlFor="nombre" class="mb-1 text-lg pl-2">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese Nombre"
              required
              class=" h-14 mx-2 p-2 border-form-grey-border border-2 rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green focus-within:border-custom-green"
            />
          </div>
          <div class="flex flex-col w-full max-w-3xl md:w-1/2">
            <label htmlFor="apellido" class="mb-1 text-lg pl-2">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Ingrese Apellido"
              required
              class="h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
            />
          </div>
        </hgroup>
        <div class="flex flex-col w-full max-w-3xl">
          <label htmlFor="email" class="mb-1 text-lg pl-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su email personal"
            required
            class="h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
          />
        </div>
        <div class="flex flex-col w-full max-w-3xl">
          <label htmlFor="telefono" class="mb-1 text-lg pl-2">
            Teléfono
          </label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            placeholder="Ingrese número con característica. "
            required
            class=" h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
          />
        </div>
        <div class="flex flex-col w-full max-w-3xl">
          <label htmlFor="asunto" class="mb-1 text-lg pl-2">
            Asunto
          </label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            placeholder="Ingrese Asunto"
            required
            class=" h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
          />
        </div>
        <div class="flex flex-col w-full max-w-3xl">
          <label htmlFor="mensaje" class="mb-1 text-lg pl-2">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Mensaje..."
            required
            class=" mx-2 p-2 border-2 border-form-grey-border rounded-md md:min-h-28 focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green
             hover:border-custom-green"
          />
        </div>
        <button
          type="submit"
          value="Send"
          class="px-6 py-2 mt-4 text-white bg-custom-green rounded-md"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
