require('dotenv').config();  // Carrega variáveis de ambiente
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // Permite receber JSON no body

// Configuração do transporte SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true para SSL, false para TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota padrão
const path = require('path'); // Importa a biblioteca path

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para enviar e-mail via POST
app.post('/send', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: "Todos os campos (to, subject, text) são obrigatórios!" });
    }

    let mailOptions = {
        from: `"Meu App" <${process.env.EMAIL_USER}>`, // O remetente precisa ser o e-mail autenticado no SMTP
        to,
        subject,
        text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.json({ message: 'E-mail enviado com sucesso!', response: info.response });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar e-mail', details: error.message });
    }
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000 🚀');
});
