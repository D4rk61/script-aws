import { TaxDocument } from '@/modules/tax-documents/schemas';
import { StreamableFile } from '@nestjs/common';
export declare class JsonService {
    getJson(taxDocument: TaxDocument): Promise<StreamableFile>;
    private generateJsonFile;
}
