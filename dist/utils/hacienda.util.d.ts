import { Contenido, HaciendaUrl } from '@/types/hacienda.types';
import { TaxDocument } from '@/modules/tax-documents/schemas';
export declare const DTE_TITLE: {
    '01': string;
    '03': string;
    '04': string;
    '05': string;
    '06': string;
    '07': string;
    '08': string;
    '09': string;
    '11': string;
    '14': string;
    '15': string;
};
export declare function getHaciendaUrl({ environment, generationCode, emissionDate, }: HaciendaUrl): string;
export declare function convertToLayoutObject({ documentoTributario, respuestaHacienda, }: TaxDocument): Contenido;
export declare function getActualHour(): string;
export declare function getActualDate(): string;
