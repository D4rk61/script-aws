"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const fs = require("node:fs");
const node_path_1 = require("node:path");
async function readFile(fileDirPath, fileName, encoding = 'utf-8') {
    const filePath = (0, node_path_1.join)(process.cwd(), fileDirPath, fileName);
    return fs.promises.readFile(filePath, encoding);
}
exports.readFile = readFile;
//# sourceMappingURL=files.util.js.map