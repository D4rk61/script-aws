"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const files_util_1 = require("../../../utils/files.util");
const hacienda_util_1 = require("../../../utils/hacienda.util");
const handlebars_util_1 = require("../../../utils/handlebars.util");
const path_util_1 = require("../../../utils/path.util");
const puppeteer_util_1 = require("../../../utils/puppeteer.util");
const common_1 = require("@nestjs/common");
const fs = require("node:fs");
const node_path_1 = require("node:path");
const qrCode = require("qrcode");
let PdfService = class PdfService {
    async getPdf(taxDocument, isAnulation = false) {
        try {
            const { documentoTributario, respuestaHacienda } = taxDocument;
            const { identificacion, emisor } = documentoTributario;
            const contentData = {
                contenido: (0, hacienda_util_1.convertToLayoutObject)({
                    documentoTributario,
                    respuestaHacienda,
                }),
            };
            const headerData = {
                urlCodigoQR: await this.generateQRCodeUrl(documentoTributario),
                contenido: contentData.contenido,
                isAnulation,
            };
            const contentHtmlTemplate = await (0, files_util_1.readFile)(`${path_util_1.PATH.pdf}/${emisor.nit}`, `${identificacion.tipoDte}-${emisor.nit}.template.hbs`, 'utf-8');
            this.validateHtmlTemplate(contentHtmlTemplate);
            const headerHtmlTemplate = await (0, files_util_1.readFile)(`${path_util_1.PATH.pdf}/${emisor.nit}`, `${identificacion.tipoDte}-${emisor.nit}.header.hbs`, 'utf-8');
            this.validateHtmlTemplate(headerHtmlTemplate);
            const contentHtml = await (0, handlebars_util_1.compileTemplate)(contentHtmlTemplate, contentData);
            const headerHtml = await (0, handlebars_util_1.compileTemplate)(headerHtmlTemplate, headerData);
            return await this.generatePDF(identificacion.codigoGeneracion, contentHtml, headerHtml);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new common_1.NotFoundException('Plantilla para la generación de la factura no encontrada');
            }
            throw error;
        }
    }
    async generateQRCodeUrl(facturaElectronica) {
        const qrUrl = (0, hacienda_util_1.getHaciendaUrl)({
            emissionDate: facturaElectronica.identificacion.fecEmi,
            environment: facturaElectronica.identificacion.ambiente,
            generationCode: facturaElectronica.identificacion.codigoGeneracion,
        });
        return await qrCode.toDataURL(qrUrl);
    }
    async generatePDF(codigoGeneracion, contentHtml, headerHtml) {
        const browser = await (0, puppeteer_util_1.launchBrowser)();
        const page = await browser.newPage();
        await page.setContent(contentHtml);
        const pdfFileBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '11.05cm',
                bottom: '0.5cm',
                left: '0.5cm',
                right: '0.5cm',
            },
            displayHeaderFooter: true,
            headerTemplate: headerHtml,
        });
        await browser.close();
        const pdfTempFilePath = (0, node_path_1.join)(process.cwd(), path_util_1.PATH.temp, `${codigoGeneracion}.pdf`);
        await fs.promises.writeFile(pdfTempFilePath, pdfFileBuffer);
        const file = fs.createReadStream(pdfTempFilePath);
        return new common_1.StreamableFile(file);
    }
    validateHtmlTemplate(htmlTemplate) {
        if (!htmlTemplate)
            throw new common_1.NotFoundException('No se encontró la plantilla HTML para generar el PDF');
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map