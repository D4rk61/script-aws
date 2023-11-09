import { Role } from '@/modules/auth/enums';
export declare class CreateCompanyDto {
    ambiente: string;
    contrasena: string;
    correoEmpresa: string;
    nit: string;
    nombreEmpresa: string;
    nombreUsuario: string;
    roles: Role[];
    isActive?: boolean;
}
