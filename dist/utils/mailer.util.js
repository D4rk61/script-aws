"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithTransporter = void 0;
const nodemailer_1 = require("nodemailer");
async function sendEmailWithTransporter(transportOptions, mailOptions) {
    const transport = (0, nodemailer_1.createTransport)(transportOptions);
    await transport.sendMail(mailOptions);
}
exports.sendEmailWithTransporter = sendEmailWithTransporter;
//# sourceMappingURL=mailer.util.js.map