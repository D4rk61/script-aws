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
import { DocumentoTributarioDTO } from '@/modules/tax-documents/dto';
import { HaciendaResponseDTO } from '@/types/hacienda.types';
import { HydratedDocument } from 'mongoose';
export type TaxHydratedDocument = HydratedDocument<TaxDocument>;
export declare class TaxDocument {
    documentoTributario: DocumentoTributarioDTO;
    respuestaHacienda: HaciendaResponseDTO;
}
export declare const TaxDocumentSchema: import("mongoose").Schema<TaxDocument, import("mongoose").Model<TaxDocument, any, any, any, import("mongoose").Document<unknown, any, TaxDocument> & TaxDocument & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TaxDocument, import("mongoose").Document<unknown, {}, TaxDocument> & TaxDocument & {
    _id: import("mongoose").Types.ObjectId;
}>;
