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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { LoginDto, UpdatePasswordDTO } from '@/modules/auth/dto';
import { Role } from '@/modules/auth/enums';
import { CompaniesService, Company, CreateCompanyDto, UpdateCompanyDto } from '@/modules/companies';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private companiesService;
    private configService;
    private jwtService;
    constructor(companiesService: CompaniesService, configService: ConfigService, jwtService: JwtService);
    login({ nombreUsuario, contrasena: password, nit, }: LoginDto): Promise<any>;
    register(companyDto: CreateCompanyDto): Promise<Company>;
    update(companyDto: UpdateCompanyDto, token: string): Promise<{
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
        schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
        direccion?: import("@/modules/companies").DireccionDto;
        giroComercial?: string;
        nit: string;
        nombreComercial?: string;
        nombreEmpresa: string;
        nombreUsuario: string;
        llaves?: import("@/modules/companies").LlavesDto;
        roles: Role[];
        telefono?: string;
        tipoMoneda?: string;
        nrc?: string;
        createdAt?: Date;
        updatedAt?: Date;
        configuracionSmtp?: import("../..").SmtpConfigDTO;
        isActive?: boolean;
    }>;
    changePassword({ currentPassword, newPassword, nit }: UpdatePasswordDTO, token: string): Promise<{
        message: string;
    }>;
    private existsAdmin;
    private getToken;
}
