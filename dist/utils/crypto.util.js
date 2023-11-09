"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptKeys = exports.decrypt = exports.encrypt = exports.encode = void 0;
const node_crypto_1 = require("node:crypto");
exports.encode = {
    hex: 'hex',
    base64: 'base64',
    utf8: 'utf8',
};
function createBufferFromHex(hexString) {
    return Buffer.from(hexString, exports.encode.hex);
}
function encrypt(inputString, secretCryptoKey) {
    const algorithm = 'aes-256-gcm';
    const iv = (0, node_crypto_1.randomBytes)(16);
    const cipher = (0, node_crypto_1.createCipheriv)(algorithm, createBufferFromHex(secretCryptoKey), iv);
    let encrypted = cipher.update(inputString, exports.encode.utf8, exports.encode.hex);
    encrypted += cipher.final(exports.encode.hex);
    const authenticationTag = cipher.getAuthTag().toString(exports.encode.hex);
    const encryptedMessage = `${iv.toString(exports.encode.hex)}:${encrypted}:${authenticationTag}`;
    return encryptedMessage;
}
exports.encrypt = encrypt;
function decrypt(encryptedString, secretCryptoKey) {
    const algorithm = 'aes-256-gcm';
    const parts = encryptedString.split(':');
    if (parts.length !== 3)
        return null;
    const [ivHex, encryptedData, authenticationTag] = parts;
    const iv = createBufferFromHex(ivHex);
    const decipher = (0, node_crypto_1.createDecipheriv)(algorithm, createBufferFromHex(secretCryptoKey), iv);
    decipher.setAuthTag(createBufferFromHex(authenticationTag));
    let decrypted = decipher.update(encryptedData, exports.encode.hex, exports.encode.utf8);
    decrypted += decipher.final(exports.encode.utf8);
    return decrypted;
}
exports.decrypt = decrypt;
function encryptKeys({ api, publica, privada }, secretCryptoKey) {
    const encryptedKeys = {};
    if (api)
        encryptedKeys.api = encrypt(api, secretCryptoKey);
    if (publica)
        encryptedKeys.publica = encrypt(publica, secretCryptoKey);
    if (privada)
        encryptedKeys.privada = encrypt(privada, secretCryptoKey);
    return encryptedKeys;
}
exports.encryptKeys = encryptKeys;
//# sourceMappingURL=crypto.util.js.map