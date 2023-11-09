import { CreateCompanyDto } from './create-company.dto';
import { DireccionDto } from './direccion.dto';
import { LlavesDto } from './llaves.dto';
import { SmtpConfigDTO } from '@/modules/email/dto/smtp.dto';
declare const UpdateCompanyDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCompanyDto>>;
export declare class UpdateCompanyDto extends UpdateCompanyDto_base {
    contrasena?: string;
    isActive: boolean;
    codigoActividad: string;
    codigoEstablecimiento: string;
    codigoEstablecimientoMH: string;
    codigoGiro: string;
    codigoPuntoVenta: string;
    codigoPuntoVentaMH: string;
    descripcionActividad: string;
    descripcionGiro: string;
    direccion: DireccionDto;
    configuracionSmtp: SmtpConfigDTO;
    giroComercial: string;
    nombreComercial: string;
    tipoMoneda: string;
    nrc: string;
    llaves: LlavesDto;
    telefono: string;
}
export {};
