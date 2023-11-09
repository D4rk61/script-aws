"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCredentials = exports.extractTokenFromHeaderValue = exports.isActiveCustomMessage = exports.isActiveErrorMessage = exports.hasRole = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
function hasRole(roles, roleName) {
    if (!roles)
        return false;
    return roles.includes(roleName);
}
exports.hasRole = hasRole;
function isActiveErrorMessage({ property }) {
    return `${property} is a required field when 'isActive' is true`;
}
exports.isActiveErrorMessage = isActiveErrorMessage;
exports.isActiveCustomMessage = {
    message: isActiveErrorMessage,
};
function extractTokenFromHeaderValue(token) {
    if (!token)
        return undefined;
    const [type, tokenData] = token.split(' ') ?? [];
    return type === 'Bearer' ? tokenData : undefined;
}
exports.extractTokenFromHeaderValue = extractTokenFromHeaderValue;
async function checkCredentials(company, password) {
    if (!company)
        throw new common_1.UnauthorizedException('Credenciales incorrectas.');
    if (!company.isActive)
        throw new common_1.UnauthorizedException('Usuario inactivo.');
    const isValidPassword = await (0, bcrypt_1.compare)(password, company.contrasena);
    if (!isValidPassword)
        throw new common_1.UnauthorizedException('Credenciales incorrectas.');
}
exports.checkCredentials = checkCredentials;
//# sourceMappingURL=auth.util.js.map