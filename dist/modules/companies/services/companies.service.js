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
exports.CompaniesService = void 0;
const schemas_1 = require("../schemas");
const crypto_util_1 = require("../../../utils/crypto.util");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CompaniesService = class CompaniesService {
    constructor(companyModel, configService) {
        this.companyModel = companyModel;
        this.configService = configService;
    }
    async create(createCompanyDto) {
        const companyToInsert = {
            ...createCompanyDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return await this.companyModel.create(companyToInsert);
    }
    findOne(nit) {
        return this.companyModel.findOne({ nit });
    }
    findOneByRole({ role }) {
        return this.companyModel.findOne({ roles: role });
    }
    async findAll() {
        return this.companyModel.find().exec();
    }
    async update(nit, updateCompanyDto) {
        const { _doc: existingCompany } = await this.companyModel.findOne({
            nit,
        });
        const { llaves } = updateCompanyDto;
        let encryptedKeys = {};
        if (llaves)
            encryptedKeys = (0, crypto_util_1.encryptKeys)(llaves, this.configService.get('CRYPTO_KEY'));
        if (!existingCompany) {
            throw new common_1.NotFoundException(`No se encontró una empresa con el NIT: ${nit}`);
        }
        const smtpEncrypted = this.buildConfigurationSmtp(existingCompany, updateCompanyDto);
        const updatedCompany = this.companyModel.findOneAndUpdate({ nit }, {
            ...existingCompany,
            ...updateCompanyDto,
            llaves: { ...existingCompany.llaves, ...encryptedKeys },
            configuracionSmtp: smtpEncrypted,
            updatedAt: new Date(),
        }, { new: true });
        const { contrasena, ...updatedCompanyData } = (await updatedCompany).toObject();
        return updatedCompanyData;
    }
    async changePassword(hashedPassword, nit) {
        await this.companyModel.updateOne({ nit }, { contrasena: hashedPassword, updatedAt: new Date() }, { new: true });
        return { message: 'Contraseña actualizada correctamente!' };
    }
    buildConfigurationSmtp(company, updateCompanyDto) {
        const currentSmtpConfig = company?.configuracionSmtp;
        if (!currentSmtpConfig)
            return this.encryptSmtpConfig(updateCompanyDto.configuracionSmtp);
        const { auth: currentAuth, ...currentSmtpDetails } = currentSmtpConfig;
        const { auth: newAuth, ...newSmtpDetails } = this.encryptSmtpConfig(updateCompanyDto.configuracionSmtp);
        return {
            ...currentSmtpDetails,
            ...newSmtpDetails,
            auth: {
                ...currentAuth,
                ...newAuth,
            },
        };
    }
    encryptSmtpConfig(smtpConfig) {
        const { auth } = smtpConfig;
        const encryptedAuth = {
            ...auth,
            pass: (0, crypto_util_1.encrypt)(auth.pass, this.configService.get('CRYPTO_KEY')),
        };
        return {
            ...smtpConfig,
            auth: encryptedAuth,
        };
    }
    remove(id) {
        return `This action removes a #${id} company`;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Company.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map