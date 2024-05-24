"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_asm3con",
        "template_n68spek",
        e.target,
        /* "u1W0PSDVrZHmTdhGBrhGp", */
        // '7lKAr0QQPtaCO09cU',
        "pbL25b0JuSENRfmSN",
        alert("Su mensaje ha sido enviado, pronto te responderemos")
      )
      .then(res => console.log(res))
      .catch(e => console.log(e));
    // navigate("/");
  }

  const form = useRef();

  return (
    <section class="bg-custom-contact pb-10 md:col-span-7 lg:col-span-8">
      <form
        ref={form}
        onSubmit={sendEmail}
        class="flex flex-col items-center max-w-4xl m-auto lg:py-3 lg:border-2 lg:border-custom-green "
      >
        <group class="flex flex-col w-full max-w-3xl md:flex-row">
          <div class="flex flex-col w-full max-w-3xl  md:w-1/2">
            <label for="nombre" class="mb-1 text-lg pl-2">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="name"
              placeholder="Ingrese Nombre"
              class=" h-14 mx-2 p-2 border-form-grey-border border-2 rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green focus-within:border-custom-green"
            />
          </div>
          <div class="flex flex-col w-full max-w-3xl md:w-1/2">
            <label for="apellido" class="mb-1 text-lg pl-2">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Ingrese Apellido"
              class="h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
            />
          </div>
        </group>
        <div class="flex flex-col w-full max-w-3xl">
          <label for="email" class="mb-1 text-lg pl-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="correo"
            placeholder="Ingrese Correo Electrónico"
            class="h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
          />
        </div>
        <div class="flex flex-col w-full max-w-3xl">
          <label for="telefono" class="mb-1 text-lg pl-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ingrese Teléfono"
            class=" h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
          />
        </div>
        <div class="flex flex-col w-full max-w-3xl">
          <label for="asunto" class="mb-1 text-lg pl-2">
            Asunto
          </label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            placeholder="Ingrese Asunto"
            class=" h-14 mx-2 p-2 border-2 border-form-grey-border rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green"
          />
        </div>
        <div class="flex flex-col w-full max-w-3xl">
          <label for="mensaje" class="mb-1 text-lg pl-2">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Mensaje..."
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
