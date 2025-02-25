import * as nodemailer from "nodemailer";
require("dotenv").config();

// Classe base para serviços de e-mail
class EmailService {
  protected transporter: nodemailer.Transporter;

  protected constructor(user: string, pass: string) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST, // Usa o host do .env
      port: Number(process.env.SMTP_PORT) || 587, // Usa a porta do .env (padrão 587)
      secure: false, // Se porta for 465, usa SSL
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("📧 E-mail enviado:", info.response);
    } catch (error) {
      console.error("❌ Erro ao enviar o e-mail:", error);
    }
  }
}

// Classe específica para Gmail
class GmailService extends EmailService {
  constructor() {
    super(process.env.EMAIL_USER!, process.env.EMAIL_PASS!);
  }
}

export { GmailService };
