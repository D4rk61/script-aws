"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTemplate = void 0;
const common_1 = require("@nestjs/common");
const handlebars = require("handlebars");
async function compileTemplate(template, data) {
    try {
        const templateFn = handlebars.compile(template);
        return templateFn(data);
    }
    catch (error) {
        throw new common_1.InternalServerErrorException('Error al compilar el template');
    }
}
exports.compileTemplate = compileTemplate;
//# sourceMappingURL=handlebars.util.js.map