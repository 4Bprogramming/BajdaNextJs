import React from "react";

function ContactForm() {
  return (
    <>
      <h2 class="text-5xl text-custom-green text-center">Contacto</h2>
      <form action="" class="flex flex-col items-center mt-5 py-3 max-w-4xl m-auto lg:border-2 lg:border-custom-green ">
        <div class="flex flex-col w-full max-w-3xl ">
          <label for="nombre" class="mb-1 text-lg pl-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingrese Nombre"
            class=" h-14 mx-2 p-2 border-form-grey-border border-2 rounded-md focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green hover:border-custom-green focus-within:border-custom-green"
          />
        </div>
        <div class="flex flex-col w-full max-w-3xl">
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
        <div class="flex flex-col w-full max-w-3xl">
          <label for="email" class="mb-1 text-lg pl-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
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
            class=" mx-2 p-2 border-2 border-form-grey-border rounded-md md:min-h-16 focus:border-custom-green focus-visible:border-custom-green  active:border-custom-green
             hover:border-custom-green"
          ></textarea>
        </div>
        <button
          type="submit"
          class="px-6 py-2 mt-4 text-white bg-custom-green rounded-md"
        >
          Enviar
        </button>
      </form>
    </>
  );
}

export default ContactForm;
