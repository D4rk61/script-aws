import { Role } from 'src/modules/auth/enums';
export interface JwtPayload {
    sub: string;
    username: string;
    roles: Role[];
}
