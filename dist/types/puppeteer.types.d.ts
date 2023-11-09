export type ScreenshotOpt = {
    width: number;
    height: number;
    fullPage: boolean;
    type: 'png' | 'jpeg' | 'webp';
    encoding: 'base64';
    html: string;
};
