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
exports.EmailService = void 0;
const files_util_1 = require("../../../utils/files.util");
const hacienda_util_1 = require("../../../utils/hacienda.util");
const handlebars_util_1 = require("../../../utils/handlebars.util");
const mailer_util_1 = require("../../../utils/mailer.util");
const path_util_1 = require("../../../utils/path.util");
const puppeteer_util_1 = require("../../../utils/puppeteer.util");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_util_1 = require("../../../utils/crypto.util");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
    }
    async sendEmail(taxDocument, company) {
        try {
            this.validateTaxDocument(taxDocument);
            const { documentoTributario } = taxDocument;
            const { codigoGeneracion } = documentoTributario.identificacion;
            const { nit, nombreComercial } = documentoTributario.emisor;
            const { correo } = documentoTributario.receptor;
            const pdf = await (0, files_util_1.readFile)(path_util_1.PATH.temp, `${codigoGeneracion}.pdf`, 'base64');
            const mailContent = (0, hacienda_util_1.convertToLayoutObject)(taxDocument);
            const image = await (0, files_util_1.readFile)(`${path_util_1.PATH.images}/${nit}`, `${nit}.png`, 'base64');
            const mailData = {
                image: `data:image/png;base64,${image}`,
                ...mailContent,
            };
            const emailHtmlTemplate = await (0, files_util_1.readFile)(`${path_util_1.PATH.email}/${nit}`, `${nit}.email.hbs`, 'utf-8');
            const emailHtml = await (0, handlebars_util_1.compileTemplate)(emailHtmlTemplate, mailData);
            this.validateHtmlTemplate(emailHtml);
            const screenshotBase64 = await this.getScreenshot(emailHtml);
            const transportOptions = company.configuracionSmtp;
            transportOptions.auth.pass = this.decryptSmtpPassword(transportOptions.auth.pass);
            const mailOptions = this.createMailOptions({
                from: `${company.nombreComercial} <${company.correoEmpresa}>`,
                to: correo,
                codigoGeneracion,
                screenshot: screenshotBase64,
                pdf,
                nombreComercial,
            });
            await (0, mailer_util_1.sendEmailWithTransporter)(transportOptions, mailOptions);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new common_1.NotFoundException('Plantilla HTML para la generación del correo no encontrada');
            }
            return error;
        }
    }
    async getScreenshot(html) {
        return await (0, puppeteer_util_1.generateScreenshot)({
            encoding: 'base64',
            fullPage: true,
            type: 'png',
            height: 800,
            width: 700,
            html,
        });
    }
    createMailOptions({ from, to, codigoGeneracion, screenshot, pdf, nombreComercial, }) {
        return {
            from,
            to,
            subject: `${nombreComercial} le emitió un documento electrónico`,
            html: '<img src="cid:screenshot" alt="Detalle de documento"/>',
            attachments: [
                {
                    filename: `${codigoGeneracion}.png`,
                    content: screenshot,
                    encoding: 'base64',
                    cid: 'screenshot',
                },
                {
                    filename: `${codigoGeneracion}.pdf`,
                    content: pdf,
                    encoding: 'base64',
                },
            ],
        };
    }
    decryptSmtpPassword(smtpPass) {
        const encryptedPassword = this.configService.get('CRYPTO_KEY');
        return (0, crypto_util_1.decrypt)(smtpPass, encryptedPassword);
    }
    validateHtmlTemplate(htmlTemplate) {
        if (!htmlTemplate) {
            throw new common_1.NotFoundException('Plantilla HTML para generar correo no encontrada');
        }
    }
    validateTaxDocument(taxDocument) {
        if (!taxDocument) {
            throw new common_1.NotFoundException('Documento tributario no encontrado');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map