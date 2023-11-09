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
exports.CompanySchema = exports.Company = void 0;
const enums_1 = require("../../auth/enums");
const mongoose_1 = require("@nestjs/mongoose");
const dto_1 = require("../dto");
const smtp_dto_1 = require("../../email/dto/smtp.dto");
let Company = class Company {
};
exports.Company = Company;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Company.prototype, "ambiente", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "codigoActividad", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "codigoEstablecimiento", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "codigoEstablecimientoMH", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "codigoGiro", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "codigoPuntoVenta", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "codigoPuntoVentaMH", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Company.prototype, "contrasena", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Company.prototype, "correoEmpresa", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "descripcionActividad", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "descripcionGiro", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: dto_1.DireccionDto }),
    __metadata("design:type", dto_1.DireccionDto)
], Company.prototype, "direccion", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "giroComercial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Company.prototype, "nit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "nombreComercial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Company.prototype, "nombreEmpresa", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Company.prototype, "nombreUsuario", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: dto_1.LlavesDto }),
    __metadata("design:type", dto_1.LlavesDto)
], Company.prototype, "llaves", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [enums_1.Role.USER] }),
    __metadata("design:type", Array)
], Company.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "telefono", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "tipoMoneda", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Company.prototype, "nrc", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: smtp_dto_1.SmtpConfigDTO }),
    __metadata("design:type", smtp_dto_1.SmtpConfigDTO)
], Company.prototype, "configuracionSmtp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Company.prototype, "isActive", void 0);
exports.Company = Company = __decorate([
    (0, mongoose_1.Schema)()
], Company);
exports.CompanySchema = mongoose_1.SchemaFactory.createForClass(Company);
//# sourceMappingURL=company.schema.js.map