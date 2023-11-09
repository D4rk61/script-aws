import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
export declare function sendEmailWithTransporter(transportOptions: string | SMTPTransport | SMTPTransport.Options, mailOptions: Mail.Options): Promise<void>;
