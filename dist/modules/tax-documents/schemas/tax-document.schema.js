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
exports.TaxDocumentSchema = exports.TaxDocument = void 0;
const dto_1 = require("../dto");
const hacienda_types_1 = require("../../../types/hacienda.types");
const mongoose_1 = require("@nestjs/mongoose");
let TaxDocument = class TaxDocument {
};
exports.TaxDocument = TaxDocument;
__decorate([
    (0, mongoose_1.Prop)({ type: dto_1.DocumentoTributarioDTO }),
    __metadata("design:type", dto_1.DocumentoTributarioDTO)
], TaxDocument.prototype, "documentoTributario", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: hacienda_types_1.HaciendaResponseDTO }),
    __metadata("design:type", hacienda_types_1.HaciendaResponseDTO)
], TaxDocument.prototype, "respuestaHacienda", void 0);
exports.TaxDocument = TaxDocument = __decorate([
    (0, mongoose_1.Schema)()
], TaxDocument);
exports.TaxDocumentSchema = mongoose_1.SchemaFactory.createForClass(TaxDocument);
//# sourceMappingURL=tax-document.schema.js.map