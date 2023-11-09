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
exports.UpdateCompanyDto = void 0;
const auth_util_1 = require("../../../utils/auth.util");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const IsActiveStringNotEmpty_1 = require("../../../validators/IsActiveStringNotEmpty");
const create_company_dto_1 = require("./create-company.dto");
const direccion_dto_1 = require("./direccion.dto");
const llaves_dto_1 = require("./llaves.dto");
const smtp_dto_1 = require("../../email/dto/smtp.dto");
class UpdateCompanyDto extends (0, mapped_types_1.PartialType)(create_company_dto_1.CreateCompanyDto) {
}
exports.UpdateCompanyDto = UpdateCompanyDto;
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "contrasena", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCompanyDto.prototype, "isActive", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "codigoActividad", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "codigoEstablecimiento", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "codigoEstablecimientoMH", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "codigoGiro", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "codigoPuntoVenta", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "codigoPuntoVentaMH", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "descripcionActividad", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "descripcionGiro", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((c) => c.isActive),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmpty)(auth_util_1.isActiveCustomMessage),
    (0, class_transformer_1.Type)(() => direccion_dto_1.DireccionDto),
    __metadata("design:type", direccion_dto_1.DireccionDto)
], UpdateCompanyDto.prototype, "direccion", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((c) => c.isActive),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmpty)(auth_util_1.isActiveCustomMessage),
    (0, class_transformer_1.Type)(() => smtp_dto_1.SmtpConfigDTO),
    __metadata("design:type", smtp_dto_1.SmtpConfigDTO)
], UpdateCompanyDto.prototype, "configuracionSmtp", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "giroComercial", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "nombreComercial", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "tipoMoneda", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "nrc", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((c) => c.isActive),
    (0, class_validator_1.IsNotEmpty)(auth_util_1.isActiveCustomMessage),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => llaves_dto_1.LlavesDto),
    __metadata("design:type", llaves_dto_1.LlavesDto)
], UpdateCompanyDto.prototype, "llaves", void 0);
__decorate([
    (0, IsActiveStringNotEmpty_1.IsActiveStringNotEmpty)('isActive', auth_util_1.isActiveCustomMessage),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "telefono", void 0);
//# sourceMappingURL=update-company.dto.js.map