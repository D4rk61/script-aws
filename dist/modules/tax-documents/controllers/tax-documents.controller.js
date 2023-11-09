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
exports.TaxDocumentsController = void 0;
const auth_1 = require("../../auth");
const dto_1 = require("../dto");
const http_types_1 = require("../../../types/http.types");
const http_util_1 = require("../../../utils/http.util");
const common_1 = require("@nestjs/common");
const anulacion_dto_1 = require("../dto/anulacion.dto");
const tax_documents_service_1 = require("../services/tax-documents.service");
let TaxDocumentsController = class TaxDocumentsController {
    constructor(taxDocumentsService) {
        this.taxDocumentsService = taxDocumentsService;
    }
    async certificate(taxDocument, token) {
        try {
            const result = await this.taxDocumentsService.certificate(taxDocument, token);
            return result;
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al certificar documento tributario.');
        }
    }
    async anulate(anulationDocument, codigoGeneracion, token) {
        try {
            const result = await this.taxDocumentsService.anulate(anulationDocument, codigoGeneracion, token);
            return result;
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al certificar documento tributario.');
        }
    }
    async sendEmail(codigoGeneracion, token) {
        try {
            await this.taxDocumentsService.sendEmail(codigoGeneracion, token);
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al enviar el correo.');
        }
    }
    async getPdf(res, codigoGeneracion) {
        try {
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment;  filename="${codigoGeneracion}.pdf"`,
            });
            return await this.taxDocumentsService.getPdf(codigoGeneracion);
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al generar el PDF.');
        }
    }
    async getJson(res, codigoGeneracion) {
        try {
            res.set({
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment;  filename="${codigoGeneracion}.json"`,
            });
            return await this.taxDocumentsService.getJson(codigoGeneracion);
        }
        catch (error) {
            throw (0, http_util_1.createHttpException)(error, 'Error al generar el JSON.');
        }
    }
};
exports.TaxDocumentsController = TaxDocumentsController;
__decorate([
    (0, common_1.Post)('/certificar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)(http_types_1.HeadersKeys.authorization)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DocumentoTributarioDTO, String]),
    __metadata("design:returntype", Promise)
], TaxDocumentsController.prototype, "certificate", null);
__decorate([
    (0, common_1.Post)('/anular/:codigoGeneracionDTE'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('codigoGeneracionDTE')),
    __param(2, (0, common_1.Headers)(http_types_1.HeadersKeys.authorization)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anulacion_dto_1.AnulacionRequestDTO, String, String]),
    __metadata("design:returntype", Promise)
], TaxDocumentsController.prototype, "anulate", null);
__decorate([
    (0, common_1.Get)('email/:codigoGeneracion'),
    __param(0, (0, common_1.Param)('codigoGeneracion')),
    __param(1, (0, common_1.Headers)(http_types_1.HeadersKeys.authorization)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaxDocumentsController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Get)('pdf/:codigoGeneracion'),
    (0, auth_1.Public)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('codigoGeneracion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TaxDocumentsController.prototype, "getPdf", null);
__decorate([
    (0, common_1.Get)('json/:codigoGeneracion'),
    (0, auth_1.Public)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('codigoGeneracion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TaxDocumentsController.prototype, "getJson", null);
exports.TaxDocumentsController = TaxDocumentsController = __decorate([
    (0, common_1.Controller)({ path: 'documentos-tributarios', version: '1' }),
    __metadata("design:paramtypes", [tax_documents_service_1.TaxDocumentsService])
], TaxDocumentsController);
//# sourceMappingURL=tax-documents.controller.js.map