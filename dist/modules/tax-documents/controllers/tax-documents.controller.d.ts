import { DocumentoTributarioDTO } from '@/modules/tax-documents/dto';
import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { AnulacionRequestDTO } from '../dto/anulacion.dto';
import { TaxDocumentsService } from '../services/tax-documents.service';
export declare class TaxDocumentsController {
    private readonly taxDocumentsService;
    constructor(taxDocumentsService: TaxDocumentsService);
    certificate(taxDocument: DocumentoTributarioDTO, token: string): Promise<any>;
    anulate(anulationDocument: AnulacionRequestDTO, codigoGeneracion: string, token: string): Promise<{
        ambiente: string;
        clasificaMsg: string;
        codigoGeneracion?: string;
        codigoLote?: string;
        codigoMsg: string;
        descripcionMsg: string;
        estado: import("../../../types/hacienda.types").HaciendaResponseStatus;
        fhProcesamiento: string;
        idEnvio?: string;
        observaciones?: string[];
        selloRecibido?: string;
        version: number;
        versionApp: number;
    }>;
    sendEmail(codigoGeneracion: string, token: string): Promise<void>;
    getPdf(res: Response, codigoGeneracion: string): Promise<StreamableFile>;
    getJson(res: Response, codigoGeneracion: string): Promise<StreamableFile>;
}
