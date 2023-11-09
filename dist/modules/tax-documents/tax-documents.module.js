"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxDocumentsModule = void 0;
const auth_1 = require("../auth");
const companies_1 = require("../companies");
const email_1 = require("../email");
const pdf_1 = require("../pdf");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tax_documents_controller_1 = require("./controllers/tax-documents.controller");
const anulacion_schema_1 = require("./schemas/anulacion.schema");
const tax_document_schema_1 = require("./schemas/tax-document.schema");
const tax_documents_service_1 = require("./services/tax-documents.service");
const json_module_1 = require("../json/json.module");
const appModules = [
    auth_1.AuthModule,
    companies_1.CompaniesModule,
    email_1.EmailModule,
    pdf_1.PdfModule,
    json_module_1.JsonModule,
];
let TaxDocumentsModule = class TaxDocumentsModule {
};
exports.TaxDocumentsModule = TaxDocumentsModule;
exports.TaxDocumentsModule = TaxDocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ...appModules,
            mongoose_1.MongooseModule.forFeature([
                { name: tax_document_schema_1.TaxDocument.name, schema: tax_document_schema_1.TaxDocumentSchema },
                { name: anulacion_schema_1.Anulation.name, schema: anulacion_schema_1.AnulationSchema },
            ]),
        ],
        controllers: [tax_documents_controller_1.TaxDocumentsController],
        providers: [tax_documents_service_1.TaxDocumentsService],
    })
], TaxDocumentsModule);
//# sourceMappingURL=tax-documents.module.js.map