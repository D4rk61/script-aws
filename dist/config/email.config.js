"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('email', () => ({
    transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    },
}));
//# sourceMappingURL=email.config.js.map