const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração do transporte de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint para enviar email
app.post('/send-email', (req, res) => {
  const { nome, mensagem } = req.body;

  const mailOptions = {

    to: process.env.EMAIL_RECEIVER, // Email que receberá a mensagem
    subject: `Contato de ${nome}`,
    text: mensagem
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Erro ao enviar email.');
    }
    res.status(200).send('Email enviado com sucesso!');
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
