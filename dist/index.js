"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Transporter_1 = require("./models/Transporter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware para permitir requisições JSON e CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Endpoint para enviar e-mails
app.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, subject, text } = req.body;
        // Validação dos campos obrigatórios
        if (!to || !subject || !text) {
            res.status(400).json({ error: 'Campos obrigatórios faltando: to, subject, text' });
            return; // Retorna para evitar a execução do código abaixo
        }
        // Cria uma instância do GmailService e envia o e-mail
        const gmailService = new Transporter_1.GmailService();
        yield gmailService.sendEmail(to, subject, text);
        // Resposta de sucesso
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail' });
    }
}));
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
