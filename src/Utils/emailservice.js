// emailService.js
import emailjs from "@emailjs/browser";
export async function sendEmail(params) {
  try {
    emailjs.init("2iRnnETtfLHs-6H-8");
    const response = await emailjs.send("service_zjilh3e", "template_33om5hh", {
      nombre: params.nombre,
      apellido: params.apellido,
      mensaje: params.mensaje,
      email: params.email,
      telefono: params.telefono,
      asunto: params.asunto
    });
    if(response){
      return response.status;
    }
  } catch (error) {
    return error
  }
}
