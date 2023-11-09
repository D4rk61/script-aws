import { TaxDocument } from '@/modules/tax-documents/schemas';
import { StreamableFile } from '@nestjs/common';
export declare class PdfService {
    getPdf(taxDocument: TaxDocument, isAnulation?: boolean): Promise<StreamableFile>;
    private generateQRCodeUrl;
    private generatePDF;
    private validateHtmlTemplate;
}
