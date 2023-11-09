import { ScreenshotOpt } from '@/types/puppeteer.types';
export declare function launchBrowser(): Promise<import("puppeteer").Browser>;
export declare function generateScreenshot({ html, encoding, fullPage, height, width, type, }: ScreenshotOpt): Promise<string>;
