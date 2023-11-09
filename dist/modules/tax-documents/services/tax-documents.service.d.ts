/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CompaniesService } from '@/modules/companies';
import { EmailService } from '@/modules/email';
import { JsonService } from '@/modules/json';
import { PdfService } from '@/modules/pdf';
import { HaciendaResponseStatus } from '@/types/hacienda.types';
import { SignDocumentResponse } from '@/types/tax-documents.types';
import { StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AnulationDocument, TaxDocument, TaxHydratedDocument } from '../schemas';
import { AnulacionDTO, AnulacionRequestDTO, DocumentoTributarioDTO } from '../dto';
export declare class TaxDocumentsService {
    private readonly taxDocumentModel;
    private readonly anulacionModel;
    private readonly configService;
    private readonly jwtService;
    private readonly companiesService;
    private readonly emailService;
    private readonly pdfService;
    private readonly jsonService;
    constructor(taxDocumentModel: Model<TaxHydratedDocument>, anulacionModel: Model<AnulationDocument>, configService: ConfigService, jwtService: JwtService, companiesService: CompaniesService, emailService: EmailService, pdfService: PdfService, jsonService: JsonService);
    findByCodigoGeneracion(codigoGeneracion: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TaxDocument> & TaxDocument & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, TaxDocument> & TaxDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    anulate(anulateReq: AnulacionRequestDTO, codigoGeneracionDTE: string, token: string): Promise<{
        ambiente: string;
        clasificaMsg: string;
        codigoGeneracion?: string;
        codigoLote?: string;
        codigoMsg: string;
        descripcionMsg: string;
        estado: HaciendaResponseStatus;
        fhProcesamiento: string;
        idEnvio?: string;
        observaciones?: string[];
        selloRecibido?: string;
        version: number;
        versionApp: number;
    }>;
    certificate(taxDocument: DocumentoTributarioDTO, token: string, retryCount?: number): any;
    getSignAndHaciendaToken(taxDocument: DocumentoTributarioDTO | AnulacionDTO, token: string): Promise<[SignDocumentResponse, string]>;
    sendEmail(codigoGeneracion: string, token: string): Promise<void>;
    getPdf(codigoGeneracion: string): Promise<StreamableFile>;
    getJson(codigoGeneracion: string): Promise<StreamableFile>;
    private createAnulationDocument;
    private getDocumentStatusFromHacienda;
    loginToHacienda(haciendaUrl: string, nit: string, privateKey: string): Promise<string>;
    private findCompany;
    private anulateDocument;
    private saveDocument;
    private validateCompanyStatus;
    private validateKeys;
    private validateTokenHacienda;
    private validateAnulation;
    private validateTaxDocument;
    private validateCompany;
    private verifyToken;
    private validateHaciendaResponseStatus;
    private decryptKey;
    private createHaciendaCheckDocumentStatusBody;
    private createSignDocumentBody;
    private createHaciendaSendDocumentBody;
    private createLoginParams;
    private createLoginUrl;
    private signDocument;
    private sendDocument;
    private postHaciendaLogin;
}
