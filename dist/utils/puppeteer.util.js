"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScreenshot = exports.launchBrowser = void 0;
const puppeteer_1 = require("puppeteer");
async function launchBrowser() {
    const browserExecPath = '/usr/bin/google-chrome';
    return await puppeteer_1.default.launch({
        executablePath: browserExecPath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'new',
    });
}
exports.launchBrowser = launchBrowser;
async function generateScreenshot({ html, encoding, fullPage, height, width, type, }) {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.setContent(html);
    const screenshotBase64 = await page.screenshot({
        encoding,
        fullPage,
        type,
    });
    await browser.close();
    return screenshotBase64;
}
exports.generateScreenshot = generateScreenshot;
//# sourceMappingURL=puppeteer.util.js.map