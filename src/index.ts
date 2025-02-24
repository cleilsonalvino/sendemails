import express from 'express';
import cors from 'cors';
import { GmailService } from './models/Transporter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir requisições JSON e CORS
app.use(cors());
app.use(express.json());

// Endpoint para enviar e-mails
app.post('/send-email', async (req, res): Promise<void> => {
  try {
    const { to, subject, text } = req.body;

    // Validação dos campos obrigatórios
    if (!to || !subject || !text) {
      res.status(400).json({ error: 'Campos obrigatórios faltando: to, subject, text' });
      return; // Retorna para evitar a execução do código abaixo
    }

    // Cria uma instância do GmailService e envia o e-mail
    const gmailService = new GmailService();
    await gmailService.sendEmail(to, subject, text);

    // Resposta de sucesso
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});