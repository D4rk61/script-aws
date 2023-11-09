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
import { Role } from '@/modules/auth/enums';
import { HydratedDocument } from 'mongoose';
import { DireccionDto, LlavesDto } from '../dto';
import { SmtpConfigDTO } from '@/modules/email/dto/smtp.dto';
export type CompanyDocument = HydratedDocument<Company>;
export declare class Company {
    ambiente: string;
    codigoActividad?: string;
    codigoEstablecimiento?: string;
    codigoEstablecimientoMH?: string;
    codigoGiro?: string;
    codigoPuntoVenta?: string;
    codigoPuntoVentaMH?: string;
    contrasena: string;
    correoEmpresa: string;
    descripcionActividad?: string;
    descripcionGiro?: string;
    direccion?: DireccionDto;
    giroComercial?: string;
    nit: string;
    nombreComercial?: string;
    nombreEmpresa: string;
    nombreUsuario: string;
    llaves?: LlavesDto;
    roles: Role[];
    telefono?: string;
    tipoMoneda?: string;
    nrc?: string;
    createdAt?: Date;
    updatedAt?: Date;
    configuracionSmtp?: SmtpConfigDTO;
    isActive?: boolean;
}
export declare const CompanySchema: import("mongoose").Schema<Company, import("mongoose").Model<Company, any, any, any, import("mongoose").Document<unknown, any, Company> & Company & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, import("mongoose").Document<unknown, {}, Company> & Company & {
    _id: import("mongoose").Types.ObjectId;
}>;
