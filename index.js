import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

// Para servir arquivos HTML na Vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

// Rota principal para carregar o formulário
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configurar transporte do Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota para envio de e-mail
app.post('/send', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    let mailOptions = {
        from: `"Meu App" <${process.env.EMAIL_USER}>`,
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

// Exportar como handler para a Vercel
export default app;
