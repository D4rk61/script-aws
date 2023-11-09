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
import { CreateCompanyDto, LlavesDto, UpdateCompanyDto } from '@/modules/companies/dto';
import { Company, CompanyDocument } from '@/modules/companies/schemas';
import { SmtpConfigDTO } from '@/modules/email/dto/smtp.dto';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
export declare class CompaniesService {
    private companyModel;
    private readonly configService;
    constructor(companyModel: Model<CompanyDocument>, configService: ConfigService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Company> & Company & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Company> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findOne(nit: string): Promise<Company | undefined>;
    findOneByRole({ role }: {
        role: Role;
    }): Promise<Company | undefined>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Company> & Company & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Company> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    update(nit: string, updateCompanyDto: UpdateCompanyDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        __v?: any;
        $locals: Record<string, unknown>;
        $op: "validate" | "remove" | "save";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: string]: any;
        }, import("mongoose").Document<unknown, {}, {
            [x: string]: any;
        }> & {
            [x: string]: any;
        } & Required<{
            _id: unknown;
        }>>;
        ambiente: string;
        codigoActividad?: string;
        codigoEstablecimiento?: string;
        codigoEstablecimientoMH?: string;
        codigoGiro?: string;
        codigoPuntoVenta?: string;
        codigoPuntoVentaMH?: string;
        correoEmpresa: string;
        descripcionActividad?: string;
        descripcionGiro?: string;
        direccion?: import("@/modules/companies/dto").DireccionDto;
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
    }>;
    changePassword(hashedPassword: string, nit: string): Promise<{
        message: string;
    }>;
    private buildConfigurationSmtp;
    private encryptSmtpConfig;
    remove(id: number): string;
}
