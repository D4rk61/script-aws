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
import { AuthService } from '@/modules/auth/services';
import { CreateCompanyDto, UpdateCompanyDto } from '@/modules/companies';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(login: LoginDto): Promise<any>;
    register({ ambiente, contrasena, correoEmpresa, nit, nombreEmpresa, nombreUsuario, roles, }: CreateCompanyDto): Promise<import("@/modules/companies").Company>;
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
        roles: import("..").Role[];
        telefono?: string;
        tipoMoneda?: string;
        nrc?: string;
        createdAt?: Date;
        updatedAt?: Date;
        configuracionSmtp?: import("../..").SmtpConfigDTO;
        isActive?: boolean;
    }>;
    changePassword(token: string, updatePasswordDTO: UpdatePasswordDTO): Promise<{
        message: string;
    }>;
}
