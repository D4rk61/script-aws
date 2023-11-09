import { Company } from '@/modules/companies';
import { Role } from '@/modules/auth/enums';
import { ValidationArguments } from 'class-validator';
export declare function hasRole(roles: Role[], roleName: Role): boolean;
export declare function isActiveErrorMessage({ property }: ValidationArguments): string;
export declare const isActiveCustomMessage: {
    message: typeof isActiveErrorMessage;
};
export declare function extractTokenFromHeaderValue(token: string): string | undefined;
export declare function checkCredentials(company: Company, password: string): Promise<void>;
