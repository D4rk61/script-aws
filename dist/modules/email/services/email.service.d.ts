import { Company } from '@/modules/companies';
import { TaxDocument } from '@/modules/tax-documents/schemas';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    constructor(configService: ConfigService);
    sendEmail(taxDocument: TaxDocument, company: Company): Promise<void>;
    private getScreenshot;
    private createMailOptions;
    private decryptSmtpPassword;
    private validateHtmlTemplate;
    private validateTaxDocument;
}
