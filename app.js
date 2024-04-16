const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configura nodemailer con tus credenciales de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña'
  }
});

// Ruta para manejar el envío del formulario de contacto
app.post('/contact', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: 'correo_destino@example.com',
    subject: 'Mensaje desde el formulario de contacto',
    text: `Nombre: ${firstName} ${lastName}\nCorreo electrónico: ${email}\nTeléfono: ${phone}\n\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Algo salió mal, por favor inténtalo de nuevo más tarde.' });
    } else {
      console.log('Email enviado: ' + info.response);
      res.status(200).json({ success: true, message: 'Mensaje enviado exitosamente.' });
    }
  });
});

app.get("/", (req, res) => {
    const htmlResponse = `
      <html>
        <head>
          <title>Enter Back End</title>
        </head>
        <body>
          <h1>Back end Enter</h1>
        </body>
      </html>
    `;
    res.send(htmlResponse);
  });

// Inicia el servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));