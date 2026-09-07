import "dotenv/config";
import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Mail, SMTPSentMessageInfo } from 'nodemailer';

@Injectable()
export class NodemailerService {
    private transporter: Mail<SMTPSentMessageInfo>;
    private mailOptions: {
        from: string;
        to: string;
        subject: string;
        text: string;
        html: string;
    } = {
        from: String(process.env.CURVI_SMTP_USER),
        to: '',
        subject: '',
        text: '',
        html: '',
    };

    async onModuleInit() {
        try {
            this.transporter = nodemailer.createTransport({
                host: process.env.CURVI_SMTP_HOST,
                port: Number(process.env.CURVI_SMTP_PORT),
                secure: false, // true para porta 465, false para outras portas
                auth: {
                    user: process.env.CURVI_SMTP_USER,
                    pass: process.env.CURVI_SMTP_PASS,
                },
            });
            Logger.log('NodemailerService initialized', 'NodemailerService');
        } catch (error) {
            Logger.error('Failed to initialize NodemailerService', 'NodemailerService', error);
        }
    }

    async sendMail(to: string, subject: string, text: string, html: string) {
        try {
            this.mailOptions.from = String(process.env.CURVI_SMTP_USER);
            this.mailOptions.to = to;
            this.mailOptions.subject = subject;
            this.mailOptions.text = text;
            this.mailOptions.html = html;

            await this.transporter.sendMail(this.mailOptions);
            Logger.log('Email sent successfully', 'NodemailerService');
        } catch (error) {
            Logger.error('Failed to send email', 'NodemailerService', error);
        }
    }
}
