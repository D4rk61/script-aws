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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const decorators_1 = require("../decorators");
const dto_1 = require("../dto");
const guards_1 = require("../guards");
const services_1 = require("../services");
const companies_1 = require("../../companies");
const http_types_1 = require("../../../types/http.types");
const http_util_1 = require("../../../utils/http.util");
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(login) {
        try {
            const result = await this.authService.login(login);
            return result;
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al iniciar sesión.');
        }
    }
    async register({ ambiente, contrasena, correoEmpresa, nit, nombreEmpresa, nombreUsuario, roles, }) {
        try {
            const result = await this.authService.register({
                ambiente,
                contrasena,
                correoEmpresa,
                nit,
                nombreEmpresa,
                nombreUsuario,
                roles,
            });
            return result;
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al registrar la empresa.');
        }
    }
    async update(companyDto, token) {
        try {
            const result = await this.authService.update(companyDto, token);
            return result;
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al actualizar la empresa.');
        }
    }
    async changePassword(token, updatePasswordDTO) {
        try {
            const result = await this.authService.changePassword(updatePasswordDTO, token);
            return result;
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al actualizar la contraseña.');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('register'),
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [companies_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('update'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)(http_types_1.HeadersKeys.authorization)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [companies_1.UpdateCompanyDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('update-password'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    __param(0, (0, common_1.Headers)(http_types_1.HeadersKeys.authorization)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)({
        version: '1',
        path: 'auth',
    }),
    __metadata("design:paramtypes", [services_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map