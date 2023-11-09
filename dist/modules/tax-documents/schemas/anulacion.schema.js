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
exports.AnulationSchema = exports.Anulation = void 0;
const hacienda_types_1 = require("../../../types/hacienda.types");
const mongoose_1 = require("@nestjs/mongoose");
const anulacion_dto_1 = require("../dto/anulacion.dto");
let Anulation = class Anulation {
};
exports.Anulation = Anulation;
__decorate([
    (0, mongoose_1.Prop)({ type: anulacion_dto_1.AnulacionDTO }),
    __metadata("design:type", anulacion_dto_1.AnulacionDTO)
], Anulation.prototype, "documentoTributario", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: hacienda_types_1.HaciendaResponseDTO }),
    __metadata("design:type", hacienda_types_1.HaciendaResponseDTO)
], Anulation.prototype, "respuestaHacienda", void 0);
exports.Anulation = Anulation = __decorate([
    (0, mongoose_1.Schema)()
], Anulation);
exports.AnulationSchema = mongoose_1.SchemaFactory.createForClass(Anulation);
//# sourceMappingURL=anulacion.schema.js.map