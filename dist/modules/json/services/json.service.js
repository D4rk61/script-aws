"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonService = void 0;
const path_util_1 = require("../../../utils/path.util");
const common_1 = require("@nestjs/common");
const fs = require("node:fs");
const node_path_1 = require("node:path");
let JsonService = class JsonService {
    async getJson(taxDocument) {
        try {
            const { documentoTributario } = taxDocument;
            const { identificacion } = documentoTributario;
            return await this.generateJsonFile(identificacion.codigoGeneracion, taxDocument);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new common_1.NotFoundException('Archivo JSON no encontrado');
            }
            throw error;
        }
    }
    async generateJsonFile(codigoGeneracion, jsonObj) {
        const { documentoTributario, respuestaHacienda } = jsonObj;
        const jsonFileBuffer = Buffer.from(JSON.stringify({ documentoTributario, respuestaHacienda }));
        const jsonTempFilePath = (0, node_path_1.join)(process.cwd(), path_util_1.PATH.json, `${codigoGeneracion}.json`);
        await fs.promises.writeFile(jsonTempFilePath, jsonFileBuffer);
        const file = fs.createReadStream(jsonTempFilePath);
        return new common_1.StreamableFile(file);
    }
};
exports.JsonService = JsonService;
exports.JsonService = JsonService = __decorate([
    (0, common_1.Injectable)()
], JsonService);
//# sourceMappingURL=json.service.js.map