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
exports.TaxDocumentsService = void 0;
const companies_1 = require("../../companies");
const email_1 = require("../../email");
const json_1 = require("../../json");
const pdf_1 = require("../../pdf");
const hacienda_types_1 = require("../../../types/hacienda.types");
const http_types_1 = require("../../../types/http.types");
const auth_util_1 = require("../../../utils/auth.util");
const crypto_util_1 = require("../../../utils/crypto.util");
const hacienda_util_1 = require("../../../utils/hacienda.util");
const http_util_1 = require("../../../utils/http.util");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let TaxDocumentsService = class TaxDocumentsService {
    constructor(taxDocumentModel, anulacionModel, configService, jwtService, companiesService, emailService, pdfService, jsonService) {
        this.taxDocumentModel = taxDocumentModel;
        this.anulacionModel = anulacionModel;
        this.configService = configService;
        this.jwtService = jwtService;
        this.companiesService = companiesService;
        this.emailService = emailService;
        this.pdfService = pdfService;
        this.jsonService = jsonService;
    }
    async findByCodigoGeneracion(codigoGeneracion) {
        return this.taxDocumentModel.findOne({
            'documentoTributario.identificacion.codigoGeneracion': codigoGeneracion,
        });
    }
    async anulate(anulateReq, codigoGeneracionDTE, token) {
        const haciendaUrl = this.configService.get('HACIENDA_URL');
        const taxDocument = await this.findByCodigoGeneracion(codigoGeneracionDTE);
        this.validateTaxDocument(taxDocument, codigoGeneracionDTE);
        this.validateAnulation(taxDocument);
        const anulateDocument = this.createAnulationDocument(taxDocument, anulateReq);
        const [signResponse, haciendaToken] = await this.getSignAndHaciendaToken(anulateDocument, token);
        const anulateDocumentBody = this.createHaciendaSendDocumentBody(anulateDocument, signResponse);
        const anulateDocumentResponse = await this.sendDocument(anulateDocumentBody, `${haciendaUrl}/fesv/anulardte`, haciendaToken);
        if (!this.validateHaciendaResponseStatus(anulateDocumentResponse)) {
            return { ...anulateDocumentResponse };
        }
        await this.anulateDocument(codigoGeneracionDTE);
        await this.anulacionModel.create({
            documentoTributario: anulateDocument,
            respuestaHacienda: anulateDocumentResponse,
        });
        await this.sendEmail(codigoGeneracionDTE, token);
        return { ...anulateDocumentResponse };
    }
    async certificate(taxDocument, token, retryCount = 0) {
        const haciendaUrl = this.configService.get('HACIENDA_URL');
        const retryCountLimit = this.configService.get('CERTIFICATE_RETRY_LIMIT');
        const [signResponse, haciendaToken] = await this.getSignAndHaciendaToken(taxDocument, token);
        if (retryCount >= retryCountLimit) {
            const documentStatusHaciendaResponse = await this.getDocumentStatusFromHacienda(haciendaUrl, taxDocument, haciendaToken);
            const isDocumentCertificated = this.validateHaciendaResponseStatus(documentStatusHaciendaResponse);
            if (!isDocumentCertificated)
                throw new common_1.RequestTimeoutException('No se pudo certificar el documento tributario, debes iniciar proceso de contigencia.');
            return await this.saveDocument(taxDocument, documentStatusHaciendaResponse, token);
        }
        const certificateDocumentBody = this.createHaciendaSendDocumentBody(taxDocument, signResponse);
        const serviceUrl = taxDocument.identificacion.motivoContin
            ? `${haciendaUrl}/fesv/contingencia`
            : `${haciendaUrl}/fesv/recepciondte`;
        const certificatedDocumentResponse = await this.sendDocument(certificateDocumentBody, serviceUrl, haciendaToken);
        if (!certificatedDocumentResponse) {
            return this.certificate(taxDocument, token, retryCount + 1);
        }
        if (!this.validateHaciendaResponseStatus(certificatedDocumentResponse)) {
            return { ...certificatedDocumentResponse };
        }
        return await this.saveDocument(taxDocument, certificatedDocumentResponse, token);
    }
    async getSignAndHaciendaToken(taxDocument, token) {
        const tokenData = (0, auth_util_1.extractTokenFromHeaderValue)(token);
        const { sub } = await this.verifyToken(tokenData);
        const firmadorUrl = this.configService.get('FIRMADOR_URL');
        const haciendaUrl = this.configService.get('HACIENDA_URL');
        const company = await this.findCompany(sub);
        this.validateCompanyStatus(company);
        this.validateKeys(company.llaves);
        const decryptedPrivateKey = this.decryptKey(company.llaves.privada);
        const decryptedPublicKey = this.decryptKey(company.llaves.publica);
        return await Promise.all([
            this.signDocument(company.nit, taxDocument, decryptedPublicKey, firmadorUrl),
            this.loginToHacienda(haciendaUrl, company.nit, decryptedPrivateKey),
        ]);
    }
    async sendEmail(codigoGeneracion, token) {
        const tokenData = (0, auth_util_1.extractTokenFromHeaderValue)(token);
        const { sub } = await this.verifyToken(tokenData);
        const company = await this.findCompany(sub);
        this.validateCompany(company);
        const taxDocument = await this.findByCodigoGeneracion(codigoGeneracion);
        this.validateTaxDocument(taxDocument, codigoGeneracion);
        await this.pdfService.getPdf(taxDocument);
        await this.emailService.sendEmail(taxDocument, company);
    }
    async getPdf(codigoGeneracion) {
        const taxDocument = await this.findByCodigoGeneracion(codigoGeneracion);
        const { documentoTributario: { identificacion }, } = taxDocument;
        this.validateTaxDocument(taxDocument, codigoGeneracion);
        const isAnulated = !!identificacion?.anulado;
        return await this.pdfService.getPdf(taxDocument, isAnulated);
    }
    async getJson(codigoGeneracion) {
        const taxDocument = await this.findByCodigoGeneracion(codigoGeneracion);
        this.validateTaxDocument(taxDocument, codigoGeneracion);
        return await this.jsonService.getJson(taxDocument);
    }
    createAnulationDocument(taxDocument, anulationReq) {
        try {
            const { documentoTributario: { emisor, identificacion, resumen, receptor }, respuestaHacienda: { selloRecibido }, } = taxDocument;
            const CATALOG_NIT_TYPE = '36';
            const horAnula = (0, hacienda_util_1.getActualHour)();
            const fecAnula = (0, hacienda_util_1.getActualDate)();
            return {
                identificacion: {
                    fecAnula,
                    horAnula,
                    ...anulationReq.identificacion,
                },
                motivo: {
                    nombreResponsable: emisor.nombre,
                    numDocResponsable: emisor.nit,
                    tipDocResponsable: CATALOG_NIT_TYPE,
                    nombreSolicita: receptor.nombre,
                    numDocSolicita: receptor.numDocumento,
                    tipDocSolicita: CATALOG_NIT_TYPE,
                    ...anulationReq.motivo,
                },
                emisor: {
                    codEstable: emisor.codEstable,
                    codEstableMH: emisor.codEstableMH,
                    codPuntoVenta: emisor.codPuntoVenta,
                    codPuntoVentaMH: emisor.codPuntoVentaMH,
                    correo: emisor.correo,
                    nit: emisor.nit,
                    nombre: emisor.nombre,
                    nomEstablecimiento: emisor.nombreComercial,
                    telefono: emisor.telefono,
                    tipoEstablecimiento: emisor.tipoEstablecimiento,
                },
                documento: {
                    codigoGeneracion: identificacion.codigoGeneracion,
                    codigoGeneracionR: null,
                    correo: receptor.correo,
                    fecEmi: identificacion.fecEmi,
                    montoIva: resumen.totalIva,
                    nombre: receptor.nombre,
                    numDocumento: receptor.numDocumento,
                    numeroControl: identificacion.numeroControl,
                    selloRecibido,
                    telefono: receptor.telefono,
                    tipoDocumento: CATALOG_NIT_TYPE,
                    tipoDte: identificacion.tipoDte,
                },
            };
        }
        catch (error) {
            throw new Error(error ?? 'Error al crear el documento de anulación');
        }
    }
    async getDocumentStatusFromHacienda(haciendaUrl, taxDocument, haciendaToken) {
        const { post } = (0, http_util_1.handleHttp)();
        const haciendaSendDocumentBody = this.createHaciendaCheckDocumentStatusBody(taxDocument);
        const haciendaResponse = await post(`${haciendaUrl}/fesv/recepcion/consultadte/`, {
            headers: {
                [http_types_1.HeadersKeys.authorization]: haciendaToken,
            },
            body: haciendaSendDocumentBody,
        }, 8000);
        return haciendaResponse;
    }
    async loginToHacienda(haciendaUrl, nit, privateKey) {
        const loginParams = this.createLoginParams(nit, privateKey);
        const loginUrl = this.createLoginUrl(haciendaUrl, loginParams);
        const loginResponse = await this.postHaciendaLogin(loginUrl);
        const haciendaToken = loginResponse.body.token;
        this.validateTokenHacienda(haciendaToken);
        return haciendaToken;
    }
    async findCompany(nit) {
        return this.companiesService.findOne(nit);
    }
    async anulateDocument(codigoGeneracion) {
        await this.taxDocumentModel.findOneAndUpdate({
            'documentoTributario.identificacion.codigoGeneracion': codigoGeneracion,
        }, { 'documentoTributario.identificacion.anulado': true });
    }
    async saveDocument(taxDocument, haciendaResponse, token) {
        const taxDocumentCopy = { ...taxDocument };
        taxDocumentCopy.identificacion.anulado = false;
        await this.taxDocumentModel.create({
            documentoTributario: { ...taxDocumentCopy },
            respuestaHacienda: haciendaResponse,
        });
        await this.sendEmail(haciendaResponse.codigoGeneracion, token);
        return { ...haciendaResponse };
    }
    validateCompanyStatus(company) {
        if (!company.isActive) {
            throw new common_1.UnauthorizedException('Tu cuenta está inactiva, debes activar tu cuenta para certificar documentos.');
        }
    }
    validateKeys(llaves) {
        if (!llaves.privada) {
            throw new common_1.UnauthorizedException('No se encontró la llave privada en la información de tu compañía.');
        }
        if (!llaves.publica) {
            throw new common_1.UnauthorizedException('No se encontró la llave pública en la información de tu compañía.');
        }
    }
    validateTokenHacienda(token) {
        const [bearer] = token.split(' ');
        if (!bearer)
            throw new common_1.UnauthorizedException('No se encontró el token de autenticación emitido por Ministerio de Hacienda.');
    }
    validateAnulation(taxDocument) {
        if (taxDocument.documentoTributario.identificacion.anulado) {
            throw new common_1.ConflictException('El documento ya ha sido anulado.');
        }
    }
    validateTaxDocument(taxDocument, codigoGeneracion) {
        if (!taxDocument)
            throw new common_1.NotFoundException(`No se encontró el documento tributario con el código de generación ${codigoGeneracion}`);
    }
    validateCompany(company) {
        if (!company)
            throw new common_1.UnauthorizedException('Empresa no encontrada');
        if (!company.isActive)
            throw new common_1.UnauthorizedException('Empresa inactiva');
    }
    async verifyToken(tokenData) {
        if (!tokenData)
            throw new common_1.UnauthorizedException('Token no encontrado');
        return await this.jwtService.verifyAsync(tokenData, {
            secret: this.configService.get('JWT_SECRET'),
        });
    }
    validateHaciendaResponseStatus(haciendaResponse) {
        return haciendaResponse.estado === hacienda_types_1.HaciendaResponseStatus.OK;
    }
    decryptKey(encryptedKey) {
        return (0, crypto_util_1.decrypt)(encryptedKey, this.configService.get('CRYPTO_KEY'));
    }
    createHaciendaCheckDocumentStatusBody(taxDocument) {
        const { identificacion, emisor } = taxDocument;
        return {
            codigoGeneracion: identificacion.codigoGeneracion,
            nitEmisor: emisor.nit,
            tdte: identificacion.tipoDte,
        };
    }
    createSignDocumentBody(nit, taxDocument, publicKey) {
        return {
            passwordPri: publicKey,
            activo: true,
            nit,
            dteJson: taxDocument,
        };
    }
    createHaciendaSendDocumentBody(document, signDocumentResponse) {
        const sendDocumentBody = {
            ambiente: document.identificacion.ambiente,
            documento: signDocumentResponse.body,
            codigoGeneracion: document.identificacion.codigoGeneracion,
            idEnvio: '1',
            version: document.identificacion.version,
            tipoDte: document.identificacion.tipoDte,
        };
        return sendDocumentBody;
    }
    createLoginParams(nit, privateKey) {
        return {
            user: nit,
            pwd: privateKey,
        };
    }
    createLoginUrl(haciendaUrl, loginParams) {
        return (0, http_util_1.getUrl)(`${haciendaUrl}/seguridad/auth/`, loginParams);
    }
    async signDocument(nit, taxDocument, decryptedPublicKey, firmadorUrl) {
        const { post } = (0, http_util_1.handleHttp)();
        const signDocumentBody = this.createSignDocumentBody(nit, taxDocument, decryptedPublicKey);
        return post(`${firmadorUrl}/firmardocumento/`, {
            body: signDocumentBody,
        });
    }
    async sendDocument(certificateDocumentBody, haciendaUrl, token) {
        const { post } = (0, http_util_1.handleHttp)();
        return post(haciendaUrl, {
            headers: {
                [http_types_1.HeadersKeys.authorization]: token,
            },
            body: certificateDocumentBody,
        }, 8000);
    }
    async postHaciendaLogin(haciendaLoginUrl) {
        const { post } = (0, http_util_1.handleHttp)();
        return post(haciendaLoginUrl);
    }
};
exports.TaxDocumentsService = TaxDocumentsService;
exports.TaxDocumentsService = TaxDocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.TaxDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Anulation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        jwt_1.JwtService,
        companies_1.CompaniesService,
        email_1.EmailService,
        pdf_1.PdfService,
        json_1.JsonService])
], TaxDocumentsService);
//# sourceMappingURL=tax-documents.service.js.map