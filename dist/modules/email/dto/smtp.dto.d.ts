import { SmtpAuthDTO } from './smtp-auth.dto';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
export declare class SmtpConfigDTO implements SMTPTransport.Options {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: SmtpAuthDTO;
}
