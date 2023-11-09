"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_util_1 = require("../../../utils/auth.util");
const enums_1 = require("../enums");
const companies_1 = require("../../companies");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(companiesService, configService, jwtService) {
        this.companiesService = companiesService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async login({ nombreUsuario, contrasena: password, nit, }) {
        const companyFound = await this.companiesService.findOne(nit);
        await (0, auth_util_1.checkCredentials)(companyFound, password);
        const accessToken = this.getToken({
            sub: companyFound.nit,
            username: nombreUsuario,
            roles: companyFound.roles,
        });
        return {
            data: companyFound,
            accessToken,
        };
    }
    async register(companyDto) {
        const { contrasena: password, roles, ...companyDetails } = companyDto;
        const passwordHash = await (0, bcrypt_1.hash)(password, 10);
        if (!(0, auth_util_1.hasRole)(roles, enums_1.Role.USER))
            roles.push(enums_1.Role.USER);
        if ((0, auth_util_1.hasRole)(roles, enums_1.Role.ADMIN)) {
            companyDetails.isActive = true;
            const adminFound = await this.existsAdmin();
            if (adminFound)
                throw new common_1.ForbiddenException('Ya existe un administrador en el sistema.');
        }
        const companyToInsert = {
            ...companyDetails,
            contrasena: passwordHash,
            roles,
        };
        return await this.companiesService.create(companyToInsert);
    }
    async update(companyDto, token) {
        const { roles, ...companyDetails } = companyDto;
        const tokenData = (0, auth_util_1.extractTokenFromHeaderValue)(token);
        const { sub } = await this.jwtService.verifyAsync(tokenData, {
            secret: this.configService.get('JWT_SECRET'),
        });
        if (roles && !(0, auth_util_1.hasRole)(roles, enums_1.Role.USER))
            roles.push(enums_1.Role.USER);
        if (roles && (0, auth_util_1.hasRole)(roles, enums_1.Role.ADMIN)) {
            companyDetails.isActive = true;
            const adminFound = await this.existsAdmin();
            if (adminFound)
                throw new common_1.ForbiddenException('Ya existe un administrador en el sistema.');
        }
        if (companyDto.isActive === undefined)
            throw new common_1.ForbiddenException('isActive debe esta definido.');
        const companyToInsert = {
            ...companyDetails,
            roles,
        };
        return this.companiesService.update(sub, companyToInsert);
    }
    async changePassword({ currentPassword, newPassword, nit }, token) {
        try {
            const tokenData = (0, auth_util_1.extractTokenFromHeaderValue)(token);
            const payload = await this.jwtService.verifyAsync(tokenData, {
                secret: this.configService.get('JWT_SECRET'),
            });
            const { sub, roles } = payload;
            if (sub !== nit && !(0, auth_util_1.hasRole)(roles, enums_1.Role.ADMIN))
                throw new common_1.UnauthorizedException('No tienes permisos para cambiar la contraseña de esta empresa.');
            const passwordHash = await (0, bcrypt_1.hash)(newPassword, 10);
            if ((0, auth_util_1.hasRole)(roles, enums_1.Role.ADMIN))
                return this.companiesService.changePassword(passwordHash, nit);
            const companyFound = await this.companiesService.findOne(sub);
            await (0, auth_util_1.checkCredentials)(companyFound, currentPassword);
            return this.companiesService.changePassword(passwordHash, sub);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message ?? error);
        }
    }
    async existsAdmin() {
        const adminFound = await this.companiesService.findOneByRole({
            role: enums_1.Role.ADMIN,
        });
        return Boolean(adminFound);
    }
    getToken({ sub, username, roles }) {
        const payload = {
            sub,
            username,
            roles,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [companies_1.CompaniesService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map