// emailService.js
import emailjs from "@emailjs/browser";
export async function sendEmail(params) {
  try {
    const {PUBLIC_KEY,TEMPLATE_ID,SERVICE_ID} = process.env;
    emailjs.init(PUBLIC_KEY);
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      asunto: params.asunto,
      telefono: params.telefono,
      nombre: params.nombre,
      apellido: params.apellido,
      mensaje: params.mensaje,
      email: params.email,
      reply_to: params.email
    });
    return response.status;
  } catch (error) {
    return error
  }
}
