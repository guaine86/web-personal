// netlify/functions/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Solo permitimos solicitudes POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  // Parseamos el cuerpo de la solicitud
  const { nombre, email, telefono, asunto, mensaje } = JSON.parse(event.body);

  // Configuramos Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro servicio (Outlook, SendGrid, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Usamos variables de entorno
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configuramos el correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // El correo se envía a ti mismo
    subject: `Nuevo mensaje de contacto - Asunto: ${asunto}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\nMensaje: ${mensaje}`,
  };

  // Enviamos el correo
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado correctamente' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};